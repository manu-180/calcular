import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.tevet-levy-calculator",
  mercado: "mw",
  concepto: "propio",
  slug: "tevet-levy-calculator",
  estado: "publicado",
  requiere: {
    "mw.tevet-rate": "numero",
    "mw.tevet-penalty": "numero",
  },
  campos: [
    {
      id: "nomina",
      tipo: "moneda",
      etiqueta: "Basic payroll for the year",
      min: 0,
      porDefecto: 60000000,
      ayuda: "The basic pay of all your employees for the year, without allowances.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.nomina <= 0) throw new ErrorEntrada("Enter the basic payroll for the year.", "nomina");
    const levy = redondear(porcentaje(e.nomina, v["mw.tevet-rate"]));
    return { levy, mensual: redondear(levy / 12), multa: redondear(porcentaje(levy, v["mw.tevet-penalty"])) };
  },
  resultado: [
    { clave: "levy", etiqueta: "TEVET levy for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Monthly instalment over 12 months", formato: "moneda" },
    { clave: "multa", etiqueta: "Penalty if it goes unpaid", formato: "moneda" },
  ],
});
