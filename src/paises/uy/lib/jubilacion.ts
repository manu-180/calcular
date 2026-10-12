import { enMapa } from "@/motor/calculo";

export interface ValoresEdad {
  edadNormal: Readonly<Record<string, number>>;
  aniosMinimos: Readonly<Record<string, number>>;
  aniosMinimosBps: Readonly<Record<string, number>>;
}

// Ley 20.130, art. 35: con 30 años de servicio, la edad normal según el año de nacimiento (65 desde
// 1977). Con menos años se busca la edad más baja de las tablas de los literales B a D.
export function edadNormal(v: ValoresEdad, nacimiento: number): number {
  const ultimo = Math.max(...Object.keys(v.edadNormal).map(Number));
  return enMapa(v.edadNormal, String(Math.min(nacimiento, ultimo)));
}

export function edadConAnios(v: ValoresEdad, nacimiento: number, anios: number, bps: boolean): number | null {
  const normal = edadNormal(v, nacimiento);
  if (anios >= enMapa(v.aniosMinimos, "65")) return normal;
  const candidatas: number[] = [];
  for (const [edad, minimo] of Object.entries(v.aniosMinimos)) if (Number(edad) > 65 && anios >= minimo) candidatas.push(Number(edad));
  if (bps) for (const [edad, minimo] of Object.entries(v.aniosMinimosBps)) if (anios >= minimo) candidatas.push(Number(edad));
  return candidatas.length ? Math.max(normal, Math.min(...candidatas)) : null;
}
