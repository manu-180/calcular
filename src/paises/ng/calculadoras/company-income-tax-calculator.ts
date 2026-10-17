import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.company-income-tax-calculator",
  mercado: "ng",
  concepto: "propio",
  slug: "company-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "ng.cit-rate": "numero",
    "ng.small-company-turnover": "numero",
    "ng.small-company-assets": "numero",
    "ng.development-levy": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Gross turnover for the year", min: 0, porDefecto: 250000000 },
    { id: "activos", tipo: "moneda", etiqueta: "Total fixed assets", min: 0, porDefecto: 80000000 },
    { id: "beneficio", tipo: "moneda", etiqueta: "Assessable (taxable) profits", min: 0, porDefecto: 40000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.beneficio > entrada.ventas) throw new ErrorEntrada("Profits cannot be higher than turnover.", "beneficio");
    const pequena = entrada.ventas <= v["ng.small-company-turnover"] && entrada.activos <= v["ng.small-company-assets"];
    const cit = pequena ? 0 : redondear(porcentaje(entrada.beneficio, v["ng.cit-rate"]));
    const levy = pequena ? 0 : redondear(porcentaje(entrada.beneficio, v["ng.development-levy"]));
    return {
      total: redondear(cit + levy),
      cit,
      levy,
      categoria: pequena ? "Small company" : "Other company",
      efectiva: entrada.beneficio > 0 ? ((cit + levy) / entrada.beneficio) * 100 : 0,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Companies income tax plus development levy", formato: "moneda", destacada: true },
    { clave: "categoria", etiqueta: "Your company is", formato: "texto" },
    { clave: "cit", etiqueta: "Companies income tax", formato: "moneda" },
    { clave: "levy", etiqueta: "Development levy", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of profits", formato: "porcentaje", decimales: 2 },
  ],
});
