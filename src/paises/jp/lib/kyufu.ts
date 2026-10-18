// 出産手当金・傷病手当金の日額: 標準報酬月額の平均÷30 (10円未満四捨五入) × 2/3 (1円未満四捨五入), como en
// el ejemplo de 協会けんぽ (17万円 → 5,670円 → 3,780円). El promedio no se lleva a un 等級: puede caer
// entre dos.
export function nichigaku(promedio: number): { base: number; diario: number } {
  const base = Math.round(promedio / 30 / 10) * 10;
  return { base, diario: Math.round((base * 2) / 3) };
}
