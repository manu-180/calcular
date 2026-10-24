// Alto de cada palito de la franja (panel, tarjetas e imagen): el valor sobre el máximo del ranking,
// desde cero. Así la franja usa todo su alto aunque el dato sea chico (los días para el Estado no
// pasan de un tercio del año). La tabla, en cambio, muestra la barra en su escala absoluta.
export function altosFranja(filas: readonly { barra: number }[]): number[] {
  const max = Math.max(...filas.map((f) => f.barra), 0);
  return filas.map((f) => (max > 0 ? Math.max(0.03, f.barra / max) : 0.03));
}
