import { diasInclusivos } from "@/lib/aguinaldo";

// Aritmética de fechas que comparten todas las liquidaciones finales de la LCT, cualquiera sea la
// causa de la extinción: despido, período de prueba, renuncia, mutuo acuerdo.
//
// POR QUÉ VIVE ACÁ (24/8/2026, s93): estas tres funciones nacieron privadas dentro de
// `lib/periodo-prueba.ts`. Cuando `/renuncia` necesitó las mismas, copiarlas habría sido garantizar
// que un día las dos páginas publiquen números distintos para el mismo semestre — que es
// exactamente lo que el sitio no puede permitirse. Se mudan a un módulo propio y las dos las
// importan. Misma regla que ya se aplicó con `nucleoArt245()` entre `/indemnizacion` y
// `/indemnizacion-por-fallecimiento`.

/** Meses completos entre dos fechas ISO (no cuenta el mes si no llegó al mismo día). */
export function mesesCompletos(desdeISO: string, hastaISO: string): number {
  const [dy, dm, dd] = desdeISO.split("-").map(Number);
  const [hy, hm, hd] = hastaISO.split("-").map(Number);
  let meses = (hy - dy) * 12 + (hm - dm);
  if (hd < dd) meses--;
  return Math.max(0, meses);
}

/** Primer y último día del semestre calendario al que pertenece una fecha ISO (art. 122 LCT). */
export function semestreDe(iso: string): { inicioISO: string; finISO: string } {
  const [y, m] = iso.split("-").map(Number);
  return m <= 6
    ? { inicioISO: `${y}-01-01`, finISO: `${y}-06-30` }
    : { inicioISO: `${y}-07-01`, finISO: `${y}-12-31` };
}

/** Días corridos del mes del egreso efectivamente trabajados. */
export function diasDelMesTrabajados(ingresoISO: string, egresoISO: string): number {
  const [y, m] = egresoISO.split("-").map(Number);
  const primeroDelMes = `${y}-${String(m).padStart(2, "0")}-01`;
  const desde = ingresoISO > primeroDelMes ? ingresoISO : primeroDelMes;
  return diasInclusivos(desde, egresoISO);
}

/**
 * SAC proporcional del art. 123: «la doceava parte de las remuneraciones devengadas en la fracción
 * del semestre trabajado». Se expresa como sueldo ÷ 2 × (días del semestre trabajados ÷ días del
 * semestre), que es la misma fórmula que usa `/aguinaldo`.
 */
export function sacProporcional(
  sueldoMensual: number,
  ingresoISO: string,
  egresoISO: string,
): { importe: number; diasSemestre: number; diasTrabajadosSemestre: number } {
  const sem = semestreDe(egresoISO);
  const diasSemestre = diasInclusivos(sem.inicioISO, sem.finISO);
  const inicioComputo = ingresoISO > sem.inicioISO ? ingresoISO : sem.inicioISO;
  const diasTrabajadosSemestre = Math.min(
    diasInclusivos(inicioComputo, egresoISO),
    diasSemestre,
  );
  return {
    importe: ((sueldoMensual / 2) * diasTrabajadosSemestre) / diasSemestre,
    diasSemestre,
    diasTrabajadosSemestre,
  };
}
