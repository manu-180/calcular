import { ErrorEntrada } from "@/motor/calculo";
import type { Campo } from "@/motor/tipos";

export const CAMPOS_SP_LSP = [
  {
    id: "pago",
    tipo: "opcion",
    etiqueta: "How you're paid",
    opciones: [
      { valor: "monthly", etiqueta: "Monthly" },
      { valor: "daily", etiqueta: "Daily or by piece" },
    ],
    porDefecto: "monthly",
  },
  {
    id: "salarioFinal",
    tipo: "moneda",
    etiqueta: "Last full month's wages (or one day's wages if paid daily)",
    ayuda: "You can use the average monthly wages of the last 12 months instead if that's higher.",
    min: 0,
    porDefecto: 18000,
  },
  { id: "aniosDespues", tipo: "numero", etiqueta: "Years of service from 1 May 2025", min: 0, max: 60, porDefecto: 1.5 },
  { id: "aniosAntes", tipo: "numero", etiqueta: "Years of service before 1 May 2025", ayuda: "0 if you started on or after 1 May 2025.", min: 0, max: 60, porDefecto: 3 },
  {
    id: "salarioTransicion",
    tipo: "moneda",
    etiqueta: "Last full month's wages before 1 May 2025 (or one day's wages if paid daily)",
    min: 0,
    porDefecto: 15000,
  },
  {
    id: "mpfEmpleador",
    tipo: "moneda",
    etiqueta: "Accrued benefits from your employer's MPF mandatory contributions",
    ayuda: "They can only offset the part for service before 1 May 2025.",
    min: 0,
    porDefecto: 0,
  },
  {
    id: "otrosCompensables",
    tipo: "moneda",
    etiqueta: "Employer's MPF voluntary contributions and gratuities based on length of service",
    min: 0,
    porDefecto: 0,
  },
] as const satisfies readonly Campo[];

export interface EntradaSpLsp {
  pago: "monthly" | "daily";
  salarioFinal: number;
  aniosDespues: number;
  aniosAntes: number;
  salarioTransicion: number;
  mpfEmpleador: number;
  otrosCompensables: number;
}

export interface TopesSpLsp {
  salarioTope: number;
  maximo: number;
}

export interface ResultadoSpLsp {
  anios: number;
  antes: number;
  despues: number;
  bruto: number;
  compensado: number;
  aPagar: number;
  mpfRetenido: number;
  topado: boolean;
}

// Employment Ordinance: 2/3 del último salario mensual (o 18 días de salario si cobra por día), con
// tope de 2/3 de $22.500 por año; el monto se parte en dos tramos por la abolición del offsetting del
// 1/5/2025 y el exceso sobre el máximo total se descuenta del tramo posterior.
export function pagoSpLsp(e: EntradaSpLsp, t: TopesSpLsp, redondear: (n: number) => number): ResultadoSpLsp {
  if (e.salarioFinal <= 0) throw new ErrorEntrada("Enter your wages.", "salarioFinal");
  if (e.aniosAntes > 0 && e.salarioTransicion <= 0) throw new ErrorEntrada("Enter your wages before 1 May 2025.", "salarioTransicion");
  const tope = (t.salarioTope * 2) / 3;
  const porAnio = (salario: number) => Math.min(e.pago === "daily" ? salario * 18 : (salario * 2) / 3, tope);
  const antes = redondear(porAnio(e.salarioTransicion) * e.aniosAntes);
  let despues = redondear(porAnio(e.salarioFinal) * e.aniosDespues);
  const topado = antes + despues > t.maximo;
  if (topado) despues = Math.max(0, redondear(t.maximo - antes));
  const antesFinal = Math.min(antes, t.maximo);
  const conMpf = Math.min(antesFinal, e.mpfEmpleador);
  const otrosAntes = Math.min(antesFinal - conMpf, e.otrosCompensables);
  const otrosDespues = Math.min(despues, e.otrosCompensables - otrosAntes);
  const compensado = redondear(conMpf + otrosAntes + otrosDespues);
  const bruto = redondear(antesFinal + despues);
  return {
    anios: e.aniosAntes + e.aniosDespues,
    antes: antesFinal,
    despues,
    bruto,
    compensado,
    aPagar: redondear(bruto - compensado),
    mpfRetenido: redondear(e.mpfEmpleador - conMpf),
    topado,
  };
}
