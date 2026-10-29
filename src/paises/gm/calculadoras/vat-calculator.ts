import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.vat-calculator",
  mercado: "gm",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "gm.vat-rate": "numero",
    "gm.vat-registration-threshold": "numero",
    "gm.vat-voluntary-threshold": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "This amount",
      opciones: [
        { valor: "sumar", etiqueta: "Excludes VAT (add VAT)" },
        { valor: "quitar", etiqueta: "Includes VAT (take VAT out)" },
      ],
      porDefecto: "sumar",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const tasa = v["gm.vat-rate"];
    const base = entrada.modo === "sumar" ? entrada.monto : (entrada.monto / (100 + tasa)) * 100;
    const iva = redondear(entrada.modo === "sumar" ? porcentaje(base, tasa) : entrada.monto - base);
    const neto = redondear(entrada.modo === "sumar" ? base : entrada.monto - iva);
    return { iva, neto, total: redondear(neto + iva), tasa };
  },
  resultado: [
    { clave: "iva", etiqueta: "VAT", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Price without VAT", formato: "moneda" },
    { clave: "total", etiqueta: "Price with VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje", decimales: 0 },
  ],
});
