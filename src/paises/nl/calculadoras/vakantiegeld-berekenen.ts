import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "nl.vakantiegeld-berekenen",
  mercado: "nl",
  concepto: "bono-semestral",
  slug: "vakantiegeld-berekenen",
  estado: "publicado",
  requiere: {
    "nl.vakantiebijslag": "numero",
  },
  campos: [
    { id: "maandloon", tipo: "moneda", etiqueta: "Bruto maandloon (zonder vakantiegeld)", min: 0, porDefecto: 3500 },
    { id: "maanden", tipo: "numero", etiqueta: "Maanden gewerkt in de opbouwperiode (juni tot en met mei)", min: 0, max: 12, porDefecto: 12 },
    {
      id: "percentage",
      tipo: "porcentaje",
      etiqueta: "Percentage uit je contract of cao (laat leeg voor het wettelijk minimum)",
      min: 0,
      max: 100,
      requerido: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.maanden <= 0) throw new ErrorEntrada("Vul in hoeveel maanden je hebt gewerkt.", "maanden");
    const minimum = v["nl.vakantiebijslag"];
    const pct = entrada.percentage ?? minimum;
    const observaciones: string[] = [];
    if (pct < minimum) {
      observaciones.push("Je percentage ligt onder het wettelijk minimum. Dat kan alleen als een cao of publiekrechtelijke regeling dat toestaat, en dan nog met grenzen. Kijk het na in je cao.");
    }
    const loon = redondear(entrada.maandloon * entrada.maanden);
    const vakantiegeld = redondear(porcentaje(loon, pct));
    return {
      vakantiegeld,
      perMaand: redondear(vakantiegeld / entrada.maanden),
      loon,
      percentage: pct,
      observaciones,
    };
  },
  resultado: [
    { clave: "vakantiegeld", etiqueta: "Bruto vakantiegeld", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Opgebouwd per maand", formato: "moneda" },
    { clave: "loon", etiqueta: "Brutoloon in de opbouwperiode", formato: "moneda" },
    { clave: "percentage", etiqueta: "Percentage vakantiegeld", formato: "porcentaje" },
  ],
});
