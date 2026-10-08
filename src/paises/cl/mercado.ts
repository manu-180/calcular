import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "cl",
  pais: "CL",
  nombre: "Chile",
  locale: "es-CL",
  idioma: "es",
  trato: "tu",
  monedas: ["CLP"],
  zonaHoraria: "America/Santiago",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
};
