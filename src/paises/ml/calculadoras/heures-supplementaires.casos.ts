import { definirCasos } from "@/motor/calculo";
import calculadora from "./heures-supplementaires";

export default definirCasos(calculadora, [
  {
    nombre: "Toutes les majorations sur un salaire de 150 000 F",
    origen: {
      tipo: "recalculado",
      detalle:
        "40 × 52 / 12 = 173,33 h ; taux horaire 865,38 (le SMIG donne le même rapport : 40 000 / 173,33 = 230,77). 8 h × 1,10 = 7 615 ; 2 h × 1,25 = 2 163 ; 3 h × 1,50 = 3 894 ; 4 h × 1,50 = 5 192 ; 2 h × 2 = 3 462. Total 22 326.",
    },
    fecha: "2026-10-27",
    entrada: { salaire: 150000, h4148: 8, hAuDela: 2, hNuit: 3, hReposJour: 4, hReposNuit: 2 },
    esperado: { total: 22326, horaire: 865.38, p4148: 7615, pAuDela: 2163, pNuit: 3894, pReposJour: 5192, pReposNuit: 3462 },
  },
  {
    nombre: "Huit heures de la 41e à la 48e au SMIG",
    origen: { tipo: "recalculado", detalle: "230,77 × 1,10 × 8 = 2 030,8, arrondi à 2 031." },
    fecha: "2026-10-27",
    entrada: { salaire: 40000, h4148: 8, hAuDela: 0, hNuit: 0, hReposJour: 0, hReposNuit: 0 },
    esperado: { total: 2031 },
  },
]);
