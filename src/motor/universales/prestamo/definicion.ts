import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora, TablaResultado } from "../../tipos";
import { formatearMonto, montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiPrestamo {
  monto: string;
  tasa: string;
  tasaAyuda: string;
  meses: string;
  extra: string;
  extraAyuda: string;
  cuota: string;
  intereses: string;
  total: string;
  mesesReales: string;
  ahorro: string;
  tabla: string;
  colMes: string;
  colPago: string;
  colInteres: string;
  colCapital: string;
  colSaldo: string;
  errorMonto: string;
  observacionCostos: string;
  observacionExtra: (meses: string, ahorro: string) => string;
}

export function cuotaFrancesa(monto: number, tasaAnual: number, meses: number): number {
  const i = tasaAnual / 100 / 12;
  return i === 0 ? monto / meses : (monto * i) / (1 - Math.pow(1 + i, -meses));
}

export interface Plan {
  pagos: number;
  intereses: number;
  meses: number;
  filas: (readonly number[])[];
}

// La cuota se redondea una vez y el último mes absorbe el centavo que sobra o falta: así el saldo
// termina en cero exacto, como en la tabla de un banco.
export function amortizar(
  monto: number,
  tasaAnual: number,
  meses: number,
  cuota: number,
  extra: number,
  redondear: (n: number) => number,
): Plan {
  const i = tasaAnual / 100 / 12;
  let saldo = monto;
  let pagos = 0;
  let intereses = 0;
  const filas: (readonly number[])[] = [];
  for (let mes = 1; mes <= meses && saldo > 0; mes++) {
    const interes = redondear(saldo * i);
    let capital = redondear(cuota - interes + extra);
    if (mes === meses || capital >= saldo) capital = saldo;
    const pago = redondear(capital + interes);
    saldo = redondear(saldo - capital);
    pagos += pago;
    intereses += interes;
    filas.push([mes, pago, interes, capital, saldo]);
  }
  return { pagos: redondear(pagos), intereses: redondear(intereses), meses: filas.length, filas };
}

export function definir(ctx: ContextoUniversal, ui: UiPrestamo): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "prestamo",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "monto", tipo: "moneda", etiqueta: ui.monto, min: 0, porDefecto: montoEjemplo(ctx, 10000) },
      { id: "tasa", tipo: "porcentaje", etiqueta: ui.tasa, ayuda: ui.tasaAyuda, min: 0, max: 300, porDefecto: 12 },
      { id: "meses", tipo: "entero", etiqueta: ui.meses, min: 1, max: 600, porDefecto: 36 },
      { id: "extra", tipo: "moneda", etiqueta: ui.extra, ayuda: ui.extraAyuda, min: 0, requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.monto <= 0) throw new ErrorEntrada(ui.errorMonto, "monto");
      const extra = entrada.extra ?? 0;
      const cuota = redondear(cuotaFrancesa(entrada.monto, entrada.tasa, entrada.meses));
      const base = amortizar(entrada.monto, entrada.tasa, entrada.meses, cuota, 0, redondear);
      const plan = extra > 0 ? amortizar(entrada.monto, entrada.tasa, entrada.meses, cuota, extra, redondear) : base;
      const ahorro = redondear(base.intereses - plan.intereses);
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "mes", etiqueta: ui.colMes, formato: "numero" },
          { clave: "pago", etiqueta: ui.colPago, formato: "moneda" },
          { clave: "interes", etiqueta: ui.colInteres, formato: "moneda" },
          { clave: "capital", etiqueta: ui.colCapital, formato: "moneda" },
          { clave: "saldo", etiqueta: ui.colSaldo, formato: "moneda" },
        ],
        filas: plan.filas,
      };
      const observaciones = [ui.observacionCostos];
      if (extra > 0) observaciones.push(ui.observacionExtra(String(plan.meses), formatearMonto(ctx, ahorro)));
      return {
        cuota,
        intereses: plan.intereses,
        total: plan.pagos,
        mesesReales: extra > 0 ? plan.meses : null,
        ahorro: extra > 0 ? ahorro : null,
        amortizacion: tabla,
        observaciones,
      };
    },
    resultado: [
      { clave: "cuota", etiqueta: ui.cuota, formato: "moneda", destacada: true },
      { clave: "intereses", etiqueta: ui.intereses, formato: "moneda" },
      { clave: "total", etiqueta: ui.total, formato: "moneda" },
      { clave: "mesesReales", etiqueta: ui.mesesReales, formato: "numero", decimales: 0 },
      { clave: "ahorro", etiqueta: ui.ahorro, formato: "moneda" },
    ],
    tablas: [{ clave: "amortizacion", titulo: ui.tabla, filasVisibles: 12 }],
  });
}
