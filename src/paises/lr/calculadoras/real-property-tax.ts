import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.real-property-tax",
  mercado: "lr",
  concepto: "propio",
  slug: "real-property-tax",
  estado: "publicado",
  requiere: {
    "lr.real-property-rates": "mapa",
  },
  campos: [
    { id: "valor", tipo: "moneda", moneda: "USD", etiqueta: "Market value of land and buildings", min: 0, porDefecto: 50000 },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Type of property", dato: "lr.real-property-rates", porDefecto: "residential" },
    { id: "anios", tipo: "entero", etiqueta: "Years you are paying for", min: 1, max: 10, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the market value of the property.", "valor");
    if (entrada.anios < 1) throw new ErrorEntrada("Enter at least one year.", "anios");
    const tasa = enMapa(v["lr.real-property-rates"], entrada.tipo);
    const anual = redondear(porcentaje(entrada.valor, tasa));
    return { anual, total: redondear(anual * entrada.anios), tasa };
  },
  resultado: [
    { clave: "anual", etiqueta: "Real property tax a year", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "total", etiqueta: "Total for the years you are paying", formato: "moneda", moneda: "USD" },
    { clave: "tasa", etiqueta: "Tax rate", formato: "porcentaje", decimales: 2 },
  ],
});
