import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// «৩ বছর ২ মাস ৫ দিন»: el bengalí no flexiona detrás del número y las partes van solo con espacio.
export function duracionBn(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${cifrasBn(anios)} বছর`);
  if (meses) partes.push(`${cifrasBn(meses)} মাস`);
  if (dias || !partes.length) partes.push(`${cifrasBn(dias)} দিন`);
  return partes.join(" ");
}

export const textosBn: TextosUi<UiDiasEntreFechas> = {
  slug: "days-between-dates",
  ui: () => ({
    desde: "শুরুর তারিখ",
    hasta: "শেষের তারিখ",
    incluir: "শেষের দিনটিও গুনুন",
    incluirAyuda: "ভ্রমণ বা ছুটির মতো ক্ষেত্রে শেষ দিনটিও ধরতে চাইলে এটি বেছে নিন।",
    dias: "মোট দিন",
    semanas: "সপ্তাহের হিসাবে",
    duracionFila: "বছর, মাস ও দিনের হিসাবে",
    habiles: "কর্মদিবস",
    habilesAyuda: "সোমবার থেকে শুক্রবার ধরা হয়েছে। সরকারি ছুটি বাদ দেওয়া হয়নি।",
    duracion: duracionBn,
    semanasYDias: (semanas, _n, dias) => (dias ? `${cifrasBn(semanas)} সপ্তাহ ${cifrasBn(dias)} দিন` : `${cifrasBn(semanas)} সপ্তাহ`),
    notaHabiles: "কর্মদিবস গোনা হয়েছে সোমবার থেকে শুক্রবার। যেখানে সাপ্তাহিক ছুটি শুক্র ও শনিবার, সেখানে সংখ্যা আলাদা হবে। সরকারি ছুটি দেশ ও অঞ্চলভেদে আলাদা, তাই বাদ দেওয়া হয়নি।",
    notaInvertidas: "শেষের তারিখ শুরুর তারিখের আগে ছিল, তাই দুটি অদলবদল করে হিসাব করা হয়েছে।",
  }),
};
