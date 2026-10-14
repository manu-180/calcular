import { definirCalculadora, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "de.grunderwerbsteuer-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "grunderwerbsteuer-rechner",
  estado: "borrador",
  requiere: { "de.grunderwerbsteuer": "numero-por-region" },
  campos: [
    { id: "kaufpreis", tipo: "moneda", etiqueta: "Kaufpreis der Immobilie", min: 0, porDefecto: 400000 },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland der Immobilie", porDefecto: "nw" },
  ],
  calcular(entrada, valores, { redondear }) {
    const satz = porRegion(valores["de.grunderwerbsteuer"], entrada.bundesland);
    const steuer = redondear(porcentaje(entrada.kaufpreis, satz));
    return { satz, steuer, gesamt: redondear(entrada.kaufpreis + steuer) };
  },
  resultado: [
    { clave: "steuer", etiqueta: "Grunderwerbsteuer", formato: "moneda", destacada: true },
    { clave: "satz", etiqueta: "Steuersatz im Bundesland", formato: "porcentaje", decimales: 1 },
    { clave: "gesamt", etiqueta: "Kaufpreis plus Grunderwerbsteuer", formato: "moneda" },
  ],
});
