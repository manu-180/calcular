import { definirCasos } from "@/motor/calculo";
import inflation from "./calcul-inflation";

const INSEE = "https://bdm.insee.fr/series/sdmx/data/SERIES_BDM/011814630";

export default definirCasos(inflation, [
  {
    nombre: "Sur un an, de septembre 2025 à septembre 2026",
    origen: { tipo: "oficial", url: INSEE, detalle: "Insee, série 011814630 : 99,99 en septembre 2025 et 102,99 en septembre 2026. 1 000 × 102,99 ÷ 99,99 = 1 030,00." },
    fecha: "2026-10-14",
    entrada: { montant: 1000, desde: "2025-09-15", hasta: "2026-09-30" },
    esperado: { montantActualise: 1030, indiceInitial: 99.99, indiceFinal: 102.99, moisFinal: "septembre 2026" },
  },
  {
    nombre: "Depuis janvier 2000",
    origen: { tipo: "oficial", url: INSEE, detalle: "65,46 en janvier 2000. 1 000 × 102,99 ÷ 65,46 = 1 573,33." },
    fecha: "2026-10-14",
    entrada: { montant: 1000, desde: "2000-01-01", hasta: "2026-09-01" },
    esperado: { montantActualise: 1573.33 },
  },
  {
    nombre: "Mois d'arrivée pas encore publié",
    origen: { tipo: "recalculado", detalle: "L'indice d'octobre 2026 n'est pas publié le 14 octobre : le calcul s'arrête en septembre 2026." },
    fecha: "2026-10-14",
    entrada: { montant: 1000, desde: "2025-09-01", hasta: "2026-10-14" },
    esperado: { montantActualise: 1030, moisFinal: "septembre 2026" },
  },
  {
    nombre: "Avec la série arrêtée à août 2026",
    origen: { tipo: "recalculado", detalle: "Le 15 septembre 2026, le dernier indice connu est celui d'août : 2020-01 (86,43) à 2025-01 (99,33), 1 000 × 99,33 ÷ 86,43 = 1 149,25." },
    fecha: "2026-09-15",
    entrada: { montant: 1000, desde: "2020-01-01", hasta: "2025-01-01" },
    esperado: { montantActualise: 1149.25 },
  },
  {
    nombre: "Départ avant le début de la série",
    origen: { tipo: "recalculado", detalle: "La série commence en janvier 1996." },
    fecha: "2026-10-14",
    entrada: { montant: 1000, desde: "1990-01-01", hasta: "2026-09-01" },
    esperaError: true,
  },
]);
