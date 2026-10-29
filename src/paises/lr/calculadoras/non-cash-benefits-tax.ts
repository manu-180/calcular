import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual } from "../lib/impuestos";

export default definirCalculadora({
  id: "lr.non-cash-benefits-tax",
  mercado: "lr",
  concepto: "propio",
  slug: "non-cash-benefits-tax",
  estado: "publicado",
  requiere: {
    "lr.pit-bands": "escala",
    "lr.non-cash-exemption": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross cash salary for the year", min: 0, porDefecto: 480000 },
    { id: "beneficios", tipo: "moneda", etiqueta: "Market value of non-cash benefits for the year", min: 0, porDefecto: 240000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.beneficios <= 0) throw new ErrorEntrada("Enter the value of your non-cash benefits.", "beneficios");
    if (entrada.salario < 0) throw new ErrorEntrada("Enter your cash salary.", "salario");
    const exento = Math.min(entrada.beneficios, v["lr.non-cash-exemption"]);
    const gravados = entrada.beneficios - exento;
    const sin = impuestoAnual(v["lr.pit-bands"], entrada.salario);
    const con = impuestoAnual(v["lr.pit-bands"], entrada.salario + gravados);
    const extra = redondear(con - sin);
    return { extra, mensual: redondear(extra / 12), exento: redondear(exento), gravados: redondear(gravados), total: redondear(con) };
  },
  resultado: [
    { clave: "extra", etiqueta: "Extra income tax for the year from your benefits", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Extra income tax a month", formato: "moneda" },
    { clave: "exento", etiqueta: "Tax-free part of your benefits", formato: "moneda" },
    { clave: "gravados", etiqueta: "Taxable part of your benefits", formato: "moneda" },
    { clave: "total", etiqueta: "Total income tax for the year", formato: "moneda" },
  ],
});
