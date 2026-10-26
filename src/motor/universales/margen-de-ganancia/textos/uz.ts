import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosUz: TextosUi<UiMargenDeGanancia> = {
  slug: "foyda-marjasi-kalkulyatori",
  ui: () => ({
    modo: "Nimani hisoblamoqchisiz?",
    modoPrecio: "Tannarx va narx boʻyicha marjani",
    modoMargen: "Kerakli marja uchun narxni",
    modoMarkup: "Kerakli ustama uchun narxni",
    costo: "Bir dona tannarxi",
    costoAyuda: "Bir donani sotib olish yoki ishlab chiqarish narxi, xaridorga oʻtkaziladigan QQSsiz.",
    precio: "Sotish narxi",
    precioAyuda: "Faqat marjani hisoblayotgan boʻlsangiz. QQSsiz.",
    objetivo: "Kerakli marja yoki ustama (%)",
    objetivoAyuda: "Faqat narxni hisoblayotgan boʻlsangiz.",
    precioResultado: "Sotish narxi",
    margen: "Foyda marjasi",
    margenAyuda: "Foydaning sotish narxiga nisbatan foizi.",
    markup: "Ustama",
    markupAyuda: "Foydaning tannarxga nisbatan foizi.",
    ganancia: "Bir donadan foyda",
    errorCosto: "Bir donaning tannarxini kiriting.",
    errorFaltaPrecio: "Marjani hisoblash uchun sotish narxini kiriting.",
    errorFaltaObjetivo: "Koʻzlagan marja yoki ustamangizni kiriting.",
    errorMargen100: "Marja 100 foizdan kam boʻlishi kerak: aks holda butun narx tannarxsiz foyda boʻlib qoladi.",
    observacionPerdida: "Bu narxda tannarxdan arzon sotasiz: har bir sotuvda zarar koʻrasiz.",
  }),
};
