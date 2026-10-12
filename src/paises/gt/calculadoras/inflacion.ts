import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.inflacion",
  mercado: "gt",
  concepto: "inflacion",
  slug: "inflacion",
  estado: "publicado",
  requiere: {
    "gt.inflacion-interanual": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quiere saber",
      opciones: [
        { valor: "actualizar", etiqueta: "Cuánto cuesta hoy lo que hace un año costaba este monto" },
        { valor: "descontar", etiqueta: "Cuánto costaba hace un año lo que hoy cuesta este monto" },
      ],
      porDefecto: "actualizar",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { valor: tasa, fecha } = valores["gt.inflacion-interanual"];
    const resultado = entrada.sentido === "actualizar" ? redondear(entrada.monto * (1 + tasa / 100)) : redondear(entrada.monto / (1 + tasa / 100));
    return {
      tasa,
      fecha,
      resultado,
      diferencia: redondear(Math.abs(resultado - entrada.monto)),
      observaciones: ["Es la inflación de los últimos 12 meses del índice de precios al consumidor que mide el INE. Su gasto puede haber subido más o menos."],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Inflación de los últimos 12 meses", formato: "porcentaje" },
    { clave: "fecha", etiqueta: "Dato del mes de", formato: "fecha" },
    { clave: "resultado", etiqueta: "Monto equivalente", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Diferencia por inflación", formato: "moneda" },
  ],
});
