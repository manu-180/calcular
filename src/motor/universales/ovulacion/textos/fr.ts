import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosFr: TextosUi<UiOvulacion> = {
  slug: "calcul-ovulation",
  ui: () => ({
    fum: "Premier jour des dernières règles",
    fumAyuda: "Le premier jour des saignements, pas le dernier.",
    ciclo: "Durée du cycle (jours)",
    cicloAyuda: "Du premier jour des règles à la veille des suivantes. Si elle varie, prenez une moyenne.",
    ovulacion: "Ovulation estimée",
    fertilDesde: "Période fertile à partir du",
    fertilHasta: "Période fertile jusqu’au",
    proxima: "Prochaines règles",
    tabla: "Cycles suivants",
    colRegla: "Règles",
    colDesde: "Fertile à partir du",
    colHasta: "Fertile jusqu’au",
    colOvulacion: "Ovulation",
    errorCiclo: "La durée du cycle doit être comprise entre 21 et 45 jours.",
    aviso: "C’est une estimation pour des cycles réguliers. Ce n’est pas une méthode de contraception et cela ne remplace pas l’avis d’un professionnel de santé.",
  }),
};
