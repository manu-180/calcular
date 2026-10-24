import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesPifss, REQUIERE_PIFSS } from "../lib/pifss";

export default definirCalculadora({
  id: "kw.pifss-calculator",
  mercado: "kw",
  concepto: "aportes-seguridad-social",
  slug: "pifss-calculator",
  estado: "publicado",
  requiere: REQUIERE_PIFSS,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly salary (private sector)", min: 0, porDefecto: 1000 },
    { id: "anios", tipo: "numero", etiqueta: "Years you have already contributed", min: 0, max: 60, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter your monthly salary.", "sueldo");
    const a = aportesPifss(v, entrada.sueldo, entrada.anios, redondear);
    const observaciones: string[] = [];
    if (entrada.sueldo < a.basico) observaciones.push("Your salary is below the minimum contribution salary, so contributions are worked out on the minimum.");
    return { ...a, total: redondear(a.empleado + a.empleador), observaciones };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Deducted from your salary", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Paid by your employer", formato: "moneda" },
    { clave: "total", etiqueta: "Total contribution a month", formato: "moneda" },
    { clave: "empleadoBasico", etiqueta: "Basic Insurance Fund (you)", formato: "moneda" },
    { clave: "empleadoComplementario", etiqueta: "Supplementary Insurance Fund (you)", formato: "moneda", ocultarSiCero: true },
    { clave: "empleadoAumento", etiqueta: "Pension Increase Fund (you)", formato: "moneda" },
    { clave: "empleadoRemuneracion", etiqueta: "Remuneration Fund (you)", formato: "moneda", ocultarSiCero: true },
    { clave: "empleadoDesempleo", etiqueta: "Unemployment Insurance Fund (you)", formato: "moneda" },
    { clave: "basico", etiqueta: "Basic contribution salary", formato: "moneda" },
    { clave: "complementario", etiqueta: "Supplementary contribution salary", formato: "moneda", ocultarSiCero: true },
  ],
});
