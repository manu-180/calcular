import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.minimum-wage",
  mercado: "lr",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "borrador",
  requiere: {
    "lr.minimum-wage": "mapa",
  },
  campos: [
    {
      id: "sector",
      tipo: "opcion",
      etiqueta: "You work as",
      opciones: [
        { valor: "formal", etiqueta: "A formal sector employee" },
        { valor: "domestic", etiqueta: "A domestic or casual worker" },
      ],
      porDefecto: "formal",
    },
    { id: "dias", tipo: "entero", etiqueta: "Days worked in the month", min: 0, max: 31, porDefecto: 26 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.dias < 0 || entrada.dias > 31) throw new ErrorEntrada("Enter between 0 and 31 days.", "dias");
    const m = v["lr.minimum-wage"];
    const hora = entrada.sector === "formal" ? m["formal-hour"] : m["domestic-hour"];
    const dia = entrada.sector === "formal" ? m["formal-day"] : m["domestic-day"];
    return { mes: redondear(dia * entrada.dias), dia, hora };
  },
  resultado: [
    { clave: "mes", etiqueta: "Minimum pay for the month", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "dia", etiqueta: "Minimum wage a day", formato: "moneda", moneda: "USD" },
    { clave: "hora", etiqueta: "Minimum wage an hour", formato: "moneda", moneda: "USD" },
  ],
});
