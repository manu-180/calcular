// Verificación del contrato de `src/lib/ads.ts` (tracking de conversiones de Google Ads).
// Correr con: npx tsx scripts/check_ads.ts
//
// OJO: ads.ts NO hace aritmética — exporta constantes (ID de Ads + labels de conversión).
// Por eso este check NO verifica números, sino el FORMATO/CONTRATO de esas constantes.
// Por qué importa: si un label de conversión queda deformado (un dígito de más, el template
// literal roto, un "/" perdido), gtag manda un send_to inválido y la conversión NO se registra
// EN SILENCIO. Con el test pago de Google Ads en vivo (s57), eso = plata de ads sin medición.
// Este guard congela la forma esperada: AW-<digitos> para el ID y AW-<digitos>/<label> para
// cada conversión, encadenada al ID. Una calculadora nueva que sume una conversión se cubre
// agregando su assert acá.

import {
  GOOGLE_ADS_ID,
  CONVERSION_COMPRA_PLANILLA,
} from "../src/lib/ads";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// Formato del tag de la cuenta: AW- seguido SOLO de dígitos.
const RE_ADS_ID = /^AW-\d+$/;
// Formato de una conversión: <ADS_ID>/<label>, label alfanumérico + _ y - (base64url de Google).
const RE_CONVERSION = /^AW-\d+\/[A-Za-z0-9_-]+$/;

// ===========================================================================
// GOOGLE_ADS_ID — el tag de la cuenta
// ===========================================================================

check(
  `GOOGLE_ADS_ID tiene formato AW-<digitos> ("${GOOGLE_ADS_ID}")`,
  RE_ADS_ID.test(GOOGLE_ADS_ID)
);

// ===========================================================================
// CONVERSION_COMPRA_PLANILLA — la conversión PURCHASE de /planillas
// ===========================================================================

check(
  `CONVERSION_COMPRA_PLANILLA tiene formato AW-<id>/<label> ("${CONVERSION_COMPRA_PLANILLA}")`,
  RE_CONVERSION.test(CONVERSION_COMPRA_PLANILLA)
);

check(
  "CONVERSION_COMPRA_PLANILLA arranca con GOOGLE_ADS_ID + '/' (queda encadenada al tag de la cuenta)",
  CONVERSION_COMPRA_PLANILLA.startsWith(`${GOOGLE_ADS_ID}/`)
);

check(
  "CONVERSION_COMPRA_PLANILLA tiene un label no vacío después del '/'",
  CONVERSION_COMPRA_PLANILLA.split("/")[1]?.length > 0
);

console.log(fallas === 0 ? "\nTODO OK" : `\n${fallas} FALLAS`);
process.exit(fallas === 0 ? 0 : 1);
