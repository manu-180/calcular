import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "md",
  pais: "MD",
  nombre: "Republica Moldova",
  locale: "ro-MD",
  idioma: "ro",
  trato: "usted",
  monedas: ["MDL"],
  zonaHoraria: "Europe/Chisinau",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  // Intl scrie „L” pentru MDL; în Republica Moldova sumele se scriu cu „lei”.
  simbolos: { MDL: "lei" },
  escala: 18,
};
