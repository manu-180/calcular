import type { Mercado } from "@/motor/tipos";

// El soʻm se redondea a la unidad: sueldos, impuestos y prestaciones se liquidan sin tiyin.
export const mercado: Mercado = {
  codigo: "uz",
  pais: "UZ",
  nombre: "Oʻzbekiston",
  locale: "uz-UZ",
  idioma: "uz",
  trato: "usted",
  monedas: ["UZS"],
  zonaHoraria: "Asia/Tashkent",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 12000,
};
