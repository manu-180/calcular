import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// El jemer no tiene plural: «3 ឆ្នាំ 2 ខែ 5 ថ្ងៃ», con espacio entre número y unidad.
export function duracionKm(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios} ឆ្នាំ`);
  if (meses) partes.push(`${meses} ខែ`);
  if (dias || !partes.length) partes.push(`${dias} ថ្ងៃ`);
  return partes.join(" ");
}

export const textosKm: TextosUi<UiDiasEntreFechas> = {
  slug: "days-between-dates",
  ui: () => ({
    desde: "កាលបរិច្ឆេទចាប់ផ្តើម",
    hasta: "កាលបរិច្ឆេទបញ្ចប់",
    incluir: "រាប់បញ្ចូលថ្ងៃបញ្ចប់ផង",
    incluirAyuda: "ជ្រើសរើសប្រសិនបើត្រូវរាប់ថ្ងៃចុងក្រោយផង ដូចជាថ្ងៃធ្វើដំណើរ ឬថ្ងៃឈប់សម្រាក។",
    dias: "ចំនួនថ្ងៃប្រតិទិន",
    semanas: "គិតជាសប្តាហ៍",
    duracionFila: "គិតជាឆ្នាំ ខែ និងថ្ងៃ",
    habiles: "ថ្ងៃធ្វើការ",
    habilesAyuda: "ពីថ្ងៃច័ន្ទដល់ថ្ងៃសុក្រ មិនទាន់ដកថ្ងៃឈប់សម្រាកសាធារណៈទេ។",
    duracion: duracionKm,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} សប្តាហ៍ ${dias} ថ្ងៃ` : `${semanas} សប្តាហ៍`),
    notaHabiles: "ថ្ងៃធ្វើការរាប់ពីថ្ងៃច័ន្ទដល់ថ្ងៃសុក្រ ហើយមិនដកថ្ងៃឈប់សម្រាកសាធារណៈទេ ព្រោះវាខុសគ្នាតាមប្រទេស និងតំបន់។",
    notaInvertidas: "កាលបរិច្ឆេទបញ្ចប់នៅមុនកាលបរិច្ឆេទចាប់ផ្តើម ដូច្នេះយើងបានប្តូរវាឱ្យហើយ។",
  }),
};
