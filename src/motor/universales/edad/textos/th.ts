import { duracionTh } from "../../dias-entre-fechas/textos/th";
import type { TextosUi } from "../../tipos";
import type { UiEdad } from "../definicion";

export const textosTh: TextosUi<UiEdad> = {
  slug: "age",
  ui: () => ({
    nacimiento: "วันเกิด",
    referencia: "คำนวณอายุ ณ วันที่",
    referenciaAyuda: "ค่าเริ่มต้นคือวันนี้ เปลี่ยนเป็นวันอื่นเพื่อดูอายุ ณ วันนั้น",
    edad: "อายุ",
    anios: "อายุ (ปี)",
    totalMeses: "คิดเป็นเดือน",
    totalSemanas: "คิดเป็นสัปดาห์",
    totalDias: "คิดเป็นวัน",
    proximo: "วันเกิดครั้งถัดไป",
    faltan: "อีกกี่วัน",
    cumplira: "อายุที่จะครบ",
    duracion: duracionTh,
    errorFutura: "วันเกิดต้องไม่อยู่หลังวันที่ที่ใช้คำนวณ",
    cumpleHoy: (anios) => `วันนี้เป็นวันเกิด อายุครบ ${anios} ปี`,
    nota29: "ผู้ที่เกิดวันที่ 29 กุมภาพันธ์ ในปีที่ไม่ใช่ปีอธิกสุรทินจะนับวันเกิดเป็นวันที่ 28 กุมภาพันธ์",
  }),
};
