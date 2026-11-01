import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "vn",
  pais: "VN",
  nombre: "Việt Nam",
  locale: "vi-VN",
  idioma: "vi",
  trato: "usted",
  monedas: ["VND"],
  zonaHoraria: "Asia/Ho_Chi_Minh",
  estado: "publicado",
  regiones: [
    { id: "vung-1", nombre: "Vùng I" },
    { id: "vung-2", nombre: "Vùng II" },
    { id: "vung-3", nombre: "Vùng III" },
    { id: "vung-4", nombre: "Vùng IV" },
  ],
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 25000,
};
