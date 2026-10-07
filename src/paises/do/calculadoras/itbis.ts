import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.itbis",
  mercado: "do",
  concepto: "iva",
  slug: "itbis",
  estado: "publicado",
  requiere: {
    "do.itbis": "numero",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quieres hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Agregar el ITBIS a un precio" },
        { valor: "quitar", etiqueta: "Sacar el ITBIS de un precio que ya lo incluye" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["do.itbis"];
    if (entrada.sentido === "agregar") {
      const itbis = redondear(porcentaje(entrada.monto, tasa));
      return { neto: entrada.monto, itbis, total: redondear(entrada.monto + itbis) };
    }
    const neto = redondear(entrada.monto / (1 + tasa / 100));
    return { neto, itbis: redondear(entrada.monto - neto), total: entrada.monto };
  },
  resultado: [
    { clave: "neto", etiqueta: "Precio sin ITBIS", formato: "moneda" },
    { clave: "itbis", etiqueta: "ITBIS", formato: "moneda" },
    { clave: "total", etiqueta: "Precio con ITBIS", formato: "moneda", destacada: true },
  ],
});
