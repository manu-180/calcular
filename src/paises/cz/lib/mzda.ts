// Pojistné, zálohy na daň i dávky se v Česku zaokrouhlují nahoru (zákon č. 589/1992 Sb., § 7;
// zákon č. 592/1992 Sb., § 2; zákon o daních z příjmů, § 38h). Odečtení 1e-9 brání tomu, aby se
// číslo jako 3195,0000000004 z binární aritmetiky zaokrouhlilo o korunu výš.
export function nahoru(x: number): number {
  return Math.ceil(x - 1e-9);
}

export function nahoruNaStovky(x: number): number {
  return Math.ceil(x / 100 - 1e-9) * 100;
}

export function doluNaStovky(x: number): number {
  return Math.floor(x / 100 + 1e-9) * 100;
}

export function nahoruNaHalere(x: number): number {
  return Math.ceil(x * 100 - 1e-7) / 100;
}

export function nahoruNaDesetihalere(x: number): number {
  return Math.ceil(x * 10 - 1e-7) / 10;
}

export function nahoruNaDesetikoruny(x: number): number {
  return Math.ceil(x / 10 - 1e-9) * 10;
}

// Zdravotní pojistné zaměstnance: 13,5 % z vyměřovacího základu zaokrouhlených nahoru; zaměstnanec
// hradí třetinu, zaměstnavatel zbytek (zákon č. 48/1997 Sb., § 9 odst. 2).
export function zdravotniZamestnance(zaklad: number, sazba: number): { celkem: number; zamestnanec: number; zamestnavatel: number } {
  const celkem = nahoru((zaklad * sazba) / 100);
  const zamestnanec = nahoru(celkem / 3);
  return { celkem, zamestnanec, zamestnavatel: celkem - zamestnanec };
}

// Záloha na daň ze závislé činnosti (§ 38h): základ do 100 Kč na koruny, nad 100 Kč na stokoruny
// nahoru; 15 % do trojnásobku průměrné mzdy a 23 % z části nad ním, výsledek nahoru na koruny.
export function zalohaNaDan(prijem: number, prumernaMzda: number, sazby: { nizsi: number; vyssi: number }): { zaklad: number; zaloha: number } {
  if (prijem <= 0) return { zaklad: 0, zaloha: 0 };
  const zaklad = prijem <= 100 ? nahoru(prijem) : nahoruNaStovky(prijem);
  const hranice = 3 * prumernaMzda;
  const zaloha = nahoru((Math.min(zaklad, hranice) * sazby.nizsi) / 100 + (Math.max(0, zaklad - hranice) * sazby.vyssi) / 100);
  return { zaklad, zaloha };
}

// Měsíční daňové zvýhodnění na děti podle pořadí: první, druhé, třetí a každé další.
export function zvyhodneniMesicne(deti: number, rocne: { prvni: number; druhe: number; treti: number }): number {
  if (deti <= 0) return 0;
  const castky = [rocne.prvni, rocne.druhe];
  let suma = 0;
  for (let i = 0; i < deti; i++) suma += (castky[i] ?? rocne.treti) / 12;
  return suma;
}

export interface Mzda {
  socialni: number;
  zdravotni: number;
  zdravotniZamestnavatel: number;
  socialniZamestnavatel: number;
  zakladZalohy: number;
  zalohaPredSlevou: number;
  slevaPoplatnik: number;
  slevaDeti: number;
  bonus: number;
  dan: number;
  cista: number;
}

export interface ParametryMzdy {
  socialniZamestnanec: number;
  socialniZamestnavatel: number;
  zdravotniSazba: number;
  prumernaMzda: number;
  sazbyDane: { nizsi: number; vyssi: number };
  slevaRocne: number;
  zvyhodneni: { prvni: number; druhe: number; treti: number };
  minimalniMzda: number;
  bonusMinimum: number;
}

// Čistá mzda za jeden měsíc u zaměstnance v pracovním poměru (bez ročního stropu sociálního pojištění).
export function cistaMzda(hruba: number, prohlaseni: boolean, deti: number, p: ParametryMzdy): Mzda {
  const socialni = nahoru((hruba * p.socialniZamestnanec) / 100);
  const socialniZamestnavatel = nahoru((hruba * p.socialniZamestnavatel) / 100);
  const zdr = zdravotniZamestnance(hruba, p.zdravotniSazba);
  const { zaklad, zaloha } = zalohaNaDan(hruba, p.prumernaMzda, p.sazbyDane);
  let slevaPoplatnik = 0;
  let slevaDeti = 0;
  let bonus = 0;
  if (prohlaseni) {
    slevaPoplatnik = Math.min(zaloha, p.slevaRocne / 12);
    const zbyva = zaloha - slevaPoplatnik;
    const zvyhodneni = zvyhodneniMesicne(deti, p.zvyhodneni);
    slevaDeti = Math.min(zbyva, zvyhodneni);
    const naBonus = zvyhodneni - slevaDeti;
    const polovinaMinimalni = Math.floor(p.minimalniMzda / 2);
    if (naBonus >= p.bonusMinimum && hruba >= polovinaMinimalni) bonus = naBonus;
  }
  const dan = zaloha - slevaPoplatnik - slevaDeti;
  return {
    socialni,
    zdravotni: zdr.zamestnanec,
    zdravotniZamestnavatel: zdr.zamestnavatel,
    socialniZamestnavatel,
    zakladZalohy: zaklad,
    zalohaPredSlevou: zaloha,
    slevaPoplatnik,
    slevaDeti,
    bonus,
    dan,
    cista: hruba - socialni - zdr.zamestnanec - dan + bonus,
  };
}
