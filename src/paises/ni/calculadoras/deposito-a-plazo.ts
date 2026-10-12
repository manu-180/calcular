import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.deposito-a-plazo",
  mercado: "ni",
  concepto: "plazo-fijo",
  slug: "deposito-a-plazo",
  estado: "publicado",
  requiere: {
    "ni.ir-rentas-capital": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto que depositás", min: 0, porDefecto: 50000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual que ofrece el banco", min: 0, max: 100, porDefecto: 5 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 360 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Año que usa el banco para calcular",
      opciones: [
        { valor: "360", etiqueta: "360 días" },
        { valor: "365", etiqueta: "365 días" },
      ],
      porDefecto: "360",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const interes = redondear((entrada.monto * entrada.tasa * entrada.dias) / (100 * Number(entrada.base)));
    const ir = redondear(porcentaje(interes, valores["ni.ir-rentas-capital"]));
    const neto = redondear(interes - ir);
    return {
      interes,
      ir,
      neto,
      total: redondear(entrada.monto + neto),
      observaciones: [
        "Es interés simple, pagado al vencimiento. Si el banco paga intereses cada mes, el total es parecido pero los recibís antes.",
        "El banco te retiene el IR sobre los intereses como retención definitiva: no tenés que declararlo.",
      ],
    };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses ganados", formato: "moneda" },
    { clave: "ir", etiqueta: "IR retenido", formato: "moneda" },
    { clave: "neto", etiqueta: "Intereses netos", formato: "moneda" },
    { clave: "total", etiqueta: "Total al vencimiento", formato: "moneda", destacada: true },
  ],
});
