import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.arbetsgivaravgift",
  mercado: "se",
  concepto: "costo-empleador",
  slug: "arbetsgivaravgift",
  estado: "publicado",
  requiere: {
    "se.arbetsgivaravgift": "numero",
    "se.alderspensionsavgift": "numero",
    "se.arbetsgivaravgift-unga": "numero",
    "se.unga-tak": "numero",
  },
  campos: [
    { id: "lon", tipo: "moneda", etiqueta: "Bruttolön per månad", min: 0, porDefecto: 35000 },
    {
      id: "grupp",
      tipo: "opcion",
      etiqueta: "Den anställdas ålder",
      opciones: [
        { valor: "vanlig", etiqueta: "24 till 66 år (full avgift)" },
        { valor: "unga", etiqueta: "19 till 23 år" },
        { valor: "aldre", etiqueta: "Fyllt 67 år vid årets början" },
      ],
      porDefecto: "vanlig",
      ayuda: "Under 2026 gäller den sänkta avgiften för unga anställda födda 2003 till 2007.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.lon <= 0) throw new ErrorEntrada("Skriv en lön som är större än noll.", "lon");
    const full = v["se.arbetsgivaravgift"];
    let avgift: number;
    if (e.grupp === "aldre") avgift = porcentaje(e.lon, v["se.alderspensionsavgift"]);
    else if (e.grupp === "unga") {
      const tak = v["se.unga-tak"];
      const del = Math.min(e.lon, tak);
      avgift = porcentaje(del, v["se.arbetsgivaravgift-unga"]) + porcentaje(e.lon - del, full);
    } else avgift = porcentaje(e.lon, full);
    avgift = redondear(avgift);
    const observaciones: string[] = [];
    if (e.grupp === "unga" && e.lon > v["se.unga-tak"]) observaciones.push("På den del av lönen som är över taket betalar du full arbetsgivaravgift.");
    observaciones.push("Kostnaden gäller bara lön och avgifter. Semesterersättning, tjänstepension och försäkringar enligt kollektivavtal tillkommer ofta.");
    return {
      avgift,
      kostnad: redondear(e.lon + avgift),
      sats: (avgift / e.lon) * 100,
      avgiftAr: redondear(avgift * 12),
      kostnadAr: redondear((e.lon + avgift) * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "avgift", etiqueta: "Arbetsgivaravgift per månad", formato: "moneda", destacada: true },
    { clave: "kostnad", etiqueta: "Lön och avgift per månad", formato: "moneda" },
    { clave: "sats", etiqueta: "Avgift i procent av lönen", formato: "porcentaje", decimales: 2 },
    { clave: "avgiftAr", etiqueta: "Arbetsgivaravgift per år", formato: "moneda" },
    { clave: "kostnadAr", etiqueta: "Lön och avgift per år", formato: "moneda" },
  ],
});
