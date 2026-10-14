import { definirCalculadora, porRegion } from "@/motor/calculo";
import { lohnsteuerMonat, STEUERKLASSEN, type Steuerklasse } from "../lib/steuer";
import { KINDER_PV, KINDERFREIBETRAEGE, lohnWerteAus, personAus, REQ_LOHN } from "../lib/werte";

export default definirCalculadora({
  id: "de.lohnsteuer-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "lohnsteuer-rechner",
  estado: "publicado",
  requiere: { ...REQ_LOHN, "de.kirchensteuer": "numero-por-region" },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Monatlicher Bruttolohn", min: 0, porDefecto: 3500 },
    { id: "steuerklasse", tipo: "opcion", etiqueta: "Steuerklasse", opciones: STEUERKLASSEN, porDefecto: "1" },
    { id: "kinderfreibetraege", tipo: "opcion", etiqueta: "Kinderfreibeträge", opciones: KINDERFREIBETRAEGE, porDefecto: "0" },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland", porDefecto: "nw" },
    { id: "kirche", tipo: "si-no", etiqueta: "Kirchensteuerpflichtig", porDefecto: false },
    { id: "kinder", tipo: "opcion", etiqueta: "Kinder für die Pflegeversicherung", opciones: KINDER_PV, porDefecto: "kinderlos", ayuda: "Wirkt über die Vorsorgepauschale auf die Lohnsteuer." },
    { id: "zusatzbeitrag", tipo: "porcentaje", etiqueta: "Zusatzbeitrag Ihrer Krankenkasse", min: 0, max: 10, requerido: false, ayuda: "Leer lassen, dann gilt der Durchschnitt." },
  ],
  calcular(entrada, valores, { redondear }) {
    const werte = lohnWerteAus(valores, entrada.zusatzbeitrag);
    const person = personAus(entrada.kinder, entrada.bundesland);
    const satz = entrada.kirche ? porRegion(valores["de.kirchensteuer"], entrada.bundesland) : 0;
    const fuer = (stkl: Steuerklasse) =>
      lohnsteuerMonat(
        { monatsbrutto: entrada.brutto, steuerklasse: stkl, kinderfreibetraege: Number(entrada.kinderfreibetraege), kirchensteuersatz: satz, rvPflicht: true, avPflicht: true, person },
        werte,
      );
    const r = fuer(entrada.steuerklasse as Steuerklasse);
    return {
      lohnsteuer: r.lohnsteuer,
      soli: r.soli,
      kirchensteuer: r.kirchensteuer,
      summe: redondear(r.lohnsteuer + r.soli + r.kirchensteuer),
      lohnsteuerJahr: r.lohnsteuerJahr,
      vorsorgepauschale: r.vorsorgepauschale,
      klasse1: fuer("1").lohnsteuer,
      klasse2: fuer("2").lohnsteuer,
      klasse3: fuer("3").lohnsteuer,
      klasse4: fuer("4").lohnsteuer,
      klasse5: fuer("5").lohnsteuer,
      klasse6: fuer("6").lohnsteuer,
    };
  },
  resultado: [
    { clave: "lohnsteuer", etiqueta: "Lohnsteuer im Monat", formato: "moneda", destacada: true },
    { clave: "soli", etiqueta: "Solidaritätszuschlag", formato: "moneda" },
    { clave: "kirchensteuer", etiqueta: "Kirchensteuer", formato: "moneda", ocultarSiCero: true },
    { clave: "summe", etiqueta: "Steuerabzüge zusammen", formato: "moneda" },
    { clave: "lohnsteuerJahr", etiqueta: "Jahreslohnsteuer", formato: "moneda" },
    { clave: "vorsorgepauschale", etiqueta: "Vorsorgepauschale im Jahr", formato: "moneda" },
    { clave: "klasse1", etiqueta: "Lohnsteuer in Steuerklasse I", formato: "moneda" },
    { clave: "klasse2", etiqueta: "Lohnsteuer in Steuerklasse II", formato: "moneda" },
    { clave: "klasse3", etiqueta: "Lohnsteuer in Steuerklasse III", formato: "moneda" },
    { clave: "klasse4", etiqueta: "Lohnsteuer in Steuerklasse IV", formato: "moneda" },
    { clave: "klasse5", etiqueta: "Lohnsteuer in Steuerklasse V", formato: "moneda" },
    { clave: "klasse6", etiqueta: "Lohnsteuer in Steuerklasse VI", formato: "moneda" },
  ],
});
