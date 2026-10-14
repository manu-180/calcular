import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "us.hsa-contribution",
  mercado: "us",
  concepto: "propio",
  slug: "hsa-contribution",
  estado: "publicado",
  requiere: {
    "us.hsa-self-only": "numero",
    "us.hsa-family": "numero",
    "us.hsa-catch-up": "numero",
  },
  campos: [
    {
      id: "cobertura",
      tipo: "opcion",
      etiqueta: "High deductible health plan coverage",
      opciones: [
        { valor: "individual", etiqueta: "Self-only" },
        { valor: "familiar", etiqueta: "Family" },
      ],
      porDefecto: "individual",
    },
    { id: "mayor55", tipo: "si-no", etiqueta: "You are 55 or older by the end of the year", porDefecto: false },
    { id: "meses", tipo: "entero", etiqueta: "Months you were eligible this year", min: 1, max: 12, porDefecto: 12, ayuda: "Count the months you had HDHP coverage on the first day of the month." },
    { id: "empleador", tipo: "moneda", etiqueta: "Employer contributions this year", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.cobertura !== "individual" && entrada.cobertura !== "familiar") throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const base = entrada.cobertura === "familiar" ? valores["us.hsa-family"] : valores["us.hsa-self-only"];
    const anual = base + (entrada.mayor55 ? valores["us.hsa-catch-up"] : 0);
    const limite = redondear((anual * entrada.meses) / 12);
    const empleador = entrada.empleador ?? 0;
    const tuyo = redondear(Math.max(0, limite - empleador));
    return {
      limite,
      empleador,
      tuyo,
      porMes: redondear(tuyo / 12),
      observaciones: [
        ...(empleador > limite ? ["Employer contributions above the limit are excess contributions. Ask your employer or plan to fix them before you file."] : []),
        "If you were eligible on December 1, the last-month rule may let you contribute the full yearly amount, as long as you stay eligible through the next year.",
      ],
    };
  },
  resultado: [
    { clave: "limite", etiqueta: "Your HSA limit for the year", formato: "moneda" },
    { clave: "empleador", etiqueta: "Already contributed by your employer", formato: "moneda", ocultarSiCero: true },
    { clave: "tuyo", etiqueta: "What you can still contribute", formato: "moneda", destacada: true },
    { clave: "porMes", etiqueta: "Per month", formato: "moneda" },
  ],
});
