import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aporteCpf, GRUPOS_CPF } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.employer-cost-calculator",
  mercado: "sg",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "sg.cpf-tasa-empleador": "mapa",
    "sg.cpf-tasa-empleado": "mapa",
    "sg.cpf-factor-gradual": "mapa",
    "sg.cpf-tope-ow": "numero",
    "sg.cpf-tramos-salario": "mapa",
    "sg.sdl-tasa": "numero",
    "sg.sdl-limites": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Employee's monthly wages", min: 0, porDefecto: 4000 },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Employee is",
      opciones: [
        { valor: "ciudadano-pr", etiqueta: "A Singapore Citizen or PR (third year onwards)" },
        { valor: "extranjero", etiqueta: "A foreigner" },
      ],
      porDefecto: "ciudadano-pr",
    },
    { id: "edad", tipo: "opcion", etiqueta: "Employee's age group", opciones: GRUPOS_CPF, porDefecto: "55-y-menos" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter the monthly wages.", "salario");
    const cpf =
      entrada.residencia === "ciudadano-pr"
        ? aporteCpf(entrada.salario, entrada.edad, {
            tasaEmpleador: v["sg.cpf-tasa-empleador"],
            tasaEmpleado: v["sg.cpf-tasa-empleado"],
            factorGradual: v["sg.cpf-factor-gradual"],
            topeOw: v["sg.cpf-tope-ow"],
            tramos: v["sg.cpf-tramos-salario"],
          }).empleador
        : 0;
    const lim = v["sg.sdl-limites"];
    let sdl = redondear((entrada.salario * v["sg.sdl-tasa"]) / 100);
    if (entrada.salario < enMapa(lim, "salario-minimo")) sdl = enMapa(lim, "minimo");
    if (entrada.salario > enMapa(lim, "salario-maximo")) sdl = enMapa(lim, "maximo");
    const mensual = redondear(entrada.salario + cpf + sdl);
    const observaciones = [
      "The Skills Development Levy is payable for all employees working in Singapore, including part-time, casual and temporary staff. The total for all your staff is rounded down to the dollar.",
    ];
    if (entrada.residencia === "extranjero") observaciones.push("For foreign employees, SDL is paid directly to the national skills agency instead of through CPF. Other costs tied to the work pass are not included.");
    return { mensual, anual: redondear(mensual * 12), cpf, sdl, sobreSalario: ((mensual - entrada.salario) / entrada.salario) * 100, observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Total monthly cost", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Total cost over 12 months", formato: "moneda" },
    { clave: "cpf", etiqueta: "Employer CPF", formato: "moneda" },
    { clave: "sdl", etiqueta: "Skills Development Levy", formato: "moneda" },
    { clave: "sobreSalario", etiqueta: "On top of the wages", formato: "porcentaje", decimales: 2 },
  ],
});
