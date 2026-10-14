import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "za.donations-tax",
  mercado: "za",
  concepto: "propio",
  slug: "donations-tax",
  estado: "publicado",
  requiere: {
    "za.donations-tax": "escala",
    "za.donations-exemption": "numero",
  },
  campos: [
    { id: "donaciones", tipo: "moneda", etiqueta: "Value of your donations this tax year", min: 0, porDefecto: 500000 },
    { id: "anteriores", tipo: "moneda", etiqueta: "Taxable donations you made since 1 March 2018, before this tax year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.donaciones <= 0) throw new ErrorEntrada("Enter the value of your donations.", "donaciones");
    const exento = Math.min(entrada.donaciones, v["za.donations-exemption"]);
    const gravable = entrada.donaciones - exento;
    const escala = v["za.donations-tax"];
    const impuesto = redondear(aplicarEscalaMarginal(escala, entrada.anteriores + gravable) - aplicarEscalaMarginal(escala, entrada.anteriores));
    return { impuesto, exento, gravable: redondear(gravable), acumulado: redondear(entrada.anteriores + gravable) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Donations tax", formato: "moneda", destacada: true },
    { clave: "exento", etiqueta: "Exempt part this tax year", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable donations this tax year", formato: "moneda" },
    { clave: "acumulado", etiqueta: "Taxable donations since 1 March 2018", formato: "moneda" },
  ],
});
