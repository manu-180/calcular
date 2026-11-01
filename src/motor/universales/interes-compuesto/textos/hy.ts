import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosHy: TextosUi<UiInteresCompuesto> = {
  slug: "bard-tokos",
  ui: () => ({
    capital: "Սկզբնական գումար",
    aporte: "Ամսական մուծում (ըստ ցանկության)",
    aporteAyuda: "Այն գումարը, որը կավելացնեիք ամեն ամիս։ Այն ավելանում է յուրաքանչյուր ամսվա վերջում։",
    tasa: "Տարեկան տոկոսադրույք (%)",
    anios: "Տարիներ",
    capitalizacion: "Տոկոսների կապիտալացում",
    anual: "Տարեկան",
    semestral: "Կիսամյակային",
    trimestral: "Եռամսյակային",
    mensual: "Ամսական",
    diaria: "Օրական",
    saldo: "Վերջնական գումար",
    aportado: "Ընդամենը մուծված",
    intereses: "Ստացված տոկոսներ",
    tabla: "Աճը տարի առ տարի",
    colAnio: "Տարի",
    colAportado: "Մուծումներ",
    colIntereses: "Տոկոսներ",
    colSaldo: "Գումարը տարեվերջին",
    errorSinDinero: "Մուտքագրեք սկզբնական գումար կամ ամսական մուծում։",
    observacionIntereses: (porcentaje) => `Վերջնական գումարի ${porcentaje}% կազմում են տոկոսները։`,
  }),
};
