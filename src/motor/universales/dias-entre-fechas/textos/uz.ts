import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// En uzbeko el sustantivo va en singular después de un número («3 kun», «2 yil») y la duración se
// escribe sin «va»: «36 yil 4 oy 28 kun».
export function duracionUz(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios} yil`);
  if (meses) partes.push(`${meses} oy`);
  if (dias || !partes.length) partes.push(`${dias} kun`);
  return partes.join(" ");
}

export const textosUz: TextosUi<UiDiasEntreFechas> = {
  slug: "sanalar-orasidagi-kunlar",
  ui: () => ({
    desde: "Boshlanish sanasi",
    hasta: "Tugash sanasi",
    incluir: "Tugash kunini ham hisoblash",
    incluirAyuda: "Oxirgi kun ham hisobga kirsa, belgilang. Masalan, safar yoki taʼtil uchun.",
    dias: "Kalendar kunlari",
    semanas: "Haftalarda",
    duracionFila: "Yil, oy va kunlarda",
    habiles: "Ish kunlari",
    habilesAyuda: "Dushanbadan jumagacha. Bayram kunlari chiqarib tashlanmaydi.",
    duracion: duracionUz,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} hafta ${dias} kun` : `${semanas} hafta`),
    notaHabiles: "Ish kunlari dushanbadan jumagacha hisoblanadi. Mamlakat va hududga qarab farq qiladigan bayram kunlari chiqarib tashlanmaydi.",
    notaInvertidas: "Tugash sanasi boshlanish sanasidan oldin edi, shuning uchun ikki sananing oʻrni almashtirildi.",
  }),
};
