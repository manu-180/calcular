import type ExcelJS from "exceljs";
import type { Prefill } from "./tipos";
import { MESES_LARGOS, mesesEntre, ULTIMO_PERIODO } from "@/lib/inflacion";

// Layout de la planilla de alquileres. Lo leen tres lados: el generador
// (scripts/gen_planilla_alquileres.ts), el check (scripts/check_planilla_alquileres.ts) y este
// prefill. Vive acá y no en scripts/ porque el prefill corre en el servidor de Next y no puede
// importar desde scripts/.
export const PLANILLA_ALQ = {
  archivo: "planilla-alquileres-2026.xlsx",
  contratos: 6,
  // Filas de ajuste por contrato. Con duración máxima de 60 meses y ajuste mensual entran todas.
  kmax: 60,
  duracionMax: 60,
  filaCronograma0: 28,
  hojas: {
    inicio: "Cómo usarla",
    tablero: "Mis contratos",
    recibo: "Recibo",
    aviso: "Aviso de aumento",
    ipc: "IPC",
  },
  celdas: {
    propiedad: "B5",
    inquilino: "B6",
    propietario: "B7",
    mes: "B8",
    anio: "B9",
    duracion: "B10",
    alquiler: "B11",
    indice: "B12",
    cada: "B13",
    convencion: "B14",
  },
  opciones: {
    indiceIpc: "IPC (INDEC)",
    indiceOtro: "Otro índice (cargo el %)",
    convCompletos: "Los completos antes del ajuste",
    convPublicados: "Los últimos publicados",
  },
} as const;

export const hojaContrato = (n: number) => `Contrato ${n}`;

export type Datos = {
  alquilerInicial: number;
  /** "YYYY-MM": primer mes del contrato. */
  inicio: string;
  cadaMeses: number;
};

const RE_PERIODO = /^(\d{4})-(0[1-9]|1[0-2])$/;

function validar(raw: unknown): Datos | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;

  const monto = r.alquilerInicial;
  if (typeof monto !== "number" || !Number.isFinite(monto) || monto <= 0 || monto > 1e10) return null;

  const inicio = r.inicio;
  if (typeof inicio !== "string" || inicio.length !== 7) return null;
  const m = RE_PERIODO.exec(inicio);
  if (!m) return null;
  const anio = Number(m[1]);
  if (anio < 2017 || anio > 2040) return null;

  const cada = r.cadaMeses;
  if (typeof cada !== "number" || !Number.isInteger(cada) || cada < 1 || cada > 12) return null;

  // Un contrato que necesita más meses de los que entran en la planilla para llegar a hoy saldría
  // cortado (terminado antes de este mes): mejor la planilla en blanco que una cuenta trunca.
  if (duracionNecesaria(inicio) > PLANILLA_ALQ.duracionMax) return null;

  return { alquilerInicial: Math.round(monto * 100) / 100, inicio, cadaMeses: cada };
}

// La calculadora no pregunta la duración. Se elige una que cubra hasta hoy (redondeada a años),
// para que un contrato que la persona sigue cobrando no aparezca como terminado.
function duracionNecesaria(inicio: string): number {
  const transcurridos = mesesEntre(inicio, ULTIMO_PERIODO) + 2;
  return Math.max(24, Math.ceil(Math.max(transcurridos, 1) / 12) * 12);
}

export function duracionPara(inicio: string): number {
  return Math.min(PLANILLA_ALQ.duracionMax, duracionNecesaria(inicio));
}

// Pisa el texto de ejemplo del contrato 1 (gen_planilla_alquileres.ts). «Verdes» y «amarillas» son
// los rellenos S.output y S.input de gen_planilla_estilos.ts.
export const AVISO_CON_DATOS =
  "Este contrato viene con los datos que cargaste en la calculadora. Completá dirección, inquilino y tu nombre en las celdas amarillas; las verdes se calculan solas.";

function aplicar(wb: ExcelJS.Workbook, d: Datos): void {
  const ws = wb.getWorksheet(hojaContrato(1));
  if (!ws) return;
  const c = PLANILLA_ALQ.celdas;
  const [anio, mes] = d.inicio.split("-").map(Number);
  ws.getCell("A2").value = AVISO_CON_DATOS;
  // Los datos de ejemplo se borran: si quedaran, el aviso al inquilino saldría con un nombre inventado.
  ws.getCell(c.propiedad).value = null;
  ws.getCell(c.inquilino).value = null;
  ws.getCell(c.mes).value = MESES_LARGOS[mes - 1];
  ws.getCell(c.anio).value = anio;
  ws.getCell(c.duracion).value = duracionPara(d.inicio);
  ws.getCell(c.alquiler).value = d.alquilerInicial;
  ws.getCell(c.indice).value = PLANILLA_ALQ.opciones.indiceIpc;
  ws.getCell(c.cada).value = d.cadaMeses;
  ws.getCell(c.convencion).value = PLANILLA_ALQ.opciones.convCompletos;
}

export const prefill: Prefill<Datos> = { validar, aplicar };
