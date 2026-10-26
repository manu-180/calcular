import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// 28 kap. 10 § socialförsäkringsbalken: avrundas till närmaste hela krontal, 50 öre uppåt.
const helaKronor = (x: number) => Math.floor(x + 0.5 + 1e-9);

export default definirCalculadora({
  id: "se.foraldrapenning",
  mercado: "se",
  concepto: "propio",
  slug: "foraldrapenning",
  estado: "publicado",
  requiere: {
    "se.foraldrapenning": "mapa",
    "se.prisbasbelopp": "numero",
  },
  campos: [
    { id: "manadslon", tipo: "moneda", etiqueta: "Din månadslön före skatt", min: 0, porDefecto: 35000 },
    { id: "dagarPerVecka", tipo: "entero", etiqueta: "Föräldrapenningdagar per vecka", min: 1, max: 7, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.manadslon < 0) throw new ErrorEntrada("Lönen kan inte vara negativ.", "manadslon");
    const f = v["se.foraldrapenning"];
    const tak = enMapa(f, "tak") * v["se.prisbasbelopp"];
    const sgi = Math.floor(Math.min(e.manadslon * 12, tak) / 100 + 1e-9) * 100;
    const sjukpenningniva = helaKronor((sgi * enMapa(f, "faktor") * enMapa(f, "andel")) / 100 / 365);
    const grundniva = enMapa(f, "grundniva");
    const perDag = Math.max(sjukpenningniva, grundniva);
    const maxDag = helaKronor((tak * enMapa(f, "faktor") * enMapa(f, "andel")) / 100 / 365);
    const observaciones: string[] = [];
    if (sjukpenningniva <= grundniva) observaciones.push("Med din inkomst blir ersättningen grundnivån.");
    if (e.manadslon * 12 > tak) observaciones.push("Din lön är över taket. Föräldrapenningen räknas på inkomsten upp till taket.");
    observaciones.push("Föräldrapenningen är skattepliktig. Beloppen är före skatt.");
    return {
      perDag,
      perManad: redondear((perDag * e.dagarPerVecka * 52) / 12),
      perVecka: perDag * e.dagarPerVecka,
      sgi,
      maxDag,
      lagstaniva: enMapa(f, "lagstaniva"),
      takManad: redondear(tak / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "perDag", etiqueta: "Föräldrapenning per dag (sjukpenningnivå)", formato: "moneda", decimales: 0, destacada: true },
    { clave: "perManad", etiqueta: "Ungefär per månad", formato: "moneda", decimales: 0 },
    { clave: "perVecka", etiqueta: "Per vecka", formato: "moneda", decimales: 0 },
    { clave: "sgi", etiqueta: "Sjukpenninggrundande inkomst (SGI)", formato: "moneda", decimales: 0 },
    { clave: "maxDag", etiqueta: "Högsta föräldrapenning per dag", formato: "moneda", decimales: 0 },
    { clave: "lagstaniva", etiqueta: "Dagar på lägstanivå, per dag", formato: "moneda", decimales: 0 },
    { clave: "takManad", etiqueta: "Lön per månad där taket nås", formato: "moneda", decimales: 0 },
  ],
});
