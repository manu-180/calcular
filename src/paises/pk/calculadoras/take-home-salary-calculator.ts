import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.take-home-salary-calculator",
  mercado: "pk",
  concepto: "sueldo-neto",
  slug: "take-home-salary-calculator",
  estado: "publicado",
  requiere: {
    "pk.salary-tax-slabs": "escala",
    "pk.eobi-employee": "numero",
    "pk.minimum-wage": "numero",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 150000 },
    { id: "eobi", tipo: "si-no", etiqueta: "You are registered with EOBI", porDefecto: true },
    { id: "otros", tipo: "moneda", etiqueta: "Other monthly deductions (provident fund, loans)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensual <= 0) throw new ErrorEntrada("Enter your monthly salary.", "mensual");
    const impuesto = redondear(aplicarEscalaMarginal(v["pk.salary-tax-slabs"], entrada.mensual * 12) / 12);
    const eobi = entrada.eobi ? redondear(porcentaje(v["pk.minimum-wage"], v["pk.eobi-employee"])) : 0;
    const neto = redondear(entrada.mensual - impuesto - eobi - entrada.otros);
    return { neto, impuesto, eobi, anual: redondear(neto * 12) };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home salary a month", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Income tax a month", formato: "moneda" },
    { clave: "eobi", etiqueta: "EOBI (your 1%)", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Take-home for the year", formato: "moneda" },
  ],
});
