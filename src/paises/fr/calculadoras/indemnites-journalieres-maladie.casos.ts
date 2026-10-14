import { definirCasos } from "@/motor/calculo";
import ij from "./indemnites-journalieres-maladie";

const F3053 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F3053";

export default definirCasos(ij, [
  {
    nombre: "2 000 € brut par mois",
    origen: { tipo: "oficial", url: F3053, detalle: "Exemple Service-Public : 6 000 ÷ 91,25 = 65,75 € ; IJ = 32,87 €." },
    fecha: "2026-10-14",
    entrada: { salaires: 6000, jours: 10, sansCarence: false },
    esperado: { sjb: 65.75, ij: 32.87, carence: 3, joursIndemnises: 7, total: 230.09 },
  },
  {
    nombre: "Salaire au plafond de 1,4 Smic",
    origen: { tipo: "oficial", url: F3053, detalle: "Exemple Service-Public : 2 613,82 € par mois, (2 613,82 × 3) ÷ 91,25 = 85,93 € ; IJ maximale 42,97 €." },
    fecha: "2026-10-14",
    entrada: { salaires: 7841.46, jours: 3, sansCarence: true },
    esperado: { sjb: 85.93, ij: 42.97, total: 128.91 },
  },
  {
    nombre: "Salaire au-dessus du plafond",
    origen: { tipo: "oficial", url: F3053, detalle: "Les IJ ne peuvent pas dépasser 42,97 € bruts." },
    fecha: "2026-10-14",
    entrada: { salaires: 15000, jours: 5, sansCarence: false },
    esperado: { ij: 42.97, joursIndemnises: 2, total: 85.94 },
  },
  {
    nombre: "Arrêt de 2 jours : tout en carence",
    origen: { tipo: "oficial", url: F3053, detalle: "Délai de carence de 3 jours." },
    fecha: "2026-10-14",
    entrada: { salaires: 6000, jours: 2, sansCarence: false },
    esperado: { carence: 2, joursIndemnises: 0, total: 0 },
  },
]);
