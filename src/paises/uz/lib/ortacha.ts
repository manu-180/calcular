import { ErrorEntrada } from "@/motor/calculo";

export interface OrtachaIshHaqi {
  oylik: number;
  eslatma: string | null;
}

// Mehnat kodeksi, 257: promedio mensual = lo devengado en los 12 meses anteriores ÷ 12 (o ÷ los meses
// trabajados si son menos), y para quien cumplió la jornada nunca menos que el mínimo vigente.
export function ortachaOylik(
  manba: "jami" | "oylik",
  jami: number | null,
  oylar: number | null,
  oylik: number | null,
  mhtekm: number,
): OrtachaIshHaqi {
  let o: number;
  if (manba === "jami") {
    if (jami === null || jami <= 0) throw new ErrorEntrada("Hisoblangan ish haqi summasini kiriting.", "jami");
    const n = oylar ?? 12;
    if (n < 1 || n > 12) throw new ErrorEntrada("Oylar soni 1 dan 12 gacha boʻlishi kerak.", "oylar");
    o = jami / n;
  } else {
    if (oylik === null || oylik <= 0) throw new ErrorEntrada("Oylik ish haqini kiriting.", "oylik");
    o = oylik;
  }
  const eslatma =
    o < mhtekm
      ? "Oʻrtacha oylik eng kam ish haqidan past chiqdi. Oylik normani toʻliq ishlagan boʻlsangiz, qonunga koʻra hisobda kamida eng kam miqdor olinishi kerak."
      : null;
  return { oylik: o, eslatma };
}
