import { aplicarEscala } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Pääomatulovero on porrastettu koko vuoden pääomatuloista: uuden tulon vero on erotus, jonka se
// tekee vuoden muiden pääomatulojen päälle.
export function paaomatuloveroLisasta(asteikko: readonly FilaEscala[], muut: number, uusi: number): number {
  if (uusi <= 0) return 0;
  return aplicarEscala(asteikko, muut + uusi) - aplicarEscala(asteikko, muut);
}
