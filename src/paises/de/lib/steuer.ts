import { ErrorEntrada } from "@/motor/calculo";

// Rundung wie im Programmablaufplan (PAP) des BMF: abrunden auf Cent oder Euro, aufrunden nur beim
// Arbeitnehmer-Pauschbetrag und bei der Vorsorgepauschale. Das Epsilon fängt Fließkommareste ab
// (48000 * 0.093 = 4464.000000000001), sonst kippt ein glatter Betrag beim Aufrunden um einen Euro.
const EPS = 1e-7;
export function abrunden(x: number, stellen = 0): number {
  const f = 10 ** stellen;
  return Math.floor(x * f + EPS) / f;
}
export function aufrunden(x: number, stellen = 0): number {
  const f = 10 ** stellen;
  return Math.ceil(x * f - EPS) / f;
}
export function kaufmaennisch(x: number): number {
  return Math.round((x + Math.sign(x) * EPS) * 100) / 100;
}

export type Tarif = Readonly<Record<string, number>>;

// § 32a Absatz 1 EStG für ein auf volle Euro abgerundetes zu versteuerndes Einkommen.
export function tarifEinzeln(x: number, t: Tarif): number {
  if (x <= t.grundfreibetrag) return 0;
  if (x <= t["zone2-bis"]) {
    const y = abrunden((x - t.grundfreibetrag) / 10000, 6);
    return abrunden((t["zone2-faktor"] * y + t["zone2-basis"]) * y);
  }
  if (x <= t["zone3-bis"]) {
    const z = abrunden((x - t["zone2-bis"]) / 10000, 6);
    return abrunden((t["zone3-faktor"] * z + t["zone3-basis"]) * z + t["zone3-sockel"]);
  }
  if (x <= t["zone4-bis"]) return abrunden((x * t["zone4-satz"]) / 100 - t["zone4-abzug"]);
  return abrunden((x * t["zone5-satz"]) / 100 - t["zone5-abzug"]);
}

export function einkommensteuer(zvE: number, t: Tarif, splitting: boolean): number {
  if (zvE <= 0) return 0;
  const teiler = splitting ? 2 : 1;
  return tarifEinzeln(abrunden(zvE / teiler), t) * teiler;
}

export interface SoliWerte {
  satz: number;
  milderung: number;
  freigrenze: number;
}

// §§ 3 und 4 SolzG: Freigrenze, darüber 5,5 % mit Milderungszone (11,9 % des Überschusses).
export function solidaritaetszuschlag(bemessung: number, s: SoliWerte, splitting: boolean): number {
  const grenze = s.freigrenze * (splitting ? 2 : 1);
  if (bemessung <= grenze) return 0;
  return Math.min(abrunden((bemessung * s.satz) / 100, 2), abrunden(((bemessung - grenze) * s.milderung) / 100, 2));
}

export type Steuerklasse = "1" | "2" | "3" | "4" | "5" | "6";

export interface SvSaetze {
  kvAllgemein: number;
  kvErmaessigt: number;
  kvZusatz: number;
  rv: number;
  av: number;
  pv: number;
  pvKinderlos: number;
  pvAbschlagJeKind: number;
  pvSachsen: number;
  bbgKvMonat: number;
  bbgRvMonat: number;
}

export interface PersonSv {
  kinderlos: boolean;
  // Kinder unter 25 Jahren, für die der Abschlag gilt (ab dem zweiten bis zum fünften).
  kinderUnter25: number;
  sachsen: boolean;
}

// Arbeitnehmeranteil zur Pflegeversicherung in Prozent (§ 55 Absatz 3 und § 58 SGB XI).
export function pvSatzArbeitnehmer(s: SvSaetze, p: PersonSv): number {
  const allein = p.sachsen ? s.pvSachsen : 0;
  let satz = (s.pv - allein) / 2 + allein;
  if (p.kinderlos) satz += s.pvKinderlos;
  else satz -= Math.min(Math.max(p.kinderUnter25 - 1, 0), 4) * s.pvAbschlagJeKind;
  return satz;
}

export function pvSatzArbeitgeber(s: SvSaetze, p: PersonSv): number {
  const allein = p.sachsen ? s.pvSachsen : 0;
  return (s.pv - allein) / 2;
}

export interface LohnsteuerEingabe {
  monatsbrutto: number;
  steuerklasse: Steuerklasse;
  kinderfreibetraege: number;
  kirchensteuersatz: number;
  rvPflicht: boolean;
  avPflicht: boolean;
  person: PersonSv;
}

export interface LohnsteuerWerte {
  tarif: Tarif;
  soli: SoliWerte;
  arbeitnehmerPauschbetrag: number;
  sonderausgabenPauschbetrag: number;
  entlastungsbetrag: number;
  grenzen: Tarif;
  kinderfreibetrag: Tarif;
  sv: SvSaetze;
}

export interface LohnsteuerErgebnis {
  jahresbrutto: number;
  vorsorgepauschale: number;
  zvE: number;
  lohnsteuerJahr: number;
  lohnsteuer: number;
  soli: number;
  kirchensteuer: number;
}

// Klassen V und VI: § 39b Absatz 2 Satz 7 EStG, wie im PAP (Methoden MST5_6 und UP5_6).
function steuerKlasse5und6(zzx: number, w: LohnsteuerWerte): number {
  const { tarif: t, grenzen: g } = w;
  const up56 = (zx: number) => {
    const diff = (tarifEinzeln(abrunden(zx * 1.25), t) - tarifEinzeln(abrunden(zx * 0.75), t)) * 2;
    const mist = abrunden(zx * 0.14);
    return Math.max(mist, diff);
  };
  if (zzx > g["stkl5-grenze2"]) {
    let st = up56(g["stkl5-grenze2"]);
    if (zzx > g["stkl5-grenze3"]) {
      st = abrunden(st + (g["stkl5-grenze3"] - g["stkl5-grenze2"]) * 0.42);
      return abrunden(st + (zzx - g["stkl5-grenze3"]) * 0.45);
    }
    return abrunden(st + (zzx - g["stkl5-grenze2"]) * 0.42);
  }
  const vergl = up56(zzx);
  if (zzx <= g["stkl5-grenze1"]) return vergl;
  const hoch = abrunden(up56(g["stkl5-grenze1"]) + (zzx - g["stkl5-grenze1"]) * 0.42);
  return Math.min(hoch, vergl);
}

function steuerAufZvE(zvE: number, stkl: Steuerklasse, w: LohnsteuerWerte): number {
  const z = zvE < 1 ? 0 : zvE;
  if (stkl === "5" || stkl === "6") return steuerKlasse5und6(abrunden(z), w);
  const kztab = stkl === "3" ? 2 : 1;
  return tarifEinzeln(abrunden(z / kztab), w.tarif) * kztab;
}

// Lohnsteuer, Solidaritätszuschlag und Kirchensteuer für einen Monatslohn nach § 39b Absatz 2 EStG,
// Schritt für Schritt wie im PAP 2026 (Methoden MZTABFB, UPEVP, MVSPKVPV, MVSPHB, MSOLZ).
export function lohnsteuerMonat(e: LohnsteuerEingabe, w: LohnsteuerWerte): LohnsteuerErgebnis {
  const { sv } = w;
  const zre4 = abrunden(e.monatsbrutto * 12, 2);
  const unter6 = e.steuerklasse !== "6";
  const anp = unter6 ? (zre4 < w.arbeitnehmerPauschbetrag ? aufrunden(zre4) : w.arbeitnehmerPauschbetrag) : 0;
  const efa = e.steuerklasse === "2" ? w.entlastungsbetrag : 0;
  const sap = unter6 ? w.sonderausgabenPauschbetrag : 0;
  const kfbVoll = (w.kinderfreibetrag.saechlich + w.kinderfreibetrag.bea) * 2;
  const kfbJe = e.steuerklasse === "4" ? kfbVoll / 2 : e.steuerklasse === "5" || e.steuerklasse === "6" ? 0 : kfbVoll;
  const kfb = abrunden(e.kinderfreibetraege * kfbJe);
  const ztabfb = abrunden(efa + anp + sap, 2);

  const bbgRv = sv.bbgRvMonat * 12;
  const bbgKv = sv.bbgKvMonat * 12;
  const vspr = e.rvPflicht ? abrunden((Math.min(zre4, bbgRv) * sv.rv) / 200, 2) : 0;
  const kvSatz = (sv.kvErmaessigt + sv.kvZusatz) / 2;
  const pvSatz = pvSatzArbeitnehmer(sv, e.person);
  const vspkvpv = abrunden((Math.min(zre4, bbgKv) * (kvSatz + pvSatz)) / 100, 2);
  let vsp = aufrunden(vspkvpv + vspr);
  if (e.avPflicht && unter6) {
    const vspalv = abrunden((Math.min(zre4, bbgRv) * sv.av) / 200, 2);
    const vsphb = Math.min(abrunden(vspalv + vspkvpv, 2), w.grenzen["vorsorge-hoechstbetrag"]);
    vsp = Math.max(vsp, aufrunden(vspr + vsphb));
  }

  const zvE = Math.max(zre4 - ztabfb - vsp, 0);
  const lstJahr = abrunden(steuerAufZvE(zvE, e.steuerklasse, w));
  const jbmg = e.kinderfreibetraege > 0 ? abrunden(steuerAufZvE(Math.max(zre4 - ztabfb - kfb - vsp, 0), e.steuerklasse, w)) : lstJahr;
  const soliJahr = solidaritaetszuschlag(jbmg, w.soli, e.steuerklasse === "3");
  const lohnsteuer = abrunden(lstJahr / 12, 2);
  const soli = abrunden(abrunden(soliJahr, 2) / 12, 2);
  const bk = abrunden(jbmg / 12, 2);
  return {
    jahresbrutto: zre4,
    vorsorgepauschale: vsp,
    zvE,
    lohnsteuerJahr: lstJahr,
    lohnsteuer,
    soli,
    kirchensteuer: abrunden((bk * e.kirchensteuersatz) / 100, 2),
  };
}

export interface SvBeitraege {
  kv: number;
  rv: number;
  av: number;
  pv: number;
  summe: number;
}

export interface SvErgebnis {
  arbeitnehmer: SvBeitraege;
  arbeitgeber: SvBeitraege;
  uebergangsbereich: boolean;
}

function beitraege(kv: number, rv: number, av: number, pv: number): SvBeitraege {
  const r = { kv: kaufmaennisch(kv), rv: kaufmaennisch(rv), av: kaufmaennisch(av), pv: kaufmaennisch(pv) };
  return { ...r, summe: kaufmaennisch(r.kv + r.rv + r.av + r.pv) };
}

// Sozialversicherung eines Monatslohns oberhalb der Geringfügigkeitsgrenze. Im Übergangsbereich
// (§ 20 Absatz 2a SGB IV) zahlt die beschäftigte Person den halben Satz auf BE nach Formel 2, der
// Arbeitgeber den Rest des Gesamtbeitrags auf BE nach Formel 1 (§ 249 Absatz 3 SGB V, § 168 Absatz 1
// Nummer 1d SGB VI, § 58 Absatz 5 SGB XI).
export function sozialversicherungMonat(
  brutto: number,
  sv: SvSaetze,
  p: PersonSv,
  pflicht: { rv: boolean; av: boolean },
  minijobGrenze: number,
  obergrenze: number,
): SvErgebnis {
  if (brutto <= minijobGrenze) throw new ErrorEntrada(`Bis ${minijobGrenze} Euro im Monat ist es ein Minijob. Dafür gibt es den Minijob-Rechner.`, "brutto");
  const kvHalb = (sv.kvAllgemein + sv.kvZusatz) / 2;
  const pvAn = pvSatzArbeitnehmer(sv, p);
  const pvAg = pvSatzArbeitgeber(sv, p);
  const rvHalb = pflicht.rv ? sv.rv / 2 : 0;
  const avHalb = pflicht.av ? sv.av / 2 : 0;
  const imUebergang = brutto <= obergrenze;
  if (!imUebergang) {
    const kvBasis = Math.min(brutto, sv.bbgKvMonat);
    const rvBasis = Math.min(brutto, sv.bbgRvMonat);
    return {
      uebergangsbereich: false,
      arbeitnehmer: beitraege((kvBasis * kvHalb) / 100, (rvBasis * rvHalb) / 100, (rvBasis * avHalb) / 100, (kvBasis * pvAn) / 100),
      arbeitgeber: beitraege((kvBasis * kvHalb) / 100, (rvBasis * rvHalb) / 100, (rvBasis * avHalb) / 100, (kvBasis * pvAg) / 100),
    };
  }
  const g = minijobGrenze;
  const gesamtsatz = sv.kvAllgemein + sv.kvZusatz + sv.rv + sv.av + sv.pv;
  const f = Math.round((28 / gesamtsatz) * 10000) / 10000;
  const beGesamt = f * g + (obergrenze / (obergrenze - g) - (g / (obergrenze - g)) * f) * (brutto - g);
  const beAn = (obergrenze / (obergrenze - g)) * (brutto - g);
  const zuschlag = p.kinderlos ? sv.pvKinderlos : 0;
  const an = beitraege((beAn * kvHalb) / 100, (beAn * rvHalb) / 100, (beAn * avHalb) / 100, (beAn * (pvAn - zuschlag)) / 100 + (beGesamt * zuschlag) / 100);
  const gesamt = {
    kv: (beGesamt * kvHalb * 2) / 100,
    rv: (beGesamt * rvHalb * 2) / 100,
    av: (beGesamt * avHalb * 2) / 100,
    pv: (beGesamt * (pvAn - zuschlag + pvAg)) / 100,
  };
  const ag = beitraege(gesamt.kv - an.kv, gesamt.rv - an.rv, gesamt.av - an.av, gesamt.pv - (an.pv - kaufmaennisch((beGesamt * zuschlag) / 100)));
  return { uebergangsbereich: true, arbeitnehmer: an, arbeitgeber: ag };
}

// § 8 Absatz 1a SGB IV: Mindestlohn mal 130, geteilt durch drei, auf volle Euro aufgerundet.
export function geringfuegigkeitsgrenze(mindestlohn: number): number {
  return aufrunden((mindestlohn * 130) / 3);
}

export const STEUERKLASSEN = [
  { valor: "1", etiqueta: "I (ledig, geschieden oder verwitwet)" },
  { valor: "2", etiqueta: "II (alleinerziehend)" },
  { valor: "3", etiqueta: "III (verheiratet, höheres Einkommen)" },
  { valor: "4", etiqueta: "IV (verheiratet, ähnliches Einkommen)" },
  { valor: "5", etiqueta: "V (verheiratet, geringeres Einkommen)" },
  { valor: "6", etiqueta: "VI (Zweitjob)" },
] as const;
