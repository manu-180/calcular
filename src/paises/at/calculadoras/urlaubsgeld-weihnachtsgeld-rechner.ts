import { definirCalculadora } from "@/motor/calculo";
import { BRUTTO_MAX, REQ_LOHN, sonderzahlungen } from "../lib/lohn";

export default definirCalculadora({
  id: "at.urlaubsgeld-weihnachtsgeld-rechner",
  mercado: "at",
  concepto: "bono-semestral",
  slug: "urlaubsgeld-weihnachtsgeld-rechner",
  estado: "publicado",
  requiere: REQ_LOHN,
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat", min: 0, max: BRUTTO_MAX, porDefecto: 3000 },
    { id: "monate", tipo: "entero", etiqueta: "Monate im Dienstverhältnis in diesem Jahr", min: 1, max: 12, porDefecto: 12, ayuda: "Bei weniger als zwölf Monaten rechnet der Rechner die Sonderzahlungen anteilig." },
  ],
  calcular(entrada, valores, { redondear }) {
    const betrag = redondear((entrada.brutto * entrada.monate) / 12);
    const [urlaub, weihnacht] = sonderzahlungen(entrada.brutto, [betrag, betrag], valores, redondear);
    const observaciones: string[] = [];
    if (2 * entrada.brutto <= valores["at.sonderzahlung-freigrenze"]) observaciones.push("Ihr Jahressechstel liegt unter der Freigrenze: Auf Urlaubsgeld und Weihnachtsgeld fällt keine Lohnsteuer an.");
    return {
      summeNetto: redondear(urlaub.netto + weihnacht.netto),
      urlaubBrutto: urlaub.brutto,
      urlaubSv: urlaub.sv,
      urlaubLst: urlaub.lohnsteuer,
      urlaubNetto: urlaub.netto,
      weihnachtBrutto: weihnacht.brutto,
      weihnachtSv: weihnacht.sv,
      weihnachtLst: weihnacht.lohnsteuer,
      weihnachtNetto: weihnacht.netto,
      observaciones,
    };
  },
  resultado: [
    { clave: "summeNetto", etiqueta: "Urlaubsgeld und Weihnachtsgeld netto zusammen", formato: "moneda", destacada: true },
    { clave: "urlaubBrutto", etiqueta: "Urlaubsgeld brutto", formato: "moneda" },
    { clave: "urlaubSv", etiqueta: "Sozialversicherung auf das Urlaubsgeld", formato: "moneda" },
    { clave: "urlaubLst", etiqueta: "Lohnsteuer auf das Urlaubsgeld", formato: "moneda" },
    { clave: "urlaubNetto", etiqueta: "Urlaubsgeld netto", formato: "moneda" },
    { clave: "weihnachtBrutto", etiqueta: "Weihnachtsgeld brutto", formato: "moneda" },
    { clave: "weihnachtSv", etiqueta: "Sozialversicherung auf das Weihnachtsgeld", formato: "moneda" },
    { clave: "weihnachtLst", etiqueta: "Lohnsteuer auf das Weihnachtsgeld", formato: "moneda" },
    { clave: "weihnachtNetto", etiqueta: "Weihnachtsgeld netto", formato: "moneda" },
  ],
});
