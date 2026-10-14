import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gb.minimum-wage",
  mercado: "gb",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "gb.minimum-wage": "mapa",
  },
  campos: [
    { id: "grupo", tipo: "opcion-dato", dato: "gb.minimum-wage", etiqueta: "Your age or situation", porDefecto: "21-and-over" },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work a week", min: 0, max: 100, porDefecto: 37.5 },
    { id: "tuPaga", tipo: "moneda", etiqueta: "Your hourly pay (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you work each week.", "horas");
    const hora = enMapa(v["gb.minimum-wage"], entrada.grupo);
    const anual = redondear(hora * entrada.horas * 52);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.tuPaga !== null) {
      diferencia = redondear(entrada.tuPaga - hora);
      observaciones.push(
        diferencia < 0
          ? "You are being paid less than the legal minimum for your age. You can raise it with your employer or contact Acas for free advice."
          : "Your pay is at or above the legal minimum for your age.",
      );
    }
    if (entrada.grupo === "apprentice") {
      observaciones.push("The apprentice rate applies if you are under 19, or 19 or over and in the first year of your apprenticeship. Otherwise you get the rate for your age.");
    }
    return {
      hora,
      semanal: redondear(hora * entrada.horas),
      mensual: redondear(anual / 12),
      anual,
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Minimum hourly rate", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "A week", formato: "moneda" },
    { clave: "mensual", etiqueta: "A month (52 weeks / 12)", formato: "moneda" },
    { clave: "anual", etiqueta: "A year (52 weeks)", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay compared with the minimum, per hour", formato: "moneda" },
  ],
});
