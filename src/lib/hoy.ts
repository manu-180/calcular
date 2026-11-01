// La fecha que decide qué dato está vigente (el mes de ANSES, el mes de escala de un convenio).
//
// Servidor: CALCULAR_HOY (a mano, para ver el sitio como va a quedar otro día:
// `CALCULAR_HOY=2026-11-01 npx tsx scripts/check-all.ts`) y si no, el reloj en hora argentina. NO
// lee CALCULAR_HOY_BUILD: next.config.ts lo inlinea en el bundle y congelaría el mes al del build,
// y las páginas AR se regeneran cada 24 h (revalidate del layout de (ar)) y se purgan enteras el
// día 1 (/api/cron/mes-nuevo) justamente para que el mes cambie sin redeploy.
//
// Cliente: lee la fecha con la que el servidor renderizó ESA página (la meta que pone el layout de
// (ar)). Con el reloj del navegador o con la fecha del build, en el cambio de mes el HTML y el JS
// mostrarían meses distintos (hydration mismatch). Sin la meta (fuera de (ar)) cae a la del build.
export const META_HOY = "calcular-hoy";

const FECHA = /^\d{4}-\d{2}-\d{2}$/;

function relojAR(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function hoyAR(): string {
  if (typeof window === "undefined") {
    const fijada = process.env.CALCULAR_HOY;
    return fijada && FECHA.test(fijada) ? fijada : relojAR();
  }
  const renderizada = document.querySelector(`meta[name="${META_HOY}"]`)?.getAttribute("content");
  if (renderizada && FECHA.test(renderizada)) return renderizada;
  const build = process.env.CALCULAR_HOY_BUILD;
  return build && FECHA.test(build) ? build : relojAR();
}

/** El día con el que se compiló este bundle (next.config.ts lo inlinea), o null fuera de Next. */
export function hoyDelBuild(): string | null {
  const build = process.env.CALCULAR_HOY_BUILD;
  return build && FECHA.test(build) ? build : null;
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
