import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { bruttoFuerNetto, nettoMonat } from "../lib/netto";
import { geringfuegigkeitsgrenze, STEUERKLASSEN, type Steuerklasse } from "../lib/steuer";
import { KINDER_PV, KINDERFREIBETRAEGE, lohnWerteAus, personAus, REQ_LOHN } from "../lib/werte";

export default definirCalculadora({
  id: "de.netto-brutto-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "netto-brutto-rechner",
  estado: "publicado",
  requiere: {
    ...REQ_LOHN,
    "de.kirchensteuer": "numero-por-region",
    "de.mindestlohn": "numero",
    "de.uebergangsbereich-obergrenze": "numero",
  },
  campos: [
    { id: "netto", tipo: "moneda", etiqueta: "Gewünschtes Nettogehalt im Monat", min: 0, porDefecto: 2500 },
    { id: "steuerklasse", tipo: "opcion", etiqueta: "Steuerklasse", opciones: STEUERKLASSEN, porDefecto: "1" },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland", porDefecto: "nw" },
    { id: "kirche", tipo: "si-no", etiqueta: "Kirchensteuerpflichtig", porDefecto: false },
    { id: "kinderfreibetraege", tipo: "opcion", etiqueta: "Kinderfreibeträge", opciones: KINDERFREIBETRAEGE, porDefecto: "0" },
    { id: "kinder", tipo: "opcion", etiqueta: "Kinder für die Pflegeversicherung", opciones: KINDER_PV, porDefecto: "kinderlos" },
    { id: "zusatzbeitrag", tipo: "porcentaje", etiqueta: "Zusatzbeitrag Ihrer Krankenkasse", min: 0, max: 10, requerido: false, ayuda: "Leer lassen, dann gilt der Durchschnitt." },
  ],
  calcular(entrada, valores, { redondear }) {
    const werte = lohnWerteAus(valores, entrada.zusatzbeitrag);
    const grenze = geringfuegigkeitsgrenze(valores["de.mindestlohn"]);
    const obergrenze = valores["de.uebergangsbereich-obergrenze"];
    const basis = {
      steuerklasse: entrada.steuerklasse as Steuerklasse,
      kinderfreibetraege: Number(entrada.kinderfreibetraege),
      kirchensteuersatz: entrada.kirche ? porRegion(valores["de.kirchensteuer"], entrada.bundesland) : 0,
      person: personAus(entrada.kinder, entrada.bundesland),
    };
    const brutto = bruttoFuerNetto(entrada.netto, basis, werte, grenze, obergrenze);
    const r = nettoMonat({ ...basis, brutto }, werte, grenze, obergrenze);
    if (r.netto > entrada.netto + 5) throw new ErrorEntrada(`Für dieses Netto reicht ein Minijob bis ${grenze} Euro im Monat. Dafür gibt es den Minijob-Rechner.`, "netto");
    return {
      brutto,
      netto: r.netto,
      lohnsteuer: r.lohnsteuer,
      soli: r.soli,
      kirchensteuer: r.kirchensteuer,
      sozialabgaben: r.sv.arbeitnehmer.summe,
      bruttoJahr: redondear(brutto * 12),
    };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Nötiges Bruttogehalt im Monat", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Netto bei diesem Brutto", formato: "moneda" },
    { clave: "lohnsteuer", etiqueta: "Lohnsteuer", formato: "moneda" },
    { clave: "soli", etiqueta: "Solidaritätszuschlag", formato: "moneda", ocultarSiCero: true },
    { clave: "kirchensteuer", etiqueta: "Kirchensteuer", formato: "moneda", ocultarSiCero: true },
    { clave: "sozialabgaben", etiqueta: "Sozialabgaben", formato: "moneda" },
    { clave: "bruttoJahr", etiqueta: "Bruttogehalt im Jahr (zwölf Monate)", formato: "moneda" },
  ],
});
