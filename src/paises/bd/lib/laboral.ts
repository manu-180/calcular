// «X দিনের মজুরি» del Ley del Trabajo: el mes se toma de 30 días, así 30 días equivalen a un mes de
// salario (la gratuity mínima de 30 días es un mes de মূল মজুরি).
export const DIAS_MES = 30;

export function diaria(mensual: number): number {
  return mensual / DIAS_MES;
}

// Años de servicio que cuentan: los completos más uno si sobran más de seis meses (art. 2(10)).
export function aniosConFraccion(anios: number, meses: number): number {
  return anios + (meses > 6 ? 1 : 0);
}
