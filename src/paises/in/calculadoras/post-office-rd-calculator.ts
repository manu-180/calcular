import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.post-office-rd-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "post-office-rd-calculator",
  estado: "publicado",
  requiere: {
    "in.small-savings-rates": "mapa",
  },
  campos: [{ id: "cuota", tipo: "moneda", etiqueta: "Monthly deposit", min: 0, porDefecto: 10000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.cuota <= 0) throw new ErrorEntrada("Enter the monthly deposit.", "cuota");
    const tasa = enMapa(v["in.small-savings-rates"], "rd");
    const q = 1 + tasa / 400;
    let madurez = 0;
    // Cada cuota capitaliza por trimestres durante los meses que le quedan hasta el mes 60.
    for (let restantes = 1; restantes <= 60; restantes++) madurez += entrada.cuota * q ** (restantes / 3);
    const invertido = entrada.cuota * 60;
    return { madurez: redondear(madurez), invertido, interes: redondear(madurez - invertido), tasa };
  },
  resultado: [
    { clave: "madurez", etiqueta: "Maturity value after 5 years", formato: "moneda", destacada: true },
    { clave: "invertido", etiqueta: "Total deposited (60 instalments)", formato: "moneda" },
    { clave: "interes", etiqueta: "Interest earned", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate used", formato: "porcentaje", decimales: 1 },
  ],
});
