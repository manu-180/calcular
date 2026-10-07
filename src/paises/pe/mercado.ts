import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "pe",
  pais: "PE",
  nombre: "Perú",
  locale: "es-PE",
  idioma: "es",
  trato: "tu",
  monedas: ["PEN"],
  zonaHoraria: "America/Lima",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
