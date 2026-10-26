import type { Mercado } from "@/motor/tipos";

// El código del mercado es el ISO del país (no) y el idioma es bokmål (nb): el motor los trata por
// separado (ruta /no, textos y diccionarios en nb, formato de nb-NO).
export const mercado: Mercado = {
  codigo: "no",
  pais: "NO",
  nombre: "Norge",
  locale: "nb-NO",
  idioma: "nb",
  trato: "tu",
  monedas: ["NOK"],
  zonaHoraria: "Europe/Oslo",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 10,
};
