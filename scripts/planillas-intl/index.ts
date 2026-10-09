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

// Las hojas que el catálogo promete en «incluye» para cada país. Si una calculadora deja de ser
// publicable (un dato vencido), el generador no pisa el archivo anterior con uno incompleto.
export const HOJAS_ESPERADAS: Readonly<Record<string, readonly string[]>> = {
  mx: ["Sueldo neto", "Aguinaldo", "Finiquito y liquidación"],
  co: ["Salario neto", "Prima y cesantías", "Liquidación"],
  pe: ["Sueldo neto", "Gratificación y CTS", "Liquidación"],
  cl: ["Sueldo líquido", "Gratificación", "Finiquito"],
  uy: ["Sueldo líquido", "Aguinaldo y vacacional", "Liquidación por egreso"],
  ec: ["Sueldo neto", "Décimos", "Liquidación"],
  cr: ["Salario neto", "Aguinaldo", "Liquidación"],
  gt: ["ISR de su salario", "Aguinaldo y Bono 14", "Indemnización"],
  py: ["Salario neto", "Aguinaldo", "Liquidación"],
  do: ["Salario neto", "Regalía pascual", "Prestaciones laborales"],
  sv: ["Retención de renta", "Aguinaldo y Quincena 25", "Indemnización y renuncia"],
  pa: ["Salario neto", "Décimo tercer mes", "Liquidación"],
  hn: ["ISR de su salario", "Décimo cuarto mes", "Prestaciones laborales"],
  ni: ["Salario neto", "Aguinaldo", "Liquidación"],
  ve: ["Utilidades y vacaciones", "Liquidación"],
  bo: ["Sueldo líquido", "Aguinaldo", "Finiquito"],
};

export interface PlanillaConstruida {
  planilla: PlanillaPais;
  libro: Libro;
  hoy: FechaISO;
  titulo: string;
  archivo: string;
  ruta: string;
  faltan: string[];
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
  const esperadas = HOJAS_ESPERADAS[planilla.mercado];
  if (!esperadas) throw new Error(`planilla ${planilla.mercado}: falta su lista en HOJAS_ESPERADAS`);
  const faltan = esperadas.filter((h) => !libro.hojas.some((x) => x.nombre === h));
  return { planilla, libro, hoy: fecha, titulo, archivo, ruta: path.join(process.cwd(), "private", "intl", planilla.mercado, archivo), faltan };
}

export async function escribirPlanilla(p: PlanillaConstruida): Promise<string> {
  if (p.faltan.length) throw new Error(`planilla ${p.planilla.mercado}: faltan hojas (${p.faltan.join(", ")}), no se escribe`);
  mkdirSync(path.dirname(p.ruta), { recursive: true });
  await p.libro.wb.xlsx.writeFile(p.ruta);
  return p.ruta;
}
