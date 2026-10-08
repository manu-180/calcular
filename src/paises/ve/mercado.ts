import type { Mercado } from "@/motor/tipos";

// es-VE formatea VES como "Bs.S" (bolívar soberano de 2018). Desde la reconversión de 2021 se
// escribe "Bs." y el dólar se escribe "$".
export const mercado: Mercado = {
  codigo: "ve",
  pais: "VE",
  nombre: "Venezuela",
  locale: "es-VE",
  idioma: "es",
  trato: "tu",
  monedas: ["VES", "USD"],
  zonaHoraria: "America/Caracas",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  simbolos: { VES: "Bs.", USD: "$" },
};
