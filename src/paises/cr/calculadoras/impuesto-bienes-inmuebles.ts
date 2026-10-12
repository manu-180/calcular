import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.impuesto-bienes-inmuebles",
  mercado: "cr",
  concepto: "propio",
  slug: "impuesto-bienes-inmuebles",
  estado: "publicado",
  requiere: {
    "cr.bienes-inmuebles": "numero",
  },
  campos: [
    {
      id: "valor",
      tipo: "moneda",
      etiqueta: "Valor del inmueble registrado en la municipalidad",
      ayuda: "Aparece en el estado de cuenta o en la declaración de bienes inmuebles.",
      min: 0,
    },
    {
      id: "exento",
      tipo: "moneda",
      etiqueta: "Monto exento por bien único (si aplica)",
      ayuda: "Si es su único inmueble y usted es persona física, la municipalidad le indica el monto exento.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const base = Math.max(0, entrada.valor - (entrada.exento ?? 0));
    const anual = redondear(porcentaje(base, valores["cr.bienes-inmuebles"]));
    return {
      base: redondear(base),
      anual,
      trimestral: redondear(anual / 4),
      observaciones: ["Cada municipalidad cobra el impuesto y puede dar descuentos por pagar el año por adelantado."],
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Valor sobre el que se paga", formato: "moneda" },
    { clave: "anual", etiqueta: "Impuesto anual", formato: "moneda", destacada: true },
    { clave: "trimestral", etiqueta: "Pago por trimestre (si su municipalidad cobra en cuatro cuotas)", formato: "moneda" },
  ],
});
