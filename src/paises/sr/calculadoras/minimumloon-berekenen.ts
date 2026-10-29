import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.minimumloon-berekenen",
  mercado: "sr",
  concepto: "salario-minimo",
  slug: "minimumloon-berekenen",
  estado: "publicado",
  requiere: {
    "sr.minimumuurloon": "numero",
  },
  campos: [
    { id: "urenPerWeek", tipo: "numero", etiqueta: "Uren per week", min: 1, max: 80, porDefecto: 40 },
  ],
  calcular(entrada, valores, { redondear }) {
    const uurloon = valores["sr.minimumuurloon"];
    const weekloon = redondear(uurloon * entrada.urenPerWeek);
    return {
      uurloon,
      dagloon: redondear(uurloon * 8),
      weekloon,
      maandloon: redondear((uurloon * entrada.urenPerWeek * 52) / 12),
      jaarloon: redondear(uurloon * entrada.urenPerWeek * 52),
    };
  },
  resultado: [
    { clave: "maandloon", etiqueta: "Minimumloon per maand (gemiddeld)", formato: "moneda", destacada: true },
    { clave: "uurloon", etiqueta: "Minimum uurloon", formato: "moneda" },
    { clave: "dagloon", etiqueta: "Per dag van 8 uur", formato: "moneda" },
    { clave: "weekloon", etiqueta: "Per week", formato: "moneda" },
    { clave: "jaarloon", etiqueta: "Per jaar (52 weken)", formato: "moneda" },
  ],
});
