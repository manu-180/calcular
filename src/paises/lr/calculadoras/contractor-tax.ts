import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.contractor-tax",
  mercado: "lr",
  concepto: "retencion-honorarios",
  slug: "contractor-tax",
  estado: "publicado",
  requiere: {
    "lr.withholding-rates": "mapa",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount of the contract or invoice", min: 0, porDefecto: 100000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "You are paid under",
      opciones: [
        { valor: "contracts", etiqueta: "A contract for services rendered" },
        { valor: "services", etiqueta: "An invoice for services" },
      ],
      porDefecto: "contracts",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount you are paid.", "monto");
    const tasa = enMapa(v["lr.withholding-rates"], entrada.tipo);
    const impuesto = redondear(porcentaje(entrada.monto, tasa));
    return { impuesto, neto: redondear(entrada.monto - impuesto), tasa };
  },
  resultado: [
    { clave: "neto", etiqueta: "What you receive", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Tax withheld", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
