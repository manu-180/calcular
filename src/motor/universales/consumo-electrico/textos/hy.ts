import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosHy: TextosUi<UiConsumoElectrico> = {
  slug: "elektraenergiayi-hashvich",
  ui: () => ({
    potencia: "Սարքի հզորություն (Վտ)",
    potenciaAyuda: "Նշված է պիտակի վրա կամ ձեռնարկում՝ վատտով (Վտ)։ Եթե գրված է կՎտ, բազմապատկեք 1000 թվով։",
    cantidad: "Միանման սարքերի քանակ",
    horas: "Աշխատանքային ժամեր օրական",
    dias: "Աշխատանքային օրեր ամսական",
    precio: "Մեկ կՎտժ գին",
    precioAyuda: "Նշված է էլեկտրաէներգիայի հաշվում՝ մեկ կՎտժ գինը, հարկերով, եթե ուզում եք լրիվ գումարը։",
    kwhDia: "Սպառում օրական (կՎտժ)",
    kwhMes: "Սպառում ամսական (կՎտժ)",
    kwhAnio: "Սպառում տարեկան (կՎտժ)",
    costoDia: "Ծախս օրական",
    costoMes: "Ծախս ամսական",
    costoAnio: "Ծախս տարեկան",
    errorHoras: "Օրն ունի 24 ժամ, աշխատանքը պետք է լինի 0 և 24 ժամի միջև։",
  }),
};
