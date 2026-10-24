import type { Mercado } from "@/motor/tipos";

// Regiones: solo las provincias con UMP 2026 leído en el decreto del gobernador o en la página oficial
// de la provincia. Las demás se suman cuando se verifique su decreto.
export const mercado: Mercado = {
  codigo: "id",
  pais: "ID",
  nombre: "Indonesia",
  locale: "id-ID",
  idioma: "id",
  trato: "usted",
  monedas: ["IDR"],
  zonaHoraria: "Asia/Jakarta",
  estado: "publicado",
  regiones: [
    { id: "dki-jakarta", nombre: "DKI Jakarta" },
    { id: "jawa-tengah", nombre: "Jawa Tengah" },
    { id: "jawa-timur", nombre: "Jawa Timur" },
    { id: "sumatera-utara", nombre: "Sumatera Utara" },
    { id: "sumatera-selatan", nombre: "Sumatera Selatan" },
    { id: "kepulauan-riau", nombre: "Kepulauan Riau" },
    { id: "bali", nombre: "Bali" },
    { id: "nusa-tenggara-barat", nombre: "Nusa Tenggara Barat" },
    { id: "nusa-tenggara-timur", nombre: "Nusa Tenggara Timur" },
    { id: "kalimantan-timur", nombre: "Kalimantan Timur" },
    { id: "sulawesi-selatan", nombre: "Sulawesi Selatan" },
    { id: "papua-tengah", nombre: "Papua Tengah" },
  ],
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 16000,
};
