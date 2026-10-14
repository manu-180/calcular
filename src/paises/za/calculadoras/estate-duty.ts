import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "za.estate-duty",
  mercado: "za",
  concepto: "propio",
  slug: "estate-duty",
  estado: "publicado",
  requiere: {
    "za.estate-duty": "escala",
    "za.estate-duty-abatement": "numero",
  },
  campos: [
    { id: "bienes", tipo: "moneda", etiqueta: "Value of the estate's property", min: 0, porDefecto: 12000000 },
    { id: "deudas", tipo: "moneda", etiqueta: "Liabilities and other allowable deductions", min: 0, porDefecto: 1000000 },
    { id: "conyuge", tipo: "moneda", etiqueta: "Property left to a surviving spouse", min: 0, porDefecto: 0 },
    { id: "pbo", tipo: "moneda", etiqueta: "Bequests to public benefit organisations", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bienes <= 0) throw new ErrorEntrada("Enter the value of the estate.", "bienes");
    const neto = Math.max(0, entrada.bienes - entrada.deudas - entrada.conyuge - entrada.pbo);
    const sujeto = Math.max(0, neto - v["za.estate-duty-abatement"]);
    const impuesto = redondear(aplicarEscalaMarginal(v["za.estate-duty"], sujeto));
    return {
      impuesto,
      neto: redondear(neto),
      sujeto: redondear(sujeto),
      efectiva: entrada.bienes > 0 ? (impuesto / entrada.bienes) * 100 : 0,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Estate duty", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Estate after deductions", formato: "moneda" },
    { clave: "sujeto", etiqueta: "Dutiable amount after the basic deduction", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Estate duty as a share of the property", formato: "porcentaje", decimales: 2 },
  ],
});
