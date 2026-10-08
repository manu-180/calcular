import path from "node:path";
import { mkdirSync } from "node:fs";
import { registro } from "../../src/paises";
import { hoyEn } from "../../src/motor/vigencia";
import type { FechaISO } from "../../src/motor/tipos";
import { Libro, nombreArchivo, type PlanillaPais } from "./marco";
import { planillaCl } from "./cl";
import { planillaCo } from "./co";
import { planillaMx } from "./mx";
import { planillaPe } from "./pe";
import { planillaUy } from "./uy";

export const PLANILLAS_INTL: readonly PlanillaPais[] = [planillaMx, planillaCo, planillaPe, planillaCl, planillaUy];

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
