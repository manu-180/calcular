import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "za.turnover-tax",
  mercado: "za",
  concepto: "regimen-simplificado",
  slug: "turnover-tax",
  estado: "publicado",
  requiere: {
    "za.turnover-tax": "escala",
  },
  campos: [{ id: "facturacion", tipo: "moneda", etiqueta: "Taxable turnover for the year", min: 0, porDefecto: 800000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.facturacion <= 0) throw new ErrorEntrada("Enter your turnover for the year.", "facturacion");
    const impuesto = redondear(aplicarEscala(v["za.turnover-tax"], entrada.facturacion));
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      efectiva: (impuesto / entrada.facturacion) * 100,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Turnover tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Average a month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Turnover tax as a share of turnover", formato: "porcentaje", decimales: 2 },
  ],
});
