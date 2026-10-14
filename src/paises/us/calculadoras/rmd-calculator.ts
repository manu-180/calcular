import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "us.rmd-calculator",
  mercado: "us",
  concepto: "propio",
  slug: "rmd-calculator",
  estado: "publicado",
  requiere: {
    "us.rmd-uniform-table": "mapa",
    "us.rmd-age": "numero",
  },
  campos: [
    { id: "edad", tipo: "entero", etiqueta: "Age you reach this year", min: 50, max: 130, porDefecto: 75 },
    { id: "saldo", tipo: "moneda", etiqueta: "Account balance on December 31 of last year", min: 0, porDefecto: 500000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const inicio = valores["us.rmd-age"];
    if (entrada.edad < inicio) {
      return {
        factor: null,
        rmd: 0,
        porMes: 0,
        porcentajeSaldo: 0,
        observaciones: [`You don't need to take a required minimum distribution until the year you turn ${inicio}.`],
      };
    }
    const factor = enMapa(valores["us.rmd-uniform-table"], String(Math.min(entrada.edad, 120)));
    const rmd = redondear(entrada.saldo / factor);
    const observaciones = ["This uses the Uniform Lifetime Table. If your spouse is more than 10 years younger and your only beneficiary, the Joint Life Table gives a smaller RMD."];
    if (entrada.edad === inicio) observaciones.push("For your first RMD you can wait until April 1 of next year, but then you take two distributions in the same year.");
    return {
      factor,
      rmd,
      porMes: redondear(rmd / 12),
      porcentajeSaldo: entrada.saldo > 0 ? redondear((rmd / entrada.saldo) * 100) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "factor", etiqueta: "Distribution period", formato: "numero", decimales: 1 },
    { clave: "rmd", etiqueta: "Required minimum distribution", formato: "moneda", destacada: true },
    { clave: "porMes", etiqueta: "Per month if spread over the year", formato: "moneda" },
    { clave: "porcentajeSaldo", etiqueta: "Share of the balance", formato: "porcentaje" },
  ],
});
