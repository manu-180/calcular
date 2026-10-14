import { definirCasos } from "@/motor/calculo";
import pas from "./prelevement-a-la-source";

const BOFIP = "https://bofip.impots.gouv.fr/bofip/11255-PGP.html/identifiant=BOI-BAREME-000037-20260706";

export default definirCasos(pas, [
  {
    nombre: "Smic net imposable : sous le premier seuil",
    origen: { tipo: "oficial", url: BOFIP, detalle: "Grille au 1er mai 2026 : moins de 1 635 € donne 0 %. Le Smic net imposable est de 1 531,12 €." },
    fecha: "2026-10-14",
    entrada: { netImposable: 1531.12, typeTaux: "defaut", taux: null },
    esperado: { taux: 0, prelevement: 0 },
  },
  {
    nombre: "Pile sur le seuil de 1 635 €",
    origen: { tipo: "oficial", url: BOFIP, detalle: "Supérieure ou égale à 1 635 € et inférieure à 1 698 € : 0,5 %. 1 635 × 0,5 % = 8,18." },
    fecha: "2026-10-14",
    entrada: { netImposable: 1635, typeTaux: "defaut", taux: null },
    esperado: { taux: 0.5, prelevement: 8.18 },
  },
  {
    nombre: "2 500 € par mois au taux par défaut",
    origen: { tipo: "oficial", url: BOFIP, detalle: "De 2 315 € à moins de 2 738 € : 5,3 %. 2 500 × 5,3 % = 132,50 ; 1 590 € sur 12 mois." },
    fecha: "2026-10-14",
    entrada: { netImposable: 2500, typeTaux: "defaut", taux: null },
    esperado: { taux: 5.3, prelevement: 132.5, annuel: 1590 },
  },
  {
    nombre: "Dernière tranche",
    origen: { tipo: "oficial", url: BOFIP, detalle: "55 558 € ou plus : 43 %. 60 000 × 43 % = 25 800." },
    fecha: "2026-10-14",
    entrada: { netImposable: 60000, typeTaux: "defaut", taux: null },
    esperado: { taux: 43, prelevement: 25800 },
  },
  {
    nombre: "Taux personnalisé de 8,2 %",
    origen: { tipo: "recalculado", detalle: "3 100 × 8,2 % = 254,20." },
    fecha: "2026-10-14",
    entrada: { netImposable: 3100, typeTaux: "personnalise", taux: 8.2 },
    esperado: { taux: 8.2, prelevement: 254.2 },
  },
  {
    nombre: "Taux personnalisé manquant",
    origen: { tipo: "recalculado", detalle: "Sans taux, impossible de calculer." },
    fecha: "2026-10-14",
    entrada: { netImposable: 3100, typeTaux: "personnalise", taux: null },
    esperaError: true,
  },
]);
