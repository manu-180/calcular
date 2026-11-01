import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aporteSemanal, claseNis, OPCIONES_LUNES, REQUIERE_NIS, semanasDelMes } from "../lib/nomina";

export default definirCalculadora({
  id: "tt.nis-calculator",
  mercado: "tt",
  concepto: "aportes-seguridad-social",
  slug: "nis-calculator",
  estado: "publicado",
  requiere: REQUIERE_NIS,
  campos: [
    {
      id: "frecuencia",
      tipo: "opcion",
      etiqueta: "How often are you paid?",
      opciones: [
        { valor: "mensual", etiqueta: "Monthly" },
        { valor: "semanal", etiqueta: "Weekly" },
      ],
      porDefecto: "mensual",
    },
    { id: "pago", tipo: "moneda", etiqueta: "Gross pay for the period", min: 0, porDefecto: 10000 },
    { id: "lunes", tipo: "opcion", etiqueta: "Mondays in the pay month", opciones: OPCIONES_LUNES, porDefecto: "4", visibleSi: { frecuencia: ["mensual"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter your gross pay.", "pago");
    const mensual = e.frecuencia === "mensual";
    const escalaEmpleado = mensual ? v["tt.nis-employee-monthly"] : v["tt.nis-employee-weekly"];
    const escalaEmpleador = mensual ? v["tt.nis-employer-monthly"] : v["tt.nis-employer-weekly"];
    const clase = claseNis(escalaEmpleado, e.pago);
    const empleadoSemana = aporteSemanal(escalaEmpleado, e.pago);
    const empleadorSemana = aporteSemanal(escalaEmpleador, e.pago);
    const semanas = mensual ? semanasDelMes(e.lunes ?? "4") : 1;
    const empleado = redondear(empleadoSemana * semanas);
    const empleador = redondear(empleadorSemana * semanas);
    const observaciones: string[] = [];
    if (clase === 0) observaciones.push("Your pay is below the lowest NIS earnings class, so the table has no contribution for it. Check with the NIBTT.");
    if (clase === escalaEmpleado.length) observaciones.push("You are in the top earnings class. Contributions do not go up with pay above this class.");
    return {
      empleado,
      empleador,
      total: redondear(empleado + empleador),
      clase,
      empleadoSemana,
      empleadorSemana,
      empleadoAnual: redondear(empleadoSemana * 52),
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your NIS for the period", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Your employer's NIS for the period", formato: "moneda" },
    { clave: "total", etiqueta: "Total NIS for the period", formato: "moneda" },
    { clave: "clase", etiqueta: "Earnings class", formato: "numero", decimales: 0 },
    { clave: "empleadoSemana", etiqueta: "Your weekly contribution", formato: "moneda" },
    { clave: "empleadorSemana", etiqueta: "Employer's weekly contribution", formato: "moneda" },
    { clave: "empleadoAnual", etiqueta: "Your NIS over 52 weeks", formato: "moneda" },
  ],
});
