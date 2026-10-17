// Entorno fijo para scripts/check_pagos.ts. Va en un módulo aparte, importado antes que cualquier src/:
// los import se evalúan antes que el cuerpo del check, y varios módulos leen el entorno al cargarse
// (CUENTAS_ACTIVAS en src/lib/funciones.ts). Con las variables del shell de quien corre el check
// (NODE_ENV=development de un next dev, NEXT_PUBLIC_CUENTAS_ACTIVAS=1 de un .env bajado de Vercel,
// MP_WEBHOOK_SECRET) el resultado dependía de la terminal: el check daba distinto en cada máquina.
// No es un check (no empieza con check_).

const FIJAS: Record<string, string> = {
  PAYPAL_CLIENT_ID: "cliente-de-prueba",
  PAYPAL_CLIENT_SECRET: "secreto-de-prueba",
  PAYPAL_WEBHOOK_ID: "WH-PRUEBA",
  PAYPAL_ENV: "live",
  NEXT_PUBLIC_SITIO_INTL_URL: "https://calcularya.com",
  SUPABASE_URL: "https://base.prueba",
  SUPABASE_SERVICE_ROLE_KEY: "rol-de-servicio-de-prueba",
  RESEND_API_KEY: "re_prueba",
  MP_ACCESS_TOKEN: "APP_USR-token-de-prueba",
};

const FUERA = [
  "NODE_ENV",
  "VERCEL_ENV",
  "MP_ACCESS_TOKEN_LEGADO",
  "MP_WEBHOOK_SECRET",
  "NEXT_PUBLIC_CUENTAS_ACTIVAS",
  "NEXT_PUBLIC_SITIO_AR_URL",
  "PAGOS_INTL_PROVEEDOR",
  "PAYPAL_SANDBOX_EN_PRODUCCION",
  "SUPABASE_SERVICE_KEY",
  "SUPABASE_ANON_KEY",
  "ADMIN_EMAILS",
];

for (const k of FUERA) Reflect.deleteProperty(process.env, k);
Object.assign(process.env, FIJAS);
