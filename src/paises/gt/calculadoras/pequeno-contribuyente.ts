import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.pequeno-contribuyente",
  mercado: "gt",
  concepto: "regimen-simplificado",
  slug: "pequeno-contribuyente",
  estado: "publicado",
  requiere: {
    "gt.pequeno-contribuyente": "numero",
  },
  campos: [{ id: "ventas", tipo: "moneda", etiqueta: "Total facturado en el mes", min: 0, ayuda: "La suma de sus facturas de pequeño contribuyente del mes." }],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["gt.pequeno-contribuyente"];
    const impuesto = redondear(porcentaje(entrada.ventas, tasa));
    return {
      tasa,
      impuesto,
      neto: redondear(entrada.ventas - impuesto),
      observaciones: [
        "Si su cliente es agente de retención, él le descuenta este impuesto y lo paga por usted. Lo que no le retengan lo declara usted el mes siguiente.",
        "En este régimen no paga ISR ni lleva más libro que el de compras y ventas.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tarifa", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "Impuesto del mes", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Le queda después del impuesto", formato: "moneda" },
  ],
});
