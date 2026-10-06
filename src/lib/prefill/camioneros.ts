import type { Prefill } from "./tipos";
import { escribir, numero, objeto, opcion } from "./_campos";
import {
  CATEGORIAS_CAMIONEROS,
  MESES_CAMIONEROS,
  type CategoriaCamionerosId,
} from "@/data/convenios/camioneros";

export type Datos = {
  mesId: string;
  categoriaId: CategoriaCamionerosId;
  /** Años cumplidos, 0 a 60: el mismo tope que la calculadora y que la validación de la celda. */
  anios: number;
};

// Espejo de CELDAS_CAMIONEROS en scripts/gen_planilla_camioneros.ts: no se importa de ahí porque este
// módulo entra al bundle del sitio. scripts/check_planilla_camioneros.ts compara las dos copias.
export const HOJA = "Liquidador";
export const CELDAS = {
  categoria: "B5",
  mes: "B6",
  antiguedad: "B7",
  zona: "B8",
  bruto: "B23",
  neto: "B27",
  aCobrar: "B29",
} as const;
// La hoja Nómina arranca con la persona de la calculadora en su primera fila.
export const HOJA_NOMINA = "Nómina";
export const NOMINA_PRIMERA = { categoria: "B6", antiguedad: "C6" } as const;
export const ANIOS_MAX = 60;

const MESES = MESES_CAMIONEROS.map((m) => m.id);
const CATEGORIAS = CATEGORIAS_CAMIONEROS.map((c) => c.id);

export const prefill: Prefill<Datos> = {
  validar(raw) {
    const o = objeto(raw);
    if (!o) return null;
    const mesId = opcion(o, "mesId", MESES);
    const categoriaId = opcion(o, "categoriaId", CATEGORIAS);
    const anios = numero(o, "anios", 0, ANIOS_MAX, { entero: true });
    if (mesId === null || categoriaId === null || anios === null) return null;
    return { mesId, categoriaId, anios };
  },
  aplicar(wb, d) {
    escribir(wb, HOJA, {
      [CELDAS.categoria]: CATEGORIAS_CAMIONEROS.find((c) => c.id === d.categoriaId)!.nombre,
      [CELDAS.mes]: MESES_CAMIONEROS.find((m) => m.id === d.mesId)!.etiqueta,
      [CELDAS.antiguedad]: d.anios,
    });
    escribir(wb, HOJA_NOMINA, {
      [NOMINA_PRIMERA.categoria]: CATEGORIAS_CAMIONEROS.find((c) => c.id === d.categoriaId)!.nombre,
      [NOMINA_PRIMERA.antiguedad]: d.anios,
    });
  },
};
