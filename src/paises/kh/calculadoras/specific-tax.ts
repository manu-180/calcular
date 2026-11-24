import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.specific-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "specific-tax",
  estado: "publicado",
  requiere: { "kh.specific-rates": "mapa" },
  campos: [
    { id: "bien", tipo: "opcion-dato", dato: "kh.specific-rates", etiqueta: "ប្រភេទទំនិញ ឬសេវា", porDefecto: "beer" },
    { id: "base", tipo: "moneda", etiqueta: "មូលដ្ឋានគិតអាករ (រៀល)", min: 0, porDefecto: 1000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.base <= 0) throw new ErrorEntrada("សូមបញ្ចូលមូលដ្ឋានគិតអាករ។", "base");
    const tasa = enMapa(v["kh.specific-rates"], e.bien);
    return { impuesto: redondear(porcentaje(e.base, tasa)), tasa };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "អាករពិសេស", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "អត្រា", formato: "porcentaje" },
  ],
});
