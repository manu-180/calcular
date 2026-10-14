import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "es",
  pais: "ES",
  nombre: "España",
  locale: "es-ES",
  idioma: "es",
  trato: "tu",
  monedas: ["EUR"],
  zonaHoraria: "Europe/Madrid",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 1,
};
