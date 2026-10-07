import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "zz",
  pais: "ZZ",
  nombre: "Zetalandia",
  locale: "es-419",
  idioma: "es",
  trato: "tu",
  monedas: ["XTS"],
  zonaHoraria: "America/Lima",
  estado: "interno",
  regiones: [
    { id: "norte", nombre: "Zona norte" },
    { id: "sur", nombre: "Zona sur" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
