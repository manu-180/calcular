import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { nettoMonat } from "../lib/netto";
import { geringfuegigkeitsgrenze, type Steuerklasse } from "../lib/steuer";
import { KINDER_PV, KINDERFREIBETRAEGE, lohnWerteAus, personAus, REQ_LOHN } from "../lib/werte";

export default definirCalculadora({
  id: "de.steuerklassen-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "steuerklassen-rechner",
  estado: "publicado",
  requiere: {
    ...REQ_LOHN,
    "de.kirchensteuer": "numero-por-region",
    "de.mindestlohn": "numero",
    "de.uebergangsbereich-obergrenze": "numero",
  },
  campos: [
    { id: "bruttoA", tipo: "moneda", etiqueta: "Bruttogehalt Partner A im Monat", min: 0, porDefecto: 4500 },
    { id: "bruttoB", tipo: "moneda", etiqueta: "Bruttogehalt Partner B im Monat", min: 0, porDefecto: 2500, ayuda: "0 eintragen, wenn Partner B kein Gehalt bezieht." },
    { id: "kinderfreibetraege", tipo: "opcion", etiqueta: "Kinderfreibeträge des Paares", opciones: KINDERFREIBETRAEGE, porDefecto: "0" },
    { id: "kinder", tipo: "opcion", etiqueta: "Kinder für die Pflegeversicherung", opciones: KINDER_PV, porDefecto: "kinderlos" },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland", porDefecto: "nw" },
    { id: "kirche", tipo: "si-no", etiqueta: "Beide kirchensteuerpflichtig", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const werte = lohnWerteAus(valores);
    const grenze = geringfuegigkeitsgrenze(valores["de.mindestlohn"]);
    const obergrenze = valores["de.uebergangsbereich-obergrenze"];
    for (const [feld, b] of [["bruttoA", entrada.bruttoA], ["bruttoB", entrada.bruttoB]] as const) {
      if (b > 0 && b <= grenze) throw new ErrorEntrada(`Ein Gehalt bis ${grenze} Euro ist ein Minijob und hat keine Steuerklasse. Tragen Sie 0 oder einen höheren Betrag ein.`, feld);
    }
    if (entrada.bruttoA === 0 && entrada.bruttoB === 0) throw new ErrorEntrada("Tragen Sie mindestens ein Gehalt ein.", "bruttoA");
    const person = personAus(entrada.kinder, entrada.bundesland);
    const satz = entrada.kirche ? porRegion(valores["de.kirchensteuer"], entrada.bundesland) : 0;
    const zkf = Number(entrada.kinderfreibetraege);
    const netto = (brutto: number, stkl: Steuerklasse) =>
      brutto === 0 ? 0 : nettoMonat({ brutto, steuerklasse: stkl, kinderfreibetraege: stkl === "5" ? 0 : zkf, kirchensteuersatz: satz, person }, werte, grenze, obergrenze).netto;
    const vierVier = redondear(netto(entrada.bruttoA, "4") + netto(entrada.bruttoB, "4"));
    const dreiFuenf = redondear(netto(entrada.bruttoA, "3") + netto(entrada.bruttoB, "5"));
    const fuenfDrei = redondear(netto(entrada.bruttoA, "5") + netto(entrada.bruttoB, "3"));
    const bestes = Math.max(vierVier, dreiFuenf, fuenfDrei);
    const empfehlung = bestes === dreiFuenf ? "III für Partner A, V für Partner B" : bestes === fuenfDrei ? "V für Partner A, III für Partner B" : "IV und IV";
    return {
      vierVier,
      dreiFuenf,
      fuenfDrei,
      vorteil: redondear(bestes - vierVier),
      empfehlung,
      observaciones: [
        "Die Wahl der Steuerklassen ändert nur die monatlichen Abzüge. Die Jahressteuer des Paares legt das Finanzamt mit der Steuererklärung fest; bei III und V ist sie Pflicht, und eine Nachzahlung ist möglich.",
        "Lohnersatzleistungen wie Elterngeld oder Arbeitslosengeld richten sich nach dem Netto. Wer sie bald bezieht, profitiert von der günstigeren Klasse.",
      ],
    };
  },
  resultado: [
    { clave: "empfehlung", etiqueta: "Höchstes gemeinsames Netto mit", formato: "texto" },
    { clave: "dreiFuenf", etiqueta: "Netto zusammen mit III und V", formato: "moneda", destacada: true },
    { clave: "fuenfDrei", etiqueta: "Netto zusammen mit V und III", formato: "moneda" },
    { clave: "vierVier", etiqueta: "Netto zusammen mit IV und IV", formato: "moneda" },
    { clave: "vorteil", etiqueta: "Mehr pro Monat gegenüber IV und IV", formato: "moneda" },
  ],
});
