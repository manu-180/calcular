// Ley 12.590, artículo 2: con más de cinco años en la empresa se suma un día por cada cuatro años de
// antigüedad. Se lee como lo aplica la práctica: 21 días a los 5 años, 22 a los 8, 23 a los 12.
export function diasExtraPorAntiguedad(anios: number): number {
  return anios >= 5 ? Math.floor(anios / 4) : 0;
}

export function diasDeLicenciaAnual(base: number, anios: number): number {
  return base + diasExtraPorAntiguedad(anios);
}
