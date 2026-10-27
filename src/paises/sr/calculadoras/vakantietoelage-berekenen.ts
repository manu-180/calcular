import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.vakantietoelage-berekenen",
  mercado: "sr",
  concepto: "propio",
  slug: "vakantietoelage-berekenen",
  estado: "publicado",
  requiere: {
    "sr.vakantietoelage": "numero",
    "sr.vrijstelling-vakantie-bonus": "numero",
  },
  campos: [
    { id: "maandloon", tipo: "moneda", etiqueta: "Brutoloon per maand", min: 0, porDefecto: 15000 },
    { id: "dagen", tipo: "entero", etiqueta: "Vakantiedagen die je opneemt", min: 0, max: 60, porDefecto: 12 },
    {
      id: "werkdagen",
      tipo: "opcion",
      etiqueta: "Werkdagen per week",
      opciones: [
        { valor: "5", etiqueta: "5 dagen" },
        { valor: "6", etiqueta: "6 dagen" },
      ],
      porDefecto: "5",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const dagloon = redondear((entrada.maandloon * 12) / (52 * Number(entrada.werkdagen)));
    const toelage = redondear(porcentaje(dagloon * entrada.dagen, valores["sr.vakantietoelage"]));
    const vrijgesteld = Math.min(toelage, entrada.maandloon, valores["sr.vrijstelling-vakantie-bonus"]);
    return {
      toelage,
      dagloon,
      vrijgesteld: redondear(vrijgesteld),
      belastbaar: redondear(toelage - vrijgesteld),
    };
  },
  resultado: [
    { clave: "toelage", etiqueta: "Vakantietoelage", formato: "moneda", destacada: true },
    { clave: "dagloon", etiqueta: "Loon per werkdag", formato: "moneda" },
    { clave: "vrijgesteld", etiqueta: "Vrij van loonbelasting", formato: "moneda" },
    { clave: "belastbaar", etiqueta: "Deel waarover je loonbelasting betaalt", formato: "moneda" },
  ],
});
