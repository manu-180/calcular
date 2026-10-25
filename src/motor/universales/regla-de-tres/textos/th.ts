import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosTh: TextosUi<UiReglaDeTres> = {
  slug: "rule-of-three",
  ui: () => ({
    tipo: "ประเภทของสัดส่วน",
    directa: "แปรผันตรง (A เพิ่ม B ก็เพิ่ม)",
    inversa: "แปรผกผัน (A เพิ่ม B ลดลง)",
    a: "A",
    aAyuda: "อ่านว่า A ต่อ B เท่ากับ C ต่อ X กรอกค่า A B และ C",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "ค่านี้ต้องไม่เป็น 0 เพราะใช้เป็นตัวหาร",
    fraseDirecta: (a, b, c, x) => `ถ้า ${a} ต่อ ${b} แล้ว ${c} ต่อ ${x} วิธีคิด: ${b} × ${c} ÷ ${a}`,
    fraseInversa: (a, b, c, x) => `ถ้า ${a} ได้ ${b} แล้ว ${c} จะได้ ${x} วิธีคิด: ${a} × ${b} ÷ ${c}`,
  }),
};
