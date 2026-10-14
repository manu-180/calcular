import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora, TablaResultado } from "../../tipos";
import { amortizar, cuotaFrancesa } from "../prestamo/definicion";
import { formatearNumero, montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiHipoteca {
  precio: string;
  entradaPorcentaje: string;
  entradaMonto: string;
  entradaMontoAyuda: string;
  tasa: string;
  anios: string;
  gastos: string;
  gastosAyuda: string;
  cuota: string;
  cuotaTotal: string;
  entrada: string;
  prestado: string;
  intereses: string;
  total: string;
  tabla: string;
  colAnio: string;
  colIntereses: string;
  colCapital: string;
  colSaldo: string;
  errorPrecio: string;
  errorEntrada: string;
  observacionPrestado: (porcentaje: string) => string;
  observacionCostos: string;
}

export function definir(ctx: ContextoUniversal, ui: UiHipoteca): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "hipoteca",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "precio", tipo: "moneda", etiqueta: ui.precio, min: 0, porDefecto: montoEjemplo(ctx, 200000) },
      { id: "entradaPorcentaje", tipo: "porcentaje", etiqueta: ui.entradaPorcentaje, min: 0, max: 100, porDefecto: 20, requerido: false },
      { id: "entradaMonto", tipo: "moneda", etiqueta: ui.entradaMonto, ayuda: ui.entradaMontoAyuda, min: 0, requerido: false },
      { id: "tasa", tipo: "porcentaje", etiqueta: ui.tasa, min: 0, max: 100, porDefecto: 7 },
      { id: "anios", tipo: "entero", etiqueta: ui.anios, min: 1, max: 50, porDefecto: 25 },
      { id: "gastos", tipo: "moneda", etiqueta: ui.gastos, ayuda: ui.gastosAyuda, min: 0, requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.precio <= 0) throw new ErrorEntrada(ui.errorPrecio, "precio");
      const inicial = redondear(entrada.entradaMonto ?? (entrada.precio * (entrada.entradaPorcentaje ?? 0)) / 100);
      if (inicial >= entrada.precio) throw new ErrorEntrada(ui.errorEntrada, entrada.entradaMonto === null ? "entradaPorcentaje" : "entradaMonto");
      const prestado = redondear(entrada.precio - inicial);
      const meses = entrada.anios * 12;
      const cuota = redondear(cuotaFrancesa(prestado, entrada.tasa, meses));
      const plan = amortizar(prestado, entrada.tasa, meses, cuota, 0, redondear);
      const filas: (readonly number[])[] = [];
      for (let anio = 1; anio <= entrada.anios; anio++) {
        const delAnio = plan.filas.slice((anio - 1) * 12, anio * 12);
        const intereses = redondear(delAnio.reduce((s, f) => s + f[2], 0));
        const capital = redondear(delAnio.reduce((s, f) => s + f[3], 0));
        filas.push([anio, intereses, capital, delAnio[delAnio.length - 1][4]]);
      }
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "anio", etiqueta: ui.colAnio, formato: "numero" },
          { clave: "intereses", etiqueta: ui.colIntereses, formato: "moneda" },
          { clave: "capital", etiqueta: ui.colCapital, formato: "moneda" },
          { clave: "saldo", etiqueta: ui.colSaldo, formato: "moneda" },
        ],
        filas,
      };
      const gastos = entrada.gastos ?? 0;
      return {
        cuota,
        cuotaTotal: gastos > 0 ? redondear(cuota + gastos) : null,
        entrada: inicial,
        prestado,
        intereses: plan.intereses,
        total: plan.pagos,
        anual: tabla,
        observaciones: [ui.observacionPrestado(formatearNumero(ctx, (prestado / entrada.precio) * 100, 0)), ui.observacionCostos],
      };
    },
    resultado: [
      { clave: "cuota", etiqueta: ui.cuota, formato: "moneda", destacada: true },
      { clave: "cuotaTotal", etiqueta: ui.cuotaTotal, formato: "moneda", destacada: true },
      { clave: "entrada", etiqueta: ui.entrada, formato: "moneda" },
      { clave: "prestado", etiqueta: ui.prestado, formato: "moneda" },
      { clave: "intereses", etiqueta: ui.intereses, formato: "moneda" },
      { clave: "total", etiqueta: ui.total, formato: "moneda" },
    ],
    tablas: [{ clave: "anual", titulo: ui.tabla, filasVisibles: 12 }],
  });
}
