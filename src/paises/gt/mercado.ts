import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "gt",
  pais: "GT",
  nombre: "Guatemala",
  locale: "es-GT",
  idioma: "es",
  trato: "usted",
  monedas: ["GTQ"],
  zonaHoraria: "America/Guatemala",
  estado: "publicado",
  regiones: [
    { id: "ce1", nombre: "Departamento de Guatemala (circunscripción 1)" },
    { id: "ce2", nombre: "Resto del país (circunscripción 2)" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
