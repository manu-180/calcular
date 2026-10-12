import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.impuesto-de-traspaso",
  mercado: "cr",
  concepto: "propio",
  slug: "impuesto-de-traspaso",
  estado: "publicado",
  requiere: {
    "cr.traspaso-inmuebles": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Precio de la compraventa", min: 0 },
    {
      id: "valorRegistrado",
      tipo: "moneda",
      etiqueta: "Valor registrado del inmueble (opcional)",
      ayuda: "El que tiene la municipalidad para bienes inmuebles. El impuesto nunca se calcula sobre menos que este valor.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const base = Math.max(entrada.precio, entrada.valorRegistrado ?? 0);
    const impuesto = redondear(porcentaje(base, valores["cr.traspaso-inmuebles"]));
    const vendedor = redondear(impuesto / 2);
    return {
      base: redondear(base),
      impuesto,
      vendedor,
      comprador: redondear(impuesto - vendedor),
      observaciones: [
        "Se paga dentro de los quince días hábiles desde la firma de la escritura.",
        "No incluye los honorarios del notario ni los timbres y derechos del Registro Nacional.",
      ],
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Valor sobre el que se paga", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto de traspaso", formato: "moneda", destacada: true },
    { clave: "vendedor", etiqueta: "Parte de quien vende", formato: "moneda" },
    { clave: "comprador", etiqueta: "Parte de quien compra", formato: "moneda" },
  ],
});
