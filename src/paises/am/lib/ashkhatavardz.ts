import { enMapa, porcentaje } from "@/motor/calculo";

export const REQUIERE_ASHKHATAVARDZ = {
  "am.yekamtayin-hark": "numero",
  "am.kutakayin-tsatsr": "numero",
  "am.kutakayin-bardzr": "numero",
  "am.kutakayin-shem": "numero",
  "am.kutakayin-nvazetsum": "numero",
  "am.kutakayin-bazmapatik": "numero",
  "am.nvazaguyn": "numero",
  "am.drosh-tsatsr": "numero",
  "am.drosh-bardzr": "numero",
  "am.drosh-shem": "numero",
  "am.aha-vchar": "mapa",
} as const;

export interface ValoresAshkhatavardz {
  "am.yekamtayin-hark": number;
  "am.kutakayin-tsatsr": number;
  "am.kutakayin-bardzr": number;
  "am.kutakayin-shem": number;
  "am.kutakayin-nvazetsum": number;
  "am.kutakayin-bazmapatik": number;
  "am.nvazaguyn": number;
  "am.drosh-tsatsr": number;
  "am.drosh-bardzr": number;
  "am.drosh-shem": number;
  "am.aha-vchar": Readonly<Record<string, number>>;
}

export interface Pahumner {
  kutakayin: boolean;
  aha: boolean;
}

export function kutakayinVchar(g: number, v: ValoresAshkhatavardz): number {
  if (g <= v["am.kutakayin-shem"]) return porcentaje(g, v["am.kutakayin-tsatsr"]);
  const tope = v["am.kutakayin-bazmapatik"] * v["am.nvazaguyn"];
  return porcentaje(Math.min(g, tope), v["am.kutakayin-bardzr"]) - v["am.kutakayin-nvazetsum"];
}

export function drosh(g: number, v: ValoresAshkhatavardz): number {
  return g > v["am.drosh-shem"] ? v["am.drosh-bardzr"] : v["am.drosh-tsatsr"];
}

export const AHA_TSATSR = 200000;
export const AHA_MIJIN = 500000;

export function ahaVchar(g: number, v: ValoresAshkhatavardz): number {
  const clave = g <= AHA_TSATSR ? "tsatsr" : g <= AHA_MIJIN ? "mijin" : "bardzr";
  return enMapa(v["am.aha-vchar"], clave);
}

export interface Hashvark {
  yekamtayin: number;
  kutakayin: number;
  drosh: number;
  aha: number;
  pahumner: number;
  zut: number;
}

export function zutAshkhatavardz(g: number, p: Pahumner, v: ValoresAshkhatavardz, redondear: (x: number) => number): Hashvark {
  const yekamtayin = redondear(porcentaje(g, v["am.yekamtayin-hark"]));
  const kutakayin = p.kutakayin ? redondear(kutakayinVchar(g, v)) : 0;
  const d = drosh(g, v);
  const aha = p.aha ? ahaVchar(g, v) : 0;
  const pahumner = yekamtayin + kutakayin + d + aha;
  return { yekamtayin, kutakayin, drosh: d, aha, pahumner, zut: redondear(g - pahumner) };
}

// El neto no sube parejo con el bruto: la estampilla y el seguro saltan en 200 001, 500 001 y
// 1 000 001 dram. Por eso se busca el bruto más bajo tramo por tramo.
export function hamakharnZutits(zut: number, p: Pahumner, v: ValoresAshkhatavardz, redondear: (x: number) => number): number {
  const techo = Math.max(zut * 4, 1000);
  const limites = [AHA_TSATSR, AHA_MIJIN, v["am.drosh-shem"], v["am.kutakayin-bazmapatik"] * v["am.nvazaguyn"], Math.max(techo, v["am.kutakayin-bazmapatik"] * v["am.nvazaguyn"] + 1)];
  let desde = 0;
  for (const hasta of limites) {
    if (hasta <= desde) continue;
    if (zutAshkhatavardz(hasta, p, v, redondear).zut >= zut) {
      let a = desde;
      let b = hasta;
      while (b - a > 1) {
        const m = Math.floor((a + b) / 2);
        if (zutAshkhatavardz(m, p, v, redondear).zut >= zut) b = m;
        else a = m;
      }
      return b;
    }
    desde = hasta;
  }
  return desde;
}
