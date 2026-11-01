import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosTh: TextosUi<UiVariacion> = {
  slug: "percentage-change",
  ui: () => ({
    inicial: "ค่าเริ่มต้น",
    final: "ค่าสุดท้าย",
    variacion: "เปอร์เซ็นต์การเปลี่ยนแปลง",
    diferencia: "ส่วนต่าง",
    vuelta: "เพื่อกลับไปเท่าค่าเริ่มต้น",
    vueltaAyuda: "ค่าสุดท้ายต้องเปลี่ยนไปกี่เปอร์เซ็นต์จึงจะกลับไปเท่าค่าเริ่มต้น",
    errorInicialCero: "ค่าเริ่มต้นต้องไม่เป็น 0 เพราะคิดเปอร์เซ็นต์การเปลี่ยนแปลงจากศูนย์ไม่ได้",
    subio: (p) => `เพิ่มขึ้น ${p}%`,
    bajo: (p) => `ลดลง ${p}%`,
    igual: "ไม่เปลี่ยนแปลง ค่าทั้งสองเท่ากัน",
  }),
};
