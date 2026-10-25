import { cifrasBn } from "../../../i18n/bengali";
import { duracionBn } from "../../dias-entre-fechas/textos/bn";
import type { TextosUi } from "../../tipos";
import type { UiEdad } from "../definicion";

export const textosBn: TextosUi<UiEdad> = {
  slug: "age",
  ui: () => ({
    nacimiento: "জন্মতারিখ",
    referencia: "যে তারিখ পর্যন্ত হিসাব",
    referenciaAyuda: "শুরুতে আজকের তারিখ দেওয়া থাকে। অন্য তারিখ দিলে সেই দিনে আপনার বয়স কত, তা দেখা যাবে।",
    edad: "বয়স",
    anios: "পূর্ণ বছর",
    totalMeses: "মাসের হিসাবে",
    totalSemanas: "সপ্তাহের হিসাবে",
    totalDias: "দিনের হিসাবে",
    proximo: "পরের জন্মদিন",
    faltan: "জন্মদিন আসতে বাকি",
    cumplira: "পরের জন্মদিনে বয়স হবে",
    duracion: duracionBn,
    errorFutura: "জন্মতারিখ হিসাবের তারিখের পরে হতে পারে না।",
    cumpleHoy: (anios) => `আজ আপনার জন্মদিন। আপনার বয়স পূর্ণ হলো ${cifrasBn(anios)} বছর।`,
    nota29: "২৯ ফেব্রুয়ারি জন্ম হলে অধিবর্ষ ছাড়া অন্য বছরে ২৮ ফেব্রুয়ারিকে জন্মদিন ধরে হিসাব করা হয়।",
  }),
};
