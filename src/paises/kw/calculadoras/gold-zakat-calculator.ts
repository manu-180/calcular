import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kw.gold-zakat-calculator",
  mercado: "kw",
  concepto: "propio",
  slug: "gold-zakat-calculator",
  estado: "publicado",
  requiere: {
    "kw.zakat-rate": "numero",
    "kw.gold-24k": "serie",
    "kw.gold-22k": "serie",
    "kw.gold-21k": "serie",
    "kw.gold-18k": "serie",
  },
  campos: [
    { id: "g24", tipo: "numero", etiqueta: "Grams of 24 carat gold", min: 0, porDefecto: 0 },
    { id: "g22", tipo: "numero", etiqueta: "Grams of 22 carat gold", min: 0, porDefecto: 0 },
    { id: "g21", tipo: "numero", etiqueta: "Grams of 21 carat gold", min: 0, porDefecto: 100 },
    { id: "g18", tipo: "numero", etiqueta: "Grams of 18 carat gold", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const lineas = [
      [entrada.g24, v["kw.gold-24k"].valor],
      [entrada.g22, v["kw.gold-22k"].valor],
      [entrada.g21, v["kw.gold-21k"].valor],
      [entrada.g18, v["kw.gold-18k"].valor],
    ] as const;
    if (lineas.every(([g]) => g <= 0)) throw new ErrorEntrada("Enter the weight of at least one type of gold.", "g21");
    const valor = redondear(lineas.reduce((s, [g, p]) => s + g * p, 0));
    return {
      zakat: redondear(porcentaje(valor, v["kw.zakat-rate"])),
      valor,
      gramos: lineas.reduce((s, [g]) => s + g, 0),
      fecha: v["kw.gold-24k"].fecha,
    };
  },
  resultado: [
    { clave: "zakat", etiqueta: "Zakat on your gold", formato: "moneda", destacada: true },
    { clave: "valor", etiqueta: "Value of your gold today", formato: "moneda" },
    { clave: "gramos", etiqueta: "Total weight in grams", formato: "numero", decimales: 2 },
    { clave: "fecha", etiqueta: "Gold price date", formato: "fecha" },
  ],
});
