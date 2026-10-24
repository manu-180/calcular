import type { Mercado } from "@/motor/tipos";

// Bengalí con «আপনি» (ADR 0002, D14): trato "usted", como ja, ko, zh e id.
export const mercado: Mercado = {
  codigo: "bd",
  pais: "BD",
  nombre: "বাংলাদেশ",
  locale: "bn-BD",
  idioma: "bn",
  trato: "usted",
  monedas: ["BDT"],
  zonaHoraria: "Asia/Dhaka",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 120,
};
