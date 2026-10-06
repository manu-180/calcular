import type { Prefill } from "./tipos";
import { booleano, escribir, numero, objeto, opcion } from "./_campos";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  ZONAS_UOCRA,
  type CategoriaUocraId,
  type ZonaUocraId,
} from "@/data/convenios/uocra";

export type Datos = {
  mesId: string;
  categoriaId: CategoriaUocraId;
  zonaId: ZonaUocraId;
  /** Horas del mes. El sereno cobra mensual y la planilla las ignora, pero la celda las exige igual. */
  horas: number;
  asistencia: boolean;
  aporteSolidario: boolean;
};

// Espejo de CELDAS_UOCRA en scripts/gen_planilla_uocra.ts (ver el porqué en ./comercio.ts).
export const HOJA = "Liquidador";
export const CELDAS = {
  categoria: "B5",
  zona: "B6",
  mes: "B7",
  horas: "B8",
  asistencia: "B9",
  solidario: "B10",
  bruto: "B19",
  neto: "B21",
} as const;
// Rango de la validación de la celda de horas en la planilla.
export const HORAS_MIN = 1;
export const HORAS_MAX = 300;

const MESES = MESES_UOCRA.map((m) => m.id);
const CATEGORIAS = CATEGORIAS_UOCRA.map((c) => c.id);
const ZONAS = ZONAS_UOCRA.map((z) => z.id);

export const prefill: Prefill<Datos> = {
  validar(raw) {
    const o = objeto(raw);
    if (!o) return null;
    const mesId = opcion(o, "mesId", MESES);
    const categoriaId = opcion(o, "categoriaId", CATEGORIAS);
    const zonaId = opcion(o, "zonaId", ZONAS);
    const horas = numero(o, "horas", HORAS_MIN, HORAS_MAX);
    const asistencia = booleano(o, "asistencia");
    const aporteSolidario = booleano(o, "aporteSolidario");
    if (
      mesId === null ||
      categoriaId === null ||
      zonaId === null ||
      horas === null ||
      asistencia === null ||
      aporteSolidario === null
    )
      return null;
    return { mesId, categoriaId, zonaId, horas, asistencia, aporteSolidario };
  },
  aplicar(wb, d) {
    escribir(wb, HOJA, {
      [CELDAS.categoria]: CATEGORIAS_UOCRA.find((c) => c.id === d.categoriaId)!.nombre,
      [CELDAS.zona]: ZONAS_UOCRA.find((z) => z.id === d.zonaId)!.nombre,
      [CELDAS.mes]: MESES_UOCRA.find((m) => m.id === d.mesId)!.etiqueta,
      [CELDAS.horas]: d.horas,
      [CELDAS.asistencia]: d.asistencia ? "Sí" : "No",
      [CELDAS.solidario]: d.aporteSolidario ? "Sí" : "No",
    });
  },
};
