// La fecha que decide qué dato está vigente (el mes de ANSES, el mes de escala de un convenio).
//
// Orden de prioridad, y por qué:
//   1. CALCULAR_HOY — la fija a mano quien quiera ver el sitio como va a quedar otro día. Así se
//      prueba HOY la rotación del día 1: `CALCULAR_HOY=2026-10-01 npx tsx scripts/check-all.ts`.
//   2. CALCULAR_HOY_BUILD — la inyecta next.config.ts al compilar, en el bundle del server Y del
//      cliente. Sin esto, un componente cliente calcularía el mes con el reloj del navegador y, en
//      el cambio de mes, el HTML del build y el JS del visitante mostrarían meses distintos
//      (hydration mismatch). El sitio cambia de mes cuando se redeploya, y el workflow
//      datos-vivos redeploya el día 1 a primera hora.
//   3. El reloj, en hora argentina (el mes cambia a las 00:00 de Buenos Aires, no de UTC).

export function hoyAR(): string {
  const fijada = process.env.CALCULAR_HOY || process.env.CALCULAR_HOY_BUILD;
  if (fijada && /^\d{4}-\d{2}-\d{2}$/.test(fijada)) return fijada;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** "2026-10" */
export function periodoActualAR(): string {
  return hoyAR().slice(0, 7);
}

/**
 * El último elemento cuyo período ya empezó. Si ninguno empezó todavía, el primero: una escala
 * cargada por adelantado nunca deja a una página sin mes para mostrar.
 */
export function vigenteEn<T>(items: readonly T[], periodoDe: (x: T) => string, periodo = periodoActualAR()): T {
  let elegido = items[0];
  for (const x of items) if (periodoDe(x) <= periodo) elegido = x;
  return elegido;
}

/** "septiembre-2026" / mes 9 + año 2026 → "2026-09". */
export function periodoDeMes(m: { mes: number; anio: number }): string {
  return `${m.anio}-${String(m.mes).padStart(2, "0")}`;
}

/** "2026-09-20" → "20 de septiembre de 2026" */
export function fechaLarga(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
