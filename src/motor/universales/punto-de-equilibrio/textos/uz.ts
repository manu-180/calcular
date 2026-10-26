import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosUz: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "zararsizlik-nuqtasi-kalkulyatori",
  ui: () => ({
    fijos: "Oylik doimiy xarajatlar",
    fijosAyuda: "Hech narsa sotmasangiz ham toʻlaydiganlaringiz: ijara, doimiy ish haqi, kommunal xizmatlar, dasturlar.",
    precio: "Bir dona sotish narxi",
    variable: "Bir donaga oʻzgaruvchan xarajat",
    variableAyuda: "Har bir sotilgan dona sizga qanchaga tushadi: xomashyo, tovar, komissiya, yetkazib berish.",
    objetivo: "Oylik koʻzlangan foyda (ixtiyoriy)",
    objetivoAyuda: "Xarajatlarni qoplashdan tashqari qancha sotish kerakligini koʻrish uchun.",
    unidades: "Zararsizlik uchun kerakli sotuv (dona)",
    facturacion: "Zararsizlik uchun kerakli tushum",
    contribucion: "Bir donadan marjinal daromad",
    contribucionAyuda: "Har bir sotuv doimiy xarajatlarni qoplash uchun qoldiradigan summa: narx minus oʻzgaruvchan xarajat.",
    contribucionPct: "Marjinal daromad (%)",
    unidadesObjetivo: "Koʻzlangan foyda uchun sotuv (dona)",
    facturacionObjetivo: "Koʻzlangan foyda uchun tushum",
    errorPrecio: "Bir donaning sotish narxini kiriting.",
    errorMargen: "Oʻzgaruvchan xarajat narxga teng yoki undan yuqori: har bir sotuv zarar keltiradi va zararsizlik nuqtasiga hech qachon yetmaysiz. Narx yoki xarajatni tekshiring.",
    observacionRedondeo: "Dona soni yuqoriga yaxlitlanadi, chunki donaning bir qismini sotib boʻlmaydi.",
  }),
};
