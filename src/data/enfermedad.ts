// Licencia por enfermedad y accidente inculpable — arts. 208 a 213 de la LCT.
//
// POR QUÉ ESTE ARCHIVO EXISTE: acá no hay ningún monto que envejezca; lo que se publica son PLAZOS
// y una regla de arrastre que casi nadie calcula. Las notas dicen «3, 6, 6 o 12 meses según
// antigüedad y cargas de familia» y ahí terminan. Lo que la persona necesita saber es OTRA cosa:
// qué día exacto se le termina el sueldo, cuánto le queda si ya faltó por lo mismo hace unos meses,
// y hasta cuándo le conservan el puesto sin cobrar. Eso se DERIVA de los plazos, no se publica.
//
// TEXTO VIGENTE VERIFICADO EL 10/8/2026 contra el texto actualizado de la LCT en InfoLEG
// (`texact.htm`), después de la reforma de la Ley 27.802 (B.O. 6/3/2026), que tocó 65 artículos de
// la ley. Los arts. 208, 209, 210, 211, 212 y 213 se leyeron uno por uno en el texto consolidado.
//
// EL HALLAZGO DE ESTA VERIFICACIÓN: el **art. 210 tiene texto nuevo** desde el 6/3/2026 (sustituido
// por el art. 45 de la Ley 27.802). Ahora el certificado médico debe contener diagnóstico,
// tratamiento y cantidad de días de reposo, y estar **firmado digitalmente** a través de las
// plataformas autorizadas por la Ley 27.553. Media web sigue publicando el texto viejo, que sólo
// hablaba del derecho de control del empleador. El art. 209 (aviso) también fue sustituido, por el
// art. 44 de la misma ley.
//
// LO QUE SE PUBLICA MAL, UNA Y OTRA VEZ:
//   · «tenés 3 meses y después otros 3» → no: la recaída por la MISMA dolencia dentro de los 2 años
//     no abre un plazo nuevo, consume el mismo (art. 208, tercera oración).
//   · «después de la licencia te pueden despedir» → antes hay un año de conservación del empleo sin
//     goce de sueldo (art. 211), y recién vencido eso cualquiera de las partes puede rescindir.
//   · «durante la licencia cobrás lo mismo de siempre» → cobrás la remuneración del momento de la
//     interrupción MÁS los aumentos que se acuerden a tu categoría mientras estás de licencia
//     (art. 208, cuarta oración). Es el punto que más plata mueve en paritarias.
//   · «si me despiden estando de licencia cobro la indemnización» → cobrás la indemnización Y los
//     salarios que faltaban hasta el vencimiento del plazo o hasta el alta (art. 213).

/**
 * Plazos de licencia paga del art. 208, en meses. El corte de antigüedad son 5 años y las cargas de
 * familia duplican el plazo en los dos tramos.
 */
export const PLAZOS_ART_208 = {
  sinCargas: { hasta5: 3, mas5: 6 },
  conCargas: { hasta5: 6, mas5: 12 },
  /** Años de antigüedad que separan un tramo del otro. */
  corteAntiguedadAnios: 5,
  articulo: "Ley de Contrato de Trabajo, art. 208",
} as const;

/**
 * Años que tienen que pasar para que una recaída de la misma dolencia cuente como enfermedad nueva
 * y abra un plazo entero (art. 208: «La recidiva de enfermedades crónicas no será considerada
 * enfermedad, salvo que se manifestara transcurridos los dos (2) años»).
 */
export const RECIDIVA_ANIOS = 2;

/** Conservación del empleo tras agotar el plazo pago: un año sin goce de sueldo (art. 211). */
export const CONSERVACION_EMPLEO_MESES = 12;

/** Requisitos del certificado médico según el art. 210, texto de la Ley 27.802 (B.O. 6/3/2026). */
export const CERTIFICADO_ART_210 = {
  requisitos: [
    "diagnóstico médico",
    "tratamiento indicado",
    "cantidad de días de reposo laboral",
  ],
  /** El texto nuevo exige firma digital por las plataformas autorizadas por la Ley 27.553. */
  firmaDigital: true,
  leyFirmaDigital: "Ley 27.553",
  articulo: "Ley de Contrato de Trabajo, art. 210 (texto según art. 45 de la Ley 27.802)",
} as const;

/** Aviso al empleador: dentro de la primera jornada (art. 209, texto según la Ley 27.802). */
export const AVISO_ART_209 = {
  plazo: "la primera jornada de trabajo en la que no podés concurrir",
  articulo: "Ley de Contrato de Trabajo, art. 209 (texto según art. 44 de la Ley 27.802)",
} as const;

export type FuenteEnfermedad = { nombre: string; url: string; detalle: string };

export const ENFERMEDAD_FUENTES: { consultadoEl: string; lista: FuenteEnfermedad[] } = {
  consultadoEl: "2026-08-10",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 (texto actualizado)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 208 (plazos de licencia paga, recidiva y cómo se liquida la remuneración), art. 209 (aviso), art. 210 (certificado y control médico), art. 211 (conservación del empleo por un año), art. 212 (reincorporación e incapacidad) y art. 213 (despido durante la licencia). Texto consolidado tras la Ley 27.802.",
    },
    {
      nombre: "Ley 27.802: reforma laboral (B.O. 6/3/2026)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Sus arts. 44 y 45 sustituyeron los arts. 209 y 210 de la LCT: el certificado médico pasó a exigir diagnóstico, tratamiento y días de reposo, con firma digital de las plataformas autorizadas por la Ley 27.553. Los cambios ya están incorporados al texto actualizado de la LCT.",
    },
  ],
};
