import { nahoru, nahoruNaHalere } from "./mzda";

export interface Hranice {
  prvni: number;
  druha: number;
  treti: number;
}

function naHalere(x: number): number {
  return Math.round(x * 100 + 1e-7) / 100;
}

// Redukce denního vyměřovacího základu (zákon č. 187/2006 Sb., § 21): části v pásmech se počítají
// s přesností na dvě desetinná místa a výsledek se zaokrouhlí na celé koruny nahoru.
export function redukovanyDvz(dvz: number, h: Hranice, druh: "nemoc" | "materstvi"): number {
  const prvniPodil = druh === "nemoc" ? 0.9 : 1;
  const a = naHalere(Math.min(dvz, h.prvni) * prvniPodil);
  const b = naHalere(Math.max(0, Math.min(dvz, h.druha) - h.prvni) * 0.6);
  const c = naHalere(Math.max(0, Math.min(dvz, h.treti) - h.druha) * 0.3);
  return nahoru(a + b + c);
}

// Denní vyměřovací základ z průměrné měsíční hrubé mzdy za posledních 12 měsíců (365 dní).
export function dvzZMzdy(mesicniMzda: number): number {
  return (mesicniMzda * 12) / 365;
}

// Náhrada mzdy v prvních 14 dnech (zákoník práce, § 192): hranice pro průměrný hodinový výdělek
// jsou redukční hranice nemocenského × 0,175, zaokrouhlené na haléře nahoru; redukce 90/60/30 %.
export function redukovanyHodinovy(phv: number, h: Hranice, koeficient: number): number {
  const h1 = nahoruNaHalere(h.prvni * koeficient);
  const h2 = nahoruNaHalere(h.druha * koeficient);
  const h3 = nahoruNaHalere(h.treti * koeficient);
  return Math.min(phv, h1) * 0.9 + Math.max(0, Math.min(phv, h2) - h1) * 0.6 + Math.max(0, Math.min(phv, h3) - h2) * 0.3;
}

// Průměrný hodinový výdělek z měsíční mzdy podle § 356 odst. 2 (měsíc = týdenní doba × 4,348).
export function hodinovyZMesicni(mesicniMzda: number, hodinTydne: number): number {
  return mesicniMzda / (hodinTydne * 4.348);
}
