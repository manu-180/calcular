export interface DatosSsc {
  tasa: number;
  semanal: Readonly<Record<string, number>>;
  minimo: number;
}

export interface Ssc {
  semanal: number;
  categoria: string;
}

// Tenth Schedule de la Social Security Act: categoría A o B (monto fijo) hasta el salario mínimo,
// 10 % del sueldo básico por encima y un tope que depende del año de nacimiento.
export function sscSemanal(basico: number, mayor18: boolean, desde1962: boolean, d: DatosSsc, redondear: (x: number) => number): Ssc {
  if (basico <= d.minimo) {
    return mayor18 ? { semanal: d.semanal["cat-b"], categoria: "B" } : { semanal: d.semanal["cat-a"], categoria: "A" };
  }
  const tope = desde1962 ? d.semanal["max-1962"] : d.semanal["max-before-1962"];
  const diez = redondear((basico * d.tasa) / 100);
  return diez >= tope ? { semanal: tope, categoria: "D" } : { semanal: diez, categoria: "C" };
}
