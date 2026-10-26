import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosBn: TextosUi<UiConversorSueldo> = {
  slug: "hourly-to-salary",
  ui: () => ({
    monto: "বেতন",
    periodo: "বেতনটি কিসের হিসাবে",
    hora: "ঘণ্টা",
    dia: "দিন",
    semana: "সপ্তাহ",
    quincena: "আধা মাস (বছরে ২৪ বার)",
    mes: "মাস",
    anio: "বছর",
    horasSemana: "সপ্তাহে কত ঘণ্টা কাজ করেন",
    diasSemana: "সপ্তাহে কত দিন কাজ করেন",
    semanasAnio: "বছরে বেতনসহ সপ্তাহ",
    semanasAnioAyuda: "বেতনসহ ছুটি পেলে ৫২। শুধু কাজের সপ্তাহের বেতন পেলে বাকি সপ্তাহগুলো বাদ দিন।",
    porHora: "ঘণ্টাপ্রতি",
    porDia: "দৈনিক",
    porSemana: "সাপ্তাহিক",
    porQuincena: "আধা মাসে",
    porMes: "মাসিক",
    porAnio: "বার্ষিক",
    errorHoras: "সপ্তাহে কত ঘণ্টা কাজ করেন, লিখুন।",
    errorSemanas: "বছরে বেতনসহ সপ্তাহ শূন্যের বেশি হতে হবে।",
    observacionBruto: "একই পরিমাণ টাকা অন্য সময়ের হিসাবে দেখানো হয়েছে। বোনাস যোগ বা কর বাদ দেওয়া হয়নি।",
  }),
};
