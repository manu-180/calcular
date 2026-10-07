import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "ec",
  pais: "EC",
  nombre: "Ecuador",
  locale: "es-EC",
  idioma: "es",
  trato: "tu",
  monedas: ["USD"],
  zonaHoraria: "America/Guayaquil",
  estado: "interno",
  regiones: [
    { id: "costa", nombre: "Costa y Galápagos" },
    { id: "sierra", nombre: "Sierra y Amazonía" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
