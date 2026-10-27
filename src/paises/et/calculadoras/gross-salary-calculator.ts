import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoDesdeNeto, nomina, REQUIERE_NOMINA } from "../lib/nomina";

export default definirCalculadora({
  id: "et.gross-salary-calculator",
  mercado: "et",
  concepto: "propio",
  slug: "gross-salary-calculator",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Net monthly salary you want to receive", min: 0, porDefecto: 10000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Enter the net salary you want each month.", "neto");
    const bandas = v["et.employment-income-tax"];
    const tasa = v["et.pension-employee"];
    const bruto = redondear(brutoDesdeNeto(e.neto, bandas, tasa));
    const n = nomina(bruto, bandas, tasa);
    const impuesto = redondear(n.impuesto);
    const pension = redondear(n.pension);
    return {
      bruto,
      impuesto,
      pension,
      neto: redondear(bruto - impuesto - pension),
      marginal: n.marginal,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Gross salary needed", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Employment income tax on that salary", formato: "moneda" },
    { clave: "pension", etiqueta: "Employee pension contribution", formato: "moneda" },
    { clave: "neto", etiqueta: "Net salary you receive", formato: "moneda" },
    { clave: "marginal", etiqueta: "Tax rate of the band", formato: "porcentaje", decimales: 0 },
  ],
});
