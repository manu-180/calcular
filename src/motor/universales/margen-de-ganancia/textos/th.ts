import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosTh: TextosUi<UiMargenDeGanancia> = {
  slug: "profit-margin",
  ui: () => ({
    modo: "ต้องการคำนวณอะไร",
    modoPrecio: "อัตรากำไร จากต้นทุนและราคาขาย",
    modoMargen: "ราคาขาย ตามอัตรากำไรที่ต้องการ",
    modoMarkup: "ราคาขาย ตามส่วนเพิ่มจากต้นทุนที่ต้องการ",
    costo: "ต้นทุนต่อหน่วย",
    costoAyuda: "ค่าซื้อหรือค่าผลิตสินค้าหนึ่งหน่วย ไม่รวมภาษีที่เรียกเก็บจากลูกค้า",
    precio: "ราคาขาย",
    precioAyuda: "กรอกเมื่อต้องการคำนวณอัตรากำไรเท่านั้น ไม่รวมภาษีมูลค่าเพิ่ม",
    objetivo: "อัตรากำไรหรือส่วนเพิ่มที่ต้องการ (%)",
    objetivoAyuda: "กรอกเมื่อต้องการคำนวณราคาขายเท่านั้น",
    precioResultado: "ราคาขาย",
    margen: "อัตรากำไร",
    margenAyuda: "กำไรคิดเป็นเปอร์เซ็นต์ของราคาขาย",
    markup: "ส่วนเพิ่มจากต้นทุน (markup)",
    markupAyuda: "กำไรคิดเป็นเปอร์เซ็นต์ของต้นทุน",
    ganancia: "กำไรต่อหน่วย",
    errorCosto: "กรุณากรอกต้นทุนของสินค้าหนึ่งหน่วย",
    errorFaltaPrecio: "กรุณากรอกราคาขายเพื่อคำนวณอัตรากำไร",
    errorFaltaObjetivo: "กรุณากรอกอัตรากำไรหรือส่วนเพิ่มที่ต้องการ",
    errorMargen100: "อัตรากำไรต้องต่ำกว่า 100% เพราะ 100% หมายถึงราคาทั้งหมดเป็นกำไรโดยไม่มีต้นทุน",
    observacionPerdida: "ราคานี้ต่ำกว่าต้นทุน ขายได้ทุกชิ้นจะขาดทุน",
  }),
};
