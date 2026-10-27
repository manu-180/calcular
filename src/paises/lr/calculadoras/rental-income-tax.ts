import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.rental-income-tax",
  mercado: "lr",
  concepto: "propio",
  slug: "rental-income-tax",
  estado: "publicado",
  requiere: {
    "lr.withholding-rates": "mapa",
  },
  campos: [
    { id: "renta", tipo: "moneda", moneda: "USD", etiqueta: "Rent", min: 0, porDefecto: 500 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Rent is paid",
      opciones: [
        { valor: "mes", etiqueta: "Every month" },
        { valor: "anio", etiqueta: "Once a year" },
      ],
      porDefecto: "mes",
    },
    {
      id: "residente",
      tipo: "opcion",
      etiqueta: "The landlord is",
      opciones: [
        { valor: "rent-resident", etiqueta: "Resident in Liberia" },
        { valor: "rent-non-resident", etiqueta: "Not resident in Liberia" },
      ],
      porDefecto: "rent-resident",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter the rent.", "renta");
    const tasa = enMapa(v["lr.withholding-rates"], entrada.residente);
    const retencion = redondear(porcentaje(entrada.renta, tasa));
    const anual = entrada.periodo === "mes" ? redondear(retencion * 12) : retencion;
    return { retencion, neto: redondear(entrada.renta - retencion), anual, tasa };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax withheld from each payment", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "neto", etiqueta: "Rent the landlord receives", formato: "moneda", moneda: "USD" },
    { clave: "anual", etiqueta: "Tax withheld in a year", formato: "moneda", moneda: "USD" },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 0 },
  ],
});
