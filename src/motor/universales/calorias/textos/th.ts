import type { TextosUi } from "../../tipos";
import type { UiCalorias } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { kg: "กก.", cm: "ซม.", lb: "ปอนด์" };
const u = (x: string) => UNIDAD[x] ?? x;

export const textosTh: TextosUi<UiCalorias> = {
  slug: "calorie-calculator",
  ui: () => ({
    sexo: "เพศ",
    mujer: "หญิง",
    hombre: "ชาย",
    edad: "อายุ (ปี)",
    peso: (x) => `น้ำหนัก (${u(x)})`,
    altura: (x) => `ส่วนสูง (${u(x)})`,
    pies: "ส่วนสูง: ฟุต (ft)",
    pulgadas: "ส่วนสูง: นิ้ว (in)",
    actividad: "ระดับการออกกำลังกาย",
    sedentaria: "น้อยมากหรือไม่ออกกำลังกาย",
    ligera: "เบา (1 ถึง 3 วันต่อสัปดาห์)",
    moderada: "ปานกลาง (3 ถึง 5 วันต่อสัปดาห์)",
    alta: "หนัก (6 หรือ 7 วันต่อสัปดาห์)",
    muyAlta: "หนักมาก (ฝึกหนักหรือทำงานใช้แรง)",
    objetivo: "เป้าหมาย",
    mantener: "รักษาน้ำหนักเดิม",
    bajar: "ลดน้ำหนักแบบค่อยเป็นค่อยไป",
    subir: "เพิ่มน้ำหนักแบบค่อยเป็นค่อยไป",
    basal: "อัตราการเผาผลาญพื้นฐาน BMR (kcal ต่อวัน)",
    basalAyuda: "พลังงานที่ร่างกายใช้ขณะพักโดยสมบูรณ์",
    mantenimiento: "แคลอรี่ที่ใช้ต่อวัน TDEE (kcal ต่อวัน)",
    calObjetivo: "แคลอรี่ตามเป้าหมาย (kcal ต่อวัน)",
    calObjetivoAyuda: "ปรับแบบพอดี ลดวันละ 500 kcal เพื่อลดน้ำหนัก หรือเพิ่มวันละ 300 kcal เพื่อเพิ่มน้ำหนัก",
    errorEdad: "สูตรนี้ใช้กับผู้ที่มีอายุ 15 ถึง 100 ปี",
    errorPeso: "น้ำหนักต้องมากกว่า 0",
    errorAltura: "ส่วนสูงต้องมากกว่า 0",
    notaMinimo: (kcal) => `สำหรับการลดน้ำหนัก ตัวเลขจะไม่ต่ำกว่า ${kcal} kcal ต่อวัน หากต้องการกินน้อยกว่านี้ ควรอยู่ในความดูแลของผู้เชี่ยวชาญ`,
    aviso: "ตัวเลขนี้เป็นค่าประมาณจากสมการ Mifflin-St Jeor ร่างกายแต่ละคนต่างกัน ข้อมูลนี้ใช้ประกอบการดูแลสุขภาพเท่านั้น ไม่สามารถใช้แทนการปรึกษาแพทย์หรือนักโภชนาการ",
  }),
};
