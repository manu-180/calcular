import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tt.vat-calculator",
  mercado: "tt",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "tt.vat-standard": "numero",
    "tt.vat-registration-threshold": "numero",
  },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What do you want to do?",
      opciones: [
        { valor: "add", etiqueta: "Add VAT to a price" },
        { valor: "remove", etiqueta: "Take VAT out of a price that includes it" },
      ],
      porDefecto: "add",
    },
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter an amount.", "importe");
    const tasa = v["tt.vat-standard"];
    const neto = e.modo === "add" ? e.importe : redondear(e.importe / (1 + tasa / 100));
    const vat = e.modo === "add" ? redondear(porcentaje(e.importe, tasa)) : redondear(e.importe - neto);
    return { total: redondear(neto + vat), neto, vat, tasa };
  },
  resultado: [
    { clave: "total", etiqueta: "Price with VAT", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Price before VAT", formato: "moneda" },
    { clave: "vat", etiqueta: "VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje" },
  ],
});
