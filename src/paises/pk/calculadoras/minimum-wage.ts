import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.minimum-wage",
  mercado: "pk",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "pk.minimum-wage": "numero",
  },
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Your salary a month (optional)", requerido: false, min: 0 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo !== null && entrada.sueldo < 0) throw new ErrorEntrada("Salary cannot be negative.", "sueldo");
    const minimo = v["pk.minimum-wage"];
    return {
      mensual: minimo,
      anual: redondear(minimo * 12),
      diferencia: entrada.sueldo === null ? null : redondear(entrada.sueldo - minimo),
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Minimum wage a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "A year", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your salary minus the minimum", formato: "moneda" },
  ],
});
