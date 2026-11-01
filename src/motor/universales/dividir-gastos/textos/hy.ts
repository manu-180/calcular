import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosHy: TextosUi<UiDividirGastos> = {
  slug: "tsakhseri-bazhanum",
  ui: () => ({
    persona: (n) => `Մասնակից ${n}`,
    personaAyuda: "Մուտքագրեք, թե որքան է վճարել յուրաքանչյուրը։ Եթե ինչ-որ մեկը ոչինչ չի վճարել, բայց մասնակցում է ծախսին, մուտքագրեք 0։ Մնացած դաշտերը թողեք դատարկ։",
    total: "Ընդհանուր ծախս",
    personas: "Մարդկանց թիվ",
    cuota: "Բաժինը մեկ մարդու համար",
    transferencias: "Հավասարեցնող վճարումներ",
    tabla: "Ո՞վ ում է վճարում",
    colDe: "Վճարում է",
    colPara: "Ստանում է",
    colMonto: "Գումար",
    errorPocas: "Ծախսը բաժանելու համար անհրաժեշտ է առնվազն երկու մարդ։",
    aMano: "Հաշիվները մաքուր են՝ բոլորը վճարել են նույն գումարը։",
  }),
};
