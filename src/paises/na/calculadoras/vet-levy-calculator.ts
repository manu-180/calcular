import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nad } from "../lib/nomina";

export default definirCalculadora({
  id: "na.vet-levy-calculator",
  mercado: "na",
  concepto: "propio",
  slug: "vet-levy-calculator",
  estado: "publicado",
  requiere: {
    "na.vet-levy-rate": "numero",
    "na.vet-levy-threshold": "numero",
  },
  campos: [{ id: "nomina", tipo: "moneda", etiqueta: "Total payroll for the financial year", min: 0, porDefecto: 2400000 }],
  calcular(e, v, { redondear }) {
    if (e.nomina <= 0) throw new ErrorEntrada("Enter your yearly payroll.", "nomina");
    const umbral = v["na.vet-levy-threshold"];
    const aplica = e.nomina >= umbral;
    const anual = aplica ? redondear(porcentaje(e.nomina, v["na.vet-levy-rate"])) : 0;
    return {
      mensual: redondear(anual / 12),
      anual,
      observaciones: aplica
        ? ["Pay it monthly to the Namibia Training Authority, on or before the 20th of the following month."]
        : [`A payroll below ${nad(umbral)} a year does not pay the VET levy.`],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "VET levy a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "VET levy for the year", formato: "moneda" },
  ],
});
