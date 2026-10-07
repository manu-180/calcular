import { aplicarEscala, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, FilaEscala } from "@/motor/tipos";

export type Periodo = "diario" | "semanal" | "decenal" | "quincenal" | "mensual";

export const OPCIONES_PERIODO = [
  { valor: "mensual", etiqueta: "Al mes" },
  { valor: "quincenal", etiqueta: "A la quincena" },
  { valor: "semanal", etiqueta: "A la semana" },
  { valor: "diario", etiqueta: "Al día" },
] as const;

export const OPCIONES_PERIODO_NOMINA = [
  { valor: "quincenal", etiqueta: "Quincenal (15 días)" },
  { valor: "mensual", etiqueta: "Mensual" },
  { valor: "semanal", etiqueta: "Semanal (7 días)" },
  { valor: "decenal", etiqueta: "Decenal (10 días)" },
] as const;

// LFT art. 89 y LSS art. 29: el sueldo semanal se divide entre 7, el mensual entre 30.
const DIVISOR: Record<Periodo, number> = { diario: 1, semanal: 7, decenal: 10, quincenal: 15, mensual: 30 };

// Días con que se calcula el subsidio y las cuotas de cada periodo. El mes es de 30.4 días porque así
// lo fija el decreto del subsidio para el empleo (y la UMA mensual = UMA diaria × 30.4).
export const DIAS_PERIODO: Record<Exclude<Periodo, "diario">, number> = { semanal: 7, decenal: 10, quincenal: 15, mensual: 30.4 };

export function salarioDiario(sueldo: number, periodo: string): number {
  if (!(periodo in DIVISOR)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
  return sueldo / DIVISOR[periodo as Periodo];
}

// LFT art. 76 (reforma DOF 27/12/2022): 12 días el primer año, dos más por año hasta llegar a 20 en el
// quinto, y desde el sexto dos días más por cada cinco años de servicio.
export function diasDeVacaciones(anios: number, primerAnio: number): number {
  if (anios < 1) return 0;
  if (anios <= 5) return primerAnio + 2 * (anios - 1);
  return primerAnio + 8 + 2 * Math.ceil((anios - 5) / 5);
}

export interface Retencion {
  isr: number;
  subsidio: number;
  retener: number;
}

export function retencionIsr(
  base: number,
  tarifa: readonly FilaEscala[],
  subsidioPeriodo: number,
  ingresoMensual: number,
  limiteSubsidio: number,
  redondear: (n: number) => number,
): Retencion {
  const isr = redondear(aplicarEscala(tarifa, base));
  const subsidio = ingresoMensual <= limiteSubsidio ? Math.min(redondear(subsidioPeriodo), isr) : 0;
  return { isr, subsidio, retener: redondear(isr - subsidio) };
}

// Días desde 1970-01-01 sin usar Date (algoritmo de días civiles de Howard Hinnant): calcular() tiene
// que ser pura.
export function diaJuliano(fecha: FechaISO): number {
  const [a, m, d] = fecha.split("-").map(Number);
  const y = m <= 2 ? a - 1 : a;
  const era = Math.floor(y / 400);
  const yoe = y - era * 400;
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

export interface Antiguedad {
  dias: number;
  aniosCompletos: number;
  diasDesdeAniversario: number;
  anios: number;
  diasEnElAnio: number;
}

// Antigüedad entre el ingreso y la salida, contando los dos días. Los años completos se cuentan por
// aniversario (no por 365 días) para que un año bisiesto no adelante ni atrase el aniversario.
export function antiguedad(ingreso: FechaISO, salida: FechaISO): Antiguedad {
  const di = diaJuliano(ingreso);
  const ds = diaJuliano(salida);
  if (ds < di) throw new ErrorEntrada("La fecha de salida no puede ser anterior a la de ingreso.", "salida");
  const [ai, mi, dd] = ingreso.split("-").map(Number);
  const [as] = salida.split("-").map(Number);
  let aniosCompletos = as - ai;
  const aniversario = (n: number): number => {
    const anio = ai + n;
    const bisiesto = (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
    const dia = mi === 2 && dd === 29 && !bisiesto ? 28 : dd;
    return diaJuliano(`${anio}-${String(mi).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO);
  };
  while (aniosCompletos > 0 && aniversario(aniosCompletos) > ds + 1) aniosCompletos--;
  const dias = ds - di + 1;
  const diasDesdeAniversario = ds + 1 - aniversario(aniosCompletos);
  const inicioAnio = diaJuliano(`${as}-01-01` as FechaISO);
  const diasEnElAnio = ds - Math.max(di, inicioAnio) + 1;
  return { dias, aniosCompletos, diasDesdeAniversario, anios: aniosCompletos + diasDesdeAniversario / 365, diasEnElAnio };
}
