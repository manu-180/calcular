import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora, TablaResultado } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiAhorroRetiro {
  edadActual: string;
  edadRetiro: string;
  actual: string;
  aporte: string;
  rendimiento: string;
  rendimientoAyuda: string;
  aniosRenta: string;
  aniosRentaAyuda: string;
  capital: string;
  renta: string;
  aportado: string;
  intereses: string;
  tabla: string;
  colEdad: string;
  colAportado: string;
  colSaldo: string;
  errorEdades: string;
  errorSinAhorro: string;
  observacionPublica: string;
  observacionDineroDeHoy: string;
}

export interface AnioRetiro {
  edad: number;
  aportado: number;
  saldo: number;
}

// El rendimiento es real (por encima de la inflación), así que todo el resultado queda en dinero de
// hoy. Se pasa a mensual equivalente para que 12 meses compongan exacto el rendimiento anual.
export function tasaMensual(rendimientoAnual: number): number {
  return Math.pow(1 + rendimientoAnual / 100, 1 / 12) - 1;
}

export function acumular(edadActual: number, edadRetiro: number, actual: number, aporte: number, rendimiento: number): AnioRetiro[] {
  const i = tasaMensual(rendimiento);
  let saldo = actual;
  let aportado = actual;
  const salida: AnioRetiro[] = [];
  for (let edad = edadActual + 1; edad <= edadRetiro; edad++) {
    for (let mes = 0; mes < 12; mes++) saldo = saldo * (1 + i) + aporte;
    aportado += aporte * 12;
    salida.push({ edad, aportado, saldo });
  }
  return salida;
}

export function rentaMensual(capital: number, rendimiento: number, anios: number): number {
  const i = tasaMensual(rendimiento);
  const n = anios * 12;
  return i === 0 ? capital / n : (capital * i) / (1 - Math.pow(1 + i, -n));
}

export function definir(ctx: ContextoUniversal, ui: UiAhorroRetiro): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "ahorro-retiro",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "edadActual", tipo: "entero", etiqueta: ui.edadActual, min: 14, max: 100, porDefecto: 30 },
      { id: "edadRetiro", tipo: "entero", etiqueta: ui.edadRetiro, min: 15, max: 110, porDefecto: 65 },
      { id: "actual", tipo: "moneda", etiqueta: ui.actual, min: 0, porDefecto: montoEjemplo(ctx, 5000) },
      { id: "aporte", tipo: "moneda", etiqueta: ui.aporte, min: 0, porDefecto: montoEjemplo(ctx, 200) },
      { id: "rendimiento", tipo: "porcentaje", etiqueta: ui.rendimiento, ayuda: ui.rendimientoAyuda, min: 0, max: 30, porDefecto: 4 },
      { id: "aniosRenta", tipo: "entero", etiqueta: ui.aniosRenta, ayuda: ui.aniosRentaAyuda, min: 1, max: 50, porDefecto: 25 },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.edadRetiro <= entrada.edadActual) throw new ErrorEntrada(ui.errorEdades, "edadRetiro");
      if (entrada.actual <= 0 && entrada.aporte <= 0) throw new ErrorEntrada(ui.errorSinAhorro, "aporte");
      const anios = acumular(entrada.edadActual, entrada.edadRetiro, entrada.actual, entrada.aporte, entrada.rendimiento);
      const ultimo = anios[anios.length - 1];
      const capital = redondear(ultimo.saldo);
      const aportado = redondear(ultimo.aportado);
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "edad", etiqueta: ui.colEdad, formato: "numero" },
          { clave: "aportado", etiqueta: ui.colAportado, formato: "moneda" },
          { clave: "saldo", etiqueta: ui.colSaldo, formato: "moneda" },
        ],
        filas: anios.map((a) => [a.edad, redondear(a.aportado), redondear(a.saldo)]),
      };
      return {
        capital,
        renta: redondear(rentaMensual(capital, entrada.rendimiento, entrada.aniosRenta)),
        aportado,
        intereses: redondear(capital - aportado),
        evolucion: tabla,
        observaciones: [ui.observacionDineroDeHoy, ui.observacionPublica],
      };
    },
    resultado: [
      { clave: "capital", etiqueta: ui.capital, formato: "moneda", destacada: true },
      { clave: "renta", etiqueta: ui.renta, formato: "moneda", destacada: true },
      { clave: "aportado", etiqueta: ui.aportado, formato: "moneda" },
      { clave: "intereses", etiqueta: ui.intereses, formato: "moneda" },
    ],
    tablas: [{ clave: "evolucion", titulo: ui.tabla, filasVisibles: 12 }],
  });
}
