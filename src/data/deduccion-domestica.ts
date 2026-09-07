// Deducción del personal de casas particulares en el Impuesto a las Ganancias.
//
// POR QUÉ ESTE ARCHIVO EXISTE. Quien tiene empleada doméstica registrada y además paga Ganancias
// puede descontar de su impuesto lo que le pagó en el año. Todas las notas publican la misma
// frase ("se puede deducir hasta la ganancia no imponible") y ninguna resuelve las dos preguntas
// que de verdad se hace el empleador: **cuánto le vuelve en plata** (una deducción no es un
// reintegro: devuelve la alícuota marginal, no el monto) y **qué parte de lo que le paga a ARCA
// entra en la cuenta**.
//
// EL NÚMERO NO SE ESCRIBE A MANO: SE DERIVA. El tope no es un valor que ARCA publique aparte —
// es, por definición legal, la ganancia no imponible anual del art. 30 inc. a). Por eso acá se
// importa de `ganancias.ts` en vez de copiarse: cuando rota la tabla semestral de Ganancias, este
// tope rota con ella y no puede quedar viejo. (Regla de s74/s78: buscar el dato que se DERIVA, no
// el que se publica.)
//
// EL HUECO REAL DE LA SERP — qué se deduce del pago mensual a ARCA. El empleador ingresa un solo
// importe por mes que junta tres conceptos (obra social, SIPA y ART), pero la ley no dice "lo que
// pagaste a ARCA":
//   · Ley 26.063 art. 16 inc. b) — deducible: "las contribuciones patronales indicadas en el
//     artículo 3º del Régimen Especial de Seguridad Social para Empleados del Servicio Doméstico,
//     aprobado por el artículo 21 de la Ley Nº 25.239".
//   · Ese art. 3º (texto vigente, sustituido por el Dec. 90/2023) manda ingresar dos sumas: una
//     con destino al SIPA y otra al sistema de salud. **La ART no está ahí**: nace de otra norma
//     (Ley 26.844 art. 74 y Dec. 49/2018) y es un seguro, no una contribución de seguridad social.
//   · ARCA, en su propia ayuda de Casas Particulares, describe lo deducible como "la remuneración
//     abonada a trabajadores de casas particulares y las contribuciones patronales ingresadas", y
//     tampoco menciona la cuota de ART.
// Los dos textos, verificados el 13/8/2026, coinciden. Esta página muestra el cómputo con ese
// criterio y además el importe de la ART por separado, para que el empleador vea la diferencia en
// vez de descubrirla en una fiscalización.

import { DEDUCCIONES, GANANCIAS_VIGENCIA, GANANCIAS_FUENTES } from "./ganancias";

/** Tope anual de la deducción = ganancia no imponible del art. 30 inc. a). Derivado, no copiado. */
export const TOPE_DEDUCCION_ANUAL = DEDUCCIONES.mni;

export const DEDUCCION_VIGENCIA = GANANCIAS_VIGENCIA;

/** Citas textuales verificadas contra el texto actualizado de InfoLEG y la ayuda de ARCA. */
export const DEDUCCION_TEXTOS = {
  quienPuede:
    "las personas de existencia visible y las sucesiones indivisas, ambas residentes en el país, que revistan el carácter de dadores de trabajo con relación al personal del servicio doméstico",
  queSeDeduce:
    "el total de los importes abonados en el período fiscal: a) A los trabajadores domésticos en concepto de contraprestación por los servicios prestados; b) Para cancelar las contribuciones patronales indicadas en el artículo 3º del Régimen Especial de Seguridad Social para Empleados del Servicio Doméstico, aprobado por el artículo 21 de la Ley Nº 25.239",
  caracter:
    "La deducción prevista en el presente artículo tendrá el carácter de deducción general",
  tope:
    "Fíjase como importe máximo a deducir por los conceptos anteriormente indicados la suma equivalente a la de la ganancia no imponible anual",
  arca:
    "la remuneración abonada a trabajadores de casas particulares y las contribuciones patronales ingresadas",
  comoSeInforma:
    "El límite anual del monto deducible es igual al de la ganancia no imponible. Se informa por el formulario 572 web (SIRADIG).",
} as const;

export const DEDUCCION_FUENTES = {
  consultadoEl: "13 de agosto de 2026",
  lista: [
    {
      nombre: "Ley 26.063, art. 16 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/110000-114999/111982/texact.htm",
      detalle:
        "crea la deducción, define qué conceptos entran y fija el tope en la ganancia no imponible anual.",
    },
    {
      nombre: "Ley 25.239, Título XVIII art. 3º — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/61784/texact.htm",
      detalle:
        "las contribuciones a las que remite el art. 16 inc. b): una con destino al SIPA y otra al sistema de salud (texto sustituido por el Dec. 90/2023). La cuota de ART no figura en este artículo.",
    },
    {
      nombre: "ARCA — Casas Particulares · Deducción en el Impuesto a las Ganancias",
      url: "https://www.afip.gob.ar/casasparticulares/ayuda/empleador/deduccion.asp",
      detalle:
        "el organismo describe lo deducible como la remuneración abonada y las contribuciones patronales ingresadas, y se informa por el F. 572 web (SIRADIG).",
    },
    {
      nombre: GANANCIAS_FUENTES.deducciones.nombre,
      url: GANANCIAS_FUENTES.deducciones.url,
      detalle:
        "de acá sale la ganancia no imponible anual, que es el tope de esta deducción (por eso el tope se actualiza cuando se actualiza Ganancias).",
    },
  ],
} as const;
