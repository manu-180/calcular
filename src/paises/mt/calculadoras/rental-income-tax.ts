import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mt.rental-income-tax",
  mercado: "mt",
  concepto: "propio",
  slug: "rental-income-tax",
  estado: "publicado",
  requiere: { "mt.rental-income-tax-rate": "numero" },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Rent received", min: 0, porDefecto: 1000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "The rent is",
      opciones: [
        { valor: "mes", etiqueta: "A month" },
        { valor: "anio", etiqueta: "A year" },
      ],
      porDefecto: "mes",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter the rent you receive.", "renta");
    const anual = entrada.periodo === "mes" ? entrada.renta * 12 : entrada.renta;
    const impuesto = redondear(porcentaje(anual, v["mt.rental-income-tax-rate"]));
    return {
      impuesto,
      anual: redondear(anual),
      neto: redondear(anual - impuesto),
      mensual: redondear(impuesto / 12),
      observaciones: ["Rent from a long private residential lease can get a lower tax under rules made for those leases, which are not included here."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on the year's rent", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Tax a month", formato: "moneda" },
    { clave: "anual", etiqueta: "Gross rent for the year", formato: "moneda" },
    { clave: "neto", etiqueta: "Rent left after tax", formato: "moneda" },
  ],
});
