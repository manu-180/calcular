import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosTh: TextosUi<UiPresupuesto> = {
  slug: "budget",
  ui: () => ({
    ingreso: "รายได้สุทธิต่อเดือน",
    ingresoAyuda: "เงินที่เข้าบัญชีทุกเดือนหลังหักภาษีและรายการหักต่าง ๆ",
    pctNecesidades: "ค่าใช้จ่ายจำเป็น (%)",
    pctNecesidadesAyuda: "ค่าที่อยู่ อาหาร ค่าน้ำค่าไฟ ค่าเดินทาง ค่ารักษาพยาบาล และยอดผ่อนหนี้ขั้นต่ำ",
    pctGustos: "ค่าใช้จ่ายตามใจ (%)",
    pctGustosAyuda: "ทานอาหารนอกบ้าน ช้อปปิ้งที่ไม่จำเป็น บริการสมาชิกรายเดือน และท่องเที่ยว",
    pctAhorro: "เงินออม (%)",
    pctAhorroAyuda: "เงินสำรองฉุกเฉิน เป้าหมายการออม เงินออมเพื่อเกษียณ และการโปะหนี้เพิ่ม",
    necesidades: "สำหรับค่าใช้จ่ายจำเป็น",
    gustos: "สำหรับค่าใช้จ่ายตามใจ",
    ahorro: "สำหรับเงินออม",
    ahorroAnual: "เงินออมในหนึ่งปี",
    errorIngreso: "กรุณากรอกรายได้ต่อเดือน",
    errorSuma: (suma) => `เปอร์เซ็นต์ทั้งสามรวมกันได้ ${suma}% ต้องรวมกันให้ได้ 100%`,
    observacionAhorroBajo: "การออมน้อยกว่า 10% ทำให้มีเงินรองรับเหตุไม่คาดฝันน้อย หากทำได้ ควรลดค่าใช้จ่ายตามใจลงบ้าง",
  }),
};
