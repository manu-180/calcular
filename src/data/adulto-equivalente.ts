// Tabla oficial de UNIDADES DE ADULTO EQUIVALENTE del INDEC, según sexo y edad.
//
// De dónde sale: cuadro 4 del informe técnico "Valorización mensual de la canasta básica
// alimentaria y de la canasta básica total. Gran Buenos Aires" (INDEC, Condiciones de vida,
// Vol. 10 n° 15 / Informes técnicos Vol. 10 n° 166, Buenos Aires, 14 de julio de 2026), y de la
// Metodología INDEC N° 22 "La medición de la pobreza y la indigencia en la Argentina".
//   https://www.indec.gob.ar/ftp/cuadros/sociedad/EPH_metodologia_22_pobreza.pdf
// Consultado y transcrito el 2026-08-01 desde el PDF oficial (no de un blog).
//
// QUÉ ES: la unidad de referencia es el requerimiento energético de un varón adulto (2.750 kcal)
// = 1 adulto equivalente. Cada integrante del hogar vale una fracción según su sexo y edad. La
// línea de indigencia del hogar = CBA × adultos equivalentes; la de pobreza = CBT × adultos
// equivalentes. Es la única forma correcta de pasar del número "por adulto equivalente" que
// publica el INDEC al umbral de UN hogar concreto.
//
// ESTABILIDAD: es una constante metodológica, no un dato que venza — cambia sólo si el INDEC
// cambia la metodología (la actual rige desde la Metodología N° 22). No la toca ningún cron.
//
// VERIFICACIÓN (la hace scripts/check_canasta_basica.ts contra los tres hogares del informe):
//   · Hogar 3: mujer 35 + varón 18 + mujer 61          = 0,77 + 1,02 + 0,67 = 2,46
//   · Hogar 4: varón 35 + mujer 31 + 6 años + 8 años   = 1,00 + 0,77 + 0,64 + 0,68 = 3,09
//   · Hogar 5: varón 30 + mujer 30 + 1 + 3 + 5 años    = 1,00 + 0,77 + 0,37 + 0,51 + 0,60 = 3,25

export type SexoAE = "mujer" | "varon";

/**
 * Tramos de edad de la tabla oficial, en orden. `hasta` es inclusivo; el último tramo es abierto.
 * Los menores de 10 años tienen el mismo coeficiente para ambos sexos (así lo publica el INDEC).
 */
export const TABLA_ADULTO_EQUIVALENTE: ReadonlyArray<{
  desde: number;
  hasta: number;
  etiqueta: string;
  mujer: number;
  varon: number;
}> = [
  { desde: 0, hasta: 0, etiqueta: "Menor de 1 año", mujer: 0.35, varon: 0.35 },
  { desde: 1, hasta: 1, etiqueta: "1 año", mujer: 0.37, varon: 0.37 },
  { desde: 2, hasta: 2, etiqueta: "2 años", mujer: 0.46, varon: 0.46 },
  { desde: 3, hasta: 3, etiqueta: "3 años", mujer: 0.51, varon: 0.51 },
  { desde: 4, hasta: 4, etiqueta: "4 años", mujer: 0.55, varon: 0.55 },
  { desde: 5, hasta: 5, etiqueta: "5 años", mujer: 0.6, varon: 0.6 },
  { desde: 6, hasta: 6, etiqueta: "6 años", mujer: 0.64, varon: 0.64 },
  { desde: 7, hasta: 7, etiqueta: "7 años", mujer: 0.66, varon: 0.66 },
  { desde: 8, hasta: 8, etiqueta: "8 años", mujer: 0.68, varon: 0.68 },
  { desde: 9, hasta: 9, etiqueta: "9 años", mujer: 0.69, varon: 0.69 },
  { desde: 10, hasta: 10, etiqueta: "10 años", mujer: 0.7, varon: 0.79 },
  { desde: 11, hasta: 11, etiqueta: "11 años", mujer: 0.72, varon: 0.82 },
  { desde: 12, hasta: 12, etiqueta: "12 años", mujer: 0.74, varon: 0.85 },
  { desde: 13, hasta: 13, etiqueta: "13 años", mujer: 0.76, varon: 0.9 },
  { desde: 14, hasta: 14, etiqueta: "14 años", mujer: 0.76, varon: 0.96 },
  { desde: 15, hasta: 15, etiqueta: "15 años", mujer: 0.77, varon: 1.0 },
  { desde: 16, hasta: 16, etiqueta: "16 años", mujer: 0.77, varon: 1.03 },
  { desde: 17, hasta: 17, etiqueta: "17 años", mujer: 0.77, varon: 1.04 },
  { desde: 18, hasta: 29, etiqueta: "18 a 29 años", mujer: 0.76, varon: 1.02 },
  { desde: 30, hasta: 45, etiqueta: "30 a 45 años", mujer: 0.77, varon: 1.0 },
  { desde: 46, hasta: 60, etiqueta: "46 a 60 años", mujer: 0.76, varon: 1.0 },
  { desde: 61, hasta: 75, etiqueta: "61 a 75 años", mujer: 0.67, varon: 0.83 },
  { desde: 76, hasta: Infinity, etiqueta: "Más de 75 años", mujer: 0.63, varon: 0.74 },
];

/** Unidades de adulto equivalente de una persona. null si la edad no es un número válido. */
export function adultoEquivalente(edad: number, sexo: SexoAE): number | null {
  if (!Number.isFinite(edad) || edad < 0) return null;
  const tramo = TABLA_ADULTO_EQUIVALENTE.find((t) => edad >= t.desde && edad <= t.hasta);
  return tramo ? tramo[sexo] : null;
}

export const ADULTO_EQUIVALENTE_FUENTE = {
  nombre:
    "INDEC — Cuadro 4, Unidades de adulto equivalente según sexo y edad (informe de valorización mensual de la CBA y la CBT)",
  metodologia: "https://www.indec.gob.ar/ftp/cuadros/sociedad/EPH_metodologia_22_pobreza.pdf",
  informe: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-149",
  consultadoEl: "2026-08-01",
};
