import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosTh: TextosUi<UiPromedio> = {
  slug: "weighted-average",
  ui: () => ({
    nota: (n) => `คะแนนที่ ${n}`,
    notaAyuda: "กรอกคะแนนหรือค่าแต่ละรายการพร้อมน้ำหนัก แถวที่ไม่ใช้เว้นว่างไว้",
    peso: (n) => `น้ำหนักที่ ${n}`,
    pesoAyuda: "เป็นเปอร์เซ็นต์ หน่วยกิต หรือจำนวนครั้งที่นับก็ได้ หากไม่ใส่น้ำหนัก ทุกค่าจะนับเท่ากัน",
    ponderado: "ค่าเฉลี่ยถ่วงน้ำหนัก",
    simple: "ค่าเฉลี่ยธรรมดา",
    cantidad: "จำนวนค่า",
    sumaPesos: "น้ำหนักรวม",
    errorSinNotas: "กรุณากรอกอย่างน้อยหนึ่งค่า",
    errorFaltaPeso: "ค่านี้ยังไม่มีน้ำหนัก หากใช้น้ำหนัก กรุณากรอกให้ครบทุกค่า",
    errorFaltaNota: "น้ำหนักนี้ยังไม่มีค่า กรุณากรอกค่า หรือลบน้ำหนักออก",
    errorPesosCero: "น้ำหนักรวมเป็น 0 ต้องมีอย่างน้อยหนึ่งค่าที่มากกว่าศูนย์",
    sinPesos: "เมื่อไม่ใส่น้ำหนัก ค่าเฉลี่ยถ่วงน้ำหนักจะเท่ากับค่าเฉลี่ยธรรมดา",
  }),
};
