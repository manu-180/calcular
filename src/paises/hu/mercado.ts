import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "hu",
  pais: "HU",
  nombre: "Magyarország",
  locale: "hu-HU",
  idioma: "hu",
  // ADR 0002, D21: tegezés, como OTP, K&H, Revolut y los portales de finanzas y empleo.
  trato: "tu",
  monedas: ["HUF"],
  zonaHoraria: "Europe/Budapest",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  escala: 350,
};
