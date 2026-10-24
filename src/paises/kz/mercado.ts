import type { Mercado } from "@/motor/tipos";

// Ruso, lengua oficial a la par del kazajo y la de búsqueda de las calculadoras (ADR 0002, D17).
// El kazajo queda como edición futura kz-kk.
export const mercado: Mercado = {
  codigo: "kz",
  pais: "KZ",
  nombre: "Казахстан",
  locale: "ru-KZ",
  idioma: "ru",
  trato: "usted",
  monedas: ["KZT"],
  zonaHoraria: "Asia/Almaty",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 500,
};
