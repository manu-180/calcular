import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { apitMensual } from "../lib/nomina";

// La Tabla 2 del IRD da el impuesto sobre un pago global como tasa × EGAR menos una constante y el
// APIT mensual del año. Esa constante es la que deja el resultado igual al impuesto anual sobre el
// total menos el APIT de la Tabla 1, que es como se calcula acá.
export default definirCalculadora({
  id: "lk.bonus-tax-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "bonus-tax-calculator",
  estado: "publicado",
  requiere: {
    "lk.apit-table-1": "escala",
    "lk.income-tax-bands": "escala",
    "lk.personal-relief": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 300000, ayuda: "The calculator assumes you earn it for the 12 months of the year of assessment." },
    { id: "bono", tipo: "moneda", etiqueta: "Bonus or other lump-sum payment", min: 0, porDefecto: 600000, ayuda: "Bonus, leave encashment, salary arrears or shares under an employee share scheme." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bono <= 0) throw new ErrorEntrada("Enter the bonus amount.", "bono");
    const egar = e.sueldo * 12 + e.bono;
    const anual = aplicarEscala(v["lk.income-tax-bands"], Math.max(0, egar - v["lk.personal-relief"]));
    const mensual = redondear(apitMensual(e.sueldo, v["lk.apit-table-1"]));
    const impuesto = redondear(Math.max(0, anual - mensual * 12));
    return {
      impuesto,
      neto: redondear(e.bono - impuesto),
      tasa: (impuesto / e.bono) * 100,
      egar,
      apitMensual: mensual,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "APIT on the bonus", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Bonus after APIT", formato: "moneda" },
    { clave: "tasa", etiqueta: "Share of the bonus that goes in tax", formato: "porcentaje", decimales: 1 },
    { clave: "egar", etiqueta: "Estimated gross aggregate remuneration for the year", formato: "moneda" },
    { clave: "apitMensual", etiqueta: "Monthly APIT on your salary", formato: "moneda" },
  ],
});
