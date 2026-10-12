import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.impuesto-de-timbres",
  mercado: "gt",
  concepto: "propio",
  slug: "impuesto-de-timbres",
  estado: "publicado",
  requiere: {
    "gt.timbres": "numero",
  },
  campos: [{ id: "valor", tipo: "moneda", etiqueta: "Valor del contrato o documento", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["gt.timbres"];
    return {
      tasa,
      impuesto: redondear(porcentaje(entrada.valor, tasa)),
      observaciones: [
        "Se paga sobre el valor que dice el documento. Algunos documentos pagan una cuota fija y otros están exentos.",
        "Una operación que paga IVA no paga además timbres.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tarifa", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "Impuesto de timbres", formato: "moneda", destacada: true },
  ],
});
