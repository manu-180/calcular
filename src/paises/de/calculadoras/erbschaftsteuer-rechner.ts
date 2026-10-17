import { definirCalculadora } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

const VERHAELTNIS = {
  ehegatte: { klasse: 1, freibetrag: "ehegatte" },
  kind: { klasse: 1, freibetrag: "kind" },
  enkel: { klasse: 1, freibetrag: "enkel" },
  "eltern-erbe": { klasse: 1, freibetrag: "eltern" },
  "eltern-schenkung": { klasse: 2, freibetrag: "klasse2" },
  geschwister: { klasse: 2, freibetrag: "klasse2" },
  andere: { klasse: 3, freibetrag: "klasse3" },
} as const;

// § 19 ErbStG ist ein Stufentarif: der ganze Erwerb trägt den Satz seiner Stufe. Absatz 3
// (Härteausgleich) begrenzt den Sprung über eine Wertgrenze auf die Hälfte (bis 30 %) oder drei
// Viertel (über 30 %) des übersteigenden Betrags.
function stufentarif(erwerb: number, tarif: readonly FilaEscala[]): { satz: number; steuer: number } {
  const i = tarif.findIndex((f) => f.hasta === null || erwerb <= f.hasta);
  const stufe = tarif[i];
  let steuer = (erwerb * stufe.tasa) / 100;
  if (i > 0) {
    const vorher = tarif[i - 1];
    const grenze = vorher.hasta ?? 0;
    const anteil = stufe.tasa <= 30 ? 0.5 : 0.75;
    steuer = Math.min(steuer, (grenze * vorher.tasa) / 100 + (erwerb - grenze) * anteil);
  }
  return { satz: stufe.tasa, steuer };
}

export default definirCalculadora({
  id: "de.erbschaftsteuer-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "erbschaftsteuer-rechner",
  estado: "publicado",
  requiere: {
    "de.erbst-freibetraege": "mapa",
    "de.erbst-satz-klasse-1": "escala",
    "de.erbst-satz-klasse-2": "escala",
    "de.erbst-satz-klasse-3": "escala",
  },
  campos: [
    { id: "wert", tipo: "moneda", etiqueta: "Wert der Erbschaft oder Schenkung", min: 0, porDefecto: 500000 },
    {
      id: "verhaeltnis",
      tipo: "opcion",
      etiqueta: "Wer erhält das Vermögen?",
      opciones: [
        { valor: "ehegatte", etiqueta: "Ehegatte oder eingetragener Lebenspartner" },
        { valor: "kind", etiqueta: "Kind oder Stiefkind" },
        { valor: "enkel", etiqueta: "Enkelkind, dessen Elternteil lebt" },
        { valor: "eltern-erbe", etiqueta: "Eltern oder Großeltern bei einer Erbschaft" },
        { valor: "eltern-schenkung", etiqueta: "Eltern oder Großeltern bei einer Schenkung" },
        { valor: "geschwister", etiqueta: "Geschwister, Nichte, Neffe, Schwiegerkind, Schwiegereltern" },
        { valor: "andere", etiqueta: "Alle anderen (zum Beispiel Lebensgefährte, Freunde)" },
      ],
      porDefecto: "kind",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = VERHAELTNIS[entrada.verhaeltnis as keyof typeof VERHAELTNIS];
    const freibetrag = valores["de.erbst-freibetraege"][v.freibetrag];
    const steuerpflichtig = Math.max(Math.floor((entrada.wert - freibetrag) / 100) * 100, 0);
    const tarif = v.klasse === 1 ? valores["de.erbst-satz-klasse-1"] : v.klasse === 2 ? valores["de.erbst-satz-klasse-2"] : valores["de.erbst-satz-klasse-3"];
    const { satz, steuer } = steuerpflichtig > 0 ? stufentarif(steuerpflichtig, tarif) : { satz: 0, steuer: 0 };
    return {
      steuerklasse: ["I", "II", "III"][v.klasse - 1],
      freibetrag,
      steuerpflichtig,
      satz,
      steuer: redondear(steuer),
      observaciones: [
        "Nicht berücksichtigt: Versorgungsfreibetrag für Ehegatten und Kinder, Steuerbefreiung für das Familienheim, Begünstigungen für Betriebsvermögen und frühere Schenkungen derselben Person in den letzten zehn Jahren.",
      ],
    };
  },
  resultado: [
    { clave: "steuer", etiqueta: "Erbschaft- oder Schenkungsteuer", formato: "moneda", destacada: true },
    { clave: "steuerklasse", etiqueta: "Steuerklasse", formato: "texto" },
    { clave: "freibetrag", etiqueta: "Persönlicher Freibetrag", formato: "moneda" },
    { clave: "steuerpflichtig", etiqueta: "Steuerpflichtiger Erwerb (auf volle 100 Euro abgerundet)", formato: "moneda" },
    { clave: "satz", etiqueta: "Steuersatz", formato: "porcentaje" },
  ],
});
