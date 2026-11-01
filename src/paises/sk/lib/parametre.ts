import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_MZDY = {
  "sk.odvody-zamestnanec": "mapa",
  "sk.odvody-zamestnavatel": "mapa",
  "sk.zdravotne-odvody": "mapa",
  "sk.max-vymeriavaci-zaklad": "numero",
  "sk.dan-z-prijmov": "escala",
  "sk.nezdanitelna-cast": "numero",
  "sk.danovy-bonus": "mapa",
  "sk.bonus-limit": "mapa",
  "sk.bonus-hranica": "numero",
} as const;

export interface ParametreMzdy {
  zamestnanec: Readonly<Record<string, number>>;
  zamestnavatel: Readonly<Record<string, number>>;
  zdravotne: Readonly<Record<string, number>>;
  maxVz: number;
  pasma: readonly FilaEscala[];
  nczd: number;
  bonus: Readonly<Record<string, number>>;
  bonusLimit: Readonly<Record<string, number>>;
  bonusHranica: number;
}

export function parametreMzdy(v: {
  "sk.odvody-zamestnanec": Readonly<Record<string, number>>;
  "sk.odvody-zamestnavatel": Readonly<Record<string, number>>;
  "sk.zdravotne-odvody": Readonly<Record<string, number>>;
  "sk.max-vymeriavaci-zaklad": number;
  "sk.dan-z-prijmov": readonly FilaEscala[];
  "sk.nezdanitelna-cast": number;
  "sk.danovy-bonus": Readonly<Record<string, number>>;
  "sk.bonus-limit": Readonly<Record<string, number>>;
  "sk.bonus-hranica": number;
}): ParametreMzdy {
  return {
    zamestnanec: v["sk.odvody-zamestnanec"],
    zamestnavatel: v["sk.odvody-zamestnavatel"],
    zdravotne: v["sk.zdravotne-odvody"],
    maxVz: v["sk.max-vymeriavaci-zaklad"],
    pasma: v["sk.dan-z-prijmov"],
    nczd: v["sk.nezdanitelna-cast"],
    bonus: v["sk.danovy-bonus"],
    bonusLimit: v["sk.bonus-limit"],
    bonusHranica: v["sk.bonus-hranica"],
  };
}
