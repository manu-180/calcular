import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosHy: TextosUi<UiIva> = {
  slug: "aah-hashvich",
  ui: () => ({
    operacion: "Ի՞նչ եք ուզում հաշվարկել",
    agregar: "Ավելացնել ԱԱՀ առանց հարկի գնին",
    quitar: "Հանել ԱԱՀ-ն այն ներառող գնից",
    monto: "Գին",
    montoAyuda: "Առանց ԱԱՀ-ի, եթե ավելացնում եք հարկը, և ԱԱՀ-ով, եթե հանում եք այն։",
    otraTasa: "Այլ ԱԱՀ դրույքաչափ (%)",
    otraTasaAyuda: "Ըստ ցանկության։ Եթե ապրանքի կամ ծառայության համար գործում է նվազեցված դրույքաչափ, մուտքագրեք այն այստեղ։ Հակառակ դեպքում կիրառվում է հիմնական դրույքաչափը։",
    neto: "Գինն առանց ԱԱՀ-ի",
    impuesto: "ԱԱՀ-ի գումար",
    total: "Գինը ԱԱՀ-ով",
    tasaUsada: "Կիրառված դրույքաչափ",
    errorTasa: "ԱԱՀ-ի դրույքաչափը վավեր չէ։",
  }),
};
