import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ni",
  pais: "NI",
  nombre: "Nicaragua",
  locale: "es-NI",
  idioma: "es",
  trato: "vos",
  monedas: ["NIO", "USD"],
  zonaHoraria: "America/Managua",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  simbolos: { USD: "US$" },
};
