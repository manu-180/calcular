import { kaufmaennisch, lohnsteuerMonat, sozialversicherungMonat, type LohnsteuerWerte, type PersonSv, type Steuerklasse, type SvErgebnis } from "./steuer";

export interface NettoEingabe {
  brutto: number;
  steuerklasse: Steuerklasse;
  kinderfreibetraege: number;
  kirchensteuersatz: number;
  person: PersonSv;
}

export interface NettoErgebnis {
  lohnsteuer: number;
  soli: number;
  kirchensteuer: number;
  steuern: number;
  sv: SvErgebnis;
  netto: number;
}

export function nettoMonat(e: NettoEingabe, werte: LohnsteuerWerte, minijobGrenze: number, obergrenze: number): NettoErgebnis {
  const sv = sozialversicherungMonat(e.brutto, werte.sv, e.person, { rv: true, av: true }, minijobGrenze, obergrenze);
  const st = lohnsteuerMonat(
    { monatsbrutto: e.brutto, steuerklasse: e.steuerklasse, kinderfreibetraege: e.kinderfreibetraege, kirchensteuersatz: e.kirchensteuersatz, rvPflicht: true, avPflicht: true, person: e.person },
    werte,
  );
  const steuern = kaufmaennisch(st.lohnsteuer + st.soli + st.kirchensteuer);
  return { lohnsteuer: st.lohnsteuer, soli: st.soli, kirchensteuer: st.kirchensteuer, steuern, sv, netto: kaufmaennisch(e.brutto - steuern - sv.arbeitnehmer.summe) };
}

// Kleinstes Brutto in Cent, dessen Netto den Wunschbetrag erreicht. Das Netto steigt mit dem Brutto,
// springt aber wegen der Abrundung der Lohnsteuer auf volle Euro im Jahr in kleinen Stufen; deshalb
// Bisektion in ganzen Cent statt einer Formel.
export function bruttoFuerNetto(ziel: number, basis: Omit<NettoEingabe, "brutto">, werte: LohnsteuerWerte, minijobGrenze: number, obergrenze: number): number {
  let unten = Math.round(minijobGrenze * 100) + 1;
  let oben = 100000000;
  const netto = (cent: number) => nettoMonat({ ...basis, brutto: cent / 100 }, werte, minijobGrenze, obergrenze).netto;
  if (netto(unten) >= ziel) return unten / 100;
  while (oben - unten > 1) {
    const mitte = Math.floor((unten + oben) / 2);
    if (netto(mitte) >= ziel) oben = mitte;
    else unten = mitte;
  }
  return oben / 100;
}
