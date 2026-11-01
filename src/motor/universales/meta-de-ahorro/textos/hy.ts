import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosHy: TextosUi<UiMetaDeAhorro> = {
  slug: "khnayoghutyan-npatak",
  ui: () => ({
    meta: "Որքա՞ն եք ուզում խնայել",
    actual: "Որքան եք արդեն խնայել (ըստ ցանկության)",
    meses: "Քանի՞ ամսում",
    rendimiento: "Խնայողության տարեկան եկամտաբերություն (%, ըստ ցանկության)",
    rendimientoAyuda: "Եթե գումարը տոկոս բերող հաշվի կամ ներդրման մեջ է։ Թողեք դատարկ, եթե ոչինչ չի բերում։",
    aporteMensual: "Ամսական պետք է առանձնացնեք",
    aporteSemanal: "Շաբաթական դա կազմում է",
    totalAportado: "Ընդամենը Ձեր մուծումները",
    intereses: "Ստացված տոկոսներ",
    errorMeta: "Մուտքագրեք, թե որքան եք ուզում խնայել։",
    yaLlegas: "Ձեր արդեն ունեցած գումարն այս ժամկետում հասնում է նպատակին նաև առանց նոր մուծումների։",
  }),
};
