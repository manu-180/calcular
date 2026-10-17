import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.minimum-wage",
  mercado: "ie",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "ie.minimum-wage": "numero",
    "ie.minimum-wage-age-percent": "mapa",
  },
  campos: [
    { id: "edad", tipo: "opcion-dato", dato: "ie.minimum-wage-age-percent", etiqueta: "Your age", porDefecto: "age-20-plus" },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work a week", min: 0, max: 100, porDefecto: 39 },
    { id: "tuPaga", tipo: "moneda", etiqueta: "Your hourly pay (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you work each week.", "horas");
    const porcentaje = enMapa(v["ie.minimum-wage-age-percent"], entrada.edad);
    const hora = redondear((v["ie.minimum-wage"] * porcentaje) / 100);
    const semanal = redondear(hora * entrada.horas);
    const anual = redondear(semanal * 52);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.tuPaga !== null) {
      diferencia = redondear(entrada.tuPaga - hora);
      observaciones.push(
        diferencia < 0
          ? "You are being paid less than the legal minimum for your age. You can raise it with your employer or make a complaint to the Workplace Relations Commission."
          : "Your pay is at or above the legal minimum for your age.",
      );
    }
    observaciones.push("Some sectors have Sectoral Employment Orders or Employment Regulation Orders that set a higher minimum.");
    return { hora, porcentaje, semanal, mensual: redondear(anual / 12), anual, diferencia, observaciones };
  },
  resultado: [
    { clave: "hora", etiqueta: "Minimum hourly rate", formato: "moneda", destacada: true },
    { clave: "porcentaje", etiqueta: "Share of the full minimum wage", formato: "porcentaje", decimales: 0 },
    { clave: "semanal", etiqueta: "A week", formato: "moneda" },
    { clave: "mensual", etiqueta: "A month (52 weeks / 12)", formato: "moneda" },
    { clave: "anual", etiqueta: "A year (52 weeks)", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay compared with the minimum, per hour", formato: "moneda" },
  ],
});
