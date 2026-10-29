import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { napsa } from "../lib/nomina";

export default definirCalculadora({
  id: "zm.employer-cost-calculator",
  mercado: "zm",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  // El techo de NAPSA de 2026 no se pudo leer en napsa.co.zm (ver datos.json).
  estado: "borrador",
  requiere: {
    "zm.napsa-rate": "numero",
    "zm.napsa-ceiling": "numero",
    "zm.nhima-rate": "numero",
    "zm.sdl-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 10000 },
    { id: "asignaciones", tipo: "moneda", etiqueta: "Allowances for the month", min: 0, porDefecto: 0 },
    {
      id: "sdl",
      tipo: "si-no",
      etiqueta: "The business pays the Skills Development Levy",
      porDefecto: true,
      ayuda: "Employers in the public service, approved public benefit organisations and businesses with turnover below K800,000 a year are exempt.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter the basic pay for the month.", "basico");
    const bruto = e.basico + e.asignaciones;
    const aporteNapsa = redondear(napsa(bruto, v["zm.napsa-rate"], v["zm.napsa-ceiling"]));
    const aporteNhima = redondear(porcentaje(e.basico, v["zm.nhima-rate"]));
    const levy = e.sdl ? redondear(porcentaje(bruto, v["zm.sdl-rate"])) : 0;
    const extra = redondear(aporteNapsa + aporteNhima + levy);
    return {
      costo: redondear(bruto + extra),
      bruto,
      napsa: aporteNapsa,
      nhima: aporteNhima,
      sdl: levy,
      extra,
      costoAnual: redondear((bruto + extra) * 12),
    };
  },
  resultado: [
    { clave: "costo", etiqueta: "Total cost to the employer for the month", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross pay", formato: "moneda" },
    { clave: "napsa", etiqueta: "Employer NAPSA", formato: "moneda" },
    { clave: "nhima", etiqueta: "Employer NHIMA", formato: "moneda" },
    { clave: "sdl", etiqueta: "Skills Development Levy", formato: "moneda", ocultarSiCero: true },
    { clave: "extra", etiqueta: "Employer charges on top of pay", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
  ],
});
