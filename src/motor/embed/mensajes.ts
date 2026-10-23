// Contrato entre la calculadora embebida y public/embed.js. El script los repite a mano (no pasa por
// el bundler): si se cambia un valor hay que cambiarlo en los dos lados.
export const MENSAJE_ALTO = "calcularya:alto";
export const MENSAJE_PEDIR_ALTO = "calcularya:pedir-alto";
export const MENSAJE_LISTO = "calcularya:listo";

export const ALTO_INICIAL = 560;
export const ALTO_MINIMO = 80;
export const ALTO_MAXIMO = 12000;
