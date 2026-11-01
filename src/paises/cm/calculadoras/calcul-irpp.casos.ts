import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-irpp";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "500 000 F par mois, ligne du barème de la DGI",
    origen: {
      tipo: "oficial",
      url: "https://www.impots.cm/sites/default/files/documents/BAREME%20IRPP_DSSI%20final.pdf",
      detalle: "Barème indicatif de la DGI : IRPP 38 500 et CAC 3 850 pour 500 000 F. Année : 6 000 000 − 1 800 000 − 252 000 − 500 000 = 3 448 000 ; 200 000 + 150 000 + 448 000 × 25 % = 462 000.",
    },
    fecha: F,
    entrada: { periode: "mois", brut: 500000 },
    esperado: { irppMois: 38500, cacMois: 3850, totalMois: 42350, baseImposable: 3448000, irppAnnuel: 462000, cacAnnuel: 46200, tauxEffectif: 8.47 },
  },
  {
    nombre: "6 000 000 F par an : même résultat qu'en mensuel",
    origen: { tipo: "recalculado", detalle: "6 000 000 / 12 = 500 000 par mois, d'où 38 500 d'IRPP." },
    fecha: F,
    entrada: { periode: "annee", brut: 6000000 },
    esperado: { irppMois: 38500, irppAnnuel: 462000 },
  },
  {
    nombre: "55 000 F par mois : sous le seuil de retenue",
    origen: { tipo: "recalculado", detalle: "Brut inférieur à 62 000 F : aucune retenue (article 81)." },
    fecha: F,
    entrada: { periode: "mois", brut: 55000 },
    esperado: { totalMois: 0, irppAnnuel: 0, tauxEffectif: 0 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { periode: "mois", brut: 0 },
    esperaError: true,
  },
]);
