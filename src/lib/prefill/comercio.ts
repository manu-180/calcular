import type { Prefill } from "./tipos";
import { booleano, escribir, numero, objeto, opcion } from "./_campos";
import {
  CATEGORIAS_COMERCIO,
  JORNADAS_COMERCIO,
  MESES_COMERCIO,
  type CategoriaComercioId,
  type JornadaComercioId,
} from "@/data/convenios/comercio";

export type Datos = {
  mesId: string;
  categoriaId: CategoriaComercioId;
  /** Años cumplidos. El tope es el de la validación de la celda en la planilla (0 a 50). */
  anios: number;
  jornadaId: JornadaComercioId;
  presentismo: boolean;
};

// Espejo de scripts/gen_planilla_comercio.ts (CELDAS_COMERCIO / JORNADAS_PLANILLA_COMERCIO):
// no se importa de ahí porque este módulo entra al bundle del sitio. check_prefill_planillas.ts
// compara las dos copias y además que cada valor escrito sea una opción de su desplegable.
export const HOJA = "Liquidación";
export const CELDAS = {
  categoria: "B5",
  mes: "B6",
  antiguedad: "B7",
  jornada: "B8",
  presentismo: "B9",
  bruto: "B17",
  neto: "B19",
} as const;
export const JORNADA_EN_PLANILLA: Record<JornadaComercioId, string> = {
  "8": "Jornada completa (8hs)",
  "6": "Jornada de 6hs (¾)",
  "4": "Media jornada (4hs)",
};
export const ANIOS_MAX = 50;

const MESES = MESES_COMERCIO.map((m) => m.id);
const CATEGORIAS = CATEGORIAS_COMERCIO.map((c) => c.id);
const JORNADAS = JORNADAS_COMERCIO.map((j) => j.id);

export const prefill: Prefill<Datos> = {
  validar(raw) {
    const o = objeto(raw);
    if (!o) return null;
    const mesId = opcion(o, "mesId", MESES);
    const categoriaId = opcion(o, "categoriaId", CATEGORIAS);
    const anios = numero(o, "anios", 0, ANIOS_MAX, { entero: true });
    const jornadaId = opcion(o, "jornadaId", JORNADAS);
    const presentismo = booleano(o, "presentismo");
    if (mesId === null || categoriaId === null || anios === null || jornadaId === null || presentismo === null)
      return null;
    return { mesId, categoriaId, anios, jornadaId, presentismo };
  },
  aplicar(wb, d) {
    escribir(wb, HOJA, {
      [CELDAS.categoria]: CATEGORIAS_COMERCIO.find((c) => c.id === d.categoriaId)!.nombre,
      [CELDAS.mes]: MESES_COMERCIO.find((m) => m.id === d.mesId)!.etiqueta,
      [CELDAS.antiguedad]: d.anios,
      [CELDAS.jornada]: JORNADA_EN_PLANILLA[d.jornadaId],
      [CELDAS.presentismo]: d.presentismo ? "Sí" : "No",
    });
  },
};
