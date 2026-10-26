import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosTh: TextosUi<UiIva> = {
  slug: "vat",
  ui: () => ({
    operacion: "ต้องการคำนวณแบบไหน",
    agregar: "บวก VAT เข้าไปในราคาก่อน VAT",
    quitar: "ถอด VAT ออกจากราคารวม VAT",
    monto: "ราคา",
    montoAyuda: "ราคาก่อน VAT หากต้องการบวกภาษี หรือราคารวม VAT หากต้องการถอดภาษีออก",
    otraTasa: "อัตราภาษีอื่น (%)",
    otraTasaAyuda: "ไม่บังคับ หากสินค้ามีอัตราลดหรืออัตราพิเศษ ให้กรอกที่นี่ หากเว้นว่างจะใช้อัตราทั่วไป",
    neto: "ราคาก่อน VAT",
    impuesto: "ภาษีมูลค่าเพิ่ม (VAT)",
    total: "ราคารวม VAT",
    tasaUsada: "อัตราที่ใช้",
    errorTasa: "อัตราภาษีไม่ถูกต้อง",
  }),
};
