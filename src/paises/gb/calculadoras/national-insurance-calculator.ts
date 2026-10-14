import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { niPorTramos } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.national-insurance-calculator",
  mercado: "gb",
  concepto: "aportes-seguridad-social",
  slug: "national-insurance-calculator",
  estado: "publicado",
  requiere: {
    "gb.ni-primary-threshold": "numero",
    "gb.ni-upper-earnings-limit": "numero",
    "gb.ni-employee-main-rate": "numero",
    "gb.ni-employee-upper-rate": "numero",
    "gb.ni-secondary-threshold": "numero",
    "gb.ni-employer-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Annual salary before tax", min: 0, porDefecto: 30000 },
    { id: "jubilado", tipo: "si-no", etiqueta: "You are over State Pension age", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("Salary cannot be negative.", "salario");
    const empleado = entrada.jubilado
      ? 0
      : redondear(
          niPorTramos(entrada.salario, {
            umbral: v["gb.ni-primary-threshold"],
            limite: v["gb.ni-upper-earnings-limit"],
            tasa: v["gb.ni-employee-main-rate"],
            tasaAlta: v["gb.ni-employee-upper-rate"],
          }),
        );
    const empleador = redondear((Math.max(0, entrada.salario - v["gb.ni-secondary-threshold"]) * v["gb.ni-employer-rate"]) / 100);
    const observaciones: string[] = [];
    if (entrada.jubilado) observaciones.push("Once you reach State Pension age you stop paying employee National Insurance. Your employer still pays its share.");
    return {
      empleado,
      mensual: redondear(empleado / 12),
      semanal: redondear(empleado / 52),
      efectiva: entrada.salario > 0 ? (empleado / entrada.salario) * 100 : 0,
      empleador,
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your National Insurance for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "A month", formato: "moneda" },
    { clave: "semanal", etiqueta: "A week", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your salary", formato: "porcentaje", decimales: 2 },
    { clave: "empleador", etiqueta: "Employer National Insurance on top", formato: "moneda" },
  ],
});
