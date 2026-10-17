import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { rupias } from "../lib/impuestos";

export default definirCalculadora({
  id: "in.ppf-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "ppf-calculator",
  estado: "publicado",
  requiere: {
    "in.small-savings-rates": "mapa",
    "in.ppf-min-deposit": "numero",
    "in.ppf-max-deposit": "numero",
  },
  campos: [
    { id: "aporte", tipo: "moneda", etiqueta: "Yearly deposit", min: 0, porDefecto: 150000 },
    {
      id: "anios",
      tipo: "opcion",
      etiqueta: "Years",
      opciones: [
        { valor: "15", etiqueta: "15 years (maturity)" },
        { valor: "20", etiqueta: "20 years (one 5-year extension)" },
        { valor: "25", etiqueta: "25 years (two extensions)" },
        { valor: "30", etiqueta: "30 years (three extensions)" },
      ],
      porDefecto: "15",
    },
  ],
  calcular(entrada, v, { redondear }) {
    const min = v["in.ppf-min-deposit"];
    const max = v["in.ppf-max-deposit"];
    if (entrada.aporte < min || entrada.aporte > max) throw new ErrorEntrada(`A PPF deposit must be between ${rupias(min)} and ${rupias(max)} a year.`, "aporte");
    const tasa = enMapa(v["in.small-savings-rates"], "ppf");
    const anios = Number(entrada.anios);
    let saldo = 0;
    for (let a = 0; a < anios; a++) {
      // Se asume el depósito antes del día 5 de abril: así gana interés los doce meses del año.
      saldo = (saldo + entrada.aporte) * (1 + tasa / 100);
    }
    const invertido = entrada.aporte * anios;
    return { madurez: redondear(saldo), invertido, interes: redondear(saldo - invertido), tasa };
  },
  resultado: [
    { clave: "madurez", etiqueta: "Maturity value", formato: "moneda", destacada: true },
    { clave: "invertido", etiqueta: "Total deposited", formato: "moneda" },
    { clave: "interes", etiqueta: "Interest earned", formato: "moneda" },
    { clave: "tasa", etiqueta: "PPF rate used", formato: "porcentaje", decimales: 1 },
  ],
});
