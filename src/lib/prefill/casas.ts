import type { Prefill } from "./tipos";
import { booleano, escribir, numero, objeto, opcion } from "./_campos";
import { ESCALAS_POR_MES, JORNADA, escalaDe } from "@/data/casas-particulares";
import type { Modalidad } from "@/lib/casas-particulares";

export type Datos = {
  /** Mes de la escala (`2026-10`): la calculadora liquida el vigente y la planilla sale en ese mismo mes. */
  mesId: string;
  categoriaId: string;
  modalidad: Modalidad;
  horasSemanales: number;
  zonaDesfavorable: boolean;
  extrasComunes: number;
  extrasFinDeSemana: number;
};

// Espejo de CELDAS y MODALIDADES de scripts/gen_planilla_casas.ts (ver el porqué en ./comercio.ts).
// La condición de la trabajadora para ARCA no se escribe: la calculadora no la pregunta y la
// planilla ya trae «Mayor de 18 años», que es lo que asume la calculadora de aportes.
export const HOJA = "Liquidador";
export const CELDAS = {
  mes: "B5",
  categoria: "B6",
  modalidad: "B7",
  horasSemanales: "B8",
  zona: "B9",
  extrasComunes: "B10",
  extrasFinde: "B11",
  total: "B22",
  arcaTotal: "B27",
  costoTotal: "B31",
} as const;
export const MODALIDAD_EN_PLANILLA: Record<Modalidad, string> = {
  "con-retiro": "Con retiro",
  "sin-retiro": "Sin retiro",
};
// Rango de la validación de las celdas de horas extras en la planilla.
export const EXTRAS_MAX = 200;

const MESES = ESCALAS_POR_MES.map((m) => m.id);
const CATEGORIAS = escalaDe(ESCALAS_POR_MES[0].id).map((c) => c.id);
const MODALIDADES = ["con-retiro", "sin-retiro"] as const;

export const prefill: Prefill<Datos> = {
  validar(raw) {
    const o = objeto(raw);
    if (!o) return null;
    const mesId = opcion(o, "mesId", MESES);
    const categoriaId = opcion(o, "categoriaId", CATEGORIAS);
    const modalidad = opcion(o, "modalidad", MODALIDADES);
    const horasSemanales = numero(o, "horasSemanales", 0, JORNADA.horasSemanales);
    const zonaDesfavorable = booleano(o, "zonaDesfavorable");
    const extrasComunes = numero(o, "extrasComunes", 0, EXTRAS_MAX);
    const extrasFinDeSemana = numero(o, "extrasFinDeSemana", 0, EXTRAS_MAX);
    if (
      mesId === null ||
      categoriaId === null ||
      modalidad === null ||
      horasSemanales === null ||
      zonaDesfavorable === null ||
      extrasComunes === null ||
      extrasFinDeSemana === null
    )
      return null;
    // Caseros con retiro no existe en la escala oficial: la planilla daría cero con un aviso.
    const fila = escalaDe(mesId).find((c) => c.id === categoriaId)!;
    if ((modalidad === "con-retiro" ? fila.horaConRetiro : fila.horaSinRetiro) === null) return null;
    return { mesId, categoriaId, modalidad, horasSemanales, zonaDesfavorable, extrasComunes, extrasFinDeSemana };
  },
  aplicar(wb, d) {
    escribir(wb, HOJA, {
      [CELDAS.mes]: ESCALAS_POR_MES.find((m) => m.id === d.mesId)!.etiqueta,
      [CELDAS.categoria]: escalaDe(d.mesId).find((c) => c.id === d.categoriaId)!.nombre,
      [CELDAS.modalidad]: MODALIDAD_EN_PLANILLA[d.modalidad],
      [CELDAS.horasSemanales]: d.horasSemanales,
      [CELDAS.zona]: d.zonaDesfavorable ? "Sí" : "No",
      [CELDAS.extrasComunes]: d.extrasComunes,
      [CELDAS.extrasFinde]: d.extrasFinDeSemana,
    });
  },
};
