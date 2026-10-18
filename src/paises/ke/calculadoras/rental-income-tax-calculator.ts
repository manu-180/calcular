import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { kes } from "../lib/nomina";

export default definirCalculadora({
  id: "ke.rental-income-tax-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "rental-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "ke.mri-rate": "numero",
    "ke.mri-lower": "numero",
    "ke.mri-upper": "numero",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Gross rent received this month", min: 0, porDefecto: 60000 },
    { id: "anual", tipo: "moneda", etiqueta: "Gross rent expected for the year", min: 0, porDefecto: 720000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.renta < 0) throw new ErrorEntrada("Rent cannot be negative.", "renta");
    const impuesto = redondear(porcentaje(e.renta, v["ke.mri-rate"]));
    const observaciones: string[] = [];
    if (e.anual <= v["ke.mri-lower"]) observaciones.push(`Monthly rental income tax applies when residential rent is more than ${kes(v["ke.mri-lower"])} a year.`);
    if (e.anual > v["ke.mri-upper"]) observaciones.push(`Above ${kes(v["ke.mri-upper"])} a year you declare the rent in your annual return with your other income.`);
    return {
      impuesto,
      neto: redondear(e.renta - impuesto),
      anualEstimado: redondear(porcentaje(e.anual, v["ke.mri-rate"])),
      tasa: v["ke.mri-rate"],
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Rental income tax for the month", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Rent left after tax", formato: "moneda" },
    { clave: "anualEstimado", etiqueta: "Tax on your expected rent for the year", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate on gross rent", formato: "porcentaje", decimales: 1 },
  ],
});
