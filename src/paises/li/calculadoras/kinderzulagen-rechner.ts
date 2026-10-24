import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "li.kinderzulagen-rechner",
  mercado: "li",
  concepto: "propio",
  slug: "kinderzulagen-rechner",
  estado: "publicado",
  requiere: {
    "li.kinderzulage": "numero",
    "li.kinderzulage-erhoeht": "numero",
    "li.alleinerziehendenzulage": "numero",
  },
  campos: [
    { id: "unter10", tipo: "entero", etiqueta: "Kinder unter 10 Jahren", min: 0, max: 15, porDefecto: 1 },
    { id: "ab10", tipo: "entero", etiqueta: "Kinder ab 10 Jahren", min: 0, max: 15, porDefecto: 1 },
    { id: "alleinerziehend", tipo: "si-no", etiqueta: "Alleinerziehend (Anspruch auf Alleinerziehendenzulage)", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    for (const feld of ["unter10", "ab10"] as const) {
      const n = entrada[feld];
      if (!Number.isInteger(n) || n < 0 || n > 15) throw new ErrorEntrada("Bitte eine Zahl von 0 bis 15 eingeben.", feld);
    }
    const kinder = entrada.unter10 + entrada.ab10;
    const basis = valores["li.kinderzulage"];
    const erhoeht = valores["li.kinderzulage-erhoeht"];
    // Ab dem dritten zulagenberechtigten Kind gilt der höhere Betrag für alle Kinder (ahv.li, Kinderzulagen).
    const kinderzulagen = kinder > 2 ? kinder * erhoeht : entrada.unter10 * basis + entrada.ab10 * erhoeht;
    const alleinerziehend = entrada.alleinerziehend ? kinder * valores["li.alleinerziehendenzulage"] : 0;
    const monat = redondear(kinderzulagen + alleinerziehend);
    return {
      monat,
      jahr: redondear(monat * 12),
      kinderzulagen: redondear(kinderzulagen),
      alleinerziehend: redondear(alleinerziehend),
      observaciones: ["Für Zwillinge gilt ab Geburt der höhere Betrag. Die Alleinerziehendenzulage ist jedes Jahr neu zu beantragen."],
    };
  },
  resultado: [
    { clave: "monat", etiqueta: "Familienzulagen pro Monat", formato: "moneda", destacada: true },
    { clave: "jahr", etiqueta: "Pro Jahr", formato: "moneda" },
    { clave: "kinderzulagen", etiqueta: "Kinderzulagen", formato: "moneda" },
    { clave: "alleinerziehend", etiqueta: "Alleinerziehendenzulagen", formato: "moneda" },
  ],
});
