import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.shif-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "shif-calculator",
  estado: "publicado",
  requiere: {
    "ke.shif-rate": "numero",
    "ke.shif-minimum": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "How you earn",
      opciones: [
        { valor: "salaried", etiqueta: "Salaried (your employer deducts it)" },
        { valor: "non-salaried", etiqueta: "Self-employed or informal (household income from means testing)" },
      ],
      porDefecto: "salaried",
    },
    { id: "ingreso", tipo: "moneda", etiqueta: "Gross monthly income", min: 0, porDefecto: 50000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso < 0) throw new ErrorEntrada("Income cannot be negative.", "ingreso");
    const calculado = redondear(porcentaje(e.ingreso, v["ke.shif-rate"]));
    const mensual = Math.max(calculado, v["ke.shif-minimum"]);
    const observaciones: string[] = [];
    if (calculado < v["ke.shif-minimum"]) observaciones.push("The rate gives less than the minimum, so the minimum applies.");
    if (e.tipo === "non-salaried") observaciones.push("SHA sets your household income through means testing, so your final amount may differ.");
    return {
      mensual,
      anual: redondear(mensual * 12),
      calculado,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "SHIF contribution a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "SHIF contribution a year", formato: "moneda" },
    { clave: "calculado", etiqueta: "Rate applied to your income", formato: "moneda" },
  ],
});
