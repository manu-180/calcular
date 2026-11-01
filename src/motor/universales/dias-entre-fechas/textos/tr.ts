import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// En turco el sustantivo va en singular después de un número («3 gün», «2 yıl») y la duración se
// escribe sin «ve»: «36 yıl 4 ay 28 gün».
export function duracionTr(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios} yıl`);
  if (meses) partes.push(`${meses} ay`);
  if (dias || !partes.length) partes.push(`${dias} gün`);
  return partes.join(" ");
}

export const textosTr: TextosUi<UiDiasEntreFechas> = {
  slug: "iki-tarih-arasi-gun-hesaplama",
  ui: () => ({
    desde: "Başlangıç tarihi",
    hasta: "Bitiş tarihi",
    incluir: "Bitiş gününü de say",
    incluirAyuda: "Son gün de sayılıyorsa işaretleyin; örneğin bir seyahat ya da izin için.",
    dias: "Takvim günü",
    semanas: "Hafta olarak",
    duracionFila: "Yıl, ay ve gün olarak",
    habiles: "İş günü",
    habilesAyuda: "Pazartesiden cumaya. Resmî tatiller düşülmez.",
    duracion: duracionTr,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} hafta ${dias} gün` : `${semanas} hafta`),
    notaHabiles: "İş günleri pazartesiden cumaya sayılır. Ülkeye ve bölgeye göre değişen resmî tatiller düşülmez.",
    notaInvertidas: "Bitiş tarihi başlangıç tarihinden önceydi, bu yüzden iki tarihin yeri değiştirildi.",
  }),
};
