import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.gct-calculator",
  mercado: "jm",
  concepto: "iva",
  slug: "gct-calculator",
  estado: "publicado",
  requiere: {
    "jm.gct-standard": "numero",
  },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What do you want to do?",
      opciones: [
        { valor: "add", etiqueta: "Add GCT to a price" },
        { valor: "remove", etiqueta: "Take GCT out of a price that includes it" },
      ],
      porDefecto: "add",
    },
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 10000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter an amount.", "importe");
    const tasa = v["jm.gct-standard"];
    const neto = e.modo === "add" ? e.importe : redondear(e.importe / (1 + tasa / 100));
    const gct = e.modo === "add" ? redondear(porcentaje(e.importe, tasa)) : redondear(e.importe - neto);
    return { total: redondear(neto + gct), neto, gct, tasa };
  },
  resultado: [
    { clave: "total", etiqueta: "Price with GCT", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Price before GCT", formato: "moneda" },
    { clave: "gct", etiqueta: "GCT", formato: "moneda" },
    { clave: "tasa", etiqueta: "GCT rate", formato: "porcentaje" },
  ],
});
