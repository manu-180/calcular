// Motor de la prescripción de deudas con ARCA. Puro, sin fetch.
//
// LA REGLA DE INICIO NO SE INVENTA: para la rama impositiva la da el art. 57 de la Ley 11.683 —el
// plazo corre desde el 1° de enero SIGUIENTE al año en que venció el plazo general de presentación—
// y por eso la entrada pide ese año, que el contribuyente conoce, en vez de que el motor adivine
// el calendario de vencimientos de ARCA (que cambia todos los años y por impuesto).
//
// PARA LA RAMA DE OBRA SOCIAL NO HAY FECHA: el art. 24 de la Ley 23.660 fija el plazo pero no una
// regla propia de inicio del cómputo, y el art. 57 es de otra ley. El motor devuelve el plazo y el
// test de discrepancia, y `fechaPrescripcion` queda en null a propósito. Publicar una fecha ahí
// sería exactamente la clase de certeza inventada que esta página existe para no cometer.

import {
  PLAZOS_IMPUESTOS,
  PLAZOS_OBRA_SOCIAL,
  UMBRAL_DISCREPANCIA,
  UMBRALES_RPT,
} from "@/data/prescripcion-arca";

export type Rama = "impuestos" | "obra-social";

export type EntradaPrescripcion = {
  rama: Rama;
  /** Sólo en la rama impositiva: si no está inscripto, el plazo es de diez años. */
  inscripto: boolean;
  /** Presentó la DDJJ en término y, en su caso, regularizó el saldo. */
  enTermino: boolean;
  /** Año en que venció el plazo general de presentación (art. 57). */
  anioVencimiento: number;
  /** Lo declarado por el contribuyente, para el test de discrepancia. */
  declarado: number;
  /** Lo que resulta de la impugnación del organismo. Igual a `declarado` si no hubo impugnación. */
  determinado: number;
  /** Condición iii): la impugnación se origina en facturas o documentos apócrifos. */
  apocrifos: boolean;
};

export type Condicion = {
  id: "i" | "ii" | "iii";
  titulo: string;
  cumple: boolean;
  detalle: string;
};

export type ResultadoPrescripcion = {
  rama: Rama;
  /** Años de prescripción que resultan del caso. */
  plazo: number;
  /** El plazo que habría regido antes de la Ley 27.799, para mostrar qué cambió. */
  plazoAnterior: number;
  /** 1° de enero siguiente al año de vencimiento (art. 57). Null en la rama de obra social. */
  inicioComputo: string | null;
  /** Fecha en que se cumple el plazo. Null en la rama de obra social. */
  fechaPrescripcion: string | null;
  /** ¿Ya pasó esa fecha, sin contar suspensiones ni interrupciones? */
  yaPrescribio: boolean | null;
  diferencia: number;
  porcentajeDiferencia: number;
  umbralPenal: number;
  condiciones: Condicion[];
  hayDiscrepanciaSignificativa: boolean;
  /** Por qué se aplicó ese plazo, en una línea. */
  motivo: string;
};

const pct = (n: number) => `${(n * 100).toLocaleString("es-AR", { maximumFractionDigits: 2 })}%`;
const ars = (n: number) => `$${Math.round(n).toLocaleString("es-AR")}`;

export function calcularPrescripcion(e: EntradaPrescripcion): ResultadoPrescripcion {
  const declarado = Number.isFinite(e.declarado) && e.declarado > 0 ? e.declarado : 0;
  const determinado = Number.isFinite(e.determinado) && e.determinado > 0 ? e.determinado : 0;
  const diferencia = Math.max(0, determinado - declarado);
  const porcentajeDiferencia = declarado > 0 ? diferencia / declarado : 0;

  const esImpuestos = e.rama === "impuestos";
  const umbralPenal = esImpuestos ? UMBRALES_RPT.tributos : UMBRALES_RPT.seguridadSocial;

  const condiciones: Condicion[] = [
    {
      id: "i",
      titulo: `La impugnación aumenta lo declarado en un ${pct(UMBRAL_DISCREPANCIA)} o más`,
      cumple: declarado > 0 && porcentajeDiferencia >= UMBRAL_DISCREPANCIA,
      detalle:
        declarado > 0
          ? `La diferencia es ${ars(diferencia)} sobre ${ars(declarado)} declarados: ${pct(porcentajeDiferencia)}.`
          : "Cargá lo declarado para evaluar esta condición.",
    },
    {
      id: "ii",
      titulo: `La diferencia supera el umbral del Régimen Penal Tributario (${ars(umbralPenal)}${esImpuestos ? " por tributo y ejercicio" : " por mes"})`,
      cumple: diferencia > umbralPenal,
      detalle: `Diferencia ${ars(diferencia)} contra un umbral de ${ars(umbralPenal)} (${esImpuestos ? "art. 1°" : "art. 5°"} del RPT, texto según la Ley 27.799).`,
    },
    {
      id: "iii",
      titulo: "La impugnación se origina en facturas o documentos apócrifos",
      cumple: e.apocrifos,
      detalle: e.apocrifos
        ? "Marcada: alcanza por sí sola, sin importar el monto."
        : "No marcada.",
    },
  ];

  const hayDiscrepanciaSignificativa = condiciones.some((c) => c.cumple);

  let plazo: number;
  let plazoAnterior: number;
  let motivo: string;

  if (esImpuestos) {
    plazoAnterior = e.inscripto ? PLAZOS_IMPUESTOS.inscripto : PLAZOS_IMPUESTOS.noInscripto;
    if (!e.inscripto) {
      plazo = PLAZOS_IMPUESTOS.noInscripto;
      motivo =
        "Contribuyente no inscripto: el inciso b) del artículo 56 fija diez años, y la reducción del inciso a) no lo alcanza.";
    } else if (e.enTermino && !hayDiscrepanciaSignificativa) {
      plazo = PLAZOS_IMPUESTOS.inscriptoCumplidor;
      motivo =
        "Inscripto que presentó en término y regularizó el saldo, sin discrepancia significativa: el plazo se reduce a tres años por el segundo párrafo del inciso a), texto de la Ley 27.799.";
    } else if (e.enTermino) {
      plazo = PLAZOS_IMPUESTOS.inscripto;
      motivo =
        "Presentó en término, pero la impugnación configura discrepancia significativa: la reducción a tres años no se aplica y vuelve el plazo de cinco.";
    } else {
      plazo = PLAZOS_IMPUESTOS.inscripto;
      motivo =
        "Inscripto que no presentó la declaración jurada en término: cinco años, el plazo general del inciso a).";
    }
  } else {
    plazoAnterior = PLAZOS_OBRA_SOCIAL.general;
    if (e.enTermino && !hayDiscrepanciaSignificativa) {
      plazo = PLAZOS_OBRA_SOCIAL.cumplidor;
      motivo =
        "Presentó en término y regularizó el saldo, sin discrepancia significativa: el artículo 24 de la Ley 23.660 baja de diez años a tres, por el artículo 35 de la Ley 27.799.";
    } else if (e.enTermino) {
      plazo = PLAZOS_OBRA_SOCIAL.general;
      motivo =
        "Presentó en término, pero la impugnación configura discrepancia significativa: se mantiene el plazo de diez años.";
    } else {
      plazo = PLAZOS_OBRA_SOCIAL.general;
      motivo = "Sin presentación en término, rige el plazo general de diez años.";
    }
  }

  let inicioComputo: string | null = null;
  let fechaPrescripcion: string | null = null;
  let yaPrescribio: boolean | null = null;

  if (esImpuestos && Number.isInteger(e.anioVencimiento) && e.anioVencimiento > 1900) {
    const inicio = e.anioVencimiento + 1;
    inicioComputo = `${inicio}-01-01`;
    fechaPrescripcion = `${inicio + plazo}-01-01`;
    yaPrescribio = new Date() >= new Date(`${fechaPrescripcion}T00:00:00`);
  }

  return {
    rama: e.rama,
    plazo,
    plazoAnterior,
    inicioComputo,
    fechaPrescripcion,
    yaPrescribio,
    diferencia,
    porcentajeDiferencia,
    umbralPenal,
    condiciones,
    hayDiscrepanciaSignificativa,
    motivo,
  };
}
