import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aporteCpf, dolares, GRUPOS_CPF } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.cpf-contribution-calculator",
  mercado: "sg",
  concepto: "aportes-seguridad-social",
  slug: "cpf-contribution-calculator",
  estado: "publicado",
  requiere: {
    "sg.cpf-tasa-empleador": "mapa",
    "sg.cpf-tasa-empleado": "mapa",
    "sg.cpf-factor-gradual": "mapa",
    "sg.cpf-tope-ow": "numero",
    "sg.cpf-tramos-salario": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Total wages for the month", min: 0, porDefecto: 4500, ayuda: "Ordinary wages only: basic pay, fixed allowances and overtime for the month." },
    { id: "edad", tipo: "opcion", etiqueta: "Employee's age group", opciones: GRUPOS_CPF, porDefecto: "55-y-menos" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("Enter the wages for the month.", "salario");
    const tramos = v["sg.cpf-tramos-salario"];
    const c = aporteCpf(entrada.salario, entrada.edad, {
      tasaEmpleador: v["sg.cpf-tasa-empleador"],
      tasaEmpleado: v["sg.cpf-tasa-empleado"],
      factorGradual: v["sg.cpf-factor-gradual"],
      topeOw: v["sg.cpf-tope-ow"],
      tramos,
    });
    const observaciones: string[] = [];
    if (entrada.salario <= enMapa(tramos, "sin-aporte")) observaciones.push(`No CPF is payable on wages of ${dolares(enMapa(tramos, "sin-aporte"))} or less.`);
    else if (entrada.salario <= enMapa(tramos, "solo-empleador")) observaciones.push("At this wage only the employer pays CPF.");
    else if (entrada.salario <= enMapa(tramos, "pleno")) observaciones.push("At this wage the employee's share is phased in, so it is lower than the full rate.");
    if (entrada.salario > v["sg.cpf-tope-ow"]) observaciones.push(`CPF is worked out on the Ordinary Wage ceiling of ${dolares(v["sg.cpf-tope-ow"])}, not on the full wages.`);
    return {
      total: c.total,
      empleado: c.empleado,
      empleador: c.empleador,
      tasaEmpleado: enMapa(v["sg.cpf-tasa-empleado"], entrada.edad),
      tasaEmpleador: enMapa(v["sg.cpf-tasa-empleador"], entrada.edad),
      costoEmpresa: redondear(entrada.salario + c.empleador),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total CPF contribution", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Employee's share (deducted from pay)", formato: "moneda" },
    { clave: "empleador", etiqueta: "Employer's share", formato: "moneda" },
    { clave: "tasaEmpleado", etiqueta: "Full employee rate for this age", formato: "porcentaje", decimales: 1 },
    { clave: "tasaEmpleador", etiqueta: "Full employer rate for this age", formato: "porcentaje", decimales: 1 },
    { clave: "costoEmpresa", etiqueta: "Wages plus employer CPF", formato: "moneda" },
  ],
});
