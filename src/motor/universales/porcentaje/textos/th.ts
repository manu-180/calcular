import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosTh: TextosUi<UiPorcentaje> = {
  slug: "percentage",
  ui: () => ({
    modo: "ต้องการคำนวณอะไร",
    modoParte: "X% ของ Y เท่ากับเท่าไร",
    modoProporcion: "X คิดเป็นกี่เปอร์เซ็นต์ของ Y",
    modoAumento: "Y บวกเพิ่ม X%",
    modoRebaja: "Y ลดลง X%",
    x: "ตัวเลข X",
    xAyuda: "ค่าเปอร์เซ็นต์ หากเลือก “X คิดเป็นกี่เปอร์เซ็นต์ของ Y” ให้กรอกส่วนที่ต้องการเทียบ",
    y: "ตัวเลข Y",
    resultado: "ผลลัพธ์",
    porcentaje: "เปอร์เซ็นต์",
    diferencia: "จำนวนที่เพิ่มหรือลด",
    errorYCero: "Y ต้องไม่เป็น 0 เพราะคิดเปอร์เซ็นต์จากศูนย์ไม่ได้",
    fraseParte: (x, y, r) => `${x}% ของ ${y} เท่ากับ ${r}`,
    fraseProporcion: (x, y, p) => `${x} คิดเป็น ${p}% ของ ${y}`,
    fraseAumento: (x, y, r, d) => `${y} บวกเพิ่ม ${x}% ได้ ${r} (เพิ่มขึ้น ${d})`,
    fraseRebaja: (x, y, r, d) => `${y} ลดลง ${x}% เหลือ ${r} (ลดลง ${d})`,
  }),
};
