import { definirCalculadora, porRegion } from "@/motor/calculo";
import { abrunden } from "../lib/steuer";

export default definirCalculadora({
  id: "de.kirchensteuer-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "kirchensteuer-rechner",
  estado: "publicado",
  requiere: { "de.kirchensteuer": "numero-por-region" },
  campos: [
    { id: "steuer", tipo: "moneda", etiqueta: "Einkommensteuer oder Lohnsteuer im Jahr", min: 0, porDefecto: 10000, ayuda: "Mit Kindern die Steuer nach Kinderfreibeträgen." },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland Ihres Wohnsitzes", porDefecto: "nw" },
  ],
  calcular(entrada, valores, { redondear }) {
    const satz = porRegion(valores["de.kirchensteuer"], entrada.bundesland);
    const jahr = abrunden((entrada.steuer * satz) / 100, 2);
    return { satz, jahr, monat: redondear(jahr / 12) };
  },
  resultado: [
    { clave: "jahr", etiqueta: "Kirchensteuer im Jahr", formato: "moneda", destacada: true },
    { clave: "monat", etiqueta: "Kirchensteuer im Monat", formato: "moneda" },
    { clave: "satz", etiqueta: "Kirchensteuersatz", formato: "porcentaje" },
  ],
});
