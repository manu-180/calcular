import { definirCasos } from "@/motor/calculo";
import indexationSalaires from "./indexation-salaires";

const STATEC = "https://lustat.statec.lu/rest/data/LU1,DSD_PRIX_EMS@DF_E5201,1.0/all";

export default definirCasos(indexationSalaires, [
  {
    nombre: "Situation au 16 octobre 2026",
    origen: {
      tipo: "recalculado",
      url: STATEC,
      detalle: "Cote d'échéance 1038,79 (juin 2026) ; prochaine cote 1038,79 x 1,025 = 1064,75. Moyenne semestrielle de septembre 2026 : 1058,56 ; il manque 0,58 %. 5000 x 1,025 = 5125. À l'indice 100 : 5000 x 100 / 992,24 = 503,91.",
    },
    fecha: "2026-10-16",
    entrada: { salaire: 5000 },
    esperado: { apres: 5125, hausse: 125, prochaineCote: 1064.75, moyenne: 1058.56, mois: "septembre 2026", reste: 0.58475665, indice: 992.24, base100: 503.91 },
    tolerancia: 0.0001,
  },
]);
