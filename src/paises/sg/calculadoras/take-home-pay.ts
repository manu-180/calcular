import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aporteCpf, dolares, GRUPOS_CPF } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.take-home-pay",
  mercado: "sg",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "sg.cpf-tasa-empleador": "mapa",
    "sg.cpf-tasa-empleado": "mapa",
    "sg.cpf-factor-gradual": "mapa",
    "sg.cpf-tope-ow": "numero",
    "sg.cpf-tramos-salario": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 5000 },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "You are",
      opciones: [
        { valor: "ciudadano-pr", etiqueta: "A Singapore Citizen or PR (third year onwards)" },
        { valor: "extranjero", etiqueta: "A foreigner (Employment Pass, S Pass or work permit)" },
      ],
      porDefecto: "ciudadano-pr",
    },
    { id: "edad", tipo: "opcion", etiqueta: "Your age group for CPF", opciones: GRUPOS_CPF, porDefecto: "55-y-menos" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your gross monthly salary.", "salario");
    const observaciones: string[] = [];
    let cpfEmpleado = 0;
    let cpfEmpleador = 0;
    if (entrada.residencia === "ciudadano-pr") {
      const c = aporteCpf(entrada.salario, entrada.edad, {
        tasaEmpleador: v["sg.cpf-tasa-empleador"],
        tasaEmpleado: v["sg.cpf-tasa-empleado"],
        factorGradual: v["sg.cpf-factor-gradual"],
        topeOw: v["sg.cpf-tope-ow"],
        tramos: v["sg.cpf-tramos-salario"],
      });
      cpfEmpleado = c.empleado;
      cpfEmpleador = c.empleador;
      if (entrada.salario > v["sg.cpf-tope-ow"]) {
        observaciones.push(`CPF is only charged on the first ${dolares(v["sg.cpf-tope-ow"])} of your monthly ordinary wages, so the rest of your salary has no CPF deduction.`);
      }
      observaciones.push("PRs in their first two years pay lower graduated CPF rates unless they and their employer apply for the full rates.");
    } else {
      observaciones.push("The CPF rate tables apply to Singapore Citizens and Permanent Residents, so a foreigner's salary has no CPF deduction.");
    }
    observaciones.push("This is your pay after CPF. Income tax is worked out on your yearly income, so check it with the income tax calculator.");
    const neto = redondear(entrada.salario - cpfEmpleado);
    return {
      neto,
      anual: redondear(neto * 12),
      cpfEmpleado,
      cpfEmpleador,
      cpfTotal: cpfEmpleado + cpfEmpleador,
      costoEmpresa: redondear(entrada.salario + cpfEmpleador),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "cpfEmpleado", etiqueta: "Your CPF contribution", formato: "moneda" },
    { clave: "cpfEmpleador", etiqueta: "Your employer's CPF contribution", formato: "moneda" },
    { clave: "cpfTotal", etiqueta: "Total CPF into your accounts", formato: "moneda" },
    { clave: "costoEmpresa", etiqueta: "Monthly cost to your employer (before levies)", formato: "moneda" },
  ],
});
