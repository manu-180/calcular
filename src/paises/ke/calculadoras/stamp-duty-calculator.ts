import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// Schedule de la Stamp Duty Act: hasta KSh 2.000 se paga por escalones de KSh 500 (la cuarta parte
// del monto fijo de los primeros 2.000 por escalón) y después una suma fija por cada KSh 1.000 o
// fracción. Así sale el 4 % en municipios y el 2 % fuera.
export default definirCalculadora({
  id: "ke.stamp-duty-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "ke.stamp-duty-per-1000": "mapa",
    "ke.stamp-duty-first-2000": "mapa",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Value of the property (price or market value)", min: 0, porDefecto: 8000000 },
    { id: "zona", tipo: "opcion-dato", etiqueta: "Where the property is", dato: "ke.stamp-duty-per-1000", porDefecto: "municipality" },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the value of the property.", "valor");
    const primeros = enMapa(v["ke.stamp-duty-first-2000"], e.zona);
    const porMil = enMapa(v["ke.stamp-duty-per-1000"], e.zona);
    const impuesto =
      e.valor <= 2000 ? Math.ceil(e.valor / 500) * (primeros / 4) : primeros + Math.ceil((e.valor - 2000) / 1000) * porMil;
    return {
      impuesto: redondear(impuesto),
      tasa: (porMil / 1000) * 100,
      total: redondear(e.valor + impuesto),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Stamp duty", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Effective rate", formato: "porcentaje", decimales: 0 },
    { clave: "total", etiqueta: "Value plus stamp duty", formato: "moneda" },
  ],
});
