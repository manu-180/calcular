import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiMetaDeAhorro {
  meta: string;
  actual: string;
  meses: string;
  rendimiento: string;
  rendimientoAyuda: string;
  aporteMensual: string;
  aporteSemanal: string;
  totalAportado: string;
  intereses: string;
  errorMeta: string;
  yaLlegas: string;
}

// Rendimiento nominal anual con capitalización mensual (tasa ÷ 12), igual que una cuenta de ahorro.
export function aporteNecesario(meta: number, actual: number, meses: number, rendimiento: number): number {
  const i = rendimiento / 100 / 12;
  const crecido = actual * Math.pow(1 + i, meses);
  const falta = meta - crecido;
  if (falta <= 0) return 0;
  return i === 0 ? falta / meses : (falta * i) / (Math.pow(1 + i, meses) - 1);
}

export function definir(ctx: ContextoUniversal, ui: UiMetaDeAhorro): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "meta-de-ahorro",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "meta", tipo: "moneda", etiqueta: ui.meta, min: 0, porDefecto: montoEjemplo(ctx, 10000) },
      { id: "actual", tipo: "moneda", etiqueta: ui.actual, min: 0, requerido: false },
      { id: "meses", tipo: "entero", etiqueta: ui.meses, min: 1, max: 600, porDefecto: 24 },
      { id: "rendimiento", tipo: "porcentaje", etiqueta: ui.rendimiento, ayuda: ui.rendimientoAyuda, min: 0, max: 100, requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.meta <= 0) throw new ErrorEntrada(ui.errorMeta, "meta");
      const actual = entrada.actual ?? 0;
      const aporte = redondear(aporteNecesario(entrada.meta, actual, entrada.meses, entrada.rendimiento ?? 0));
      const totalAportado = redondear(aporte * entrada.meses);
      const intereses = aporte > 0 ? redondear(entrada.meta - actual - totalAportado) : null;
      return {
        aporteMensual: aporte,
        aporteSemanal: redondear((aporte * 12) / 52),
        totalAportado,
        intereses: intereses !== null && intereses > 0 ? intereses : null,
        observaciones: aporte === 0 ? [ui.yaLlegas] : [],
      };
    },
    resultado: [
      { clave: "aporteMensual", etiqueta: ui.aporteMensual, formato: "moneda", destacada: true },
      { clave: "aporteSemanal", etiqueta: ui.aporteSemanal, formato: "moneda" },
      { clave: "totalAportado", etiqueta: ui.totalAportado, formato: "moneda" },
      { clave: "intereses", etiqueta: ui.intereses, formato: "moneda" },
    ],
  });
}
