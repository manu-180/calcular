import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.nis-pension-calculator",
  mercado: "bb",
  concepto: "jubilacion",
  slug: "nis-pension-calculator",
  estado: "publicado",
  requiere: {
    "bb.pension-rate-first-20": "numero",
    "bb.pension-rate-after-20": "numero",
    "bb.pension-max-rate": "numero",
    "bb.pension-min-contributions": "numero",
    "bb.pensionable-age": "numero",
  },
  campos: [
    { id: "promedio", tipo: "moneda", etiqueta: "Average insurable earnings a year (best 5 years)", min: 0, porDefecto: 35500 },
    { id: "anios", tipo: "entero", etiqueta: "Contribution years (50 weeks make one year)", min: 0, max: 60, porDefecto: 22 },
  ],
  calcular(e, v, { redondear }) {
    if (e.promedio <= 0) throw new ErrorEntrada("Enter your average insurable earnings for a year.", "promedio");
    const contribuciones = e.anios * 50;
    if (contribuciones < v["bb.pension-min-contributions"]) {
      throw new ErrorEntrada(`An NIS pension needs at least ${v["bb.pension-min-contributions"]} contributions, which is ${v["bb.pension-min-contributions"] / 50} years of 50 weeks.`, "anios");
    }
    const primeros = Math.min(e.anios, 20);
    const resto = Math.max(0, e.anios - 20);
    const bruta = primeros * v["bb.pension-rate-first-20"] + resto * v["bb.pension-rate-after-20"];
    const tasa = Math.min(bruta, v["bb.pension-max-rate"]);
    const anual = redondear((e.promedio * tasa) / 100);
    const observaciones: string[] = [];
    if (bruta > tasa) observaciones.push(`The pension is capped at ${v["bb.pension-max-rate"]}% of average annual insurable earnings.`);
    observaciones.push(`This is the new basis calculation. NISSS also works out the old basis and, for some contributors, averages the two. Pensionable age is ${v["bb.pensionable-age"]}.`);
    return { tasa, anual, semanal: redondear(anual / 52), mensual: redondear(anual / 12), observaciones };
  },
  resultado: [
    { clave: "semanal", etiqueta: "Weekly pension", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Annual pension", formato: "moneda" },
    { clave: "mensual", etiqueta: "Monthly pension", formato: "moneda" },
    { clave: "tasa", etiqueta: "Share of average earnings", formato: "porcentaje", decimales: 2 },
  ],
});
