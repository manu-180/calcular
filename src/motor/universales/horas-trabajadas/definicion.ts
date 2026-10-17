import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { Campo, DefinicionCalculadora, TablaResultado, ValorEntrada } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiHorasTrabajadas {
  dias: readonly [string, string, string, string, string, string, string];
  entrada: (dia: string) => string;
  salida: (dia: string) => string;
  horarioAyuda: string;
  pausa: string;
  pausaAyuda: string;
  pagoHora: string;
  umbral: string;
  umbralAyuda: string;
  recargo: string;
  recargoAyuda: string;
  horasTotales: string;
  horasReloj: string;
  horasNormales: string;
  horasExtra: string;
  pagoNormal: string;
  pagoExtra: string;
  pagoTotal: string;
  tabla: string;
  colDia: string;
  colEntrada: string;
  colSalida: string;
  colHoras: string;
  errorFaltaSalida: (dia: string) => string;
  errorFaltaEntrada: (dia: string) => string;
  errorIguales: (dia: string) => string;
  errorPausa: (dia: string) => string;
  errorSinDias: string;
  observacionNoche: string;
  observacionGenerico: string;
}

export const DIAS = 7;
const PASO_MINUTOS = 15;

// El motor no tiene campo de hora: entrada y salida son listas de horarios cada 15 minutos. El valor
// es siempre "HH:MM" en 24 h; la etiqueta sigue el formato del país (9:00 a. m., 09:00, 9:00 AM).
export function horarios(locale: string): { valor: string; etiqueta: string }[] {
  const formato = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
  const salida: { valor: string; etiqueta: string }[] = [];
  for (let m = 0; m < 24 * 60; m += PASO_MINUTOS) {
    const h = Math.floor(m / 60);
    const valor = `${String(h).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    salida.push({ valor, etiqueta: formato.format(Date.UTC(2026, 0, 1, h, m % 60)) });
  }
  return salida;
}

function minutos(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function minutosTrabajados(entrada: string, salida: string, pausa: number): number {
  let total = minutos(salida) - minutos(entrada);
  if (total <= 0) total += 24 * 60;
  return total - pausa;
}

export function relojDe(horas: number): string {
  const total = Math.round(horas * 60);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

export function definir(ctx: ContextoUniversal, ui: UiHorasTrabajadas): DefinicionCalculadora {
  const opciones = horarios(ctx.locale);
  const camposDias: Campo[] = [];
  for (let d = 1; d <= DIAS; d++) {
    const laborable = d <= 5;
    camposDias.push(
      { id: `entrada${d}`, tipo: "opcion", etiqueta: ui.entrada(ui.dias[d - 1]), ayuda: d === 1 ? ui.horarioAyuda : undefined, opciones, requerido: false, porDefecto: laborable ? "09:00" : undefined },
      { id: `salida${d}`, tipo: "opcion", etiqueta: ui.salida(ui.dias[d - 1]), opciones, requerido: false, porDefecto: laborable ? "17:30" : undefined },
    );
  }
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "horas-trabajadas",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      ...camposDias,
      { id: "pausa", tipo: "numero", etiqueta: ui.pausa, ayuda: ui.pausaAyuda, min: 0, max: 720, porDefecto: 30 },
      { id: "pagoHora", tipo: "moneda", etiqueta: ui.pagoHora, min: 0, porDefecto: montoEjemplo(ctx, 15) },
      { id: "umbral", tipo: "numero", etiqueta: ui.umbral, ayuda: ui.umbralAyuda, min: 0, max: 168, porDefecto: 40, requerido: false },
      { id: "recargo", tipo: "porcentaje", etiqueta: ui.recargo, ayuda: ui.recargoAyuda, min: 0, max: 300, porDefecto: 50 },
    ],
    calcular(valores, _valores, { redondear }) {
      const e = valores as unknown as Readonly<Record<string, ValorEntrada>>;
      const pausa = Number(e.pausa ?? 0);
      const pago = Number(e.pagoHora ?? 0);
      const umbral = e.umbral === null || e.umbral === undefined ? null : Number(e.umbral);
      const recargo = Number(e.recargo ?? 0);
      const filas: (readonly (string | number)[])[] = [];
      let total = 0;
      let cruzaMedianoche = false;
      for (let d = 1; d <= DIAS; d++) {
        const dia = ui.dias[d - 1];
        const desde = e[`entrada${d}`];
        const hasta = e[`salida${d}`];
        if (!desde && !hasta) continue;
        if (!hasta) throw new ErrorEntrada(ui.errorFaltaSalida(dia), `salida${d}`);
        if (!desde) throw new ErrorEntrada(ui.errorFaltaEntrada(dia), `entrada${d}`);
        if (desde === hasta) throw new ErrorEntrada(ui.errorIguales(dia), `salida${d}`);
        const neto = minutosTrabajados(String(desde), String(hasta), pausa);
        if (neto <= 0) throw new ErrorEntrada(ui.errorPausa(dia), "pausa");
        if (minutos(String(hasta)) <= minutos(String(desde))) cruzaMedianoche = true;
        const horas = neto / 60;
        total += horas;
        const etiqueta = (v: string) => opciones.find((o) => o.valor === v)?.etiqueta ?? v;
        filas.push([dia, etiqueta(String(desde)), etiqueta(String(hasta)), r4(horas)]);
      }
      if (!filas.length) throw new ErrorEntrada(ui.errorSinDias, "entrada1");
      const extra = umbral === null ? 0 : Math.max(total - umbral, 0);
      const normales = total - extra;
      const pagoNormal = redondear(normales * pago);
      const pagoExtra = redondear(extra * pago * (1 + recargo / 100));
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "dia", etiqueta: ui.colDia, formato: "texto" },
          { clave: "entrada", etiqueta: ui.colEntrada, formato: "texto" },
          { clave: "salida", etiqueta: ui.colSalida, formato: "texto" },
          { clave: "horas", etiqueta: ui.colHoras, formato: "numero" },
        ],
        filas,
      };
      const observaciones: string[] = [];
      if (cruzaMedianoche) observaciones.push(ui.observacionNoche);
      observaciones.push(ui.observacionGenerico);
      return {
        horasTotales: r4(total),
        horasReloj: relojDe(total),
        horasNormales: r4(normales),
        horasExtra: r4(extra),
        pagoNormal,
        pagoExtra,
        pagoTotal: redondear(pagoNormal + pagoExtra),
        semana: tabla,
        observaciones,
      };
    },
    resultado: [
      { clave: "pagoTotal", etiqueta: ui.pagoTotal, formato: "moneda", destacada: true },
      { clave: "horasTotales", etiqueta: ui.horasTotales, formato: "numero", decimales: 2, destacada: true },
      { clave: "horasReloj", etiqueta: ui.horasReloj, formato: "texto" },
      { clave: "horasNormales", etiqueta: ui.horasNormales, formato: "numero", decimales: 2 },
      { clave: "horasExtra", etiqueta: ui.horasExtra, formato: "numero", decimales: 2, ocultarSiCero: true },
      { clave: "pagoNormal", etiqueta: ui.pagoNormal, formato: "moneda" },
      { clave: "pagoExtra", etiqueta: ui.pagoExtra, formato: "moneda", ocultarSiCero: true },
    ],
    tablas: [{ clave: "semana", titulo: ui.tabla, filasVisibles: 7 }],
  });
}
