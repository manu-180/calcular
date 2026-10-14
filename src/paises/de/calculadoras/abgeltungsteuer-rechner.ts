import { definirCalculadora, porRegion } from "@/motor/calculo";
import { abrunden } from "../lib/steuer";

export default definirCalculadora({
  id: "de.abgeltungsteuer-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "abgeltungsteuer-rechner",
  estado: "publicado",
  requiere: {
    "de.abgeltungsteuer": "numero",
    "de.sparer-pauschbetrag": "mapa",
    "de.soli-satz": "numero",
    "de.kirchensteuer": "numero-por-region",
  },
  campos: [
    { id: "ertraege", tipo: "moneda", etiqueta: "Kapitalerträge im Jahr (Zinsen, Dividenden, Kursgewinne)", min: 0, porDefecto: 3000 },
    {
      id: "veranlagung",
      tipo: "opcion",
      etiqueta: "Sparer-Pauschbetrag",
      opciones: [
        { valor: "einzeln", etiqueta: "Alleinstehend" },
        { valor: "zusammen", etiqueta: "Verheiratet, zusammen veranlagt" },
      ],
      porDefecto: "einzeln",
    },
    { id: "kirche", tipo: "si-no", etiqueta: "Kirchensteuerpflichtig", porDefecto: false },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland", porDefecto: "nw" },
  ],
  calcular(entrada, valores, { redondear }) {
    const pausch = valores["de.sparer-pauschbetrag"][entrada.veranlagung === "zusammen" ? "zusammen" : "einzeln"];
    const steuerpflichtig = Math.max(entrada.ertraege - pausch, 0);
    const k = entrada.kirche ? porRegion(valores["de.kirchensteuer"], entrada.bundesland) / 100 : 0;
    // § 32d Absatz 1 Satz 4 EStG: e / (4 + k), bei 25 % Abgeltungsteuer; der Satz steckt in der 4 (= 100 / 25).
    const est = abrunden(steuerpflichtig / (100 / valores["de.abgeltungsteuer"] + k), 2);
    const soli = abrunden((est * valores["de.soli-satz"]) / 100, 2);
    const kist = abrunden(est * k, 2);
    const summe = redondear(est + soli + kist);
    return {
      pausch,
      steuerpflichtig,
      est,
      soli,
      kist,
      summe,
      netto: redondear(entrada.ertraege - summe),
      effektiv: steuerpflichtig > 0 ? (summe / steuerpflichtig) * 100 : 0,
    };
  },
  resultado: [
    { clave: "summe", etiqueta: "Steuern auf Kapitalerträge zusammen", formato: "moneda", destacada: true },
    { clave: "est", etiqueta: "Abgeltungsteuer", formato: "moneda" },
    { clave: "soli", etiqueta: "Solidaritätszuschlag", formato: "moneda" },
    { clave: "kist", etiqueta: "Kirchensteuer", formato: "moneda", ocultarSiCero: true },
    { clave: "pausch", etiqueta: "Sparer-Pauschbetrag", formato: "moneda" },
    { clave: "steuerpflichtig", etiqueta: "Steuerpflichtige Erträge", formato: "moneda" },
    { clave: "netto", etiqueta: "Erträge nach Steuern", formato: "moneda" },
    { clave: "effektiv", etiqueta: "Effektiver Steuersatz auf den steuerpflichtigen Teil", formato: "porcentaje", decimales: 3 },
  ],
});
