// Deducción del alquiler de la casa habitación en el Impuesto a las Ganancias.
//
// POR QUÉ ESTE ARCHIVO EXISTE. La SERP entera publica la misma frase —"el inquilino deduce el 40%
// del alquiler hasta el tope de la ganancia no imponible, y además locador y locatario pueden
// deducir un 10% cada uno"— y ahí termina. Dos cosas quedan sin contestar, y las dos son plata:
//
//   1. **El tope casi nunca muerde.** Como el cómputo es el 40% de lo pagado y el límite es la
//      ganancia no imponible ANUAL, el tope recién se agota con un alquiler altísimo (lo deriva
//      `alquilerMensualQueAgotaElTope()` en lib/: hoy son más de un millón de pesos por mes). Para
//      el inquilino real el número que decide cuánto le vuelve no es el tope: es su alícuota.
//   2. **El 10% del inciso k) cambió en 2026 y casi nadie lo dice.** El art. 192 de la Ley 27.802
//      (B.O. 6/3/2026) SUSTITUYÓ el inciso n) del art. 26 de la LIG: desde los ejercicios que se
//      inicien el 1/1/2026 las ganancias derivadas del alquiler de inmuebles con destino a casa
//      habitación quedaron EXENTAS y —textual— "a las que no les resultará de aplicación lo
//      previsto en el inciso k) del artículo 85". O sea: sobre esos alquileres el 10% adicional
//      deja de correr. Las notas siguen publicando el texto anterior (regla de s78: un artículo
//      sustituido es un hueco de SERP casi garantizado).
//
// EL TOPE NO SE ESCRIBE A MANO: SE DERIVA. El art. 85 inc. h) lo fija por remisión —"hasta el
// límite de la suma prevista en el inciso a) del artículo 30"— o sea la ganancia no imponible.
// Por eso se importa de `ganancias.ts` en vez de copiarse: cuando rota la tabla semestral, el tope
// rota con ella y no puede quedar viejo. (Regla de s74/s78: buscar el dato que se DERIVA.)

import { DEDUCCIONES, GANANCIAS_VIGENCIA, GANANCIAS_FUENTES } from "./ganancias";

/** Tope anual de la deducción del inc. h) = ganancia no imponible del art. 30 inc. a). Derivado. */
export const TOPE_DEDUCCION_ALQUILER = DEDUCCIONES.mni;

/** Porcentaje deducible por el inquilino — art. 85 inc. h) LIG. */
export const PORCENTAJE_INC_H = 0.4;

/** Porcentaje adicional del art. 85 inc. k) — desactivado para casa habitación desde el ejercicio 2026. */
export const PORCENTAJE_INC_K = 0.1;

/** Primer ejercicio fiscal alcanzado por la exención del art. 26 inc. n) (texto Ley 27.802). */
export const PRIMER_EJERCICIO_EXENCION = 2026;

export const ALQUILER_VIGENCIA = GANANCIAS_VIGENCIA;

/** Citas textuales del TEXTO ACTUALIZADO de la LIG (Dec. 824/2019 t.o.) y de la ayuda de ARCA. */
export const ALQUILER_TEXTOS = {
  incH: "El CUARENTA POR CIENTO (40 %) de las sumas pagadas por el contribuyente, o del causante en el caso de sucesiones indivisas, en concepto de alquileres de inmuebles destinados a su casa habitación, y hasta el límite de la suma prevista en el inciso a) del artículo 30 de esta ley, siempre y cuando el contribuyente o el causante no resulte titular de ningún inmueble, cualquiera sea la proporción",
  incK: "El diez por ciento (10%) del monto total anual de alquileres de inmuebles destinado a casa-habitación. Ambas partes, locatario y locador, podrán hacer uso de esta deducción adicionalmente con otras que existan",
  exencion:
    "con efectos para los ejercicios o años fiscales que se inicien a partir del 1° de enero de 2026, las ganancias derivadas del alquiler de inmuebles con destino a casa habitación a las que no les resultará de aplicación lo previsto en el inciso k) del artículo 85",
  arcaCuarenta:
    "podrás deducir del Impuesto a las Ganancias hasta el 40% de las sumas que pagues en concepto de alquiler, con un límite anual",
  arcaFactura:
    "el monto de los alquileres abonados se encuentre respaldado mediante la emisión de una factura o documento equivalente por parte del locador",
  arcaDiez:
    "Locatarios y locadores pueden deducir el 10% -sin límite anual- del monto mensual en concepto de alquileres de inmuebles destinados a casa-habitación. Para ello, el contrato de locación deberá estar registrado en el servicio con clave fiscal «Registro de Locaciones de Inmuebles – RELI»",
} as const;

export const ALQUILER_FUENTES = {
  consultadoEl: "14 de agosto de 2026",
  lista: [
    {
      nombre: "Ley de Impuesto a las Ganancias (t.o. Dec. 824/2019), art. 85 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle:
        "inc. h): el 40% de lo pagado por el alquiler de la casa habitación, con tope en la ganancia no imponible y sólo si no se es titular de ningún inmueble. Inc. k): el 10% adicional, incorporado por la Ley 27.737.",
    },
    {
      nombre: "Misma norma, art. 26 inc. n) — sustituido por el art. 192 de la Ley 27.802 (B.O. 6/3/2026)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle:
        "desde los ejercicios que se inicien el 1/1/2026 exime las ganancias del alquiler de casa habitación y declara que a ellas NO les resulta aplicable el inc. k) del art. 85. Es el cambio que la mayoría de las notas todavía no incorporó.",
    },
    {
      nombre: "ARCA — SiRADIG · carga de alquileres",
      url: "https://www.afip.gob.ar/572web/carga-datos/alquileres.asp",
      detalle:
        "el organismo describe el 40% con límite anual, exige factura o documento equivalente del locador y comprobantes de pago, y explica el 10% del inc. k) con contrato registrado en el RELI.",
    },
    {
      nombre: "ARCA — Novedad del 12/8/2024: RG 5545/2024 y RG 5547/2024",
      url: "https://servicioscf.afip.gob.ar/publico/sitio/contenido/novedad/ver.aspx?id=4234",
      detalle:
        "se eliminó la obligación general de registrar los contratos de alquiler (salvo para acceder a beneficios fiscales) y la de adjuntar copia del contrato en el SiRADIG.",
    },
    {
      nombre: GANANCIAS_FUENTES.deducciones.nombre,
      url: GANANCIAS_FUENTES.deducciones.url,
      detalle:
        "de acá sale la ganancia no imponible anual, que es el tope del inc. h) (por eso el tope se actualiza cuando se actualiza Ganancias).",
    },
  ],
} as const;
