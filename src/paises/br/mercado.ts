import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "br",
  pais: "BR",
  nombre: "Brasil",
  locale: "pt-BR",
  idioma: "pt",
  trato: "tu",
  monedas: ["BRL"],
  zonaHoraria: "America/Sao_Paulo",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 5,
};
