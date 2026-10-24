import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.gift-tax",
  mercado: "gh",
  concepto: "propio",
  slug: "gift-tax",
  estado: "publicado",
  requiere: {
    "gh.gift-tax": "mapa",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Market value of the gift", min: 0, porDefecto: 10000 },
    { id: "residente", tipo: "opcion-dato", etiqueta: "You are", dato: "gh.gift-tax", porDefecto: "resident" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the value of the gift.", "valor");
    const tasa = enMapa(v["gh.gift-tax"], entrada.residente);
    const impuesto = redondear(porcentaje(entrada.valor, tasa));
    return { impuesto, neto: redondear(entrada.valor - impuesto), tasa };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Gift tax", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Value after tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
