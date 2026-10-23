import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQUIERE_SSS, sss } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.sss-contribution",
  mercado: "ph",
  concepto: "aportes-seguridad-social",
  slug: "sss-contribution",
  estado: "publicado",
  requiere: REQUIERE_SSS,
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Monthly compensation", min: 0, porDefecto: 25000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter your monthly compensation.", "sueldo");
    const s = sss(entrada.sueldo, v);
    const observaciones: string[] = [];
    if (s.mpf > 0) observaciones.push("The contributions on the salary credit above ₱20,000 go to your MySSS Pension Booster (MPF) account.");
    return {
      empleado: redondear(s.empleado),
      empleador: redondear(s.empleador + s.ec),
      total: redondear(s.total),
      credito: s.credito,
      regular: s.regular,
      mpf: s.mpf,
      ec: s.ec,
      empleadoMpf: redondear(s.empleadoMpf),
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your share (employee)", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer share, including EC", formato: "moneda" },
    { clave: "total", etiqueta: "Total monthly contribution", formato: "moneda" },
    { clave: "credito", etiqueta: "Monthly salary credit", formato: "moneda" },
    { clave: "regular", etiqueta: "Salary credit for Regular SS", formato: "moneda" },
    { clave: "mpf", etiqueta: "Salary credit for MPF", formato: "moneda", ocultarSiCero: true },
    { clave: "ec", etiqueta: "Employees' Compensation (paid by employer)", formato: "moneda" },
    { clave: "empleadoMpf", etiqueta: "Part of your share that goes to MPF", formato: "moneda", ocultarSiCero: true },
  ],
});
