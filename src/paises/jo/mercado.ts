import type { Mercado } from "@/motor/tipos";

// Árabe con cifras occidentales y calendario gregoriano (ADR 0002, D10). El dinar se divide en mil
// fils: los montos se redondean a 3 decimales.
export const mercado: Mercado = {
  codigo: "jo",
  pais: "JO",
  nombre: "الأردن",
  locale: "ar-JO-u-ca-gregory-nu-latn",
  idioma: "ar",
  trato: "usted",
  monedas: ["JOD"],
  zonaHoraria: "Asia/Amman",
  estado: "publicado",
  redondeo: { decimales: 3, modo: "mitad-arriba" },
  escala: 0.7,
};
