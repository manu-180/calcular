import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nad } from "../lib/nomina";

export default definirCalculadora({
  id: "na.maternity-leave-calculator",
  mercado: "na",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "na.maternity-weeks": "numero",
    "na.ssc-maternity-rate": "numero",
    "na.ssc-maternity-cap": "numero",
    "na.weeks-per-month": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic wage a month", min: 0, porDefecto: 15000 },
    { id: "meses", tipo: "entero", etiqueta: "Months with your current employer", min: 0, max: 600, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic wage.", "basico");
    const tope = v["na.ssc-maternity-cap"];
    const mensual = redondear(Math.min(porcentaje(e.basico, v["na.ssc-maternity-rate"]), tope));
    const semanas = v["na.maternity-weeks"];
    const total = redondear((mensual / v["na.weeks-per-month"]) * semanas);
    const observaciones: string[] = [];
    if (e.meses < 6) observaciones.push("The Labour Act gives maternity leave after six months of continuous service with the same employer.");
    if (e.basico > tope) observaciones.push(`The benefit is capped at ${nad(tope)} a month.`);
    observaciones.push("Your employer keeps paying the rest of your package, such as allowances and benefits, but not the basic wage.");
    return { mensual, total, semanas, observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "SSC maternity benefit a month", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Benefit for the full leave", formato: "moneda" },
    { clave: "semanas", etiqueta: "Maternity leave", formato: "semanas", decimales: 0 },
  ],
});
