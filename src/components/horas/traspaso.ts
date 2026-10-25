// El sueldo que la persona calculó en /sueldo-neto viaja a /cuantas-horas-de-trabajo por sessionStorage,
// nunca por la URL: dura lo que la pestaña.
export const CLAVE_SUELDO_HORAS = "ca-horas-sueldo";

export function guardarSueldoHoras(neto: number, bruto: number): void {
  if (!(neto > 0) || !(bruto > 0)) return;
  try {
    sessionStorage.setItem(CLAVE_SUELDO_HORAS, JSON.stringify({ neto: Math.round(neto), bruto: Math.round(bruto) }));
  } catch {}
}
