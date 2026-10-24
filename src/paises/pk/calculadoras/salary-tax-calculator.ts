import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.salary-tax-calculator",
  mercado: "pk",
  concepto: "impuesto-renta",
  slug: "salary-tax-calculator",
  estado: "publicado",
  requiere: {
    "pk.salary-tax-slabs": "escala",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly taxable salary", min: 0, porDefecto: 150000 },
    { id: "extra", tipo: "moneda", etiqueta: "Bonus or other salary for the year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensual < 0) throw new ErrorEntrada("Salary cannot be negative.", "mensual");
    const anual = entrada.mensual * 12 + entrada.extra;
    const escala = v["pk.salary-tax-slabs"];
    const impuesto = redondear(aplicarEscalaMarginal(escala, anual));
    let marginal = 0;
    for (const f of escala) if (anual > f.desde) marginal = f.tasa;
    return {
      impuesto,
      mensualImpuesto: redondear(impuesto / 12),
      anual: redondear(anual),
      neto: redondear(anual - impuesto),
      efectiva: anual > 0 ? (impuesto / anual) * 100 : 0,
      marginal,
    };
  },
  resultado: [
    { clave: "mensualImpuesto", etiqueta: "Tax a month", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Tax for the year", formato: "moneda" },
    { clave: "anual", etiqueta: "Taxable salary for the year", formato: "moneda" },
    { clave: "neto", etiqueta: "Salary after tax for the year", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Top slab rate", formato: "porcentaje", decimales: 0 },
  ],
});
