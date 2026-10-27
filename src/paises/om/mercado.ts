import type { Mercado } from "@/motor/tipos";

// Árabe con cifras occidentales y calendario gregoriano (ADR 0002, D10): قانون العمل y قانون الحماية
// الاجتماعية cuentan plazos en días y meses gregorianos. El rial omaní se divide en 1.000 baisas.
export const mercado: Mercado = {
  codigo: "om",
  pais: "OM",
  nombre: "سلطنة عُمان",
  locale: "ar-OM-u-ca-gregory-nu-latn",
  idioma: "ar",
  trato: "usted",
  monedas: ["OMR"],
  zonaHoraria: "Asia/Muscat",
  estado: "publicado",
  redondeo: { decimales: 3, modo: "mitad-arriba" },
  escala: 0.4,
};
