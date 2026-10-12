import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.isr-no-residentes",
  mercado: "hn",
  concepto: "propio",
  slug: "isr-no-residentes",
  estado: "publicado",
  requiere: {
    "hn.isr-no-residentes": "mapa",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto que se paga al no residente", min: 0 },
    { id: "tipo", tipo: "opcion-dato", dato: "hn.isr-no-residentes", etiqueta: "Tipo de ingreso", porDefecto: "otros" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["hn.isr-no-residentes"], entrada.tipo);
    const retencion = redondear(porcentaje(entrada.monto, tasa));
    return {
      tasa,
      retencion,
      neto: redondear(entrada.monto - retencion),
      observaciones: ["Quien hace el pago desde Honduras retiene el impuesto y lo entera al SAR. Un convenio para evitar la doble tributación puede cambiar la tasa."],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa para este ingreso", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Impuesto a retener", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Lo que recibe el no residente", formato: "moneda" },
  ],
});
