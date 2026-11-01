import { enMapa } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;

export interface Skatteregler {
  pbb: number;
  ibb: number;
  skiktgrans: number;
  statligSats: number;
  grundavdrag: Mapa;
  jobbskatteavdrag: Mapa;
  pensionsavgift: Mapa;
  publicService: Mapa;
  forvarvsinkomst: Mapa;
}

export interface Skatteuttrakning {
  arsinkomst: number;
  grundavdrag: number;
  beskattningsbar: number;
  kommunalskatt: number;
  statligSkatt: number;
  avgifter: number;
  pensionsavgift: number;
  reduktionPensionsavgift: number;
  jobbskatteavdrag: number;
  reduktionForvarvsinkomst: number;
  publicService: number;
  skatt: number;
}

export const nedTillHundratal = (x: number) => Math.floor(x / 100 + 1e-9) * 100;
const uppTillHundratal = (x: number) => Math.ceil(x / 100 - 1e-9) * 100;
const kronor = (x: number) => Math.floor(x + 1e-9);

// Allmän pensionsavgift avrundas till närmaste hundratal, och 50 kronor avrundas nedåt (SKV 433, 7.4).
function pensionsavgiftAvrundad(x: number): number {
  const h = x / 100;
  const hel = Math.floor(h);
  return (h - hel > 0.5 + 1e-9 ? hel + 1 : hel) * 100;
}

// Grundavdrag för den som inte fyllt 66 år vid årets ingång, avrundat uppåt till hundratal och aldrig
// högre än den fastställda förvärvsinkomsten.
export function grundavdrag(ffi: number, r: Skatteregler): number {
  const g = r.grundavdrag;
  const pbb = r.pbb;
  const bas = enMapa(g, "bas") * pbb;
  const hogsta = enMapa(g, "hogsta") * pbb;
  const steg1 = enMapa(g, "steg1") * pbb;
  const steg2 = enMapa(g, "steg2") * pbb;
  const steg3 = enMapa(g, "steg3") * pbb;
  const steg4 = enMapa(g, "steg4") * pbb;
  let ga: number;
  if (ffi <= steg1) ga = bas;
  else if (ffi <= steg2) ga = bas + (enMapa(g, "okning") / 100) * (ffi - steg1);
  else if (ffi <= steg3) ga = hogsta;
  else if (ffi <= steg4) ga = hogsta - (enMapa(g, "minskning") / 100) * (ffi - steg3);
  else ga = enMapa(g, "lagsta") * pbb;
  return Math.min(uppTillHundratal(ga), ffi);
}

export function jobbskatteavdragFore(arbetsinkomst: number, ga: number, kommunalSats: number, r: Skatteregler): number {
  const j = r.jobbskatteavdrag;
  const pbb = r.pbb;
  const ai = nedTillHundratal(arbetsinkomst);
  const steg1 = enMapa(j, "steg1") * pbb;
  const steg2 = enMapa(j, "steg2") * pbb;
  const steg3 = enMapa(j, "steg3") * pbb;
  let underlag: number;
  if (ai <= steg1) underlag = ai;
  else if (ai <= steg2) underlag = steg1 + (enMapa(j, "sats2") / 100) * (ai - steg1);
  else if (ai <= steg3) underlag = enMapa(j, "bas3") * pbb + (enMapa(j, "sats3") / 100) * (ai - steg2);
  else underlag = enMapa(j, "max") * pbb;
  return Math.max(0, kronor((underlag - ga) * (kommunalSats / 100)));
}

// Skatten på ett års arbetsinkomst för den som inte fyllt 66 år (kolumn 1 i skattetabellerna).
// kommunalSats: kommun och region. avgiftSats: begravningsavgift och kyrkoavgift, som inte minskas av
// någon skattereduktion.
export function skattPaLon(arsinkomst: number, kommunalSats: number, avgiftSats: number, r: Skatteregler): Skatteuttrakning {
  const ffi = nedTillHundratal(arsinkomst);
  const ga = grundavdrag(ffi, r);
  const bfi = Math.max(0, ffi - ga);
  const kommunalskatt = kronor((bfi * kommunalSats) / 100);
  const overSkikt = bfi - r.skiktgrans;
  const statligSkatt = overSkikt >= 200 ? kronor((overSkikt * r.statligSats) / 100) : 0;
  const avgifter = kronor((bfi * avgiftSats) / 100);
  const p = r.pensionsavgift;
  const pensionsavgift = ffi < enMapa(p, "golv") * r.pbb ? 0 : pensionsavgiftAvrundad((Math.min(ffi, enMapa(p, "tak") * r.ibb) * enMapa(p, "sats")) / 100);
  const reduktionPensionsavgift = Math.min(pensionsavgift, kommunalskatt + statligSkatt);
  let kvarKommunal = Math.max(0, kommunalskatt - reduktionPensionsavgift);
  const jobbskatteavdrag = Math.min(jobbskatteavdragFore(ffi, ga, kommunalSats, r), kvarKommunal);
  kvarKommunal -= jobbskatteavdrag;
  const fi = r.forvarvsinkomst;
  const fiFore = bfi <= enMapa(fi, "golv") ? 0 : bfi >= enMapa(fi, "tak") ? enMapa(fi, "max") : kronor(((bfi - enMapa(fi, "golv")) * enMapa(fi, "sats")) / 100);
  const reduktionForvarvsinkomst = Math.min(fiFore, kvarKommunal);
  const ps = r.publicService;
  const publicService = kronor((Math.min(bfi, enMapa(ps, "tak") * r.ibb) * enMapa(ps, "sats")) / 100);
  const skatt =
    statligSkatt + kommunalskatt - reduktionPensionsavgift - jobbskatteavdrag - reduktionForvarvsinkomst + avgifter + pensionsavgift + publicService;
  return {
    arsinkomst: ffi,
    grundavdrag: ga,
    beskattningsbar: bfi,
    kommunalskatt,
    statligSkatt,
    avgifter,
    pensionsavgift,
    reduktionPensionsavgift,
    jobbskatteavdrag,
    reduktionForvarvsinkomst,
    publicService,
    skatt,
  };
}

// Tabellnummer: den sammanlagda skattesatsen avrundad till heltal, där 50 öre avrundas nedåt.
export function skattetabell(sammanlagdSats: number): number {
  const hel = Math.floor(sammanlagdSats + 1e-9);
  return sammanlagdSats - hel > 0.5 + 1e-9 ? hel + 1 : hel;
}

// Övre gränsen för månadslönens inkomstskikt: 100 kronor upp till 20 000 kronor, sedan 200 kronor.
export function skiktManad(lon: number): number {
  if (lon <= 20000) return Math.ceil(lon / 100 - 1e-9) * 100;
  return 20000 + Math.ceil((lon - 20000) / 200 - 1e-9) * 200;
}

// Skatteavdrag per månad enligt skattetabell, kolumn 1.
export function skatteavdragManad(manadslon: number, tabell: number, tabellAvgifter: number, r: Skatteregler) {
  const u = skattPaLon(skiktManad(manadslon) * 12, tabell - tabellAvgifter, tabellAvgifter, r);
  return { avdrag: kronor(u.skatt / 12), uttrakning: u };
}

// Brytpunkten: den årsinkomst där statlig skatt börjar tas ut (skiktgränsen plus grundavdraget).
export function brytpunkt(r: Skatteregler): number {
  let ffi = r.skiktgrans;
  for (let i = 0; i < 20; i++) {
    const nasta = r.skiktgrans + grundavdrag(ffi, r);
    if (nasta === ffi) break;
    ffi = nasta;
  }
  return ffi;
}

export function regler(v: {
  "se.prisbasbelopp": number;
  "se.inkomstbasbelopp": number;
  "se.skiktgrans": number;
  "se.statlig-inkomstskatt": number;
  "se.grundavdrag": Mapa;
  "se.jobbskatteavdrag": Mapa;
  "se.allman-pensionsavgift": Mapa;
  "se.public-service-avgift": Mapa;
  "se.skattereduktion-forvarvsinkomst": Mapa;
}): Skatteregler {
  return {
    pbb: v["se.prisbasbelopp"],
    ibb: v["se.inkomstbasbelopp"],
    skiktgrans: v["se.skiktgrans"],
    statligSats: v["se.statlig-inkomstskatt"],
    grundavdrag: v["se.grundavdrag"],
    jobbskatteavdrag: v["se.jobbskatteavdrag"],
    pensionsavgift: v["se.allman-pensionsavgift"],
    publicService: v["se.public-service-avgift"],
    forvarvsinkomst: v["se.skattereduktion-forvarvsinkomst"],
  };
}

export const KRAV_SKATT = {
  "se.prisbasbelopp": "numero",
  "se.inkomstbasbelopp": "numero",
  "se.skiktgrans": "numero",
  "se.statlig-inkomstskatt": "numero",
  "se.grundavdrag": "mapa",
  "se.jobbskatteavdrag": "mapa",
  "se.allman-pensionsavgift": "mapa",
  "se.public-service-avgift": "mapa",
  "se.skattereduktion-forvarvsinkomst": "mapa",
} as const;
