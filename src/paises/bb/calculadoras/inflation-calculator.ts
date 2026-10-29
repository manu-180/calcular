import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default definirCalculadora({
  id: "bb.inflation-calculator",
  mercado: "bb",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: { "bb.inflation": "serie" },
  campos: [{ id: "importe", tipo: "moneda", etiqueta: "Price a year ago", min: 0, porDefecto: 1000 }],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter an amount greater than zero.", "importe");
    const { valor, fecha } = v["bb.inflation"];
    const mes = MESES[Number(fecha.slice(5, 7)) - 1];
    return {
      hoy: redondear(e.importe * (1 + valor / 100)),
      aumento: redondear((e.importe * valor) / 100),
      tasa: valor,
      periodo: `${mes} ${Number(fecha.slice(0, 4)) - 1} to ${mes} ${fecha.slice(0, 4)}`,
      observaciones: ["The rate is the change in the Retail Price Index for all items over 12 months. Prices of individual goods move more or less than the average."],
    };
  },
  resultado: [
    { clave: "hoy", etiqueta: "Same basket now costs", formato: "moneda", destacada: true },
    { clave: "aumento", etiqueta: "Increase", formato: "moneda" },
    { clave: "tasa", etiqueta: "12 month inflation", formato: "porcentaje", decimales: 1 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
  ],
});
