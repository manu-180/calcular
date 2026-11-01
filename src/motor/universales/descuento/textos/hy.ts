import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosHy: TextosUi<UiDescuento> = {
  slug: "zeghchi-hashvich",
  ui: () => ({
    precio: "Սկզբնական գին",
    descuento: "Զեղչ (%)",
    segundoDescuento: "Լրացուցիչ զեղչ (%)",
    segundoDescuentoAyuda: "Եթե զեղչված գնի վրա կա ևս մեկ զեղչ, մուտքագրեք այն այստեղ։",
    ahorro: "Խնայում եք",
    final: "Վերջնական գին",
    descuentoTotal: "Ընդհանուր զեղչ",
    errorMayorA100: "Զեղչը չի կարող 100% արժեքից մեծ լինել։",
    observacionDoble: (efectivo) => `Երկու հաջորդական զեղչերը չեն գումարվում՝ միասին դրանք տալիս են ${efectivo}% զեղչ։`,
  }),
};
