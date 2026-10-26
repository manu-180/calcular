import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosUz: TextosUi<UiConversorSueldo> = {
  slug: "soatlik-ish-haqi-kalkulyatori",
  ui: () => ({
    monto: "Ish haqi",
    periodo: "Ish haqi qaysi davr uchun",
    hora: "Soatiga",
    dia: "Kuniga",
    semana: "Haftasiga",
    quincena: "Yarim oyga (yiliga 24 marta)",
    mes: "Oyiga",
    anio: "Yiliga",
    horasSemana: "Haftada ishlangan soatlar",
    diasSemana: "Haftada ishlangan kunlar",
    semanasAnio: "Yiliga haq toʻlanadigan haftalar",
    semanasAnioAyuda: "Haq toʻlanadigan taʼtilingiz boʻlsa, 52. Faqat ishlagan haftalaringiz uchun haq olsangiz, qolganlarini ayiring.",
    porHora: "Soatlik",
    porDia: "Kunlik",
    porSemana: "Haftalik",
    porQuincena: "Yarim oylik",
    porMes: "Oylik",
    porAnio: "Yillik",
    errorHoras: "Haftada necha soat ishlashingizni kiriting.",
    errorSemanas: "Yiliga haq toʻlanadigan haftalar noldan katta boʻlishi kerak.",
    observacionBruto: "Bu boshqa davrlarga oʻtkazilgan xuddi shu summa. Mukofotlar qoʻshilmaydi va soliqlar ayirilmaydi.",
  }),
};
