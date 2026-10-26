import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosTh: TextosUi<UiMetaDeAhorro> = {
  slug: "savings-goal",
  ui: () => ({
    meta: "เป้าหมายเงินออม",
    actual: "เงินออมที่มีอยู่แล้ว (ไม่บังคับ)",
    meses: "จำนวนเดือนที่ต้องการให้ถึงเป้าหมาย",
    rendimiento: "ผลตอบแทนเงินออมต่อปี (%, ไม่บังคับ)",
    rendimientoAyuda: "กรณีที่เงินอยู่ในบัญชีหรือการลงทุนที่ให้ดอกเบี้ย หากไม่ได้ผลตอบแทน ให้เว้นว่างไว้",
    aporteMensual: "เงินที่ต้องออมต่อเดือน",
    aporteSemanal: "คิดเป็นต่อสัปดาห์",
    totalAportado: "เงินที่ออมรวม",
    intereses: "ดอกเบี้ยที่ได้รับ",
    errorMeta: "กรุณากรอกเป้าหมายเงินออม",
    yaLlegas: "เงินที่มีอยู่แล้วจะถึงเป้าหมายภายในระยะเวลานี้ได้โดยไม่ต้องออมเพิ่ม",
  }),
};
