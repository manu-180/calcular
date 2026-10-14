import { definirCalculadora } from "@/motor/calculo";
import { algemeneHeffingskorting } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.algemene-heffingskorting-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "algemene-heffingskorting-berekenen",
  estado: "publicado",
  requiere: {
    "nl.ahk": "mapa",
    "nl.ahk-afbouw": "numero",
  },
  campos: [{ id: "inkomen", tipo: "moneda", etiqueta: "Verzamelinkomen per jaar", min: 0, porDefecto: 40000 }],
  calcular(entrada, v, { redondear }) {
    const korting = redondear(algemeneHeffingskorting(entrada.inkomen, v["nl.ahk"], v["nl.ahk-afbouw"]));
    const maximum = v["nl.ahk"].max;
    return {
      korting,
      perMaand: redondear(korting / 12),
      maximum,
      afbouw: redondear(maximum - korting),
    };
  },
  resultado: [
    { clave: "korting", etiqueta: "Algemene heffingskorting per jaar", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Per maand", formato: "moneda" },
    { clave: "maximum", etiqueta: "Maximale algemene heffingskorting", formato: "moneda" },
    { clave: "afbouw", etiqueta: "Minder door je inkomen", formato: "moneda", ocultarSiCero: true },
  ],
});
