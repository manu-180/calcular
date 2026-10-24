import type { Trato } from "../tipos";
import type { Experiencia, Ocupacion } from "./catalogo";

// Cuántos aportes tiene una celda, nunca la cuenta exacta (comparar dos fotos diría cuántos entraron):
// sin publicar, «lejos» o «cerca» (CERCA de catalogo.ts); publicada, el rango.
export const TRAMOS_PUBLICADOS = ["10-19", "20-49", "50+"] as const;
export type TramoPublicado = (typeof TRAMOS_PUBLICADOS)[number];
export type Tramo = "lejos" | "cerca" | TramoPublicado;
export const TRAMOS: readonly Tramo[] = ["lejos", "cerca", ...TRAMOS_PUBLICADOS];
export const esTramoPublicado = (t: Tramo): t is TramoPublicado => (TRAMOS_PUBLICADOS as readonly string[]).includes(t);

// Lo que la foto diaria publica de una celda: el tramo siempre y las cifras solo si se publica (K
// aportes de varios días y meses). Las cifras van redondeadas al 5 % de la mediana y a dos cifras.
export interface CeldaPublica {
  tramo: Tramo;
  // null = todavía no se publica.
  cifras: { p25: number; p50: number; p75: number } | null;
}

export interface OcupacionPublica extends CeldaPublica {
  porExperiencia: Partial<Record<Experiencia, CeldaPublica>>;
}

export interface AgregadosPais {
  mercado: string;
  moneda: string;
  // Meses que cubren las cifras (AAAA-MM), los del primer y el último aporte que entraron.
  desde: string | null;
  hasta: string | null;
  ocupaciones: Partial<Record<Ocupacion, OcupacionPublica>>;
}

// GET /api/sueldos/<mercado>. `ok: false` = la base no respondió: el módulo no se muestra.
export type RespuestaAgregados =
  | {
      ok: true;
      k: number;
      datos: AgregadosPais;
      // Página «Sueldos reales» del país, absoluta.
      pagina: string;
      // Trato de la edición que pregunta (?e=): el navegador no lo conoce.
      trato: Trato;
    }
  | { ok: false };

// POST /api/sueldos. Sin motivo en el rechazo: a quien manda basura no se le dice qué estuvo mal. Y sin
// celda en el éxito: el aporte entra en la foto del día siguiente, nunca en una respuesta.
export type RespuestaAporte = { ok: true } | { ok: false };
