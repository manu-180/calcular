import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { euros } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.capital-acquisitions-tax",
  mercado: "ie",
  concepto: "propio",
  slug: "capital-acquisitions-tax",
  estado: "publicado",
  requiere: {
    "ie.cat-thresholds": "mapa",
    "ie.cat-rate": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Taxable value of the gift or inheritance", min: 0, porDefecto: 450000 },
    { id: "grupo", tipo: "opcion-dato", dato: "ie.cat-thresholds", etiqueta: "Your relationship to the person giving it", porDefecto: "group-a" },
    {
      id: "previos",
      tipo: "moneda",
      etiqueta: "Earlier gifts and inheritances in the same group",
      min: 0,
      porDefecto: 0,
      ayuda: "The taxable value of what you received in the same group since 5 December 1991.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the value of the gift or inheritance.", "valor");
    const umbral = enMapa(v["ie.cat-thresholds"], entrada.grupo);
    const tasa = v["ie.cat-rate"];
    const antes = Math.max(0, entrada.previos - umbral);
    const ahora = Math.max(0, entrada.previos + entrada.valor - umbral);
    const gravable = redondear(ahora - antes);
    const restante = Math.max(0, umbral - entrada.previos - entrada.valor);
    const observaciones: string[] = [];
    if (gravable === 0) observaciones.push(`You still have ${euros(restante)} of your tax-free threshold left in this group.`);
    observaciones.push("Gifts and inheritances from a spouse or civil partner are exempt from CAT.");
    return { impuesto: redondear((gravable * tasa) / 100), gravable, umbral, restante, tasa, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital Acquisitions Tax", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Amount over the threshold", formato: "moneda" },
    { clave: "umbral", etiqueta: "Tax-free threshold for your group", formato: "moneda" },
    { clave: "restante", etiqueta: "Threshold left after this", formato: "moneda" },
    { clave: "tasa", etiqueta: "CAT rate", formato: "porcentaje", decimales: 0 },
  ],
});
