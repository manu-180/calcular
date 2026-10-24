import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosUz: TextosUi<UiTarifaFreelance> = {
  slug: "frilans-narxi-kalkulyatori",
  ui: () => ({
    ingreso: "Yiliga qoʻlingizga tegishini xohlagan summa",
    ingresoAyuda: "Soliq va xarajatlardan keyin. Bu frilanser sifatidagi ish haqingiz.",
    gastos: "Yillik ish xarajatlari",
    gastosAyuda: "Texnika, dasturlar, internet, kurslar, buxgalter, tibbiy sugʻurta va pensiya uchun jamgʻarma.",
    impuestos: "Taxminiy soliq va toʻlovlar (%)",
    impuestosAyuda: "Hisob-faktura summasidan xarajatlar ayirilgandan keyin soliqqa ketadigan qism. Aniq bilmasangiz, buxgalterdan soʻrang. 25 foiz boshlangʻich nuqta boʻla oladi.",
    diasLibres: "Yiliga dam olish kunlari",
    diasLibresAyuda: "Taʼtil, bayram kunlari va kasallik kunlari. Ular uchun hech kim toʻlamaydi, shuning uchun narxingiz ularni ham qoplashi kerak.",
    diasSemana: "Haftada ish kunlari",
    horasSemana: "Haftada haq olinadigan soatlar",
    horasSemanaAyuda: "Faqat mijozdan haq oladigan soatlaringiz. Mijoz izlash, hujjatlar va oʻqish bunga kirmaydi. Odatda 40 soatdan 20 tadan 30 tagacha.",
    tarifaHora: "Bir soatlik narx",
    tarifaDia: "Bir kunlik narx",
    facturacionMensual: "Oyiga kerakli tushum",
    facturacionAnual: "Yiliga kerakli tushum",
    horasAnio: "Yiliga haq olinadigan soatlar",
    errorIngreso: "Yiliga qancha topmoqchi ekaningizni kiriting.",
    errorImpuestos: "Soliqlar 100 foizdan kam boʻlishi kerak.",
    errorDias: "Shuncha dam olish kuni bilan yilda ish kuni qolmaydi.",
    errorHoras: "Haftada necha soat uchun haq olishingiz mumkinligini kiriting.",
    observacionFacturables: "Bundan kam narx qoʻysangiz, rejalashtirganingizdan kam topasiz yoki koʻproq soat ishlaysiz.",
  }),
};
