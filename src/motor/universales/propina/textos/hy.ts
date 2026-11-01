import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosHy: TextosUi<UiPropina> = {
  slug: "teyavchari-hashvich",
  ui: () => ({
    cuenta: "Հաշվի գումար",
    porcentaje: "Թեյավճար (%)",
    porcentajeAyuda: "Սովորույթները տարբեր են՝ կախված երկրից և հաստատությունից։ Ընտրեք այնքան, որքան Ձեզ ճիշտ է թվում։",
    personas: "Վճարող մարդկանց թիվ",
    redondear: "Յուրաքանչյուրի բաժինը կլորացնել դեպի վեր",
    redondearAyuda: "Այսպես յուրաքանչյուրը վճարում է կլոր գումար։ Տարբերությունն ավելանում է թեյավճարին։",
    propina: "Թեյավճար",
    total: "Ընդամենը՝ թեյավճարով",
    porPersona: "Յուրաքանչյուրը վճարում է",
    propinaEfectiva: "Թեյավճարը կլորացումից հետո",
    errorPersonas: "Պետք է վճարի առնվազն մեկ մարդ։",
    observacionRedondeo: (efectiva) => `Դեպի վեր կլորացումից հետո թեյավճարը կազմում է հաշվի ${efectiva} տոկոսը։`,
  }),
};
