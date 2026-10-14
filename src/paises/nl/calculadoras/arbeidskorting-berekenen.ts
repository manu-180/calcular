import { definirCalculadora } from "@/motor/calculo";
import { arbeidskorting } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.arbeidskorting-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "arbeidskorting-berekenen",
  estado: "publicado",
  requiere: {
    "nl.arbeidskorting-grenzen": "mapa",
    "nl.arbeidskorting-tarieven": "mapa",
  },
  campos: [{ id: "arbeidsinkomen", tipo: "moneda", etiqueta: "Arbeidsinkomen per jaar (loon of winst)", min: 0, porDefecto: 40000 }],
  calcular(entrada, v, { redondear }) {
    const g = v["nl.arbeidskorting-grenzen"];
    const ai = entrada.arbeidsinkomen;
    const korting = redondear(arbeidskorting(ai, g, v["nl.arbeidskorting-tarieven"]));
    const fase =
      ai <= 0
        ? "Zonder arbeidsinkomen krijg je geen arbeidskorting."
        : ai < g.grens1
          ? "Je zit in de eerste opbouwfase: de korting groeit met je inkomen."
          : ai < g.grens2
            ? "Je zit in de snelste opbouwfase: elke extra euro verhoogt de korting flink."
            : ai < g.grens3
              ? "Je zit bijna op het maximum van de arbeidskorting."
              : ai < g.einde
                ? "Je inkomen ligt boven de afbouwgrens: de korting wordt kleiner naarmate je meer verdient."
                : "Bij dit inkomen is de arbeidskorting helemaal afgebouwd.";
    return { korting, perMaand: redondear(korting / 12), maximum: g.max3, fase };
  },
  resultado: [
    { clave: "korting", etiqueta: "Arbeidskorting per jaar", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Per maand", formato: "moneda" },
    { clave: "maximum", etiqueta: "Maximale arbeidskorting", formato: "moneda" },
    { clave: "fase", etiqueta: "Waar je zit", formato: "texto" },
  ],
});
