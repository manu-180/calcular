import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "cv",
  pais: "CV",
  nombre: "Cabo Verde",
  locale: "pt-CV",
  idioma: "pt",
  trato: "usted",
  monedas: ["CVE"],
  zonaHoraria: "Atlantic/Cape_Verde",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 100,
  simbolos: { CVE: "CVE" },
};
