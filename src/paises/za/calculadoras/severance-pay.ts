import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoLumpSum } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.severance-pay",
  mercado: "za",
  concepto: "indemnizacion-despido",
  slug: "severance-pay",
  estado: "publicado",
  requiere: {
    "za.severance-weeks-per-year": "numero",
    "za.weeks-per-month": "numero",
    "za.lump-sum-retirement-table": "escala",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly remuneration", min: 0, porDefecto: 20000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of continuous service", min: 0, max: 60, porDefecto: 6 },
    { id: "extra", tipo: "moneda", etiqueta: "Extra severance your employer offers (optional)", min: 0, requerido: false },
    { id: "anteriores", tipo: "moneda", etiqueta: "Earlier retirement or severance lump sums (optional)", min: 0, requerido: false, ayuda: "Lump sums you already received count towards the same tax table, so they push this one into a higher bracket." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly remuneration.", "salario");
    const semanal = redondear(entrada.salario / v["za.weeks-per-month"]);
    const minimo = redondear(semanal * v["za.severance-weeks-per-year"] * entrada.anios);
    const total = redondear(minimo + (entrada.extra ?? 0));
    const impuesto = redondear(impuestoLumpSum(v["za.lump-sum-retirement-table"], total, entrada.anteriores ?? 0));
    const observaciones = entrada.anios === 0 ? ["Statutory severance is paid for each completed year, so with less than a year there is no legal minimum."] : [];
    return { minimo, semanal, total, impuesto, neto: redondear(total - impuesto), observaciones };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Minimum severance pay", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "One week's remuneration", formato: "moneda" },
    { clave: "total", etiqueta: "Total severance benefit", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Tax on the severance benefit", formato: "moneda" },
    { clave: "neto", etiqueta: "Severance after tax", formato: "moneda" },
  ],
});
