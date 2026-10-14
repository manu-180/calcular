import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora, TablaResultado } from "../../tipos";
import { formatearCifra, formatearMonto, montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiTarjetaDeCredito {
  saldo: string;
  tasa: string;
  tasaAyuda: string;
  modo: string;
  modoFijo: string;
  modoMinimo: string;
  pagoFijo: string;
  minimoPorcentaje: string;
  minimoPorcentajeAyuda: string;
  minimoPiso: string;
  meses: string;
  intereses: string;
  total: string;
  primerPago: string;
  tabla: string;
  colMes: string;
  colPago: string;
  colInteres: string;
  colCapital: string;
  colSaldo: string;
  errorSaldo: string;
  errorFaltaPago: string;
  errorNoCubre: (interes: string) => string;
  errorMuyLargo: string;
  observacionAnios: (anios: string, meses: string) => string;
  observacionFijo: (pago: string, meses: string, ahorro: string) => string;
  observacionNoGastar: string;
}

export const TOPE_MESES = 600;

export interface Pago {
  modo: "fijo" | "minimo";
  fijo: number;
  porcentaje: number;
  piso: number;
}

export interface Saldado {
  meses: number;
  intereses: number;
  total: number;
  filas: (readonly number[])[];
  cubre: boolean;
}

// El interés del mes se suma al saldo y después se descuenta el pago, como en el resumen de una
// tarjeta. Si el pago no supera el interés, la deuda no baja nunca: se corta y se avisa.
export function saldar(saldo: number, tasaAnual: number, pago: Pago, redondear: (n: number) => number): Saldado {
  const i = tasaAnual / 100 / 12;
  let deuda = saldo;
  let intereses = 0;
  let total = 0;
  const filas: (readonly number[])[] = [];
  while (deuda > 0 && filas.length < TOPE_MESES) {
    const interes = redondear(deuda * i);
    const debe = redondear(deuda + interes);
    const propuesto = pago.modo === "fijo" ? pago.fijo : Math.max(redondear((debe * pago.porcentaje) / 100), pago.piso);
    if (propuesto <= interes && propuesto < debe) return { meses: filas.length, intereses, total, filas, cubre: false };
    const pagado = Math.min(propuesto, debe);
    deuda = redondear(debe - pagado);
    intereses += interes;
    total += pagado;
    filas.push([filas.length + 1, pagado, interes, redondear(pagado - interes), deuda]);
  }
  return { meses: filas.length, intereses: redondear(intereses), total: redondear(total), filas, cubre: deuda <= 0 };
}

export function definir(ctx: ContextoUniversal, ui: UiTarjetaDeCredito): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "tarjeta-de-credito",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "saldo", tipo: "moneda", etiqueta: ui.saldo, min: 0, porDefecto: montoEjemplo(ctx, 2000) },
      { id: "tasa", tipo: "porcentaje", etiqueta: ui.tasa, ayuda: ui.tasaAyuda, min: 0, max: 500, porDefecto: 30 },
      {
        id: "modo",
        tipo: "opcion",
        etiqueta: ui.modo,
        opciones: [
          { valor: "fijo", etiqueta: ui.modoFijo },
          { valor: "minimo", etiqueta: ui.modoMinimo },
        ],
        porDefecto: "fijo",
      },
      { id: "pago", tipo: "moneda", etiqueta: ui.pagoFijo, min: 0, porDefecto: montoEjemplo(ctx, 100), requerido: false },
      { id: "minimoPorcentaje", tipo: "porcentaje", etiqueta: ui.minimoPorcentaje, ayuda: ui.minimoPorcentajeAyuda, min: 0, max: 100, porDefecto: 5, requerido: false },
      { id: "minimoPiso", tipo: "moneda", etiqueta: ui.minimoPiso, min: 0, porDefecto: montoEjemplo(ctx, 25), requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.saldo <= 0) throw new ErrorEntrada(ui.errorSaldo, "saldo");
      if (entrada.modo === "fijo" && !entrada.pago) throw new ErrorEntrada(ui.errorFaltaPago, "pago");
      const pago: Pago = {
        modo: entrada.modo,
        fijo: entrada.pago ?? 0,
        porcentaje: entrada.minimoPorcentaje ?? 0,
        piso: entrada.minimoPiso ?? 0,
      };
      const campoPago = entrada.modo === "fijo" ? "pago" : "minimoPorcentaje";
      const r = saldar(entrada.saldo, entrada.tasa, pago, redondear);
      if (!r.cubre && r.meses < TOPE_MESES) {
        const interes = formatearMonto(ctx, redondear((entrada.saldo * entrada.tasa) / 100 / 12));
        throw new ErrorEntrada(ui.errorNoCubre(interes), campoPago);
      }
      if (!r.cubre) throw new ErrorEntrada(ui.errorMuyLargo, campoPago);
      const primerPago = r.filas[0][1];
      const observaciones: string[] = [];
      if (r.meses >= 12) observaciones.push(ui.observacionAnios(formatearCifra(ctx, Math.floor(r.meses / 12), 0), formatearCifra(ctx, r.meses % 12, 0)));
      if (entrada.modo === "minimo") {
        const fijo = saldar(entrada.saldo, entrada.tasa, { ...pago, modo: "fijo", fijo: primerPago }, redondear);
        if (fijo.cubre && fijo.meses < r.meses) {
          observaciones.push(ui.observacionFijo(formatearMonto(ctx, primerPago), formatearCifra(ctx, fijo.meses, 0), formatearMonto(ctx, redondear(r.intereses - fijo.intereses))));
        }
      }
      observaciones.push(ui.observacionNoGastar);
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "mes", etiqueta: ui.colMes, formato: "numero" },
          { clave: "pago", etiqueta: ui.colPago, formato: "moneda" },
          { clave: "interes", etiqueta: ui.colInteres, formato: "moneda" },
          { clave: "capital", etiqueta: ui.colCapital, formato: "moneda" },
          { clave: "saldo", etiqueta: ui.colSaldo, formato: "moneda" },
        ],
        filas: r.filas,
      };
      return {
        meses: r.meses,
        intereses: r.intereses,
        total: r.total,
        primerPago: entrada.modo === "minimo" ? primerPago : null,
        plan: tabla,
        observaciones,
      };
    },
    resultado: [
      { clave: "meses", etiqueta: ui.meses, formato: "numero", decimales: 0, destacada: true },
      { clave: "intereses", etiqueta: ui.intereses, formato: "moneda", destacada: true },
      { clave: "total", etiqueta: ui.total, formato: "moneda" },
      { clave: "primerPago", etiqueta: ui.primerPago, formato: "moneda" },
    ],
    tablas: [{ clave: "plan", titulo: ui.tabla, filasVisibles: 12 }],
  });
}
