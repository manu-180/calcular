import { ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";

export interface StapkiPlata {
  pridonesi: Readonly<Record<string, number>>;
  prosechna: number;
  limiti: Readonly<Record<string, number>>;
  danok: number;
  oslobuduvanje: number;
}

export function vkupnaStapka(pridonesi: Readonly<Record<string, number>>): number {
  return ["pio", "zdravstvo", "dopolnitelen", "nevrabotenost"].reduce((s, k) => s + enMapa(pridonesi, k), 0);
}

export function najniskaOsnovica(s: Pick<StapkiPlata, "prosechna" | "limiti">): number {
  return porcentaje(s.prosechna, enMapa(s.limiti, "najniska"));
}

export function najvisokaOsnovica(s: Pick<StapkiPlata, "prosechna" | "limiti">, samovraboten = false): number {
  return s.prosechna * enMapa(s.limiti, samovraboten ? "najvisoka-samovraboten" : "najvisoka");
}

export interface PresmetkaPlata {
  osnovica: number;
  pridonesi: number;
  danochnaOsnovica: number;
  danok: number;
  neto: number;
  podNajniska: boolean;
  nadNajvisoka: boolean;
}

// УЈП, Начин на пресметка на бруто-плата: бруто минус придонеси минус лично ослободување, па 10 %.
// Над највисоката основица придонеси нема, но данок има (ЗПЗСО, член 16, став 6).
export function presmetajPlata(bruto: number, s: StapkiPlata): PresmetkaPlata {
  const najniska = najniskaOsnovica(s);
  const najvisoka = najvisokaOsnovica(s);
  const osnovica = Math.min(Math.max(bruto, najniska), najvisoka);
  const pridonesi = porcentaje(osnovica, vkupnaStapka(s.pridonesi));
  const danochnaOsnovica = Math.max(0, bruto - pridonesi - s.oslobuduvanje);
  const danok = porcentaje(danochnaOsnovica, s.danok);
  return { osnovica, pridonesi, danochnaOsnovica, danok, neto: bruto - pridonesi - danok, podNajniska: bruto < najniska, nadNajvisoka: bruto > najvisoka };
}

// Нето-платата расте со бруто-платата, затоа обратната пресметка оди со преполовување на интервалот.
export function brutoOdNeto(neto: number, s: StapkiPlata): number {
  let dolu = 0;
  let gore = Math.max(neto * 4, s.prosechna * 40);
  for (let i = 0; i < 80; i++) {
    const sredina = (dolu + gore) / 2;
    if (presmetajPlata(sredina, s).neto < neto) dolu = sredina;
    else gore = sredina;
  }
  return gore;
}

function dvocifren(n: number): string {
  return String(n).padStart(2, "0");
}

function denoviVoMesec(godina: number, mesec: number): number {
  if (mesec === 2) return (godina % 4 === 0 && godina % 100 !== 0) || godina % 400 === 0 ? 29 : 28;
  return [4, 6, 9, 11].includes(mesec) ? 30 : 31;
}

// Истиот датум за n месеци: рокот што почнува на 16 јануари со еден месец завршува на 15 февруари.
export function dodajMeseci(fecha: FechaISO, meseci: number): FechaISO {
  const g = Number(fecha.slice(0, 4));
  const m = Number(fecha.slice(5, 7)) - 1 + meseci;
  const godina = g + Math.floor(m / 12);
  const mesec = (m % 12) + 1;
  const den = Math.min(Number(fecha.slice(8, 10)), denoviVoMesec(godina, mesec));
  return `${godina}-${dvocifren(mesec)}-${dvocifren(den)}` as FechaISO;
}

export function proveriStapka(stapka: number | null, min: number, max: number, pole: string): void {
  if (stapka !== null && (stapka < min || stapka > max)) {
    throw new ErrorEntrada(`Законот дозволува стапка од ${String(min).replace(".", ",")} % до ${String(max).replace(".", ",")} %.`, pole);
  }
}
