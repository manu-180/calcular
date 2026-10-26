import type { FilaEscala } from "@/motor/tipos";
import type { ParametryMzdy } from "./mzda";

// Poskládá parametry mzdy z ověřených údajů (datos.json) pro výpočet v lib/mzda.ts.
export function parametryMzdy(v: {
  "cz.socialni-zamestnanec": number;
  "cz.socialni-zamestnavatel": number;
  "cz.zdravotni-pojisteni": number;
  "cz.prumerna-mzda": number;
  "cz.dan-z-prijmu": readonly FilaEscala[];
  "cz.sleva-na-poplatnika": number;
  "cz.zvyhodneni-na-deti": Readonly<Record<string, number>>;
  "cz.minimalni-mzda": number;
  "cz.danovy-bonus-minimum": number;
}): ParametryMzdy {
  const sazby = v["cz.dan-z-prijmu"];
  const deti = v["cz.zvyhodneni-na-deti"];
  return {
    socialniZamestnanec: v["cz.socialni-zamestnanec"],
    socialniZamestnavatel: v["cz.socialni-zamestnavatel"],
    zdravotniSazba: v["cz.zdravotni-pojisteni"],
    prumernaMzda: v["cz.prumerna-mzda"],
    sazbyDane: { nizsi: sazby[0].tasa, vyssi: sazby[sazby.length - 1].tasa },
    slevaRocne: v["cz.sleva-na-poplatnika"],
    zvyhodneni: { prvni: deti.prvni ?? 0, druhe: deti.druhe ?? 0, treti: deti.treti ?? 0 },
    minimalniMzda: v["cz.minimalni-mzda"],
    bonusMinimum: v["cz.danovy-bonus-minimum"],
  };
}

export const REQUIERE_MZDA = {
  "cz.socialni-zamestnanec": "numero",
  "cz.socialni-zamestnavatel": "numero",
  "cz.zdravotni-pojisteni": "numero",
  "cz.prumerna-mzda": "numero",
  "cz.dan-z-prijmu": "escala",
  "cz.sleva-na-poplatnika": "numero",
  "cz.zvyhodneni-na-deti": "mapa",
  "cz.minimalni-mzda": "numero",
  "cz.danovy-bonus-minimum": "numero",
} as const;
