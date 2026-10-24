import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { kes } from "../lib/nomina";

export default definirCalculadora({
  id: "ke.turnover-tax-calculator",
  mercado: "ke",
  concepto: "regimen-simplificado",
  slug: "turnover-tax-calculator",
  estado: "publicado",
  requiere: {
    "ke.tot-rate": "numero",
    "ke.tot-lower": "numero",
    "ke.tot-upper": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Gross sales for the month", min: 0, porDefecto: 400000 },
    { id: "anual", tipo: "moneda", etiqueta: "Expected turnover for the year", min: 0, porDefecto: 4800000, ayuda: "Used to check whether turnover tax applies to you." },
  ],
  calcular(e, v, { redondear }) {
    if (e.ventas < 0) throw new ErrorEntrada("Sales cannot be negative.", "ventas");
    const impuesto = redondear(porcentaje(e.ventas, v["ke.tot-rate"]));
    const aplica = e.anual > v["ke.tot-lower"] && e.anual <= v["ke.tot-upper"];
    const observaciones: string[] = [];
    if (e.anual <= v["ke.tot-lower"]) observaciones.push(`Turnover tax applies only when turnover is more than ${kes(v["ke.tot-lower"])} a year.`);
    if (e.anual > v["ke.tot-upper"]) observaciones.push(`Above ${kes(v["ke.tot-upper"])} a year you leave turnover tax and pay income tax on profit instead.`);
    return {
      impuesto,
      anualEstimado: redondear(porcentaje(e.anual, v["ke.tot-rate"])),
      aplica: aplica ? "Yes" : "No",
      tasa: v["ke.tot-rate"],
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Turnover tax for the month", formato: "moneda", destacada: true },
    { clave: "anualEstimado", etiqueta: "Turnover tax on your expected yearly turnover", formato: "moneda" },
    { clave: "aplica", etiqueta: "Turnover tax applies to you", formato: "texto" },
    { clave: "tasa", etiqueta: "Rate on gross sales", formato: "porcentaje", decimales: 1 },
  ],
});
