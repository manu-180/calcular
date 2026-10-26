import { aplicarEscala, enMapa } from "@/motor/calculo";
import type { ValoresDe } from "@/motor/tipos";

// Ansiotulon verot ja maksut niin kuin Verohallinto ne laskee verokortille (päätös ennakonpidätyksen
// laskentaperusteista 2026). Sama laskenta palvelee palkka-, vero- ja kunnallisverolaskuria.
export const REQ_VEROT = {
  "fi.valtion-tuloveroasteikko": "escala",
  "fi.palkansaajan-maksut": "mapa",
  "fi.paivarahamaksun-tuloraja": "numero",
  "fi.tulonhankkimisvahennys": "numero",
  "fi.perusvahennys": "numero",
  "fi.perusvahennys-pienennys": "numero",
  "fi.tyotulovahennys": "mapa",
  "fi.tyotulovahennys-prosentit": "mapa",
  "fi.yle-vero": "numero",
  "fi.yle-veron-tuloraja": "numero",
  "fi.yle-veron-enimmaismaara": "numero",
} as const;

export const REQ_ELAKE = {
  "fi.elaketulovahennys": "mapa",
  "fi.elaketulovahennys-prosentit": "mapa",
  "fi.elaketulon-lisavero": "numero",
  "fi.elaketulon-lisaveron-raja": "numero",
} as const;

export type ValoresVerot = ValoresDe<typeof REQ_VEROT>;
export type ValoresElake = ValoresDe<typeof REQ_ELAKE>;
export type Ikaryhma = "17" | "18-64" | "65-67";
export type Kirkko = "ei" | "evl" | "ort";

export const IKARYHMAT = [
  { valor: "17", etiqueta: "17-vuotias" },
  { valor: "18-64", etiqueta: "18-64-vuotias" },
  { valor: "65-67", etiqueta: "65-67-vuotias (täytit 65 ennen vuoden alkua)" },
] as const;

export const KIRKOT = [
  { valor: "ei", etiqueta: "En kuulu kirkkoon" },
  { valor: "evl", etiqueta: "Evankelis-luterilainen kirkko" },
  { valor: "ort", etiqueta: "Ortodoksinen kirkko" },
] as const;

export interface Tulot {
  palkka: number;
  elake: number;
  etuus: number;
}

export interface Henkilo {
  ika: Ikaryhma;
  lapset: number;
  yksinhuoltaja: boolean;
  kunnallisvero: number;
  kirkollisvero: number;
}

export interface Verot {
  tyel: number;
  tyottomyys: number;
  paivaraha: number;
  puhdas: number;
  elaketulovahennys: number;
  perusvahennys: number;
  verotettava: number;
  tyotulovahennys: number;
  valtio: number;
  kunta: number;
  kirkko: number;
  sairaanhoito: number;
  yle: number;
  lisavero: number;
  yhteensa: number;
  brutto: number;
  veroprosentti: number;
  ennakonpidatys: number;
}

const plus = (n: number) => Math.max(0, n);

export function kirkollisvero(kirkko: Kirkko, kunta: string, evl: Readonly<Record<string, number>>, ort: Readonly<Record<string, number>>): number {
  if (kirkko === "ei") return 0;
  return enMapa(kirkko === "evl" ? evl : ort, kunta);
}

export function laskeVerot(t: Tulot, h: Henkilo, v: ValoresVerot, r: (n: number) => number, e?: ValoresElake): Verot {
  const m = v["fi.palkansaajan-maksut"];
  const tyel = r((t.palkka * enMapa(m, "tyel")) / 100);
  const tyottomyys = h.ika === "18-64" ? r((t.palkka * enMapa(m, "tyottomyys")) / 100) : 0;
  const paivaraha = t.palkka >= v["fi.paivarahamaksun-tuloraja"] ? r((t.palkka * enMapa(m, "paivaraha")) / 100) : 0;

  const puhdas = t.palkka + t.elake + t.etuus - Math.min(v["fi.tulonhankkimisvahennys"], t.palkka);
  let elaketulovahennys = 0;
  if (e && t.elake > 0) {
    const eur = e["fi.elaketulovahennys"];
    const pros = e["fi.elaketulovahennys-prosentit"];
    const enimmais = enMapa(eur, "enimmais");
    const taite = enMapa(eur, "taite");
    const maara =
      enimmais - (enMapa(pros, "pienennys1") / 100) * plus(Math.min(puhdas, taite) - enimmais) - (enMapa(pros, "pienennys2") / 100) * plus(puhdas - taite);
    elaketulovahennys = r(Math.min(t.elake, plus(maara)));
  }
  const ennenPerus = plus(puhdas - tyel - tyottomyys - paivaraha - elaketulovahennys);
  const perusMax = v["fi.perusvahennys"];
  const perusvahennys = r(Math.min(ennenPerus, plus(perusMax - (v["fi.perusvahennys-pienennys"] / 100) * plus(ennenPerus - perusMax))));
  const verotettava = r(ennenPerus - perusvahennys);

  let valtio = r(aplicarEscala(v["fi.valtion-tuloveroasteikko"], verotettava));
  let kunta = r((verotettava * h.kunnallisvero) / 100);
  let kirkko = r((verotettava * h.kirkollisvero) / 100);
  let sairaanhoito = r((verotettava * enMapa(m, "sairaanhoito")) / 100 + (plus(verotettava - t.palkka) * enMapa(m, "sairaanhoito-korotus")) / 100);

  const te = v["fi.tyotulovahennys"];
  const tp = v["fi.tyotulovahennys-prosentit"];
  const enimmais =
    enMapa(te, "enimmais") + enMapa(te, "lapsikorotus") * h.lapset * (h.yksinhuoltaja ? 2 : 1) + (h.ika === "65-67" ? enMapa(te, "ikakorotus") : 0);
  const pienennys = (enMapa(tp, "pienennys") / 100) * plus(Math.min(puhdas, enMapa(te, "ylaraja")) - enMapa(te, "alaraja"));
  const tyotulovahennys = r(plus(Math.min((t.palkka * enMapa(tp, "osuus")) / 100, enimmais) - pienennys));

  // Työtulovähennys tehdään ensin valtion verosta ja loput kunnallisverosta, sairaanhoitomaksusta ja
  // kirkollisverosta niiden suhteessa.
  const valtiolta = Math.min(valtio, tyotulovahennys);
  valtio = r(valtio - valtiolta);
  const jaannos = tyotulovahennys - valtiolta;
  if (jaannos > 0) {
    const muut = kunta + sairaanhoito + kirkko;
    const kerroin = muut <= jaannos ? 0 : 1 - jaannos / muut;
    kunta = r(kunta * kerroin);
    sairaanhoito = r(sairaanhoito * kerroin);
    kirkko = r(kirkko * kerroin);
  }

  const yle = h.ika === "17" ? 0 : r(Math.min(v["fi.yle-veron-enimmaismaara"], (v["fi.yle-vero"] / 100) * plus(puhdas - v["fi.yle-veron-tuloraja"])));
  const lisavero = e ? r((plus(t.elake - e["fi.elaketulon-lisaveron-raja"]) * e["fi.elaketulon-lisavero"]) / 100) : 0;
  const yhteensa = r(valtio + kunta + kirkko + sairaanhoito + paivaraha + yle + lisavero);
  const brutto = t.palkka + t.elake + t.etuus;
  const veroprosentti = brutto > 0 ? (yhteensa / brutto) * 100 : 0;
  const ennakonpidatys = Math.min(60, Math.ceil(veroprosentti * 2 - 1e-9) / 2);
  return {
    tyel,
    tyottomyys,
    paivaraha,
    puhdas: r(puhdas),
    elaketulovahennys,
    perusvahennys,
    verotettava,
    tyotulovahennys,
    valtio,
    kunta,
    kirkko,
    sairaanhoito,
    yle,
    lisavero,
    yhteensa,
    brutto,
    veroprosentti,
    ennakonpidatys,
  };
}
