import path from "node:path";
import { mkdirSync } from "node:fs";
import { registro } from "../../src/paises";
import { hoyEn } from "../../src/motor/vigencia";
import type { FechaISO } from "../../src/motor/tipos";
import { Libro, nombreArchivo, type PlanillaPais } from "./marco";
import { planillaBo } from "./bo";
import { planillaCl } from "./cl";
import { planillaCo } from "./co";
import { planillaCr } from "./cr";
import { planillaDo } from "./do";
import { planillaEc } from "./ec";
import { planillaGt } from "./gt";
import { planillaHn } from "./hn";
import { planillaMx } from "./mx";
import { planillaNi } from "./ni";
import { planillaPa } from "./pa";
import { planillaPe } from "./pe";
import { planillaPy } from "./py";
import { planillaSv } from "./sv";
import { planillaUy } from "./uy";
import { planillaVe } from "./ve";

export const PLANILLAS_INTL: readonly PlanillaPais[] = [planillaMx, planillaCo, planillaPe, planillaCl, planillaUy, planillaEc, planillaCr, planillaGt, planillaPy, planillaDo, planillaSv, planillaPa, planillaHn, planillaNi, planillaVe, planillaBo];

export interface PlanillaConstruida {
  planilla: PlanillaPais;
  libro: Libro;
  hoy: FechaISO;
  titulo: string;
  archivo: string;
  ruta: string;
}

export function construirPlanilla(planilla: PlanillaPais, hoy?: FechaISO): PlanillaConstruida | null {
  const pais = registro.pais(planilla.mercado);
  if (!pais) throw new Error(`planilla ${planilla.mercado}: el mercado no está en el registro`);
  if (!registro.mercados("produccion").some((m) => m.codigo === planilla.mercado)) return null;
  const fecha = hoy ?? hoyEn(pais.mercado);
  const anio = Number(fecha.slice(0, 4));
  const libro = new Libro(pais, fecha);
  planilla.construir(libro);
  if (libro.bloques.length === 0) return null;
  const titulo = planilla.titulo(anio);
  libro.finalizar(titulo, planilla.notas);
  const archivo = nombreArchivo(anio);
  return { planilla, libro, hoy: fecha, titulo, archivo, ruta: path.join(process.cwd(), "private", "intl", planilla.mercado, archivo) };
}

export async function escribirPlanilla(p: PlanillaConstruida): Promise<string> {
  mkdirSync(path.dirname(p.ruta), { recursive: true });
  await p.libro.wb.xlsx.writeFile(p.ruta);
  return p.ruta;
}
