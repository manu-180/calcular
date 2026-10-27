import { aplicarEscalaMarginal, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.uitkering-ineens-belasting",
  mercado: "sr",
  concepto: "propio",
  slug: "uitkering-ineens-belasting",
  estado: "publicado",
  requiere: {
    "sr.uitkering-ineens-tarief": "escala",
  },
  campos: [
    {
      id: "bedrag",
      tipo: "moneda",
      etiqueta: "Bedrag van de uitkering ineens (bruto)",
      min: 0,
      porDefecto: 100000,
      ayuda: "Een eenmalige uitkering uit je werk die niet bij een bepaalde periode hoort.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const belasting = redondear(aplicarEscalaMarginal(valores["sr.uitkering-ineens-tarief"], entrada.bedrag));
    return {
      netto: redondear(entrada.bedrag - belasting),
      belasting,
      gemiddeld: entrada.bedrag > 0 ? redondear((belasting / entrada.bedrag) * 100) : 0,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Netto na loonbelasting", formato: "moneda", destacada: true },
    { clave: "belasting", etiqueta: "Loonbelasting (apart tarief)", formato: "moneda" },
    { clave: "gemiddeld", etiqueta: "Gemiddeld tarief", formato: "porcentaje", decimales: 2 },
  ],
});
