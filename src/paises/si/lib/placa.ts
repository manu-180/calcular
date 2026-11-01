import { aplicarEscala, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Redondear = (x: number) => number;
type Mapa = Readonly<Record<string, number>>;

export const REQ_PLACA = {
  "si.dohodnina": "escala",
  "si.splosna-olajsava": "numero",
  "si.dodatna-olajsava-prag": "numero",
  "si.dodatna-olajsava-znesek": "numero",
  "si.dodatna-olajsava-faktor": "numero",
  "si.olajsava-do-29": "numero",
  "si.olajsava-otroci": "mapa",
  "si.prispevki-delavec": "mapa",
  "si.prispevki-delodajalec": "mapa",
  "si.ozp": "numero",
  "si.najnizja-osnova": "numero",
} as const;

export interface ValoresPlaca {
  "si.dohodnina": readonly FilaEscala[];
  "si.splosna-olajsava": number;
  "si.dodatna-olajsava-prag": number;
  "si.dodatna-olajsava-znesek": number;
  "si.dodatna-olajsava-faktor": number;
  "si.olajsava-do-29": number;
  "si.olajsava-otroci": Mapa;
  "si.prispevki-delavec": Mapa;
  "si.prispevki-delodajalec": Mapa;
  "si.ozp": number;
  "si.najnizja-osnova": number;
}

export interface Razmere {
  otroci: number;
  do29: boolean;
  // Delež polnega delovnega časa v odstotkih: najnižja osnova se zmanjša sorazmerno.
  delez: number;
}

// Olajšava za n vzdrževanih otrok (Pravilnik za 2026, 1. člen, 4. točka): prvi znesek velja za vsakega
// otroka, povečanja so vezana na zaporedje, od šestega naprej pa na znesek za predhodnega otroka.
export function olajsavaOtroci(n: number, m: Mapa): number {
  const prvi = enMapa(m, "prvi");
  let skupaj = 0;
  let prejsnji = prvi;
  for (let k = 1; k <= n; k++) {
    let z = prvi;
    if (k === 2) z = prvi + enMapa(m, "drugi");
    else if (k === 3) z = prvi + enMapa(m, "tretji");
    else if (k === 4) z = prvi + enMapa(m, "cetrti");
    else if (k === 5) z = prvi + enMapa(m, "peti");
    else if (k > 5) z = prejsnji + enMapa(m, "nadaljnji");
    skupaj += z;
    prejsnji = z;
  }
  return skupaj;
}

// Pripomoček FURS za 2026: pod 1/12 praga se splošna olajšava poveča po enačbi iz 2. člena pravilnika.
export function splosnaMesecno(bruto: number, v: ValoresPlaca): number {
  const osnovna = v["si.splosna-olajsava"] / 12;
  if (bruto * 12 >= v["si.dodatna-olajsava-prag"]) return osnovna;
  return osnovna + v["si.dodatna-olajsava-znesek"] / 12 - v["si.dodatna-olajsava-faktor"] * bruto;
}

export function prispevkiDelavca(bruto: number, delez: number, v: ValoresPlaca, r: Redondear) {
  const m = v["si.prispevki-delavec"];
  const osnova = Math.max(bruto, (v["si.najnizja-osnova"] * delez) / 100);
  // Od razlike do najnižje osnove delavec plača le prispevka za starševsko varstvo in zaposlovanje;
  // pokojninski, zdravstveni in prispevek za dolgotrajno oskrbo od razlike plača delodajalec (FURS).
  const piz = r(porcentaje(bruto, enMapa(m, "piz")));
  const zz = r(porcentaje(bruto, enMapa(m, "zz")));
  const dolg = r(porcentaje(bruto, enMapa(m, "do")));
  const starsevsko = r(porcentaje(osnova, enMapa(m, "starsevsko")));
  const zaposlovanje = r(porcentaje(osnova, enMapa(m, "zaposlovanje")));
  const ozp = v["si.ozp"];
  const odstotni = r(piz + zz + dolg + starsevsko + zaposlovanje);
  return { osnova, piz, zz, dolg, starsevsko, zaposlovanje, ozp, odstotni, skupaj: r(odstotni + ozp) };
}

export function prispevkiDelodajalca(bruto: number, delez: number, v: ValoresPlaca, r: Redondear) {
  const d = v["si.prispevki-delodajalec"];
  const z = v["si.prispevki-delavec"];
  const osnova = Math.max(bruto, (v["si.najnizja-osnova"] * delez) / 100);
  const razlika = osnova - bruto;
  const lastni = r(porcentaje(osnova, enMapa(d, "piz") + enMapa(d, "zz") + enMapa(d, "pd") + enMapa(d, "do") + enMapa(d, "starsevsko") + enMapa(d, "zaposlovanje")));
  const zaDelavca = r(porcentaje(razlika, enMapa(z, "piz") + enMapa(z, "zz") + enMapa(z, "do")));
  return { osnova, razlika: r(razlika), lastni, zaDelavca, skupaj: r(lastni + zaDelavca) };
}

// Akontacija pri glavnem delodajalcu: lestvica in olajšave, preračunane na 1/12 leta (127. člen ZDoh-2).
export function izracunPlace(bruto: number, raz: Razmere, v: ValoresPlaca, r: Redondear) {
  const p = prispevkiDelavca(bruto, raz.delez, v, r);
  const splosna = splosnaMesecno(bruto, v);
  const otroci = olajsavaOtroci(raz.otroci, v["si.olajsava-otroci"]) / 12;
  const do29 = raz.do29 ? v["si.olajsava-do-29"] / 12 : 0;
  const olajsave = r(splosna + otroci + do29);
  const osnova = Math.max(0, bruto - p.skupaj - olajsave);
  const akontacija = r(aplicarEscala(v["si.dohodnina"], osnova * 12) / 12);
  return { bruto, prispevki: p, olajsave, davcnaOsnova: r(osnova), akontacija, neto: r(bruto - p.skupaj - akontacija) };
}

export function brutoIzNeto(neto: number, raz: Razmere, v: ValoresPlaca, r: Redondear): number {
  let lo = neto;
  let hi = neto * 3 + 1000;
  for (let i = 0; i < 60; i++) {
    const s = (lo + hi) / 2;
    if (izracunPlace(s, raz, v, r).neto < neto) lo = s;
    else hi = s;
  }
  return r(hi);
}
