import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.plazo-fijo",
  mercado: "ec",
  concepto: "plazo-fijo",
  slug: "plazo-fijo",
  estado: "publicado",
  requiere: {
    "ec.retencion-renta": "mapa",
    "ec.plazo-fijo-exento-dias": "numero",
  },
  campos: [
    { id: "capital", tipo: "moneda", etiqueta: "Monto que inviertes", min: 0 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual que te ofrece el banco", min: 0, max: 30 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, porDefecto: 180 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Días del año que usa tu banco",
      opciones: [
        { valor: "360", etiqueta: "360 días (lo más común)" },
        { valor: "365", etiqueta: "365 días" },
      ],
      porDefecto: "360",
    },
    {
      id: "deudor",
      tipo: "si-no",
      etiqueta: "Tienes un préstamo con ese banco",
      ayuda: "Las deudas de tarjeta de crédito no cuentan.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const interes = redondear((entrada.capital * entrada.tasa * entrada.dias) / 100 / Number(entrada.base));
    const exento = entrada.dias >= valores["ec.plazo-fijo-exento-dias"] && !entrada.deudor;
    const retencion = exento ? 0 : redondear(porcentaje(interes, enMapa(valores["ec.retencion-renta"], "rendimientos")));
    const observaciones: string[] = [];
    if (exento) observaciones.push("Tus intereses no pagan impuesto a la renta: el plazo llega al mínimo y no le debes al banco.");
    else if (entrada.deudor) observaciones.push("Como tienes un préstamo con ese banco, los intereses pagan impuesto aunque el plazo sea largo.");
    else observaciones.push(`Con ${valores["ec.plazo-fijo-exento-dias"]} días o más, los intereses no pagarían impuesto a la renta.`);
    return {
      interes,
      retencion,
      neto: redondear(interes - retencion),
      final: redondear(entrada.capital + interes - retencion),
      observaciones,
    };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses ganados", formato: "moneda" },
    { clave: "retencion", etiqueta: "Retención de impuesto a la renta", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Ganancia neta", formato: "moneda" },
    { clave: "final", etiqueta: "Recibes al vencimiento", formato: "moneda", destacada: true },
  ],
});
