import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

// 2026-01-04 fue domingo: sirve de ancla para saber el día de la semana sin usar Date en calcular().
const DOMINGO_ANCLA: FechaISO = "2026-01-04";

export function diaDeSemana(fecha: FechaISO): number {
  return ((diasEntre(DOMINGO_ANCLA, fecha) % 7) + 7) % 7;
}

function diasDelMes(anio: number, mes: number): number {
  return [31, anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
}

export function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const dia = Math.min(d, diasDelMes(anio, mes));
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

export interface Antiguedad {
  anios: number;
  meses: number;
  dias: number;
  ultimaAnualidad: FechaISO;
}

// Meses y días como los cuenta la DT: del 15/3 al 17/11 son 8 meses y 2 días.
export function antiguedad(inicio: FechaISO, termino: FechaISO): Antiguedad {
  let anios = 0;
  while (sumarMeses(inicio, (anios + 1) * 12) <= termino) anios++;
  const ultimaAnualidad = sumarMeses(inicio, anios * 12);
  let meses = 0;
  while (meses < 12 && sumarMeses(ultimaAnualidad, meses + 1) <= termino) meses++;
  const dias = diasEntre(sumarMeses(ultimaAnualidad, meses), termino);
  return { anios, meses, dias, ultimaAnualidad };
}

export function fechaChilena(fecha: FechaISO): string {
  const [a, m, d] = fecha.split("-");
  return `${d}-${m}-${a}`;
}

export interface FeriadoEnCalendario {
  inhabiles: number;
  hasta: FechaISO;
}

// Los días hábiles de feriado se cuentan desde el día siguiente al término y se suman los sábados y
// domingos que caen en medio (art. 69: el sábado es siempre inhábil). Los festivos no se conocen acá.
// El tope evita que un valor absurdo (o Infinity, que pasa el min del campo) cuelgue el navegador
// con el while: 365 pendientes más el proporcional quedan muy por debajo.
const MAX_HABILES = 1000;

export function feriadoEnCalendario(termino: FechaISO, habiles: number): FeriadoEnCalendario {
  if (!Number.isFinite(habiles) || habiles < 0 || habiles > MAX_HABILES) throw new RangeError(`feriadoEnCalendario: ${habiles} días hábiles fuera de rango`);
  let restantes = habiles;
  let inhabiles = 0;
  let dia = termino;
  while (restantes > 1e-9) {
    dia = sumarDias(dia, 1);
    const dow = diaDeSemana(dia);
    if (dow === 0 || dow === 6) inhabiles++;
    else restantes -= 1;
  }
  return { inhabiles, hasta: dia };
}
