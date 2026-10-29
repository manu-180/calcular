import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.minimum-wage-in-nepal",
  mercado: "np",
  concepto: "salario-minimo",
  slug: "minimum-wage-in-nepal",
  estado: "publicado",
  requiere: { "np.minimum-wage": "mapa" },
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Your monthly basic pay plus dearness allowance (optional, to compare)", min: 0, requerido: false }],
  calcular(e, v, { redondear }) {
    const m = v["np.minimum-wage"];
    const mensual = redondear(enMapa(m, "month-basic") + enMapa(m, "month-allowance"));
    const diario = redondear(enMapa(m, "day-basic") + enMapa(m, "day-allowance"));
    const hora = redondear(enMapa(m, "hour-basic") + enMapa(m, "hour-allowance"));
    if (e.sueldo !== null && e.sueldo < 0) throw new ErrorEntrada("Pay cannot be negative.", "sueldo");
    const observaciones = ["These minimums apply to every worker except those on tea estates."];
    let diferencia: number | null = null;
    if (e.sueldo !== null) {
      diferencia = redondear(e.sueldo - mensual);
      observaciones.push(diferencia >= 0 ? "Your pay is at or above the monthly minimum." : "Your pay is below the monthly minimum.");
    }
    return {
      mensual,
      basico: enMapa(m, "month-basic"),
      carestia: enMapa(m, "month-allowance"),
      diario,
      hora,
      parcial: enMapa(m, "part-time-hour"),
      anual: redondear(mensual * 12),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Minimum monthly remuneration", formato: "moneda", destacada: true },
    { clave: "basico", etiqueta: "of which basic pay", formato: "moneda" },
    { clave: "carestia", etiqueta: "of which dearness allowance", formato: "moneda" },
    { clave: "diario", etiqueta: "Minimum daily remuneration", formato: "moneda" },
    { clave: "hora", etiqueta: "Minimum hourly remuneration", formato: "moneda" },
    { clave: "parcial", etiqueta: "Minimum hourly rate for part-time work", formato: "moneda" },
    { clave: "anual", etiqueta: "Minimum over 12 months", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay compared with the minimum", formato: "moneda" },
  ],
});
