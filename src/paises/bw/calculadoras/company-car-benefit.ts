import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuesto } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.company-car-benefit",
  mercado: "bw",
  concepto: "propio",
  slug: "company-car-benefit",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.car-benefit-rate": "numero",
  },
  campos: [
    {
      id: "costo",
      tipo: "moneda",
      etiqueta: "Cost of the car to your employer",
      min: 0,
      porDefecto: 450000,
      ayuda: "If the car is leased, use its market value when the lease started.",
    },
    { id: "salario", tipo: "moneda", etiqueta: "Your taxable salary a month", min: 0, porDefecto: 30000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.costo <= 0) throw new ErrorEntrada("Enter the cost of the car.", "costo");
    const beneficioAnual = porcentaje(entrada.costo, v["bw.car-benefit-rate"]);
    const anual = entrada.salario * 12;
    const extraAnual = impuesto(v["bw.paye-resident"], anual + beneficioAnual) - impuesto(v["bw.paye-resident"], anual);
    return {
      beneficio: redondear(beneficioAnual / 12),
      payeExtra: redondear(extraAnual / 12),
      beneficioAnual: redondear(beneficioAnual),
      payeExtraAnual: redondear(extraAnual),
    };
  },
  resultado: [
    { clave: "payeExtra", etiqueta: "Extra PAYE a month", formato: "moneda", destacada: true },
    { clave: "beneficio", etiqueta: "Car benefit added to your pay a month", formato: "moneda" },
    { clave: "beneficioAnual", etiqueta: "Car benefit a year", formato: "moneda" },
    { clave: "payeExtraAnual", etiqueta: "Extra PAYE a year", formato: "moneda" },
  ],
});
