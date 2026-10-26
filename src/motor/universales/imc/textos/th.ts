import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { kg: "กก.", cm: "ซม.", lb: "ปอนด์" };
const u = (x: string) => UNIDAD[x] ?? x;

export const textosTh: TextosUi<UiImc> = {
  slug: "bmi",
  ui: () => ({
    peso: (x) => `น้ำหนัก (${u(x)})`,
    altura: (x) => `ส่วนสูง (${u(x)})`,
    pies: "ส่วนสูง: ฟุต (ft)",
    pulgadas: "ส่วนสูง: นิ้ว (in)",
    imc: "ดัชนีมวลกาย (BMI)",
    categoria: "เกณฑ์ (WHO)",
    pesoMin: (x) => `น้ำหนักที่เหมาะสมตั้งแต่ (${u(x)})`,
    pesoMax: (x) => `น้ำหนักที่เหมาะสมไม่เกิน (${u(x)})`,
    rangoAyuda: "ช่วงน้ำหนักที่ทำให้ค่า BMI อยู่ในเกณฑ์ปกติสำหรับส่วนสูงนี้",
    bajo: "น้ำหนักน้อยกว่าเกณฑ์",
    normal: "น้ำหนักปกติ",
    sobrepeso: "น้ำหนักเกิน",
    obesidad1: "โรคอ้วนระดับ 1",
    obesidad2: "โรคอ้วนระดับ 2",
    obesidad3: "โรคอ้วนระดับ 3",
    errorPeso: "น้ำหนักต้องมากกว่า 0",
    errorAltura: "ส่วนสูงต้องมากกว่า 0",
    aviso:
      "BMI เป็นเพียงเกณฑ์คร่าว ๆ สำหรับผู้ใหญ่ แยกกล้ามเนื้อกับไขมันไม่ได้ และใช้กับหญิงตั้งครรภ์หรือเด็กแบบเดียวกันไม่ได้ ข้อมูลนี้ใช้ประกอบการดูแลสุขภาพเท่านั้น ไม่สามารถใช้แทนการปรึกษาแพทย์หรือผู้เชี่ยวชาญด้านสุขภาพ",
  }),
};
