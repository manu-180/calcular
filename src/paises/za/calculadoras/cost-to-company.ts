import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { rand } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.cost-to-company",
  mercado: "za",
  concepto: "costo-empleador",
  slug: "cost-to-company",
  estado: "publicado",
  requiere: {
    "za.uif-employer-rate": "numero",
    "za.uif-ceiling-monthly": "numero",
    "za.sdl-rate": "numero",
    "za.sdl-threshold": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross salary a month", min: 0, porDefecto: 25000 },
    { id: "beneficios", tipo: "moneda", etiqueta: "Employer contributions a month (pension, medical aid, other benefits)", min: 0, porDefecto: 0 },
    { id: "sdl", tipo: "si-no", etiqueta: "The company's total payroll is above the SDL threshold", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter the monthly salary.", "salario");
    const uif = redondear((Math.min(entrada.salario, v["za.uif-ceiling-monthly"]) * v["za.uif-employer-rate"]) / 100);
    const sdl = entrada.sdl ? redondear(((entrada.salario + entrada.beneficios) * v["za.sdl-rate"]) / 100) : 0;
    const mensual = redondear(entrada.salario + entrada.beneficios + uif + sdl);
    const observaciones = [
      entrada.sdl
        ? "SDL is worked out here on the salary plus the benefits you entered."
        : `Employers who pay less than ${rand(v["za.sdl-threshold"])} a year in salaries do not pay SDL.`,
      "Workplace injury cover (COIDA) is not included.",
    ];
    return {
      mensual,
      anual: redondear(mensual * 12),
      uif,
      sdl,
      extra: redondear(mensual - entrada.salario),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Cost to company a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Cost to company a year", formato: "moneda" },
    { clave: "uif", etiqueta: "Employer UIF a month", formato: "moneda" },
    { clave: "sdl", etiqueta: "Skills Development Levy a month", formato: "moneda", ocultarSiCero: true },
    { clave: "extra", etiqueta: "Cost on top of the salary a month", formato: "moneda" },
  ],
});
