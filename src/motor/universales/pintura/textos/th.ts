import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { m: "ม.", "m²": "ตร.ม.", ft: "ฟุต", "ft²": "ตร.ฟุต", "m²/L": "ตร.ม./ลิตร", "ft²/gal": "ตร.ฟุต/แกลลอน" };
const u = (x: string) => UNIDAD[x] ?? x;
const volumen = (x: string) => (x === "L" ? "ลิตร" : "แกลลอน");

export const textosTh: TextosUi<UiPintura> = {
  slug: "paint-calculator",
  ui: () => ({
    modo: "มีขนาดแบบใด",
    modoMedidas: "ความยาวและความสูงของผนัง",
    modoSuperficie: "พื้นที่ทั้งหมด",
    largo: (x) => `ความยาวผนังรวม (${u(x)})`,
    largoAyuda: "รวมความยาวของผนังทุกด้านที่จะทาสี สำหรับหนึ่งห้องคือความยาวรอบห้อง",
    alto: (x) => `ความสูงผนัง (${u(x)})`,
    superficie: (x) => `พื้นที่ที่จะทาสี (${u(x)})`,
    aberturas: (x) => `พื้นที่ประตูและหน้าต่างที่ไม่ต้องทา (${u(x)})`,
    aberturasAyuda: "ประตูหนึ่งบานประมาณ 2 ตร.ม. (21 ตร.ฟุต) และหน้าต่างทั่วไป 1 ถึง 2 ตร.ม.",
    manos: "จำนวนรอบที่ทา",
    rendimiento: (x) => `อัตราการทาของสี (${u(x)})`,
    rendimientoAyuda: "ดูได้ที่ข้างกระป๋อง ว่าสีหนึ่งหน่วยทาได้กี่ตารางเมตรต่อรอบ หากไม่ทราบ ให้ใช้ค่าที่แนะนำ",
    recomendado: (x) => `ปริมาณสีที่ควรซื้อ (${volumen(x)})`,
    recomendadoAyuda: "รวมเผื่อไว้ 10% สำหรับเก็บงานและสีที่ติดลูกกลิ้ง",
    necesario: (x) => `ปริมาณที่ใช้จริง (${volumen(x)})`,
    neta: (x) => `พื้นที่ที่จะทาสี (${u(x)})`,
    errorMedidas: "กรุณากรอกความยาวและความสูงของผนัง",
    errorSuperficie: "กรุณากรอกพื้นที่ที่จะทาสี",
    errorAberturas: "ประตูและหน้าต่างต้องไม่กินพื้นที่ทั้งผนัง",
    errorRendimiento: "อัตราการทาต้องมากกว่า 0",
  }),
};
