import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.huurwaardebelasting-berekenen",
  mercado: "sr",
  concepto: "propio",
  slug: "huurwaardebelasting-berekenen",
  estado: "publicado",
  requiere: {
    "sr.huurwaardebelasting": "numero",
    "sr.huurwaarde-eigen-gebruik": "numero",
    "sr.huurwaarde-aftrek": "numero",
    "sr.huurwaardebelasting-minimum": "numero",
  },
  campos: [
    {
      id: "gebruik",
      tipo: "opcion",
      etiqueta: "Het gebouw is",
      opciones: [
        { valor: "eigen", etiqueta: "In eigen gebruik" },
        { valor: "verhuurd", etiqueta: "Verhuurd" },
      ],
      porDefecto: "eigen",
    },
    { id: "verkoopwaarde", tipo: "moneda", etiqueta: "Vrije verkoopwaarde van het gebouw", min: 0, porDefecto: 1000000 },
    { id: "jaarhuur", tipo: "moneda", etiqueta: "Huuropbrengst per jaar", min: 0, porDefecto: 120000, visibleSi: { gebruik: ["verhuurd"] } },
  ],
  calcular(entrada, valores, { redondear }) {
    const procent = valores["sr.huurwaarde-eigen-gebruik"];
    const huurwaarde =
      entrada.gebruik === "eigen"
        ? porcentaje(Math.max(0, entrada.verkoopwaarde - valores["sr.huurwaarde-aftrek"]), procent)
        : Math.max(entrada.jaarhuur ?? 0, porcentaje(entrada.verkoopwaarde, procent));
    const berekend = porcentaje(huurwaarde, valores["sr.huurwaardebelasting"]);
    const belasting = Math.max(berekend, valores["sr.huurwaardebelasting-minimum"]);
    return {
      belasting: redondear(belasting),
      huurwaarde: redondear(huurwaarde),
      observaciones: berekend < belasting ? ["De berekende belasting is lager dan het wettelijke minimum, dus geldt het minimum."] : [],
    };
  },
  resultado: [
    { clave: "belasting", etiqueta: "Huurwaardebelasting per jaar", formato: "moneda", destacada: true },
    { clave: "huurwaarde", etiqueta: "Huurwaarde", formato: "moneda" },
  ],
});
