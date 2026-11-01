import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosHy: TextosUi<UiInteresSimple> = {
  slug: "parz-tokos",
  ui: () => ({
    capital: "Մայր գումար",
    tasa: "Տարեկան տոկոսադրույք (%)",
    tiempo: "Ժամկետ",
    unidad: "Ժամկետի միավորը",
    dias: "Օր",
    meses: "Ամիս",
    anios: "Տարի",
    base: "Օրերի թիվը տարում (օրերով ժամկետի համար)",
    baseAyuda: "Որոշ բանկեր տարին հաշվում են 360 օր։ Եթե վստահ չեք, թողեք 365։",
    base365: "365 օր",
    base360: "360 օր (բանկային տարի)",
    interes: "Տոկոս",
    montoFinal: "Մայր գումար և տոկոս",
    tasaPeriodo: "Ժամկետի տոկոսադրույք",
    errorCapital: "Մուտքագրեք զրոյից մեծ մայր գումար։",
  }),
};
