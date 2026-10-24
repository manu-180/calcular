import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.paye-calculator",
  mercado: "ug",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "borrador",
  requiere: {
    "ug.paye-bands": "escala",
  },
  campos: [{ id: "mensual", tipo: "moneda", etiqueta: "Monthly gross pay", min: 0, porDefecto: 1500000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensual < 0) throw new ErrorEntrada("Pay cannot be negative.", "mensual");
    const anual = entrada.mensual * 12;
    const impuesto = aplicarEscalaMarginal(v["ug.paye-bands"], anual);
    return { mensual: redondear(impuesto / 12), anual: redondear(impuesto) };
  },
  resultado: [
    { clave: "mensual", etiqueta: "PAYE a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "PAYE a year", formato: "moneda" },
  ],
});
