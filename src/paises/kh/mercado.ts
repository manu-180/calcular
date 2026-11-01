import type { Mercado } from "@/motor/tipos";

// «កម្ពុជា» escrito a mano: Intl.DisplayNames de km trae U+200B (ADR 0002, D38).
export const mercado: Mercado = {
  codigo: "kh",
  pais: "KH",
  nombre: "កម្ពុជា",
  locale: "km-KH",
  idioma: "km",
  trato: "usted",
  monedas: ["KHR", "USD"],
  zonaHoraria: "Asia/Phnom_Penh",
  estado: "interno",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 4000,
};
