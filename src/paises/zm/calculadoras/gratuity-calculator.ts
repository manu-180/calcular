import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.gratuity-calculator",
  mercado: "zm",
  concepto: "propio",
  slug: "gratuity-calculator",
  estado: "publicado",
  requiere: {
    "zm.gratuity-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay a month", min: 0, porDefecto: 8000 },
    { id: "meses", tipo: "numero", etiqueta: "Months worked on the contract", min: 0, porDefecto: 24 },
    {
      id: "tasa",
      tipo: "porcentaje",
      etiqueta: "Gratuity rate in your contract",
      min: 0,
      max: 100,
      requerido: false,
      ayuda: "Leave it empty to use the legal minimum.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic pay a month.", "basico");
    if (e.meses <= 0) throw new ErrorEntrada("Enter the months worked on the contract.", "meses");
    const minima = v["zm.gratuity-rate"];
    if (e.tasa !== null && e.tasa < minima) {
      throw new ErrorEntrada(`The law sets a gratuity of at least ${minima}% of basic pay. Enter ${minima} or more.`, "tasa");
    }
    const tasa = e.tasa ?? minima;
    const basicoTotal = redondear(e.basico * e.meses);
    return { gratuity: redondear(porcentaje(basicoTotal, tasa)), basicoTotal, tasa };
  },
  resultado: [
    { clave: "gratuity", etiqueta: "Gratuity", formato: "moneda", destacada: true },
    { clave: "basicoTotal", etiqueta: "Basic pay earned during the contract", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate applied", formato: "porcentaje", decimales: 1 },
  ],
});
