import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.withholding-tax-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "lk.wht-interest": "numero",
    "lk.wht-dividend": "numero",
    "lk.wht-rent": "numero",
    "lk.wht-rent-limit": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of payment",
      opciones: [
        { valor: "interest", etiqueta: "Interest or discount" },
        { valor: "dividend", etiqueta: "Dividend" },
        { valor: "rent", etiqueta: "Monthly rent paid to a resident" },
      ],
      porDefecto: "interest",
    },
    { id: "importe", tipo: "moneda", etiqueta: "Gross payment", min: 0, porDefecto: 100000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter the gross payment.", "importe");
    const observaciones: string[] = [];
    let tasa: number;
    if (e.tipo === "interest") tasa = v["lk.wht-interest"];
    else if (e.tipo === "dividend") tasa = v["lk.wht-dividend"];
    else if (e.importe > v["lk.wht-rent-limit"]) {
      tasa = v["lk.wht-rent"];
      observaciones.push("The monthly rent is above the limit, so tax is withheld on the full amount.");
    } else {
      tasa = 0;
      observaciones.push("No tax is withheld on monthly rent up to the limit.");
    }
    const retencion = redondear(porcentaje(e.importe, tasa));
    return { retencion, tasa, neto: redondear(e.importe - retencion), observaciones };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax withheld", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
    { clave: "neto", etiqueta: "Amount received", formato: "moneda" },
  ],
});
