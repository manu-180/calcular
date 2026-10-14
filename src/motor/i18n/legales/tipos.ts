import type { PaginaGlobal } from "../../paginas";
import type { Diccionario } from "../resolver";

export interface BloqueLegal {
  titulo?: string;
  parrafos: readonly string[];
}

export interface PaginaLegal {
  title: string;
  description: string;
  h1: string;
  bajada: string;
  bloques: readonly BloqueLegal[];
}

export type PaginasLegales = Readonly<Record<PaginaGlobal, PaginaLegal>>;

// actualizado llega ya formateado con el locale del mercado; mail se escribe tal cual para que la
// vista lo convierta en enlace.
export interface DatosLegales {
  actualizado: string;
  mail: string;
}

export type DiccionarioLegal = (d: DatosLegales) => Diccionario<PaginasLegales>;
