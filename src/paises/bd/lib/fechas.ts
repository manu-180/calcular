import { aDia, aFecha, diaDeSemana } from "@/motor/universales/comun/fechas";

export { aDia, aFecha, diaDeSemana };

// En Bangladés el descanso semanal es el viernes; la administración pública descansa viernes y
// sábado. diaDeSemana: 0 = domingo … 5 = viernes, 6 = sábado.
export type FinDeSemana = "fri" | "fri-sat";

export const OPCIONES_FIN_DE_SEMANA = [
  { valor: "fri", etiqueta: "শুধু শুক্রবার" },
  { valor: "fri-sat", etiqueta: "শুক্র ও শনিবার (সরকারি অফিস)" },
] as const;

export const DIAS_SEMANA = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"] as const;

export function esLaborable(dia: number, finde: FinDeSemana): boolean {
  const s = diaDeSemana(dia);
  if (s === 5) return false;
  return !(finde === "fri-sat" && s === 6);
}

// Días laborables en [desde, hasta): cuenta el primero y no el último.
export function laborablesEntre(desde: number, hasta: number, finde: FinDeSemana): number {
  let total = 0;
  for (let d = desde; d < hasta; d++) if (esLaborable(d, finde)) total++;
  return total;
}
