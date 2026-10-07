import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "uy",
  pais: "UY",
  nombre: "Uruguay",
  locale: "es-UY",
  idioma: "es",
  trato: "vos",
  monedas: ["UYU"],
  zonaHoraria: "America/Montevideo",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
