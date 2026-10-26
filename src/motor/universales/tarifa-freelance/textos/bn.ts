import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosBn: TextosUi<UiTarifaFreelance> = {
  slug: "freelance-rate",
  ui: () => ({
    ingreso: "বছরে হাতে কত রাখতে চান",
    ingresoAyuda: "কর আর খরচ বাদ দিয়ে। ফ্রিল্যান্সার হিসেবে এটাই আপনার বেতন।",
    gastos: "বছরে কাজের খরচ",
    gastosAyuda: "যন্ত্রপাতি, সফটওয়্যার, ইন্টারনেট, কোর্স, হিসাবরক্ষক, স্বাস্থ্যবিমা আর অবসরের সঞ্চয়।",
    impuestos: "আনুমানিক কর ও অন্যান্য কর্তন (%)",
    impuestosAyuda: "খরচ বাদে যা বিল করেন, তার ওপর করে যা যায়। নিশ্চিত না হলে একজন হিসাবরক্ষকের পরামর্শ নিন। শুরু হিসেবে ২৫% ধরতে পারেন।",
    diasLibres: "বছরে ছুটির দিন",
    diasLibresAyuda: "ছুটি, সরকারি ছুটির দিন আর অসুস্থতার দিন। এসব দিনের টাকা কেউ দেয় না, তাই আপনার রেটেই তা ধরতে হবে।",
    diasSemana: "সপ্তাহে কাজের দিন",
    horasSemana: "সপ্তাহে বিলযোগ্য ঘণ্টা",
    horasSemanaAyuda: "শুধু যে ঘণ্টার জন্য টাকা নেন। ক্লায়েন্ট খোঁজা, প্রশাসনিক কাজ আর শেখা বিলযোগ্য নয়। ৪০ ঘণ্টার মধ্যে ২০ থেকে ৩০ ঘণ্টা সাধারণ।",
    tarifaHora: "ঘণ্টাপ্রতি রেট",
    tarifaDia: "দিনপ্রতি রেট",
    facturacionMensual: "মাসে যত বিল করতে হবে",
    facturacionAnual: "বছরে যত বিল করতে হবে",
    horasAnio: "বছরে বিলযোগ্য ঘণ্টা",
    errorIngreso: "বছরে কত আয় করতে চান, লিখুন।",
    errorImpuestos: "কর ১০০% এর কম হতে হবে।",
    errorDias: "এত ছুটির দিন ধরলে বছরে কোনো কাজের দিন বাকি থাকে না।",
    errorHoras: "সপ্তাহে কত ঘণ্টা বিল করতে পারবেন, লিখুন।",
    observacionFacturables: "এর চেয়ে কম রেট নিলে পরিকল্পনার চেয়ে কম আয় হবে, অথবা বেশি ঘণ্টা কাজ করতে হবে।",
  }),
};
