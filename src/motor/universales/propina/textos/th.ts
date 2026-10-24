import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosTh: TextosUi<UiPropina> = {
  slug: "tip",
  ui: () => ({
    cuenta: "ยอดค่าอาหารหรือค่าบริการ",
    porcentaje: "ทิป (%)",
    porcentajeAyuda: "ธรรมเนียมการให้ทิปต่างกันไปตามประเทศและสถานที่ เลือกตามที่เห็นสมควร",
    personas: "จำนวนคนที่ร่วมจ่าย",
    redondear: "ปัดเงินแต่ละคนขึ้นเป็นจำนวนเต็ม",
    redondearAyuda: "เพื่อให้ทุกคนจ่ายเป็นจำนวนเต็ม ส่วนที่เกินจะรวมเป็นทิป",
    propina: "ทิป",
    total: "ยอดรวมทิป",
    porPersona: "จ่ายคนละ",
    propinaEfectiva: "ทิปหลังปัดเศษ",
    errorPersonas: "ต้องมีคนจ่ายอย่างน้อยหนึ่งคน",
    observacionRedondeo: (efectiva) => `หลังปัดเศษขึ้น ทิปคิดเป็น ${efectiva}% ของยอดบิล`,
  }),
};
