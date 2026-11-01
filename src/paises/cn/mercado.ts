import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "cn",
  pais: "CN",
  nombre: "中国",
  locale: "zh-CN",
  idioma: "zh",
  trato: "tu",
  monedas: ["CNY"],
  zonaHoraria: "Asia/Shanghai",
  estado: "interno",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  escala: 7,
};
