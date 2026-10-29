import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nominaMensual, OPCIONES_LUNES, REQUIERE_NIS, REQUIERE_PAYE, REQUIERE_SURCHARGE } from "../lib/nomina";

export default definirCalculadora({
  id: "tt.net-to-gross-calculator",
  mercado: "tt",
  concepto: "propio",
  slug: "net-to-gross-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_NIS, ...REQUIERE_PAYE, ...REQUIERE_SURCHARGE },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Take-home pay you want each month", min: 0, porDefecto: 12000 },
    { id: "lunes", tipo: "opcion", etiqueta: "Mondays in the pay month", opciones: OPCIONES_LUNES, porDefecto: "promedio" },
    { id: "pension", tipo: "moneda", etiqueta: "Your monthly contribution to an approved pension plan", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Enter the take-home pay you want.", "neto");
    const objetivo = e.neto + e.pension;
    // Búsqueda binaria: el neto sube con el bruto salvo saltos de centavos al cambiar de clase de NIS.
    let bajo = objetivo;
    let alto = objetivo * 2 + 10000;
    for (let i = 0; i < 80; i++) {
      const medio = (bajo + alto) / 2;
      if (nominaMensual(medio, e.lunes, e.pension, false, v, redondear).neto < e.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = Math.ceil(alto * 100) / 100;
    const n = nominaMensual(bruto, e.lunes, e.pension, false, v, redondear);
    return {
      bruto,
      neto: n.neto,
      paye: n.paye,
      nis: n.nis,
      surcharge: n.surcharge,
      total: n.total,
      observaciones: ["The gross figure is the lowest monthly salary that gives at least this take-home pay."],
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Gross monthly salary you need", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Take-home pay on that salary", formato: "moneda" },
    { clave: "paye", etiqueta: "PAYE (income tax)", formato: "moneda" },
    { clave: "nis", etiqueta: "NIS", formato: "moneda" },
    { clave: "surcharge", etiqueta: "Health Surcharge", formato: "moneda" },
    { clave: "total", etiqueta: "Total deductions", formato: "moneda" },
  ],
});
