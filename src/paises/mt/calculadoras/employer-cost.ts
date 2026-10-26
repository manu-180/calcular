import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sscSemanal } from "../lib/ssc";

export default definirCalculadora({
  id: "mt.employer-cost",
  mercado: "mt",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "borrador",
  requiere: {
    "mt.ssc-rate": "numero",
    "mt.ssc-weekly": "mapa",
    "mt.minimum-wage": "mapa",
    "mt.statutory-bonuses": "mapa",
    "mt.maternity-fund-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross basic salary a year", min: 0, porDefecto: 30000 },
    { id: "desde1962", tipo: "si-no", etiqueta: "The employee was born on or after 1 January 1962", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    const b = v["mt.statutory-bonuses"];
    const bonos = redondear(2 * enMapa(b, "bonus") + 2 * enMapa(b, "allowance"));
    const ssc = sscSemanal(
      entrada.salario / 52,
      true,
      entrada.desde1962,
      { tasa: v["mt.ssc-rate"], semanal: v["mt.ssc-weekly"], minimo: enMapa(v["mt.minimum-wage"], "age-18-plus") },
      redondear,
    );
    const sscAnual = redondear(ssc.semanal * 52);
    const maternidad = redondear(porcentaje(entrada.salario, v["mt.maternity-fund-rate"]));
    const total = redondear(entrada.salario + bonos + sscAnual + maternidad);
    return { total, mensual: redondear(total / 12), bonos, ssc: sscAnual, maternidad };
  },
  resultado: [
    { clave: "total", etiqueta: "Total cost a year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Total cost a month", formato: "moneda" },
    { clave: "bonos", etiqueta: "Statutory bonuses and weekly allowance", formato: "moneda" },
    { clave: "ssc", etiqueta: "Employer social security (Class 1)", formato: "moneda" },
    { clave: "maternidad", etiqueta: "Maternity Leave Trust Fund", formato: "moneda" },
  ],
});
