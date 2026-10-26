import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosTh: TextosUi<UiAhorroRetiro> = {
  slug: "retirement-savings",
  ui: () => ({
    edadActual: "อายุปัจจุบัน",
    edadRetiro: "อายุที่ต้องการเกษียณ",
    actual: "เงินออมที่มีอยู่แล้ว",
    aporte: "เงินที่ออมต่อเดือน",
    rendimiento: "ผลตอบแทนที่แท้จริงต่อปี (%)",
    rendimientoAyuda: "ผลตอบแทนการลงทุนที่สูงกว่าอัตราเงินเฟ้อ ในระยะยาว 2% ถึง 5% เป็นสมมติฐานแบบระมัดระวัง",
    aniosRenta: "จำนวนปีหลังเกษียณที่ต้องการให้เงินพอใช้",
    aniosRentaAyuda: "จำนวนปีที่ต้องการทยอยถอนเงินออมนี้มาใช้",
    capital: "เงินออมเมื่อเกษียณ",
    renta: "รายได้ต่อเดือนจากเงินออมนี้",
    aportado: "เงินที่ออมรวม",
    intereses: "ผลตอบแทนรวม",
    tabla: "การเติบโตตามอายุ",
    colEdad: "อายุ",
    colAportado: "เงินที่ออมสะสม",
    colSaldo: "เงินออม",
    errorEdades: "อายุที่ต้องการเกษียณต้องมากกว่าอายุปัจจุบัน",
    errorSinAhorro: "กรุณากรอกเงินออมที่มีอยู่หรือเงินที่ออมต่อเดือน",
    observacionDineroDeHoy: "จำนวนเงินแสดงตามค่าเงินปัจจุบัน เพราะผลตอบแทนที่ใช้หักอัตราเงินเฟ้อแล้ว",
    observacionPublica: "ตัวเลขนี้เป็นเงินออมส่วนตัวเท่านั้น ไม่รวมบำนาญหรือสิทธิประโยชน์ชราภาพจากรัฐที่อาจได้รับ",
  }),
};
