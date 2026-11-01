import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosTh: TextosUi<UiHipoteca> = {
  slug: "mortgage",
  ui: () => ({
    precio: "ราคาบ้าน",
    entradaPorcentaje: "เงินดาวน์ (% ของราคา)",
    entradaMonto: "จำนวนเงินดาวน์ (ไม่บังคับ)",
    entradaMontoAyuda: "หากกรอกช่องนี้ ระบบจะใช้จำนวนนี้แทนเปอร์เซ็นต์",
    tasa: "อัตราดอกเบี้ยต่อปี (%)",
    anios: "ระยะเวลาผ่อน (ปี)",
    gastos: "ค่าใช้จ่ายเกี่ยวกับบ้านต่อเดือน (ไม่บังคับ)",
    gastosAyuda: "ภาษีที่ดินและสิ่งปลูกสร้าง ประกันอัคคีภัย หรือค่าส่วนกลางที่จ่ายพร้อมค่างวด",
    cuota: "ค่างวดบ้านต่อเดือน",
    cuotaTotal: "ค่างวดรวมค่าใช้จ่ายต่อเดือน",
    entrada: "เงินดาวน์",
    prestado: "วงเงินกู้",
    intereses: "ดอกเบี้ยรวม",
    total: "ค่างวดรวมทั้งสัญญา",
    tabla: "รายปี",
    colAnio: "ปีที่",
    colIntereses: "ดอกเบี้ยที่จ่าย",
    colCapital: "เงินต้นที่จ่าย",
    colSaldo: "ยอดคงเหลือสิ้นปี",
    errorPrecio: "กรุณากรอกราคาบ้าน",
    errorEntrada: "เงินดาวน์ครอบคลุมราคาบ้านทั้งหมด จึงไม่มีสินเชื่อให้คำนวณ กรุณาลดเงินดาวน์ลง",
    observacionPrestado: (porcentaje) => `วงเงินกู้เท่ากับ ${porcentaje}% ของมูลค่าบ้าน ยิ่งสัดส่วนนี้สูง ผู้ให้กู้มักพิจารณาเงื่อนไขเข้มงวดขึ้น`,
    observacionCostos: "ยังไม่รวมค่าใช้จ่ายในการโอนกรรมสิทธิ์ ภาษี และค่าประเมินราคา ควรเตรียมเงินส่วนนี้ไว้นอกเหนือจากเงินดาวน์",
  }),
};
