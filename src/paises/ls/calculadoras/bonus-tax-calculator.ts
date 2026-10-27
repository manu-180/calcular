import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { payeMensual } from "../lib/comun";

export default definirCalculadora({
  id: "ls.bonus-tax-calculator",
  mercado: "ls",
  concepto: "propio",
  slug: "bonus-tax-calculator",
  estado: "publicado",
  requiere: {
    "ls.income-tax-bands": "escala",
    "ls.tax-credit": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your normal gross salary a month", min: 0, porDefecto: 10000 },
    { id: "bono", tipo: "moneda", etiqueta: "Bonus paid this month", min: 0, porDefecto: 10000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bono <= 0) throw new ErrorEntrada("Enter the bonus amount.", "bono");
    const bandas = v["ls.income-tax-bands"];
    const credito = v["ls.tax-credit"];
    const sinBono = redondear(payeMensual(bandas, credito, entrada.salario));
    const conBono = redondear(payeMensual(bandas, credito, entrada.salario + entrada.bono));
    const impuesto = redondear(conBono - sinBono);
    return {
      neto: redondear(entrada.bono - impuesto),
      impuesto,
      sinBono,
      conBono,
      tasa: (impuesto / entrada.bono) * 100,
      observaciones: ["Worked out the way PAYE tables are applied: the bonus is added to the month it is paid in. Your yearly tax can differ slightly once the year is assessed."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Bonus after tax", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "PAYE on the bonus", formato: "moneda" },
    { clave: "sinBono", etiqueta: "PAYE in a normal month", formato: "moneda" },
    { clave: "conBono", etiqueta: "PAYE in the bonus month", formato: "moneda" },
    { clave: "tasa", etiqueta: "Share of the bonus that goes to tax", formato: "porcentaje", decimales: 1 },
  ],
});
