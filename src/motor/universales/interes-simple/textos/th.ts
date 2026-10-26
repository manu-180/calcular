import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosTh: TextosUi<UiInteresSimple> = {
  slug: "simple-interest",
  ui: () => ({
    capital: "เงินต้น",
    tasa: "อัตราดอกเบี้ยต่อปี (%)",
    tiempo: "ระยะเวลา",
    unidad: "หน่วยของระยะเวลา",
    dias: "วัน",
    meses: "เดือน",
    anios: "ปี",
    base: "จำนวนวันในหนึ่งปี (สำหรับระยะเวลาเป็นวัน)",
    baseAyuda: "บางธนาคารนับหนึ่งปีเป็น 360 วัน หากไม่แน่ใจ ให้ใช้ 365",
    base365: "365 วัน",
    base360: "360 วัน (ปีธนาคาร)",
    interes: "ดอกเบี้ย",
    montoFinal: "เงินต้นรวมดอกเบี้ย",
    tasaPeriodo: "อัตราดอกเบี้ยตลอดระยะเวลา",
    errorCapital: "กรุณากรอกเงินต้นที่มากกว่าศูนย์",
  }),
};
