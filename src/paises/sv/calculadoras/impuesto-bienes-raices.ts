import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sv.impuesto-bienes-raices",
  mercado: "sv",
  concepto: "propio",
  slug: "impuesto-bienes-raices",
  estado: "publicado",
  requiere: {
    "sv.bienes-raices-tasa": "numero",
    "sv.bienes-raices-exento": "numero",
    "sv.colones-por-dolar": "numero",
  },
  campos: [{ id: "valor", tipo: "moneda", etiqueta: "Valor del inmueble", ayuda: "El precio de la compraventa o el valor declarado del inmueble.", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const exceso = redondear(Math.max(0, entrada.valor - valores["sv.bienes-raices-exento"]));
    return {
      exceso,
      impuesto: redondear(porcentaje(exceso, valores["sv.bienes-raices-tasa"])),
      observaciones: ["Si el inmueble se divide en parcelas, cada parcela se calcula por separado."],
    };
  },
  resultado: [
    { clave: "exceso", etiqueta: "Valor sobre el que se paga", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto de transferencia", formato: "moneda", destacada: true },
  ],
});
