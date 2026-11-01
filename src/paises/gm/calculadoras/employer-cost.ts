import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.employer-cost",
  mercado: "gm",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "publicado",
  requiere: {
    "gm.npf-employer-rate": "numero",
    "gm.fps-rate": "numero",
    "gm.iicf-rate": "numero",
    "gm.iicf-cap": "numero",
    "gm.expatriate-payroll-tax": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 10000 },
    { id: "subsidios", tipo: "moneda", etiqueta: "Fixed allowances a month", min: 0, porDefecto: 0 },
    {
      id: "esquema",
      tipo: "opcion",
      etiqueta: "Pension scheme",
      opciones: [
        { valor: "npf", etiqueta: "National Provident Fund (NPF)" },
        { valor: "fps", etiqueta: "Federated Pension Scheme (FPS)" },
      ],
      porDefecto: "npf",
    },
    {
      id: "expatriado",
      tipo: "opcion",
      etiqueta: "The employee is",
      opciones: [
        { valor: "no", etiqueta: "Gambian" },
        { valor: "ecowas", etiqueta: "An expatriate from an ECOWAS country" },
        { valor: "other", etiqueta: "An expatriate from outside ECOWAS" },
      ],
      porDefecto: "no",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter the basic salary.", "basico");
    const bruto = entrada.basico + entrada.subsidios;
    const pension = redondear(entrada.esquema === "npf" ? porcentaje(entrada.basico, v["gm.npf-employer-rate"]) : porcentaje(bruto, v["gm.fps-rate"]));
    const iicf = redondear(Math.min(porcentaje(bruto, v["gm.iicf-rate"]), v["gm.iicf-cap"]));
    const tasas = v["gm.expatriate-payroll-tax"];
    const expatriado = entrada.expatriado === "no" ? 0 : redondear((entrada.expatriado === "ecowas" ? tasas.ecowas : tasas.other) / 12);
    const total = redondear(bruto + pension + iicf + expatriado);
    return {
      total,
      bruto: redondear(bruto),
      pension,
      iicf,
      expatriado,
      anual: redondear(total * 12),
      recargo: ((total - bruto) / bruto) * 100,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Cost to the employer a month", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross salary", formato: "moneda" },
    { clave: "pension", etiqueta: "Employer pension contribution", formato: "moneda" },
    { clave: "iicf", etiqueta: "Industrial injuries fund", formato: "moneda" },
    { clave: "expatriado", etiqueta: "Expatriate payroll tax (a month)", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Cost to the employer a year", formato: "moneda" },
    { clave: "recargo", etiqueta: "On top of gross salary", formato: "porcentaje", decimales: 1 },
  ],
});
