// Umbral de frescura de una serie diaria, compartido por el semáforo de los países y el cron de datos
// vivos de Vercel (src/lib/datos-vivos.ts). Vive del lado internacional para que el semáforo no
// dependa de código argentino (scripts/check_fronteras.ts).

export const MAX_DIAS_HABILES_DIARIA = 3;

/** Días de lunes a viernes después de `desde` y hasta `hasta` inclusive (sin feriados). */
export function diasHabilesEntre(desde: string, hasta: string): number {
  let n = 0;
  const d = new Date(`${desde}T12:00:00Z`);
  const fin = Date.parse(`${hasta}T12:00:00Z`);
  for (d.setUTCDate(d.getUTCDate() + 1); d.getTime() <= fin; d.setUTCDate(d.getUTCDate() + 1)) {
    const dia = d.getUTCDay();
    if (dia !== 0 && dia !== 6) n++;
  }
  return n;
}
