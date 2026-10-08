import { ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { antiguedad, diasDeVacaciones, salarioDiario, type Antiguedad } from "./nomina";

export const CAMPOS_TERMINACION = [
  { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
  {
    id: "periodo",
    tipo: "opcion",
    etiqueta: "Ese sueldo es",
    opciones: [
      { valor: "mensual", etiqueta: "Al mes" },
      { valor: "quincenal", etiqueta: "A la quincena" },
      { valor: "semanal", etiqueta: "A la semana" },
      { valor: "diario", etiqueta: "Al día" },
    ],
    porDefecto: "mensual",
  },
  { id: "ingreso", tipo: "fecha", etiqueta: "Fecha en que entraste a trabajar" },
  { id: "salida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
  { id: "diasPendientes", tipo: "entero", etiqueta: "Días trabajados que todavía no te pagan", min: 0, max: 31, porDefecto: 0 },
  { id: "vacacionesPendientes", tipo: "numero", etiqueta: "Días de vacaciones de años anteriores que no tomaste", min: 0, max: 200, porDefecto: 0 },
  { id: "diasAguinaldo", tipo: "entero", etiqueta: "Días de aguinaldo que da tu empresa", min: 1, requerido: false, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." },
  { id: "prima", tipo: "porcentaje", etiqueta: "Prima vacacional que da tu empresa", min: 0, max: 100, requerido: false, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." },
] as const;

export interface EntradaTerminacion {
  sueldo: number;
  periodo: string;
  ingreso: FechaISO;
  salida: FechaISO;
  region: string;
  diasPendientes: number;
  vacacionesPendientes: number;
  diasAguinaldo: number | null;
  prima: number | null;
}

export interface ValoresTerminacion {
  diasAguinaldo: number;
  primaVacacional: number;
  vacacionesPrimerAnio: number;
  diasPrimaAntiguedad: number;
  topePrimaAntiguedad: number;
  salarioMinimo: number;
}

export interface Finiquito {
  ant: Antiguedad;
  diario: number;
  salarios: number;
  aguinaldo: number;
  vacaciones: number;
  primaVacacional: number;
  baseAntiguedad: number;
  primaAntiguedad: number;
}

export function calcularFiniquito(e: EntradaTerminacion, v: ValoresTerminacion, pagaAntiguedad: (anios: number) => boolean, redondear: (n: number) => number): Finiquito {
  const diasAg = e.diasAguinaldo ?? v.diasAguinaldo;
  if (diasAg < v.diasAguinaldo) throw new ErrorEntrada(`La ley pide al menos ${v.diasAguinaldo} días de aguinaldo.`, "diasAguinaldo");
  const tasaPrima = e.prima ?? v.primaVacacional;
  if (tasaPrima < v.primaVacacional) throw new ErrorEntrada(`La prima vacacional no puede ser menor al ${v.primaVacacional} %.`, "prima");
  const ant = antiguedad(e.ingreso, e.salida);
  const diario = redondear(salarioDiario(e.sueldo, e.periodo));
  const salarios = redondear(diario * e.diasPendientes);
  const aguinaldo = redondear((diario * diasAg * Math.min(ant.diasEnElAnio, 365)) / 365);
  const diasVacProporcionales = (diasDeVacaciones(ant.aniosCompletos + 1, v.vacacionesPrimerAnio) * ant.diasDesdeAniversario) / 365;
  const vacaciones = redondear(diario * (diasVacProporcionales + e.vacacionesPendientes));
  const primaVacacional = redondear(porcentaje(vacaciones, tasaPrima));
  const baseAntiguedad = Math.min(Math.max(diario, v.salarioMinimo), v.topePrimaAntiguedad * v.salarioMinimo);
  const primaAntiguedad = pagaAntiguedad(ant.anios) ? redondear(baseAntiguedad * v.diasPrimaAntiguedad * ant.anios) : 0;
  return { ant, diario, salarios, aguinaldo, vacaciones, primaVacacional, baseAntiguedad, primaAntiguedad };
}
