import { definirCalculadora } from "@/motor/calculo";
import { aufHundertAbgerundet, dbstWerteAus, REQ_DBST, tarifFuer, tarifsteuer, ZIVILSTAND, type Zivilstand } from "../lib/bundessteuer";

export default definirCalculadora({
  id: "ch.kapitalbezug-steuer-rechner",
  mercado: "ch",
  concepto: "propio",
  slug: "kapitalbezug-steuer-rechner",
  estado: "publicado",
  requiere: REQ_DBST,
  campos: [
    { id: "kapital", tipo: "moneda", etiqueta: "Kapitalbezug aus Pensionskasse oder Säule 3a", min: 0, porDefecto: 200000 },
    { id: "zivilstand", tipo: "opcion", etiqueta: "Zivilstand", opciones: ZIVILSTAND, porDefecto: "alleinstehend" },
    { id: "mitKindern", tipo: "si-no", etiqueta: "Mit Kindern im gleichen Haushalt", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const w = dbstWerteAus(valores);
    const zivilstand = entrada.zivilstand as Zivilstand;
    const tarif = tarifFuer(zivilstand, entrada.mitKindern ? 1 : 0, w);
    const basis = aufHundertAbgerundet(entrada.kapital);
    const vollerTarif = redondear(tarifsteuer(basis, tarif));
    const steuer = redondear(vollerTarif / 5);
    return {
      steuer,
      vollerTarif,
      satz: entrada.kapital > 0 ? (steuer / entrada.kapital) * 100 : 0,
      netto: redondear(entrada.kapital - steuer),
      observaciones: ["Kanton und Gemeinde besteuern den Kapitalbezug zusätzlich nach eigenen Regeln. Diese Steuer ist hier nicht enthalten."],
    };
  },
  resultado: [
    { clave: "steuer", etiqueta: "Direkte Bundessteuer auf dem Kapitalbezug", formato: "moneda", destacada: true },
    { clave: "satz", etiqueta: "Anteil am Kapital", formato: "porcentaje", decimales: 2 },
    { clave: "vollerTarif", etiqueta: "Steuer nach vollem Tarif (vor der Teilung durch fünf)", formato: "moneda" },
    { clave: "netto", etiqueta: "Kapital nach Bundessteuer", formato: "moneda" },
  ],
});
