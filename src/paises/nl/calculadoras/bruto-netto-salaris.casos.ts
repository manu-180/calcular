import { definirCasos } from "@/motor/calculo";
import calculadora from "./bruto-netto-salaris";

const VA = "https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 3.500 per maand met vakantiegeld",
    origen: {
      tipo: "recalculado",
      url: VA,
      detalle:
        "Jaar 42.000 + 8% = 45.360. Box 1: 38.883 × 35,75% = 13.900,67 + 6.477 × 37,56% = 2.432,76 → 16.333,43. AHK 3.115 − 6,398% × 15.624 = 2.115,38. AK 5.300 + 1,95% × 19.515 = 5.680,54. Te betalen 8.537,51. Netto 36.822,49; per maand 3.068,54.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 3500, periode: "maand", vakantiegeld: true, dertiendeMaand: false, pensioen: 0 },
    esperado: { brutoJaar: 45360, vakantiegeld: 3360, belasting: 16333.43, ahk: 2115.38, arbeidskorting: 5680.54, loonheffing: 8537.51, nettoJaar: 36822.49, nettoMaand: 3068.54, marginaal: 37.56 },
  },
  {
    nombre: "€ 90.000 per jaar zonder vakantiegeld, met 5% pensioenpremie",
    origen: {
      tipo: "recalculado",
      url: VA,
      detalle:
        "Pensioen 4.500; belastbaar 85.500. Box 1: 13.900,67 + 39.543 × 37,56% = 14.852,35 + 7.074 × 49,50% = 3.501,63 → 32.254,65. AHK 0 (boven 78.426). AK 5.685 − 6,51% × 39.908 = 3.086,99. Te betalen 29.167,66. Netto 90.000 − 4.500 − 29.167,66 = 56.332,34.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 90000, periode: "jaar", vakantiegeld: false, dertiendeMaand: false, pensioen: 5 },
    esperado: { pensioen: 4500, belasting: 32254.65, ahk: 0, arbeidskorting: 3086.99, loonheffing: 29167.66, nettoJaar: 56332.34, marginaal: 49.5 },
  },
  {
    nombre: "Laag inkomen: de kortingen vangen bijna alle belasting op",
    origen: {
      tipo: "recalculado",
      detalle: "€ 1.000 per maand, geen vakantiegeld: 12.000. Box 1 35,75% = 4.290. AHK 3.115; AK 996 + 31,009% × 35 = 1.006,85. Kortingen 4.121,85 < 4.290, te betalen 168,15.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 1000, periode: "maand", vakantiegeld: false, dertiendeMaand: false, pensioen: 0 },
    esperado: { belasting: 4290, ahk: 3115, arbeidskorting: 1006.85, loonheffing: 168.15, nettoJaar: 11831.85 },
  },
  {
    nombre: "Dertiende maand telt mee",
    origen: { tipo: "recalculado", detalle: "3.000 × 12 = 36.000 + dertiende 3.000 + vakantiegeld 2.880 = 41.880." },
    fecha: "2026-10-14",
    entrada: { bruto: 3000, periode: "maand", vakantiegeld: true, dertiendeMaand: true, pensioen: 0 },
    esperado: { brutoJaar: 41880, dertiende: 3000, vakantiegeld: 2880 },
  },
  {
    nombre: "Nul is geen geldig salaris",
    origen: { tipo: "recalculado", detalle: "Zonder salaris valt er niets te berekenen." },
    fecha: "2026-10-14",
    entrada: { bruto: 0, periode: "maand", vakantiegeld: true, dertiendeMaand: false, pensioen: 0 },
    esperaError: true,
  },
]);
