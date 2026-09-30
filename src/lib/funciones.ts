// Interruptor de todo lo que necesita las tablas ca_* (cuentas, panel, medición, guardar cálculos).
// Se inlinea en el build: las páginas estáticas y el servidor ven el mismo valor. Se prende con
// NEXT_PUBLIC_CUENTAS_ACTIVAS=1 en Vercel recién después de aplicar las migraciones: con las
// tablas ausentes, el registro dejaría cuentas sin verificar y los rate limits fallarían abiertos.
export const CUENTAS_ACTIVAS = process.env.NEXT_PUBLIC_CUENTAS_ACTIVAS === "1";
