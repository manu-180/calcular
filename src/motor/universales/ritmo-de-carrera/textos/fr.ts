import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosFr: TextosUi<UiRitmo> = {
  slug: "calcul-allure-course",
  ui: () => ({
    calcular: "Que voulez-vous calculer ?",
    calcRitmo: "L’allure (à partir de la distance et du temps)",
    calcTiempo: "Le temps (à partir de la distance et de l’allure)",
    calcDistancia: "La distance (à partir du temps et de l’allure)",
    distancia: "Distance",
    distanciaAyuda: "Choisissez une course, ou « Autre » pour saisir une distance.",
    otra: "Autre distance",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Semi-marathon",
    maraton: "Marathon",
    distanciaOtra: (u) => `Autre distance (${u})`,
    horas: "Temps : heures",
    minutos: "Temps : minutes",
    segundos: "Temps : secondes",
    ritmoMin: (u) => `Allure : minutes par ${u}`,
    ritmoSeg: "Allure : secondes",
    ritmo: (u) => `Allure (min/${u})`,
    tiempo: "Temps à l’arrivée",
    distanciaRes: (u) => `Distance (${u})`,
    velocidad: (u) => `Vitesse moyenne (${u})`,
    errorDistancia: "Saisissez une distance supérieure à 0.",
    errorTiempo: "Saisissez le temps : heures, minutes ou secondes.",
    errorRitmo: "Saisissez l’allure : minutes et secondes par unité de distance.",
  }),
};
