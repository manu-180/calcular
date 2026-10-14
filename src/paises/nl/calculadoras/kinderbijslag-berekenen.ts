import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nl.kinderbijslag-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "kinderbijslag-berekenen",
  estado: "publicado",
  requiere: {
    "nl.kinderbijslag": "mapa",
  },
  campos: [
    { id: "jong", tipo: "entero", etiqueta: "Kinderen van 0 tot en met 5 jaar", min: 0, max: 15, porDefecto: 1 },
    { id: "midden", tipo: "entero", etiqueta: "Kinderen van 6 tot en met 11 jaar", min: 0, max: 15, porDefecto: 0 },
    { id: "oud", tipo: "entero", etiqueta: "Kinderen van 12 tot en met 17 jaar", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.jong + entrada.midden + entrada.oud === 0) throw new ErrorEntrada("Vul minstens één kind in.", "jong");
    const k = v["nl.kinderbijslag"];
    const jong = redondear(entrada.jong * enMapa(k, "0-5"));
    const midden = redondear(entrada.midden * enMapa(k, "6-11"));
    const oud = redondear(entrada.oud * enMapa(k, "12-17"));
    const kwartaal = redondear(jong + midden + oud);
    return {
      kwartaal,
      jaar: redondear(kwartaal * 4),
      maand: redondear(kwartaal / 3),
      jong,
      midden,
      oud,
      observaciones: [
        "De SVB kijkt naar de leeftijd van je kind op de eerste dag van het kwartaal. Wordt je kind 6 of 12, dan krijg je het hogere bedrag vanaf het kwartaal daarna.",
        "Het bedrag per jaar is een schatting met de bedragen van nu. De SVB past de bedragen in de loop van het jaar aan.",
      ],
    };
  },
  resultado: [
    { clave: "kwartaal", etiqueta: "Kinderbijslag per kwartaal", formato: "moneda", destacada: true },
    { clave: "jaar", etiqueta: "Ongeveer per jaar", formato: "moneda" },
    { clave: "maand", etiqueta: "Gemiddeld per maand", formato: "moneda" },
    { clave: "jong", etiqueta: "Voor kinderen van 0 tot en met 5 jaar", formato: "moneda", ocultarSiCero: true },
    { clave: "midden", etiqueta: "Voor kinderen van 6 tot en met 11 jaar", formato: "moneda", ocultarSiCero: true },
    { clave: "oud", etiqueta: "Voor kinderen van 12 tot en met 17 jaar", formato: "moneda", ocultarSiCero: true },
  ],
});
