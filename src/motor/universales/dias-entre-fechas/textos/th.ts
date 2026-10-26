import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// El tailandés no tiene plural: «3 ปี 2 เดือน 5 วัน», con espacio entre número y unidad.
export function duracionTh(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios} ปี`);
  if (meses) partes.push(`${meses} เดือน`);
  if (dias || !partes.length) partes.push(`${dias} วัน`);
  return partes.join(" ");
}

export const textosTh: TextosUi<UiDiasEntreFechas> = {
  slug: "days-between-dates",
  ui: () => ({
    desde: "วันที่เริ่มต้น",
    hasta: "วันที่สิ้นสุด",
    incluir: "นับวันที่สิ้นสุดด้วย",
    incluirAyuda: "เลือกหากต้องนับวันสุดท้ายด้วย เช่น วันเดินทางหรือวันลา",
    dias: "จำนวนวันตามปฏิทิน",
    semanas: "คิดเป็นสัปดาห์",
    duracionFila: "คิดเป็นปี เดือน และวัน",
    habiles: "วันทำการ",
    habilesAyuda: "วันจันทร์ถึงวันศุกร์ ยังไม่ได้หักวันหยุดนักขัตฤกษ์",
    duracion: duracionTh,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} สัปดาห์ ${dias} วัน` : `${semanas} สัปดาห์`),
    notaHabiles: "วันทำการนับวันจันทร์ถึงวันศุกร์ และไม่ได้หักวันหยุดนักขัตฤกษ์ ซึ่งต่างกันไปตามประเทศและพื้นที่",
    notaInvertidas: "วันที่สิ้นสุดอยู่ก่อนวันที่เริ่มต้น จึงสลับให้แล้ว",
  }),
};
