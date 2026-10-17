import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { BRUTTO_MAX, nettoLohn, REQ_LOHN, type LohnEingabe } from "../lib/lohn";

export default definirCalculadora({
  id: "at.netto-brutto-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "netto-brutto-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    { id: "netto", tipo: "moneda", etiqueta: "Gewünschtes Nettogehalt im Monat", min: 0, porDefecto: 2500 },
    { id: "wien", tipo: "si-no", etiqueta: "Arbeitsort in Wien", porDefecto: false },
    { id: "kinderUnter18", tipo: "entero", etiqueta: "Kinder unter 18 mit Familienbonus Plus", min: 0, max: 10, porDefecto: 0 },
    { id: "kinderAb18", tipo: "entero", etiqueta: "Kinder ab 18 mit Familienbeihilfe und Familienbonus Plus", min: 0, max: 10, porDefecto: 0 },
    { id: "faboHalb", tipo: "si-no", etiqueta: "Familienbonus Plus wird mit dem anderen Elternteil geteilt", porDefecto: false },
    { id: "avabKinder", tipo: "entero", etiqueta: "Alleinverdiener oder Alleinerzieher: Anzahl der Kinder", min: 0, max: 10, porDefecto: 0, ayuda: "0, wenn Ihnen der Absetzbetrag nicht zusteht." },
  ],
  calcular(entrada, valores, { redondear }) {
    const eingabe = (brutto: number): LohnEingabe => ({
      brutto,
      wien: entrada.wien,
      avabKinder: entrada.avabKinder,
      kinderUnter18: entrada.kinderUnter18,
      kinderAb18: entrada.kinderAb18,
      faboHalb: entrada.faboHalb,
      pendler: "keine",
      pendlerKm: 0,
    });
    const nettoBei = (cent: number) => nettoLohn(eingabe(cent / 100), valores, redondear).netto;
    let unten = 0;
    let oben = BRUTTO_MAX * 100;
    if (nettoBei(oben) < entrada.netto) throw new ErrorEntrada("So ein hohes Netto rechnet dieser Rechner nicht. Er ist für Bruttogehälter bis 40.000 Euro ausgelegt.", "netto");
    if (entrada.netto <= 0) oben = 0;
    while (oben - unten > 1) {
      const mitte = Math.floor((unten + oben) / 2);
      if (nettoBei(mitte) >= entrada.netto) oben = mitte;
      else unten = mitte;
    }
    const r = nettoLohn(eingabe(oben / 100), valores, redondear);
    const observaciones: string[] = [];
    if (r.netto > entrada.netto) observaciones.push("Das genaue Netto lässt sich auf den Cent nicht immer treffen. Angezeigt ist das kleinste Brutto, das mindestens Ihr Wunschnetto ergibt.");
    return {
      brutto: oben / 100,
      netto: r.netto,
      lohnsteuer: r.lohnsteuer,
      sv: r.sv.summe,
      bruttoJahr: r.bruttoJahr,
      nettoJahr: r.nettoJahr,
      observaciones,
    };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Nötiges Bruttogehalt im Monat", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Nettogehalt im Monat", formato: "moneda" },
    { clave: "lohnsteuer", etiqueta: "Lohnsteuer im Monat", formato: "moneda" },
    { clave: "sv", etiqueta: "Sozialversicherung im Monat", formato: "moneda" },
    { clave: "bruttoJahr", etiqueta: "Brutto im Jahr (14 Gehälter)", formato: "moneda" },
    { clave: "nettoJahr", etiqueta: "Netto im Jahr (14 Gehälter)", formato: "moneda" },
  ],
});
