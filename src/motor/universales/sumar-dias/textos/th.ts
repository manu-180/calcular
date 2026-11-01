import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosTh: TextosUi<UiSumarDias> = {
  slug: "add-days-to-date",
  ui: () => ({
    fecha: "วันที่เริ่มต้น",
    operacion: "ต้องการทำอะไร",
    sumar: "บวกวัน",
    restar: "ลบวัน",
    dias: "จำนวนวัน",
    tipo: "ประเภทของวัน",
    corridos: "วันตามปฏิทิน",
    habiles: "วันทำการ (จันทร์ถึงศุกร์)",
    resultado: "วันที่ที่ได้",
    diaSemana: "ตรงกับวัน",
    diasCorridos: "รวมเป็นวันตามปฏิทิน",
    nombresDias: ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"],
    errorDias: "จำนวนวันต้องเป็นจำนวนเต็ม และไม่เกิน 100 ปี",
    notaHabiles: "วันทำการข้ามวันเสาร์และวันอาทิตย์ แต่ไม่ได้ข้ามวันหยุดนักขัตฤกษ์ หากมีวันหยุดอยู่ในช่วงนั้น ให้บวกเพิ่มเอง",
  }),
};
