import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosBn: TextosUi<UiSumarDias> = {
  slug: "add-days-to-date",
  ui: () => ({
    fecha: "শুরুর তারিখ",
    operacion: "কী করবেন",
    sumar: "দিন যোগ করুন (পরের তারিখ)",
    restar: "দিন বাদ দিন (আগের তারিখ)",
    dias: "দিনের সংখ্যা",
    tipo: "কীভাবে গুনবেন",
    corridos: "ক্যালেন্ডারের সব দিন",
    habiles: "কর্মদিবস (সোমবার থেকে শুক্রবার)",
    resultado: "ফলাফলের তারিখ",
    diaSemana: "বার",
    diasCorridos: "ক্যালেন্ডারের হিসাবে মোট দিন",
    nombresDias: ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"],
    errorDias: "১০০ বছরের মধ্যে একটি পূর্ণসংখ্যা লিখুন।",
    notaHabiles: "কর্মদিবসে শনি ও রবিবার বাদ যায়, সরকারি ছুটি বাদ যায় না। মাঝে ছুটি থাকলে সেই কয়দিন যোগ করে নিন। আপনার সাপ্তাহিক ছুটি শুক্র ও শনিবার হলে ক্যালেন্ডারের দিন বেছে নিয়ে নিজে মিলিয়ে নিন।",
  }),
};
