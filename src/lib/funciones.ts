// Interruptor de todo lo que necesita las tablas ca_* (cuentas, panel, medición, guardar cálculos).
// Se inlinea en el build: las páginas estáticas y el servidor ven el mismo valor. Se prende con
// NEXT_PUBLIC_CUENTAS_ACTIVAS=1 en Vercel recién después de aplicar las migraciones: con las
// tablas ausentes, el registro dejaría cuentas sin verificar y los rate limits fallarían abiertos.
export const CUENTAS_ACTIVAS = process.env.NEXT_PUBLIC_CUENTAS_ACTIVAS === "1";

// Google necesita el cliente OAuth cargado en Supabase Auth: sin eso, el botón termina en un error
// de Google. Se prende con NEXT_PUBLIC_GOOGLE_ACTIVO=1 recién después de configurarlo.
export const GOOGLE_ACTIVO = CUENTAS_ACTIVAS && process.env.NEXT_PUBLIC_GOOGLE_ACTIVO === "1";

// calcularya necesita su propio redirect URI (https://calcularya.com/auth/google/vuelta) cargado en el
// cliente OAuth de Google Cloud. Sin él, Google corta con redirect_uri_mismatch en su pantalla y la
// persona no vuelve: el botón no se muestra hasta prender NEXT_PUBLIC_GOOGLE_INTL_ACTIVO=1.
export const GOOGLE_INTL_ACTIVO = GOOGLE_ACTIVO && process.env.NEXT_PUBLIC_GOOGLE_INTL_ACTIVO === "1";
