import type { Mercado } from "@/motor/tipos";

// Ruso, lengua oficial junto al kirguís y la de búsqueda de las calculadoras (ADR 0002, D17).
// El kirguís queda como edición futura kg-ky.
export const mercado: Mercado = {
  codigo: "kg",
  pais: "KG",
  nombre: "Кыргызстан",
  locale: "ru-KG",
  idioma: "ru",
  trato: "usted",
  monedas: ["KGS"],
  zonaHoraria: "Asia/Bishkek",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 87,
};
