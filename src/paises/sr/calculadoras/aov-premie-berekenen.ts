import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.aov-premie-berekenen",
  mercado: "sr",
  concepto: "aportes-seguridad-social",
  slug: "aov-premie-berekenen",
  estado: "publicado",
  requiere: {
    "sr.aov-premie": "numero",
    "sr.forfaitaire-aftrek": "numero",
    "sr.forfaitaire-aftrek-max": "numero",
  },
  campos: [
    {
      id: "soort",
      tipo: "opcion",
      etiqueta: "Je bent",
      opciones: [
        { valor: "werknemer", etiqueta: "Werknemer in loondienst" },
        { valor: "zelfstandige", etiqueta: "Zelfstandige of ondernemer" },
      ],
      porDefecto: "werknemer",
    },
    { id: "loon", tipo: "moneda", etiqueta: "Brutoloon per maand", min: 0, porDefecto: 15000, visibleSi: { soort: ["werknemer"] } },
    { id: "inkomen", tipo: "moneda", etiqueta: "Zuiver inkomen per jaar", min: 0, porDefecto: 200000, visibleSi: { soort: ["zelfstandige"] } },
    { id: "zestigPlus", tipo: "si-no", etiqueta: "Je bent 60 jaar of ouder", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const jaarbasis =
      entrada.soort === "werknemer"
        ? (entrada.loon ?? 0) * 12 - Math.min(porcentaje((entrada.loon ?? 0) * 12, valores["sr.forfaitaire-aftrek"]), valores["sr.forfaitaire-aftrek-max"])
        : (entrada.inkomen ?? 0);
    const perJaar = entrada.zestigPlus ? 0 : redondear(porcentaje(jaarbasis, valores["sr.aov-premie"]));
    return {
      perMaand: redondear(perJaar / 12),
      perJaar,
      grondslag: redondear(jaarbasis),
      observaciones: entrada.zestigPlus ? ["Vanaf 60 jaar ben je niet meer premieplichtig voor de AOV."] : [],
    };
  },
  resultado: [
    { clave: "perMaand", etiqueta: "AOV-premie per maand", formato: "moneda", destacada: true },
    { clave: "perJaar", etiqueta: "AOV-premie per jaar", formato: "moneda" },
    { clave: "grondslag", etiqueta: "Grondslag per jaar (zuiver loon of zuiver inkomen)", formato: "moneda" },
  ],
});
