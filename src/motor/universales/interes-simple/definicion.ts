import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiInteresSimple {
  capital: string;
  tasa: string;
  tiempo: string;
  unidad: string;
  dias: string;
  meses: string;
  anios: string;
  base: string;
  baseAyuda: string;
  base365: string;
  base360: string;
  interes: string;
  montoFinal: string;
  tasaPeriodo: string;
  errorCapital: string;
}

export function aniosDe(tiempo: number, unidad: "dias" | "meses" | "anios", base: number): number {
  if (unidad === "dias") return tiempo / base;
  if (unidad === "meses") return tiempo / 12;
  return tiempo;
}

export function definir(ctx: ContextoUniversal, ui: UiInteresSimple): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "interes-simple",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "capital", tipo: "moneda", etiqueta: ui.capital, min: 0, porDefecto: montoEjemplo(ctx, 1000) },
      { id: "tasa", tipo: "porcentaje", etiqueta: ui.tasa, min: 0, max: 1000, porDefecto: 10 },
      { id: "tiempo", tipo: "numero", etiqueta: ui.tiempo, min: 0, porDefecto: 6 },
      {
        id: "unidad",
        tipo: "opcion",
        etiqueta: ui.unidad,
        opciones: [
          { valor: "dias", etiqueta: ui.dias },
          { valor: "meses", etiqueta: ui.meses },
          { valor: "anios", etiqueta: ui.anios },
        ],
        porDefecto: "meses",
      },
      {
        id: "base",
        tipo: "opcion",
        etiqueta: ui.base,
        ayuda: ui.baseAyuda,
        opciones: [
          { valor: "365", etiqueta: ui.base365 },
          { valor: "360", etiqueta: ui.base360 },
        ],
        porDefecto: "365",
      },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.capital <= 0) throw new ErrorEntrada(ui.errorCapital, "capital");
      const anios = aniosDe(entrada.tiempo, entrada.unidad, entrada.base === "360" ? 360 : 365);
      const interes = redondear(entrada.capital * (entrada.tasa / 100) * anios);
      return {
        interes,
        montoFinal: redondear(entrada.capital + interes),
        tasaPeriodo: Math.round(entrada.tasa * anios * 1e6) / 1e6,
      };
    },
    resultado: [
      { clave: "interes", etiqueta: ui.interes, formato: "moneda", destacada: true },
      { clave: "montoFinal", etiqueta: ui.montoFinal, formato: "moneda" },
      { clave: "tasaPeriodo", etiqueta: ui.tasaPeriodo, formato: "porcentaje", decimales: 4 },
    ],
  });
}
