import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, REQUIERE_PAYE } from "../lib/nomina";

export default definirCalculadora({
  id: "tt.bonus-tax-calculator",
  mercado: "tt",
  concepto: "propio",
  slug: "bonus-tax-calculator",
  estado: "publicado",
  requiere: REQUIERE_PAYE,
  campos: [
    { id: "bono", tipo: "moneda", etiqueta: "Bonus before tax", min: 0, porDefecto: 20000 },
    { id: "salario", tipo: "moneda", etiqueta: "Your salary for the year, without the bonus", min: 0, porDefecto: 180000 },
    { id: "nis", tipo: "moneda", etiqueta: "NIS you pay in the year", min: 0, porDefecto: 0, ayuda: "Your share only. Leave it at 0 if you are not sure." },
    { id: "pension", tipo: "moneda", etiqueta: "Pension and annuity contributions in the year", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bono <= 0) throw new ErrorEntrada("Enter the bonus.", "bono");
    const sin = impuestoAnual(e.salario, e.nis, e.pension, 0, v);
    const con = impuestoAnual(e.salario + e.bono, e.nis, e.pension, 0, v);
    const impuesto = redondear(con.impuesto - sin.impuesto);
    return {
      neto: redondear(e.bono - impuesto),
      impuesto,
      tasa: (impuesto / e.bono) * 100,
      observaciones: ["NIS on the bonus is not included. It depends on the earnings class of the pay period in which the bonus is paid."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Bonus after income tax", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Income tax on the bonus", formato: "moneda" },
    { clave: "tasa", etiqueta: "Share of the bonus paid in tax", formato: "porcentaje", decimales: 1 },
  ],
});
