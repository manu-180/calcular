import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { formatearNumero, type ContextoUniversal } from "../tipos";

export interface UiTasaEfectiva {
  direccion: string;
  nominalAEfectiva: string;
  efectivaANominal: string;
  tasa: string;
  tasaAyuda: string;
  capitalizacion: string;
  capitalizacionAyuda: string;
  mensual: string;
  trimestral: string;
  semestral: string;
  diaria: string;
  efectiva: string;
  nominal: string;
  periodica: string;
  errorNegativa: string;
  observacionDiferencia: (puntos: string) => string;
}

export const PERIODOS = { mensual: 12, trimestral: 4, semestral: 2, diaria: 365 } as const;

export function aEfectiva(nominal: number, m: number): number {
  return (Math.pow(1 + nominal / 100 / m, m) - 1) * 100;
}

export function aNominal(efectiva: number, m: number): number {
  return (Math.pow(1 + efectiva / 100, 1 / m) - 1) * m * 100;
}

const r6 = (n: number) => Math.round(n * 1e6) / 1e6;

export function definir(ctx: ContextoUniversal, ui: UiTasaEfectiva): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "tasa-efectiva",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      {
        id: "direccion",
        tipo: "opcion",
        etiqueta: ui.direccion,
        opciones: [
          { valor: "nominal", etiqueta: ui.nominalAEfectiva },
          { valor: "efectiva", etiqueta: ui.efectivaANominal },
        ],
        porDefecto: "nominal",
      },
      { id: "tasa", tipo: "porcentaje", etiqueta: ui.tasa, ayuda: ui.tasaAyuda, min: 0, max: 1000, porDefecto: 12 },
      {
        id: "capitalizacion",
        tipo: "opcion",
        etiqueta: ui.capitalizacion,
        ayuda: ui.capitalizacionAyuda,
        opciones: [
          { valor: "mensual", etiqueta: ui.mensual },
          { valor: "trimestral", etiqueta: ui.trimestral },
          { valor: "semestral", etiqueta: ui.semestral },
          { valor: "diaria", etiqueta: ui.diaria },
        ],
        porDefecto: "mensual",
      },
    ],
    calcular(entrada) {
      if (entrada.tasa < 0) throw new ErrorEntrada(ui.errorNegativa, "tasa");
      const m = PERIODOS[entrada.capitalizacion];
      const nominal = entrada.direccion === "nominal" ? entrada.tasa : aNominal(entrada.tasa, m);
      const efectiva = entrada.direccion === "nominal" ? aEfectiva(entrada.tasa, m) : entrada.tasa;
      const puntos = efectiva - nominal;
      return {
        efectiva: r6(efectiva),
        nominal: r6(nominal),
        periodica: r6(nominal / m),
        observaciones: puntos >= 0.005 ? [ui.observacionDiferencia(formatearNumero(ctx, puntos, 2))] : [],
      };
    },
    resultado: [
      { clave: "efectiva", etiqueta: ui.efectiva, formato: "porcentaje", decimales: 2, destacada: true },
      { clave: "nominal", etiqueta: ui.nominal, formato: "porcentaje", decimales: 2, destacada: true },
      { clave: "periodica", etiqueta: ui.periodica, formato: "porcentaje", decimales: 4 },
    ],
  });
}
