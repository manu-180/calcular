import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "mx",
  pais: "MX",
  nombre: "México",
  locale: "es-MX",
  idioma: "es",
  trato: "tu",
  monedas: ["MXN"],
  zonaHoraria: "America/Mexico_City",
  estado: "interno",
  regiones: [
    { id: "general", nombre: "Resto del país" },
    { id: "frontera-norte", nombre: "Zona Libre de la Frontera Norte" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
