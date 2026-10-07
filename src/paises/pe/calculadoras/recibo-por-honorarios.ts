import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.cuarta-categoria",
  mercado: "pe",
  concepto: "retencion-honorarios",
  slug: "recibo-por-honorarios",
  estado: "publicado",
  requiere: {
    "pe.retencion-cuarta": "numero",
    "pe.minimo-retencion-cuarta": "numero",
    "pe.suspension-cuarta": "mapa",
    "pe.deduccion-cuarta": "numero",
    "pe.tope-deduccion-cuarta": "numero",
    "pe.deduccion-renta-trabajo": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del recibo por honorarios", min: 0 },
    { id: "suspension", tipo: "si-no", etiqueta: "Tienes la suspensión de retenciones aprobada por SUNAT", porDefecto: false },
    {
      id: "actividad",
      tipo: "opcion",
      etiqueta: "Tipo de trabajo",
      opciones: [
        { valor: "general", etiqueta: "Profesional u oficio independiente" },
        { valor: "directores", etiqueta: "Director de empresa, síndico, mandatario o similar" },
      ],
      porDefecto: "general",
    },
    {
      id: "ingresosAnuales",
      tipo: "moneda",
      etiqueta: "Lo que calculas ganar con recibos en todo el año",
      ayuda: "Opcional. Sirve para saber si puedes pedir la suspensión.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["pe.minimo-retencion-cuarta"];
    const corresponde = entrada.monto > minimo && !entrada.suspension;
    const retencion = corresponde ? redondear(porcentaje(entrada.monto, valores["pe.retencion-cuarta"])) : 0;
    const topeAnual = enMapa(valores["pe.suspension-cuarta"], entrada.actividad === "directores" ? "anual-directores" : "anual");
    const observaciones: string[] = [];
    if (entrada.monto <= minimo) observaciones.push("Por recibos que no superan el mínimo no se retiene nada.");
    if (entrada.suspension) observaciones.push("Con la suspensión aprobada, la empresa no te retiene. Muéstrale tu constancia.");
    if (entrada.ingresosAnuales !== null && entrada.ingresosAnuales <= topeAnual && !entrada.suspension) {
      observaciones.push("Con esos ingresos puedes pedir a SUNAT la suspensión de retenciones (formulario virtual 1609).");
    }
    return {
      retencion,
      neto: redondear(entrada.monto - retencion),
      topeAnual,
      observaciones,
    };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Retención de impuesto a la renta", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que cobras", formato: "moneda", destacada: true },
    { clave: "topeAnual", etiqueta: "Tope anual para pedir la suspensión", formato: "moneda" },
  ],
});
