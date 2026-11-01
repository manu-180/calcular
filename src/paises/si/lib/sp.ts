import { enMapa, porcentaje } from "@/motor/calculo";

type Redondear = (x: number) => number;
type Mapa = Readonly<Record<string, number>>;

// Zavarovalna osnova (145. člen ZPIZ-2): dobiček na mesec, znižan za 25 %, med najnižjo in najvišjo osnovo.
export function osnovaSp(dobicekLetni: number, znizanje: number, najnizja: number, najvisja: number): number {
  return Math.min(najvisja, Math.max(najnizja, (dobicekLetni / 12) * (1 - znizanje / 100)));
}

export function prispevkiSp(osnova: number, m: Mapa, ozp: number, r: Redondear) {
  const del = (k: string) => r(porcentaje(osnova, enMapa(m, k)));
  const piz = r(del("piz-zav") + del("piz-del"));
  const zz = r(del("zz-zav") + del("zz-del") + del("pd") + ozp);
  const dolg = del("do");
  const drugi = r(del("star-zav") + del("star-del") + del("zap-zav") + del("zap-del"));
  return { piz, zz, dolg, drugi, skupaj: r(piz + zz + dolg + drugi) };
}
