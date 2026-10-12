import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { filaDe } from "../lib/fechas";

export default definirCalculadora({
  id: "ni.venta-de-inmuebles",
  mercado: "ni",
  concepto: "propio",
  slug: "venta-de-inmuebles",
  estado: "publicado",
  requiere: {
    "ni.ir-transmision-bienes": "escala",
    "ni.tipo-cambio": "serie",
  },
  campos: [
    {
      id: "moneda",
      tipo: "opcion",
      etiqueta: "Moneda del valor",
      opciones: [
        { valor: "usd", etiqueta: "Dólares" },
        { valor: "nio", etiqueta: "Córdobas" },
      ],
      porDefecto: "usd",
    },
    { id: "valor", tipo: "numero", etiqueta: "Valor de venta", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tc = valores["ni.tipo-cambio"].valor;
    const enDolares = entrada.moneda === "usd" ? entrada.valor : entrada.valor / tc;
    const enCordobas = entrada.moneda === "usd" ? redondear(entrada.valor * tc) : entrada.valor;
    const tasa = filaDe(valores["ni.ir-transmision-bienes"], enDolares).fila.tasa;
    const irCordobas = redondear(porcentaje(enCordobas, tasa));
    return {
      tipoCambio: tc,
      enCordobas,
      tasa,
      irCordobas,
      irDolares: redondear(irCordobas / tc),
      observaciones: [
        "Vale para la venta de casas, terrenos, vehículos y otros bienes que se inscriben en un registro público. Es una retención definitiva del IR.",
        "El porcentaje del tramo se aplica sobre todo el valor, no por partes.",
        "Lo paga quien vende. No incluye los gastos de escritura ni los impuestos municipales.",
      ],
    };
  },
  resultado: [
    { clave: "tipoCambio", etiqueta: "Tipo de cambio oficial", formato: "numero", decimales: 4 },
    { clave: "enCordobas", etiqueta: "Valor en córdobas", formato: "moneda" },
    { clave: "tasa", etiqueta: "Alícuota del tramo", formato: "porcentaje" },
    { clave: "irDolares", etiqueta: "IR en dólares", formato: "moneda", moneda: "USD" },
    { clave: "irCordobas", etiqueta: "IR a pagar", formato: "moneda", destacada: true },
  ],
});
