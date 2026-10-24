import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "li.geburtszulage-rechner",
  mercado: "li",
  concepto: "propio",
  slug: "geburtszulage-rechner",
  estado: "publicado",
  requiere: {
    "li.geburtszulage": "numero",
    "li.geburtszulage-mehrlinge": "numero",
  },
  campos: [{ id: "kinder", tipo: "entero", etiqueta: "Anzahl Kinder dieser Geburt", min: 1, max: 6, porDefecto: 1 }],
  calcular(entrada, valores, { redondear }) {
    if (!Number.isInteger(entrada.kinder) || entrada.kinder < 1 || entrada.kinder > 6) throw new ErrorEntrada("Bitte eine Zahl von 1 bis 6 eingeben.", "kinder");
    const proKind = entrada.kinder > 1 ? valores["li.geburtszulage-mehrlinge"] : valores["li.geburtszulage"];
    return { total: redondear(proKind * entrada.kinder), proKind };
  },
  resultado: [
    { clave: "total", etiqueta: "Geburtszulage insgesamt", formato: "moneda", destacada: true },
    { clave: "proKind", etiqueta: "Geburtszulage pro Kind", formato: "moneda" },
  ],
});
