import type { FilaEscala } from "@/motor/tipos";

// A tabela do IRT diz «acima de» cada limite: quem ganha exactamente 150 000 Kz fica no escalão
// isento. aplicarEscala do motor escolhe a linha com base >= desde e cobraria a parcela fixa seguinte.
export function linhaIrt(tabela: readonly FilaEscala[], materia: number): { indice: number; fila: FilaEscala } {
  let indice = 0;
  tabela.forEach((f, i) => {
    if (materia > f.desde) indice = i;
  });
  return { indice, fila: tabela[indice] };
}

export function irtGrupoA(tabela: readonly FilaEscala[], materia: number): number {
  if (materia <= 0) return 0;
  const { fila } = linhaIrt(tabela, materia);
  return (fila.cuotaFija ?? 0) + ((materia - fila.desde) * fila.tasa) / 100;
}
