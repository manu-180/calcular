import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { BRUTTO_MAX, nettoLohn, REQ_LOHN, type LohnEingabe } from "../lib/lohn";

export default definirCalculadora({
  id: "at.familienbonus-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "familienbonus-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat", min: 0, max: BRUTTO_MAX, porDefecto: 3000 },
    { id: "kinderUnter18", tipo: "entero", etiqueta: "Kinder unter 18", min: 0, max: 10, porDefecto: 1 },
    { id: "kinderAb18", tipo: "entero", etiqueta: "Kinder ab 18 mit Familienbeihilfe", min: 0, max: 10, porDefecto: 0 },
    { id: "faboHalb", tipo: "si-no", etiqueta: "Bonus wird mit dem anderen Elternteil geteilt", porDefecto: false },
    { id: "avabKinder", tipo: "entero", etiqueta: "Alleinverdiener oder Alleinerzieher: Anzahl der Kinder", min: 0, max: 10, porDefecto: 0, ayuda: "0, wenn Ihnen der Absetzbetrag nicht zusteht." },
    { id: "wien", tipo: "si-no", etiqueta: "Arbeitsort in Wien", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.kinderUnter18 + entrada.kinderAb18 === 0) throw new ErrorEntrada("Geben Sie mindestens ein Kind an.", "kinderUnter18");
    const basis: LohnEingabe = {
      brutto: entrada.brutto,
      wien: entrada.wien,
      avabKinder: entrada.avabKinder,
      kinderUnter18: entrada.kinderUnter18,
      kinderAb18: entrada.kinderAb18,
      faboHalb: entrada.faboHalb,
      pendler: "keine",
      pendlerKm: 0,
    };
    const mit = nettoLohn(basis, valores, redondear);
    const ohne = nettoLohn({ ...basis, kinderUnter18: 0, kinderAb18: 0 }, valores, redondear);
    const zustehend = redondear(12 * mit.familienbonusMonat);
    const wirksam = redondear(12 * mit.familienbonusWirksam);
    const observaciones: string[] = [];
    if (wirksam < zustehend) {
      observaciones.push("Ihre Lohnsteuer ist niedriger als der Familienbonus Plus. Der Bonus senkt nur die vorhandene Steuer, deshalb wirkt er hier nicht in voller Höhe.");
      if (entrada.avabKinder > 0) observaciones.push("Als Alleinverdiener oder Alleinerzieher mit geringem Einkommen kann Ihnen in der Arbeitnehmerveranlagung ein Kindermehrbetrag zustehen.");
    }
    return {
      wirksam,
      zustehend,
      verfaellt: redondear(zustehend - wirksam),
      monatlich: mit.familienbonusWirksam,
      lohnsteuerOhne: ohne.lohnsteuer,
      lohnsteuerMit: mit.lohnsteuer,
      nettoMehr: redondear(mit.netto - ohne.netto),
      observaciones,
    };
  },
  resultado: [
    { clave: "wirksam", etiqueta: "Steuerersparnis durch den Familienbonus Plus im Jahr", formato: "moneda", destacada: true },
    { clave: "zustehend", etiqueta: "Familienbonus Plus, der Ihnen zusteht", formato: "moneda" },
    { clave: "verfaellt", etiqueta: "Nicht ausgeschöpft", formato: "moneda", ocultarSiCero: true },
    { clave: "monatlich", etiqueta: "Ersparnis pro Monat", formato: "moneda" },
    { clave: "lohnsteuerOhne", etiqueta: "Lohnsteuer im Monat ohne Familienbonus", formato: "moneda" },
    { clave: "lohnsteuerMit", etiqueta: "Lohnsteuer im Monat mit Familienbonus", formato: "moneda" },
    { clave: "nettoMehr", etiqueta: "Mehr netto im Monat", formato: "moneda" },
  ],
});
