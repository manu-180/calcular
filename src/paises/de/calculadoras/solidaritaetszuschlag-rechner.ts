import { definirCalculadora } from "@/motor/calculo";
import { solidaritaetszuschlag } from "../lib/steuer";
import { soliAus } from "../lib/werte";

export default definirCalculadora({
  id: "de.solidaritaetszuschlag-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "solidaritaetszuschlag-rechner",
  estado: "publicado",
  requiere: { "de.soli-satz": "numero", "de.soli-milderung": "numero", "de.soli-freigrenze": "numero" },
  campos: [
    { id: "steuer", tipo: "moneda", etiqueta: "Einkommensteuer oder Jahreslohnsteuer", min: 0, porDefecto: 25000 },
    {
      id: "veranlagung",
      tipo: "opcion",
      etiqueta: "Veranlagung",
      opciones: [
        { valor: "einzeln", etiqueta: "Einzeln (Steuerklasse I, II, IV, V, VI)" },
        { valor: "zusammen", etiqueta: "Zusammen (Splitting, Steuerklasse III)" },
      ],
      porDefecto: "einzeln",
    },
  ],
  calcular(entrada, valores) {
    const s = soliAus(valores);
    const zusammen = entrada.veranlagung === "zusammen";
    const soli = solidaritaetszuschlag(entrada.steuer, s, zusammen);
    const freigrenze = s.freigrenze * (zusammen ? 2 : 1);
    const volleZone = freigrenze * (s.milderung / (s.milderung - s.satz));
    return {
      soli,
      freigrenze,
      effektiv: entrada.steuer > 0 ? (soli / entrada.steuer) * 100 : 0,
      zone: entrada.steuer <= freigrenze ? "Unter der Freigrenze" : entrada.steuer < volleZone ? "Milderungszone" : "Voller Satz",
    };
  },
  resultado: [
    { clave: "soli", etiqueta: "Solidaritätszuschlag im Jahr", formato: "moneda", destacada: true },
    { clave: "zone", etiqueta: "Bereich", formato: "texto" },
    { clave: "freigrenze", etiqueta: "Freigrenze", formato: "moneda" },
    { clave: "effektiv", etiqueta: "Effektiver Satz auf die Steuer", formato: "porcentaje", decimales: 2 },
  ],
});
