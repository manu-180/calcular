import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sk.odchodne",
  mercado: "sk",
  concepto: "propio",
  slug: "odchodne",
  estado: "publicado",
  requiere: { "sk.odchodne": "numero" },
  campos: [{ id: "zarobok", tipo: "moneda", etiqueta: "Priemerný mesačný zárobok", min: 0, porDefecto: 1800 }],
  calcular(e, v, { redondear }) {
    if (e.zarobok <= 0) throw new ErrorEntrada("Zadajte priemerný mesačný zárobok.", "zarobok");
    return { odchodne: redondear(e.zarobok * v["sk.odchodne"]), nasobok: v["sk.odchodne"] };
  },
  resultado: [
    { clave: "odchodne", etiqueta: "Odchodné najmenej", formato: "moneda", destacada: true },
    { clave: "nasobok", etiqueta: "Násobok priemerného zárobku", formato: "numero" },
  ],
});
