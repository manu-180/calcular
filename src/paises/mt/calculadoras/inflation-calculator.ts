import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mt.inflation-calculator",
  mercado: "mt",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: { "mt.inflation-index": "mapa" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "entero", etiqueta: "From year", min: 1946, max: 2100, porDefecto: 2015 },
    { id: "hasta", tipo: "entero", etiqueta: "To year", min: 1946, max: 2100, porDefecto: 2025 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const indice = v["mt.inflation-index"];
    const anios = Object.keys(indice).map(Number);
    const ultimo = Math.max(...anios);
    const inicial = indice[String(entrada.desde)];
    const final = indice[String(entrada.hasta)];
    if (inicial === undefined) throw new ErrorEntrada(`Pick a year between 1946 and ${ultimo}.`, "desde");
    if (final === undefined) throw new ErrorEntrada(`Pick a year between 1946 and ${ultimo}.`, "hasta");
    const variacion = ((final - inicial) / inicial) * 100;
    return {
      ajustado: redondear((entrada.monto * final) / inicial),
      variacion: redondear(variacion),
      inicial,
      final,
    };
  },
  resultado: [
    { clave: "ajustado", etiqueta: "Equivalent amount", formato: "moneda", destacada: true },
    { clave: "variacion", etiqueta: "Inflation between the two years", formato: "porcentaje", decimales: 2 },
    { clave: "inicial", etiqueta: "Index in the first year", formato: "numero", decimales: 2 },
    { clave: "final", etiqueta: "Index in the second year", formato: "numero", decimales: 2 },
  ],
});
