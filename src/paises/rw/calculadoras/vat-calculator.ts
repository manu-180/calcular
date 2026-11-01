import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.vat-calculator",
  mercado: "rw",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "rw.vat-rate": "numero",
    "rw.vat-threshold-year": "numero",
    "rw.vat-threshold-quarter": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "The amount",
      opciones: [
        { valor: "add", etiqueta: "Excludes VAT (add VAT)" },
        { valor: "remove", etiqueta: "Includes VAT (take VAT out)" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter an amount.", "monto");
    const tasa = v["rw.vat-rate"];
    const neto = e.modo === "add" ? e.monto : redondear(e.monto / (1 + tasa / 100));
    const total = e.modo === "add" ? redondear(e.monto + porcentaje(e.monto, tasa)) : e.monto;
    return { neto, iva: total - neto, total, tasa };
  },
  resultado: [
    { clave: "total", etiqueta: "Price with VAT", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "VAT", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Price without VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje", decimales: 0 },
  ],
});
