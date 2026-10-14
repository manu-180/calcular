import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiRendimientoInversion {
  inicial: string;
  final: string;
  finalAyuda: string;
  cobrado: string;
  cobradoAyuda: string;
  anios: string;
  aniosAyuda: string;
  ganancia: string;
  roi: string;
  cagr: string;
  cagrAyuda: string;
  errorInicial: string;
  observacionCorto: string;
  observacionInflacion: string;
}

const r6 = (n: number) => Math.round(n * 1e6) / 1e6;

export function roi(inicial: number, final: number): number {
  return ((final - inicial) / inicial) * 100;
}

export function cagr(inicial: number, final: number, anios: number): number {
  return (Math.pow(final / inicial, 1 / anios) - 1) * 100;
}

export function definir(ctx: ContextoUniversal, ui: UiRendimientoInversion): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "rendimiento-inversion",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "inicial", tipo: "moneda", etiqueta: ui.inicial, min: 0, porDefecto: montoEjemplo(ctx, 10000) },
      { id: "final", tipo: "moneda", etiqueta: ui.final, ayuda: ui.finalAyuda, min: 0, porDefecto: montoEjemplo(ctx, 15000) },
      { id: "cobrado", tipo: "moneda", etiqueta: ui.cobrado, ayuda: ui.cobradoAyuda, min: 0, requerido: false },
      { id: "anios", tipo: "numero", etiqueta: ui.anios, ayuda: ui.aniosAyuda, min: 0, max: 100, porDefecto: 5 },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.inicial <= 0) throw new ErrorEntrada(ui.errorInicial, "inicial");
      const total = entrada.final + (entrada.cobrado ?? 0);
      const observaciones: string[] = [];
      if (entrada.anios > 0 && entrada.anios < 1) observaciones.push(ui.observacionCorto);
      observaciones.push(ui.observacionInflacion);
      return {
        ganancia: redondear(total - entrada.inicial),
        roi: r6(roi(entrada.inicial, total)),
        cagr: entrada.anios > 0 ? r6(cagr(entrada.inicial, total, entrada.anios)) : null,
        observaciones,
      };
    },
    resultado: [
      { clave: "roi", etiqueta: ui.roi, formato: "porcentaje", decimales: 2, destacada: true },
      { clave: "cagr", etiqueta: ui.cagr, ayuda: ui.cagrAyuda, formato: "porcentaje", decimales: 2, destacada: true },
      { clave: "ganancia", etiqueta: ui.ganancia, formato: "moneda" },
    ],
  });
}
