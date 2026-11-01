import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosHy: TextosUi<UiTasaEfectiva> = {
  slug: "pastatsi-tokosadruyk",
  ui: () => ({
    direccion: "Ո՞ր տոկոսադրույքն ունեք",
    nominalAEfectiva: "Անվանական տարեկան (փոխարկել փաստացիի)",
    efectivaANominal: "Փաստացի տարեկան (փոխարկել անվանականի)",
    tasa: "Տարեկան տոկոսադրույք (%)",
    tasaAyuda: "Մուտքագրեք այնպես, ինչպես նշված է առաջարկում կամ պայմանագրում։",
    capitalizacion: "Կապիտալացում",
    capitalizacionAyuda: "Որքան հաճախ են տոկոսները գումարվում մայր գումարին։ Վարկերի և վարկային քարտերի դեպքում սովորաբար ամեն ամիս։",
    mensual: "Ամսական (տարեկան 12 անգամ)",
    trimestral: "Եռամսյակային (տարեկան 4 անգամ)",
    semestral: "Կիսամյակային (տարեկան 2 անգամ)",
    diaria: "Օրական (տարեկան 365 անգամ)",
    efectiva: "Փաստացի տարեկան տոկոսադրույք",
    nominal: "Անվանական տարեկան տոկոսադրույք",
    periodica: "Մեկ ժամանակահատվածի տոկոսադրույք",
    errorNegativa: "Տոկոսադրույքը չի կարող բացասական լինել։ Մուտքագրեք 0 կամ ավելի մեծ թիվ։",
    observacionDiferencia: (puntos) => `Փաստացի տոկոսադրույքը ${puntos} տոկոսային կետով բարձր է անվանականից, որովհետև տոկոսների վրա նույնպես տոկոս է հաշվվում։`,
  }),
};
