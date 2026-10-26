// Beløp i tekster som calcular() lager selv (merknader): hele kroner med norsk tallformat.
export function kr(n: number): string {
  return `${new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(n)} kr`;
}
