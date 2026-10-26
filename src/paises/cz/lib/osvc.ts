import type { FilaEscala } from "@/motor/tipos";
import { doluNaStovky, nahoru } from "./mzda";

export type Cinnost = "hlavni" | "vedlejsi";

export interface ParametryOsvc {
  sazbaVydaju: number;
  limitVydaju: number;
  dan: readonly FilaEscala[];
  slevaPoplatnik: number;
  zvyhodneni: { prvni: number; druhe: number; treti: number };
  minimalniMzda: number;
  socialniSazba: number;
  zdravotniSazba: number;
  podilSocialni: number;
  podilZdravotni: number;
  minVzSocialniMesic: number;
  minVzZdravotniMesic: number;
  rozhodnaCastka: number;
  maxVz: number;
}

export interface RokOsvc {
  vydaje: number;
  zakladDane: number;
  danPredSlevou: number;
  slevaPoplatnik: number;
  slevaDeti: number;
  bonus: number;
  dan: number;
  vzSocialni: number;
  socialni: number;
  vzZdravotni: number;
  zdravotni: number;
  celkem: number;
  pojistenaVedlejsi: boolean;
}

function zvyhodneniRocne(deti: number, z: { prvni: number; druhe: number; treti: number }): number {
  let suma = 0;
  for (let i = 0; i < deti; i++) suma += i === 0 ? z.prvni : i === 1 ? z.druhe : z.treti;
  return suma;
}

// Daň z příjmů za rok (§ 16): základ zaokrouhlený na stokoruny dolů, 15 % do hranice z první řádky
// stupnice a 23 % nad ní; daň se zaokrouhluje na koruny nahoru (daňový řád, § 146).
export function danZPrijmu(zaklad: number, stupnice: readonly FilaEscala[]): number {
  const z = doluNaStovky(Math.max(0, zaklad));
  const hranice = stupnice[0].hasta ?? Number.POSITIVE_INFINITY;
  return nahoru((Math.min(z, hranice) * stupnice[0].tasa) / 100 + (Math.max(0, z - hranice) * stupnice[stupnice.length - 1].tasa) / 100);
}

// Celý rok OSVČ s výdaji procentem z příjmů: daň, sleva na poplatníka, zvýhodnění na děti a pojistné
// z přehledů pro ČSSZ a zdravotní pojišťovnu.
export function rokOsvc(prijmy: number, cinnost: Cinnost, mesice: number, deti: number, p: ParametryOsvc): RokOsvc {
  const vydaje = Math.min((prijmy * p.sazbaVydaju) / 100, p.limitVydaju);
  const zakladDane = Math.max(0, prijmy - vydaje);
  const danPredSlevou = danZPrijmu(zakladDane, p.dan);
  const slevaPoplatnik = Math.min(danPredSlevou, p.slevaPoplatnik);
  const zvyhodneni = zvyhodneniRocne(deti, p.zvyhodneni);
  const slevaDeti = Math.min(danPredSlevou - slevaPoplatnik, zvyhodneni);
  const naBonus = zvyhodneni - slevaDeti;
  const bonus = naBonus >= 100 && prijmy >= 6 * p.minimalniMzda ? naBonus : 0;
  const dan = danPredSlevou - slevaPoplatnik - slevaDeti;

  const pojistenaVedlejsi = cinnost === "hlavni" || zakladDane >= (p.rozhodnaCastka * mesice) / 12;
  let vzSocialni = 0;
  if (pojistenaVedlejsi) {
    vzSocialni = nahoru((zakladDane * p.podilSocialni) / 100);
    vzSocialni = Math.max(vzSocialni, p.minVzSocialniMesic * mesice);
    vzSocialni = Math.min(vzSocialni, p.maxVz);
  }
  const socialni = nahoru((vzSocialni * p.socialniSazba) / 100);

  let vzZdravotni = nahoru((zakladDane * p.podilZdravotni) / 100);
  if (cinnost === "hlavni") vzZdravotni = Math.max(vzZdravotni, nahoru(p.minVzZdravotniMesic * mesice));
  const zdravotni = nahoru((vzZdravotni * p.zdravotniSazba) / 100);

  return {
    vydaje,
    zakladDane,
    danPredSlevou,
    slevaPoplatnik,
    slevaDeti,
    bonus,
    dan,
    vzSocialni,
    socialni,
    vzZdravotni,
    zdravotni,
    celkem: dan - bonus + socialni + zdravotni,
    pojistenaVedlejsi,
  };
}

export const REQUIERE_OSVC = {
  "cz.pausalni-vydaje": "mapa",
  "cz.pausalni-vydaje-limit": "mapa",
  "cz.dan-z-prijmu": "escala",
  "cz.sleva-na-poplatnika": "numero",
  "cz.zvyhodneni-na-deti": "mapa",
  "cz.minimalni-mzda": "numero",
  "cz.osvc-socialni-sazba": "numero",
  "cz.zdravotni-pojisteni": "numero",
  "cz.osvc-podil-zakladu": "mapa",
  "cz.osvc-min-vz-socialni": "mapa",
  "cz.osvc-min-vz-zdravotni": "numero",
  "cz.osvc-rozhodna-castka": "numero",
  "cz.max-vymerovaci-zaklad": "numero",
} as const;

export function parametryOsvc(
  v: {
    "cz.pausalni-vydaje": Readonly<Record<string, number>>;
    "cz.pausalni-vydaje-limit": Readonly<Record<string, number>>;
    "cz.dan-z-prijmu": readonly FilaEscala[];
    "cz.sleva-na-poplatnika": number;
    "cz.zvyhodneni-na-deti": Readonly<Record<string, number>>;
    "cz.minimalni-mzda": number;
    "cz.osvc-socialni-sazba": number;
    "cz.zdravotni-pojisteni": number;
    "cz.osvc-podil-zakladu": Readonly<Record<string, number>>;
    "cz.osvc-min-vz-socialni": Readonly<Record<string, number>>;
    "cz.osvc-min-vz-zdravotni": number;
    "cz.osvc-rozhodna-castka": number;
    "cz.max-vymerovaci-zaklad": number;
  },
  typVydaju: string,
  cinnost: Cinnost,
): ParametryOsvc {
  const d = v["cz.zvyhodneni-na-deti"];
  const minVz = v["cz.osvc-min-vz-socialni"];
  return {
    sazbaVydaju: v["cz.pausalni-vydaje"][typVydaju] ?? 0,
    limitVydaju: v["cz.pausalni-vydaje-limit"][typVydaju] ?? 0,
    dan: v["cz.dan-z-prijmu"],
    slevaPoplatnik: v["cz.sleva-na-poplatnika"],
    zvyhodneni: { prvni: d.prvni ?? 0, druhe: d.druhe ?? 0, treti: d.treti ?? 0 },
    minimalniMzda: v["cz.minimalni-mzda"],
    socialniSazba: v["cz.osvc-socialni-sazba"],
    zdravotniSazba: v["cz.zdravotni-pojisteni"],
    podilSocialni: v["cz.osvc-podil-zakladu"].socialni ?? 0,
    podilZdravotni: v["cz.osvc-podil-zakladu"].zdravotni ?? 0,
    minVzSocialniMesic: (cinnost === "hlavni" ? minVz.hlavni : minVz.vedlejsi) ?? 0,
    minVzZdravotniMesic: v["cz.osvc-min-vz-zdravotni"],
    rozhodnaCastka: v["cz.osvc-rozhodna-castka"],
    maxVz: v["cz.max-vymerovaci-zaklad"],
  };
}
