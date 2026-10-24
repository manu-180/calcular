import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.rent-tax",
  mercado: "gh",
  concepto: "propio",
  slug: "rent-tax",
  estado: "publicado",
  requiere: {
    "gh.rent-tax": "mapa",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Rent received", min: 0, porDefecto: 2000 },
    {
      id: "tipo",
      tipo: "opcion-dato",
      etiqueta: "Type of premises",
      dato: "gh.rent-tax",
      porDefecto: "residential",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter the rent received.", "renta");
    const tasa = enMapa(v["gh.rent-tax"], entrada.tipo);
    const impuesto = redondear(porcentaje(entrada.renta, tasa));
    return { impuesto, neto: redondear(entrada.renta - impuesto), tasa };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Rent income tax", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Rent after tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
