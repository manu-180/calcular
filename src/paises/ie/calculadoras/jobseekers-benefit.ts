import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.jobseekers-benefit",
  mercado: "ie",
  concepto: "propio",
  slug: "jobseekers-benefit",
  estado: "publicado",
  requiere: {
    "ie.jprb-rates": "mapa",
    "ie.jprb-caps": "mapa",
    "ie.jprb-minimum": "numero",
  },
  campos: [
    {
      id: "semanal",
      tipo: "moneda",
      etiqueta: "Your average gross weekly earnings",
      min: 0,
      porDefecto: 700,
      ayuda: "The Department works it out from Revenue's records for the 12 months ending 8 weeks before you lost your job.",
    },
    {
      id: "contribuciones",
      tipo: "opcion",
      etiqueta: "PRSI contributions paid at Class A or H",
      opciones: [
        { valor: "long", etiqueta: "260 or more (5+ years)" },
        { valor: "short", etiqueta: "104 to 259 (2 to 5 years)" },
      ],
      porDefecto: "long",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your average weekly earnings before tax.", "semanal");
    const minimo = v["ie.jprb-minimum"];
    const tasa = (tramo: string) =>
      redondear(Math.max(minimo, Math.min(enMapa(v["ie.jprb-caps"], tramo), (entrada.semanal * enMapa(v["ie.jprb-rates"], tramo)) / 100)));
    const observaciones: string[] = [];
    if (entrada.contribuciones === "short") {
      const r = tasa("short");
      if (r === minimo) observaciones.push("Your rate is the minimum weekly payment.");
      return { primeras: r, segundas: null, terceras: null, semanas: 26, total: redondear(r * 26), observaciones };
    }
    const primeras = tasa("weeks-1-13");
    const segundas = tasa("weeks-14-26");
    const terceras = tasa("weeks-27-39");
    if (terceras === minimo) observaciones.push("At least part of your payment is at the minimum weekly rate.");
    observaciones.push("Time on a jobseeker's payment awarded after 31 March 2025 may shorten how long you can claim.");
    return { primeras, segundas, terceras, semanas: 39, total: redondear((primeras + segundas + terceras) * 13), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Total over the whole claim", formato: "moneda", destacada: true },
    { clave: "primeras", etiqueta: "Weekly rate, weeks 1 to 13 (or all 26 weeks)", formato: "moneda" },
    { clave: "segundas", etiqueta: "Weekly rate, weeks 14 to 26", formato: "moneda" },
    { clave: "terceras", etiqueta: "Weekly rate, weeks 27 to 39", formato: "moneda" },
    { clave: "semanas", etiqueta: "Maximum weeks", formato: "numero", decimales: 0 },
  ],
});
