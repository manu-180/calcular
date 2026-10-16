import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares, filaPorMonto } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.kiwisaver-calculator",
  mercado: "nz",
  concepto: "propio",
  slug: "kiwisaver-calculator",
  estado: "publicado",
  requiere: {
    "nz.kiwisaver-employer-rate": "numero",
    "nz.kiwisaver-reduced-rate": "numero",
    "nz.esct-rates": "escala",
    "nz.kiwisaver-government-rate": "numero",
    "nz.kiwisaver-government-max": "numero",
    "nz.kiwisaver-government-income-cap": "numero",
    "nz.kiwisaver-government-full-contribution": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your yearly salary or wages before tax", min: 0, porDefecto: 70000 },
    {
      id: "tasa",
      tipo: "opcion",
      etiqueta: "Your contribution rate",
      opciones: [
        { valor: "3", etiqueta: "3% (temporary rate reduction)" },
        { valor: "3.5", etiqueta: "3.5% (default)" },
        { valor: "4", etiqueta: "4%" },
        { valor: "6", etiqueta: "6%" },
        { valor: "8", etiqueta: "8%" },
        { valor: "10", etiqueta: "10%" },
      ],
      porDefecto: "3.5",
    },
    { id: "edad", tipo: "entero", etiqueta: "Your age", min: 0, max: 120, porDefecto: 30 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your yearly salary or wages.", "salario");
    const tasa = Number(entrada.tasa);
    const reducida = tasa === v["nz.kiwisaver-reduced-rate"];
    const tasaEmpleador = reducida ? Math.min(tasa, v["nz.kiwisaver-employer-rate"]) : v["nz.kiwisaver-employer-rate"];
    const empleado = redondear((entrada.salario * tasa) / 100);
    const empleadorBruto = redondear((entrada.salario * tasaEmpleador) / 100);
    const tasaEsct = filaPorMonto(v["nz.esct-rates"], entrada.salario + empleadorBruto).tasa;
    const esct = redondear((empleadorBruto * tasaEsct) / 100);
    const empleadorNeto = redondear(empleadorBruto - esct);
    const edadOk = entrada.edad >= 16 && entrada.edad < 65;
    const gobierno =
      edadOk && entrada.salario <= v["nz.kiwisaver-government-income-cap"]
        ? redondear(Math.min((empleado * v["nz.kiwisaver-government-rate"]) / 100, v["nz.kiwisaver-government-max"]))
        : 0;
    const observaciones: string[] = [];
    if (entrada.salario > v["nz.kiwisaver-government-income-cap"]) {
      observaciones.push(`With taxable income over ${dolares(v["nz.kiwisaver-government-income-cap"])} you don't get the government contribution.`);
    } else if (!edadOk) {
      observaciones.push("The government contribution is for members aged 16 to 65.");
    }
    if (reducida) observaciones.push("On a temporary rate reduction your employer can also contribute at 3%. You need to reapply after 12 months.");
    return {
      total: redondear(empleado + empleadorNeto + gobierno),
      empleado,
      quincenal: redondear(empleado / 26),
      empleadorBruto,
      tasaEsct,
      esct,
      empleadorNeto,
      gobierno,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Into your KiwiSaver a year", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Your contributions", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Your contribution a fortnight", formato: "moneda" },
    { clave: "empleadorBruto", etiqueta: "Employer contribution before tax", formato: "moneda" },
    { clave: "tasaEsct", etiqueta: "ESCT rate", formato: "porcentaje", decimales: 1 },
    { clave: "esct", etiqueta: "Employer superannuation contribution tax", formato: "moneda" },
    { clave: "empleadorNeto", etiqueta: "Employer contribution after tax", formato: "moneda" },
    { clave: "gobierno", etiqueta: "Government contribution", formato: "moneda" },
  ],
});
