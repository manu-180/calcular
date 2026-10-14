import { aplicarEscalaMarginal, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala, ValoresDe } from "@/motor/tipos";

export const REQ_SV = {
  "at.sv-dienstnehmer": "mapa",
  "at.av-staffel": "escala",
  "at.beitragsgrundlage": "mapa",
} as const;

export const REQ_LST = {
  "at.est-tarif": "escala",
  "at.werbungskostenpauschale": "numero",
  "at.verkehrsabsetzbetrag": "numero",
  "at.avab": "mapa",
  "at.familienbonus": "mapa",
  "at.pendlerpauschale": "mapa",
  "at.pendlereuro": "numero",
} as const;

export const REQ_SZ = {
  "at.sonderzahlung-steuer": "escala",
  "at.sonderzahlung-freigrenze": "numero",
} as const;

export const REQ_LOHN = { ...REQ_SV, ...REQ_LST, ...REQ_SZ } as const;

export type ValoresSv = ValoresDe<typeof REQ_SV>;
export type ValoresLohn = ValoresDe<typeof REQ_LOHN>;
type Redondear = (n: number) => number;

// Brutto über 40.000 Euro im Monat würde Sonderzahlungen über die letzte feste Tranche (83.333 Euro)
// und laufende Bezüge über 500.000 Euro im Jahr bringen; beides rechnet dieses Modell nicht.
export const BRUTTO_MAX = 40000;

export const PENDLER_OPCIONES = [
  { valor: "keine", etiqueta: "Kein Pendlerpauschale" },
  { valor: "klein-20", etiqueta: "Kleines, 20 bis 40 km" },
  { valor: "klein-40", etiqueta: "Kleines, mehr als 40 bis 60 km" },
  { valor: "klein-60", etiqueta: "Kleines, mehr als 60 km" },
  { valor: "gross-2", etiqueta: "Großes, 2 bis 20 km" },
  { valor: "gross-20", etiqueta: "Großes, mehr als 20 bis 40 km" },
  { valor: "gross-40", etiqueta: "Großes, mehr als 40 bis 60 km" },
  { valor: "gross-60", etiqueta: "Großes, mehr als 60 km" },
] as const;

export function satzInStufe(escala: readonly FilaEscala[], basis: number): number {
  for (const f of escala) if (f.hasta === null || basis <= f.hasta) return f.tasa;
  return escala[escala.length - 1].tasa;
}

export interface SvDienstnehmer {
  kv: number;
  pv: number;
  av: number;
  umlagen: number;
  summe: number;
  avSatz: number;
  basis: number;
  geringfuegig: boolean;
}

// Die Sozialversicherung wird als Summe aller Sätze auf die Beitragsgrundlage gerechnet und einmal
// gerundet, so wie der Brutto-Netto-Rechner des BMF (bei 8.000 Euro in Wien 1.269,58 statt 1.269,59).
// Die Umlagen sind der Rest, damit die Teile immer die Summe ergeben.
export function svLaufend(brutto: number, v: ValoresSv, wien: boolean, r: Redondear): SvDienstnehmer {
  const grenzen = v["at.beitragsgrundlage"];
  const s = v["at.sv-dienstnehmer"];
  if (brutto <= grenzen.geringfuegig) return { kv: 0, pv: 0, av: 0, umlagen: 0, summe: 0, avSatz: 0, basis: 0, geringfuegig: true };
  const basis = Math.min(brutto, grenzen["hoechst-monat"]);
  const avSatz = satzInStufe(v["at.av-staffel"], basis);
  const wbf = wien ? s["wbf-wien"] : s.wbf;
  const summe = r(porcentaje(basis, s.kv + s.pv + avSatz + s.ak + wbf));
  const kv = r(porcentaje(basis, s.kv));
  const pv = r(porcentaje(basis, s.pv));
  const av = r(porcentaje(basis, avSatz));
  return { kv, pv, av, umlagen: r(summe - kv - pv - av), summe, avSatz, basis, geringfuegig: false };
}

// Auf Sonderzahlungen fallen weder Arbeiterkammerumlage noch Wohnbauförderungsbeitrag an; die
// Arbeitslosenversicherung richtet sich nach der Höhe der einzelnen Sonderzahlung.
export function svSonderzahlung(betrag: number, bereitsBeitragspflichtig: number, v: ValoresSv, r: Redondear): { sv: number; basis: number } {
  const s = v["at.sv-dienstnehmer"];
  const frei = Math.max(0, v["at.beitragsgrundlage"]["hoechst-sonderzahlungen"] - bereitsBeitragspflichtig);
  const basis = Math.min(betrag, frei);
  const avSatz = satzInStufe(v["at.av-staffel"], basis);
  return { sv: r(porcentaje(basis, s.kv + s.pv + avSatz)), basis };
}

export function avabJahr(avab: Readonly<Record<string, number>>, kinder: number): number {
  if (kinder <= 0) return 0;
  if (kinder === 1) return avab["ein-kind"];
  return avab["zwei-kinder"] + (kinder - 2) * avab["je-weiteres-kind"];
}

// Effektiv-Tarif der Lohnsteuertabelle: Grenzen des Jahrestarifs plus Werbungskostenpauschale,
// durch zwölf (13.539 + 132 = 1.139,25 im Monat). So entsteht derselbe Abzug wie in der BMF-Tabelle.
export function tarifMonat(bmg: number, tarif: readonly FilaEscala[], wkPauschale: number, r: Redondear): number {
  const grenze = (g: number) => (g === 0 ? 0 : r((g + wkPauschale) / 12));
  const monat = tarif.map((f) => ({ desde: grenze(f.desde), hasta: f.hasta === null ? null : grenze(f.hasta), tasa: f.tasa }));
  return aplicarEscalaMarginal(monat, bmg);
}

export function grenzsteuersatzMonat(bmg: number, tarif: readonly FilaEscala[], wkPauschale: number, r: Redondear): number {
  for (const f of tarif) {
    const hasta = f.hasta === null ? null : r((f.hasta + wkPauschale) / 12);
    if (hasta === null || bmg <= hasta) return f.tasa;
  }
  return tarif[tarif.length - 1].tasa;
}

export interface LohnEingabe {
  brutto: number;
  wien: boolean;
  avabKinder: number;
  kinderUnter18: number;
  kinderAb18: number;
  faboHalb: boolean;
  pendler: string;
  pendlerKm: number;
  pendlerAnteil?: number;
}

export interface LohnErgebnis {
  sv: SvDienstnehmer;
  pendlerpauschaleMonat: number;
  bmg: number;
  steuerVorAbsetz: number;
  familienbonusMonat: number;
  familienbonusWirksam: number;
  verkehrsabsetzbetragMonat: number;
  avabMonat: number;
  pendlereuroMonat: number;
  lohnsteuer: number;
  netto: number;
  grenzsteuersatz: number;
  sz: { brutto: number; sv: number; lohnsteuer: number; netto: number }[];
  svJahr: number;
  lohnsteuerJahr: number;
  bruttoJahr: number;
  nettoJahr: number;
}

export function sonderzahlungen(brutto: number, betraege: readonly number[], v: ValoresLohn, r: Redondear): LohnErgebnis["sz"] {
  const geringfuegig = brutto <= v["at.beitragsgrundlage"].geringfuegig;
  const jahressechstel = 2 * brutto;
  const steuerfrei = jahressechstel <= v["at.sonderzahlung-freigrenze"];
  const escala = v["at.sonderzahlung-steuer"];
  let beitragspflichtig = 0;
  let steuerbasis = 0;
  return betraege.map((betrag) => {
    const { sv, basis } = geringfuegig ? { sv: 0, basis: 0 } : svSonderzahlung(betrag, beitragspflichtig, v, r);
    beitragspflichtig += basis;
    let lohnsteuer = 0;
    if (!steuerfrei) {
      const vorher = steuerbasis;
      steuerbasis += Math.max(0, betrag - sv);
      lohnsteuer = r(aplicarEscalaMarginal(escala, steuerbasis) - aplicarEscalaMarginal(escala, vorher));
    }
    return { brutto: betrag, sv, lohnsteuer, netto: r(betrag - sv - lohnsteuer) };
  });
}

export function pendlerpauschaleMonat(pendler: string, tabelle: Readonly<Record<string, number>>, r: Redondear, anteil = 1): number {
  if (pendler === "keine") return 0;
  if (!(pendler in tabelle)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
  return r((tabelle[pendler] / 12) * anteil);
}

export function nettoLohn(e: LohnEingabe, v: ValoresLohn, r: Redondear): LohnErgebnis {
  if (e.brutto > BRUTTO_MAX) throw new ErrorEntrada("Der Rechner ist für Bruttogehälter bis 40.000 Euro im Monat ausgelegt.", "brutto");
  const sv = svLaufend(e.brutto, v, e.wien, r);
  const pendlerAnteil = e.pendlerAnteil ?? 1;
  const pendlerMonat = pendlerpauschaleMonat(e.pendler, v["at.pendlerpauschale"], r, pendlerAnteil);
  if (e.pendler !== "keine" && e.pendlerKm <= 0) throw new ErrorEntrada("Geben Sie die einfache Strecke in Kilometern an, damit der Pendlereuro berechnet werden kann.", "pendlerKm");
  const bmg = Math.max(0, r(e.brutto - sv.summe - pendlerMonat));
  const steuerVorAbsetz = tarifMonat(bmg, v["at.est-tarif"], v["at.werbungskostenpauschale"], r);
  const fb = v["at.familienbonus"];
  const faboAnteil = e.faboHalb ? 0.5 : 1;
  const familienbonusMonat = r(e.kinderUnter18 * r(fb["unter-18"] * faboAnteil) + e.kinderAb18 * r(fb["ab-18"] * faboAnteil));
  const familienbonusWirksam = Math.min(familienbonusMonat, r(steuerVorAbsetz));
  const verkehrsabsetzbetragMonat = r(v["at.verkehrsabsetzbetrag"] / 12);
  const avabMonat = r(avabJahr(v["at.avab"], e.avabKinder) / 12);
  const pendlereuroMonat = e.pendler === "keine" ? 0 : r(((e.pendlerKm * v["at.pendlereuro"]) / 12) * pendlerAnteil);
  const lohnsteuer = Math.max(0, r(steuerVorAbsetz - familienbonusWirksam - verkehrsabsetzbetragMonat - avabMonat - pendlereuroMonat));
  const netto = r(e.brutto - sv.summe - lohnsteuer);
  const sz = sonderzahlungen(e.brutto, [e.brutto, e.brutto], v, r);
  const svJahr = r(12 * sv.summe + sz.reduce((s, x) => s + x.sv, 0));
  const lohnsteuerJahr = r(12 * lohnsteuer + sz.reduce((s, x) => s + x.lohnsteuer, 0));
  const bruttoJahr = r(14 * e.brutto);
  return {
    sv,
    pendlerpauschaleMonat: pendlerMonat,
    bmg,
    steuerVorAbsetz: r(steuerVorAbsetz),
    familienbonusMonat,
    familienbonusWirksam,
    verkehrsabsetzbetragMonat,
    avabMonat,
    pendlereuroMonat,
    lohnsteuer,
    netto,
    grenzsteuersatz: grenzsteuersatzMonat(bmg, v["at.est-tarif"], v["at.werbungskostenpauschale"], r),
    sz,
    svJahr,
    lohnsteuerJahr,
    bruttoJahr,
    nettoJahr: r(bruttoJahr - svJahr - lohnsteuerJahr),
  };
}
