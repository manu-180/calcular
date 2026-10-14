import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosFr: TextosUi<UiHorasTrabajadas> = {
  slug: "calcul-heures-travaillees",
  ui: () => ({
    dias: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    entrada: (dia) => `${dia} : début`,
    salida: (dia) => `${dia} : fin`,
    horarioAyuda: "Laissez vides les jours non travaillés. Si vous finissez après minuit, cela compte dans la même journée de travail.",
    pausa: "Pause non payée par jour (minutes)",
    pausaAyuda: "Le temps de repas ou de repos non rémunéré. Il est retiré de chaque jour travaillé.",
    pagoHora: "Taux horaire",
    umbral: "Heures normales par semaine (facultatif)",
    umbralAyuda: "Au-delà de ce nombre, les heures sont payées avec la majoration. Laissez vide s’il n’y a pas d’heures supplémentaires.",
    recargo: "Majoration des heures supplémentaires (%)",
    recargoAyuda: "Combien chaque heure supplémentaire est payée en plus. 25 % veut dire 1,25 fois le taux horaire.",
    horasTotales: "Heures travaillées",
    horasReloj: "En heures et minutes",
    horasNormales: "Heures normales",
    horasExtra: "Heures supplémentaires",
    pagoNormal: "Paie des heures normales",
    pagoExtra: "Paie des heures supplémentaires",
    pagoTotal: "Paie totale de la semaine",
    tabla: "Jour par jour",
    colDia: "Jour",
    colEntrada: "Début",
    colSalida: "Fin",
    colHoras: "Heures",
    errorFaltaSalida: (dia) => `${dia} : il manque l’heure de fin.`,
    errorFaltaEntrada: (dia) => `${dia} : il manque l’heure de début.`,
    errorIguales: (dia) => `${dia} : l’heure de début et l’heure de fin sont identiques.`,
    errorPausa: (dia) => `${dia} : la pause est aussi longue ou plus longue que la journée de travail.`,
    errorSinDias: "Indiquez l’heure de début et de fin pour au moins un jour.",
    observacionNoche: "Certaines journées finissent le lendemain : elles comptent en entier le jour où elles commencent.",
    observacionGenerico:
      "C’est un calcul général. La durée maximale, les règles des heures supplémentaires et la paie du travail de nuit ou des jours fériés dépendent de la loi et de votre contrat.",
  }),
};
