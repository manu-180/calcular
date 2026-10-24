import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.minimum-wage",
  mercado: "gh",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "gh.minimum-wage": "numero",
  },
  campos: [
    { id: "dias", tipo: "entero", etiqueta: "Days you work in a month", min: 1, max: 31, porDefecto: 26 },
    { id: "diario", tipo: "moneda", etiqueta: "Your daily wage (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.dias < 1 || entrada.dias > 31) throw new ErrorEntrada("Enter between 1 and 31 days.", "dias");
    const minimo = v["gh.minimum-wage"];
    const observaciones: string[] = [];
    if (entrada.diario !== null && entrada.diario < minimo) observaciones.push("Your daily wage is below the National Daily Minimum Wage.");
    return {
      minimo,
      mensual: redondear(minimo * entrada.dias),
      anual: redondear(minimo * entrada.dias * 12),
      diferencia: entrada.diario === null ? null : redondear(entrada.diario - minimo),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "National Daily Minimum Wage", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Monthly pay at the minimum", formato: "moneda" },
    { clave: "anual", etiqueta: "Yearly pay at the minimum", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your wage above the minimum", formato: "moneda" },
  ],
});
