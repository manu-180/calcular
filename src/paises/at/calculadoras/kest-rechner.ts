import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.kest-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "kest-rechner",
  estado: "publicado",
  requiere: { "at.kest": "mapa" },
  campos: [
    { id: "ertrag", tipo: "moneda", etiqueta: "Kapitalertrag (Zinsen, Dividende oder Kursgewinn)", min: 0, porDefecto: 1000 },
    { id: "art", tipo: "opcion-dato", etiqueta: "Art des Ertrags", dato: "at.kest", porDefecto: "sonstige" },
  ],
  calcular(entrada, valores, { redondear }) {
    const satz = enMapa(valores["at.kest"], entrada.art);
    const kest = redondear(porcentaje(entrada.ertrag, satz));
    return { kest, netto: redondear(entrada.ertrag - kest), satz };
  },
  resultado: [
    { clave: "kest", etiqueta: "Kapitalertragsteuer", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Ertrag nach Steuer", formato: "moneda" },
    { clave: "satz", etiqueta: "Steuersatz", formato: "porcentaje", decimales: 1 },
  ],
});
