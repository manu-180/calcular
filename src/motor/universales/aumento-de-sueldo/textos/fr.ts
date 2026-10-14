import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosFr: TextosUi<UiAumentoDeSueldo> = {
  slug: "calcul-augmentation-salaire",
  ui: () => ({
    sueldo: "Salaire mensuel actuel",
    sueldoAyuda: "Brut ou net, comme vous préférez. Le résultat sera sur la même base.",
    aumentoPorcentaje: "Augmentation (%)",
    aumentoMonto: "Augmentation en montant (facultatif)",
    aumentoMontoAyuda: "Si votre augmentation est un montant fixe, saisissez-le ici. Il remplace le pourcentage.",
    inflacion: "Inflation sur la période (%, facultatif)",
    inflacionAyuda: "L’inflation depuis votre dernière augmentation, pour savoir si votre salaire achète plus ou moins qu’avant.",
    sueldosAnio: "Nombre de salaires par an",
    sueldosAnioAyuda: "12 pour un salaire mensuel. 13 si vous touchez un 13e mois.",
    nuevo: "Nouveau salaire mensuel",
    diferenciaMensual: "Différence par mois",
    diferenciaAnual: "Différence par an",
    porcentaje: "Augmentation en pourcentage",
    real: "Augmentation réelle (après inflation)",
    realAyuda: "Ce que votre nouveau salaire permet d’acheter en plus par rapport à l’ancien.",
    errorSueldo: "Saisissez votre salaire actuel.",
    errorSinAumento: "Saisissez l’augmentation en pourcentage ou en montant.",
    observacionGana: (puntos) => `Vous battez l’inflation : votre salaire achète ${puntos} % de plus qu’avant.`,
    observacionPierde: (puntos) => `Votre augmentation reste sous l’inflation : votre salaire achète ${puntos} % de moins qu’avant.`,
    observacionIgual: "Votre augmentation compense tout juste l’inflation : votre salaire achète autant qu’avant.",
  }),
};
