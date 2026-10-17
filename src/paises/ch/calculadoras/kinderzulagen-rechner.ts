import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ch.kinderzulagen-rechner",
  mercado: "ch",
  concepto: "propio",
  slug: "kinderzulagen-rechner",
  estado: "publicado",
  requiere: {
    "ch.kinderzulage": "numero",
    "ch.ausbildungszulage": "numero",
  },
  campos: [
    { id: "kinder", tipo: "entero", etiqueta: "Kinder bis 16 Jahre", min: 0, max: 15, porDefecto: 2 },
    { id: "inAusbildung", tipo: "entero", etiqueta: "Kinder in Ausbildung (ab 15 bis 25 Jahre)", min: 0, max: 15, porDefecto: 0 },
    { id: "kantonKinder", tipo: "moneda", etiqueta: "Kinderzulage in Ihrem Kanton (falls höher)", min: 0, requerido: false, ayuda: "Leer lassen, dann gilt das gesetzliche Minimum." },
    { id: "kantonAusbildung", tipo: "moneda", etiqueta: "Ausbildungszulage in Ihrem Kanton (falls höher)", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    for (const feld of ["kinder", "inAusbildung"] as const) {
      const n = entrada[feld];
      if (!Number.isInteger(n) || n < 0 || n > 15) throw new ErrorEntrada("Bitte eine Zahl von 0 bis 15 eingeben.", feld);
    }
    const minK = valores["ch.kinderzulage"];
    const minA = valores["ch.ausbildungszulage"];
    const hinweise: string[] = [];
    const kz = Math.max(entrada.kantonKinder ?? minK, minK);
    const az = Math.max(entrada.kantonAusbildung ?? minA, minA);
    if ((entrada.kantonKinder ?? minK) < minK || (entrada.kantonAusbildung ?? minA) < minA) hinweise.push("Kein Kanton darf weniger als das gesetzliche Minimum auszahlen. Der Rechner nimmt das Minimum.");
    const monat = redondear(entrada.kinder * kz + entrada.inAusbildung * az);
    return {
      monat,
      jahr: redondear(monat * 12),
      kinderzulage: kz,
      ausbildungszulage: az,
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "monat", etiqueta: "Familienzulagen pro Monat", formato: "moneda", destacada: true },
    { clave: "jahr", etiqueta: "Pro Jahr", formato: "moneda" },
    { clave: "kinderzulage", etiqueta: "Kinderzulage je Kind", formato: "moneda" },
    { clave: "ausbildungszulage", etiqueta: "Ausbildungszulage je Kind", formato: "moneda" },
  ],
});
