import type { Mercado } from "@/motor/tipos";

// Se carga USD (el billete que circula) y no PAB: Intl con es-PA escribe «USD 1,250.50», y en
// Panamá los decretos y las planillas escriben «B/. 1,250.50». El símbolo lo pisa `simbolos`.
export const mercado: Mercado = {
  codigo: "pa",
  pais: "PA",
  nombre: "Panamá",
  locale: "es-PA",
  idioma: "es",
  trato: "tu",
  monedas: ["USD"],
  zonaHoraria: "America/Panama",
  estado: "interno",
  regiones: [
    { id: "region-1", nombre: "Región 1 (Panamá, Colón, San Miguelito, David, Santiago, Chitré y otros distritos)" },
    { id: "region-2", nombre: "Región 2 (resto de los distritos del país)" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  simbolos: { USD: "B/." },
};
