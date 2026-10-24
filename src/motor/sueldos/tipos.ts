import type { Trato } from "../tipos";
import type { Experiencia, Ocupacion } from "./catalogo";

// Lo que la base publica de una celda: siempre la cuenta de aportes (para decir «somos 6 de 10») y las
// cifras solo con K o más. La cuenta no dice cuánto gana nadie; las cifras salen de 10 personas o más.
export interface CeldaPublica {
  // Aportes de la ventana (con atípicos incluidos): lo que falta para llegar a K.
  total: number;
  // null = todavía no se publica.
  cifras: { n: number; p25: number; p50: number; p75: number } | null;
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

// POST /api/sueldos. Sin motivo en el rechazo: a quien manda basura no se le dice qué estuvo mal.
export type RespuestaAporte = { ok: true; celda: OcupacionPublica | null } | { ok: false };
