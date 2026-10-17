import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.hra-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "hra-calculator",
  estado: "publicado",
  requiere: {
    "in.hra-salary-percent": "mapa",
    "in.hra-rent-excess": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Basic salary plus DA a month", min: 0, porDefecto: 50000, ayuda: "Dearness allowance counts only if your terms of employment include it." },
    { id: "hra", tipo: "moneda", etiqueta: "HRA received a month", min: 0, porDefecto: 20000 },
    { id: "alquiler", tipo: "moneda", etiqueta: "Rent paid a month", min: 0, porDefecto: 18000 },
    { id: "ciudad", tipo: "opcion-dato", dato: "in.hra-salary-percent", etiqueta: "Where you live", porDefecto: "metro" },
    { id: "meses", tipo: "entero", etiqueta: "Months you paid rent in the tax year", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your basic salary.", "salario");
    const tope = enMapa(v["in.hra-salary-percent"], entrada.ciudad);
    const porSalario = porcentaje(entrada.salario, tope);
    const porAlquiler = Math.max(0, entrada.alquiler - porcentaje(entrada.salario, v["in.hra-rent-excess"]));
    const exentoMes = Math.min(entrada.hra, porSalario, porAlquiler);
    const limite =
      exentoMes === entrada.hra ? "The HRA you receive" : exentoMes === porAlquiler ? `Rent paid minus ${v["in.hra-rent-excess"]}% of salary` : `${tope}% of salary`;
    return {
      exentoMes: redondear(exentoMes),
      exentoAnual: redondear(exentoMes * entrada.meses),
      gravableAnual: redondear((entrada.hra - exentoMes) * entrada.meses),
      porSalario: redondear(porSalario),
      porAlquiler: redondear(porAlquiler),
      limite,
    };
  },
  resultado: [
    { clave: "exentoAnual", etiqueta: "HRA exemption for the year", formato: "moneda", destacada: true },
    { clave: "exentoMes", etiqueta: "HRA exemption a month", formato: "moneda" },
    { clave: "gravableAnual", etiqueta: "Taxable HRA for the year", formato: "moneda" },
    { clave: "limite", etiqueta: "Limit that applies", formato: "texto" },
    { clave: "porSalario", etiqueta: "Salary limit a month", formato: "moneda" },
    { clave: "porAlquiler", etiqueta: "Rent limit a month", formato: "moneda" },
  ],
});
