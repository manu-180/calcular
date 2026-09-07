// Google Ads — tracking de conversiones (calcular.ar).
// El ID de Ads y los labels son PÚBLICOS por diseño: viajan al navegador dentro
// del gtag. No son credenciales; no hay secretos acá.
//
// Cuenta: APEX (4869983637, ARS). El tag se comparte con el resto de la cuenta,
// pero cada conversión es independiente.
export const GOOGLE_ADS_ID = "AW-18041789644";

// Compra de la Planilla de Comercio ($14.900). Conversión PURCHASE creada el
// 2026-06-21 (ID interno 7656363058). Se dispara en /planillas/gracias cuando
// MercadoPago confirma el pago.
export const CONVERSION_COMPRA_PLANILLA = `${GOOGLE_ADS_ID}/UzbYCLKo68IcEMy5_5pD`;
