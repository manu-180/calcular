import type { Mercado } from "@/motor/tipos";

// Árabe con cifras occidentales y calendario gregoriano (ADR 0002, D10): los plazos del نظام العمل y
// de las التأمينات الاجتماعية se calculan en días y meses gregorianos.
export const mercado: Mercado = {
  codigo: "sa",
  pais: "SA",
  nombre: "المملكة العربية السعودية",
  locale: "ar-SA-u-ca-gregory-nu-latn",
  idioma: "ar",
  trato: "usted",
  monedas: ["SAR"],
  zonaHoraria: "Asia/Riyadh",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 4,
};
