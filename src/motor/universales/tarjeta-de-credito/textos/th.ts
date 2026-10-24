import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosTh: TextosUi<UiTarjetaDeCredito> = {
  slug: "credit-card-payoff",
  ui: () => ({
    saldo: "ยอดค้างชำระบัตรเครดิต",
    tasa: "อัตราดอกเบี้ยต่อปี (%)",
    tasaAyuda: "อัตราดอกเบี้ยสำหรับยอดใช้จ่าย ดูได้จากใบแจ้งยอดบัตร",
    modo: "วิธีชำระ",
    modoFijo: "ชำระจำนวนเท่ากันทุกเดือน",
    modoMinimo: "ชำระยอดขั้นต่ำ",
    pagoFijo: "จำนวนที่ชำระต่อเดือน",
    minimoPorcentaje: "ยอดขั้นต่ำ (% ของยอดค้าง)",
    minimoPorcentajeAyuda: "ยอดที่ผู้ออกบัตรกำหนดให้ชำระทุกเดือน หากไม่แน่ใจ 5% เป็นอัตราที่พบบ่อย",
    minimoPiso: "ยอดขั้นต่ำไม่น้อยกว่า",
    meses: "จำนวนเดือนที่ชำระหมด",
    intereses: "ดอกเบี้ยที่ต้องจ่าย",
    total: "ยอดที่จ่ายทั้งหมด",
    primerPago: "ยอดขั้นต่ำเดือนแรก",
    tabla: "แผนชำระรายเดือน",
    colMes: "เดือนที่",
    colPago: "ยอดชำระ",
    colInteres: "ดอกเบี้ย",
    colCapital: "เงินต้น",
    colSaldo: "ยอดคงเหลือ",
    errorSaldo: "กรุณากรอกยอดค้างชำระบัตรเครดิต",
    errorFaltaPago: "กรุณากรอกจำนวนที่จะชำระต่อเดือน",
    errorNoCubre: (interes) => `ด้วยยอดชำระนี้ หนี้จะไม่ลดลงเลย เพราะดอกเบี้ยเดือนแรกอย่างเดียวก็เท่ากับ ${interes} แล้ว กรุณาเพิ่มยอดชำระ`,
    errorMuyLargo: "ด้วยยอดชำระนี้ ต้องใช้เวลามากกว่า 50 ปีจึงจะชำระหมด กรุณาเพิ่มยอดชำระ",
    observacionAnios: (anios, meses) => `คิดเป็น ${anios} ปี${meses === "0" ? "" : ` ${meses} เดือน`}`,
    observacionFijo: (pago, meses, ahorro) =>
      `หากชำระ ${pago} ทุกเดือนเท่ากับยอดขั้นต่ำเดือนแรก จะชำระหมดใน ${meses} เดือน และประหยัดดอกเบี้ยได้ ${ahorro}`,
    observacionNoGastar: "การคำนวณนี้สมมติว่าไม่มีการใช้จ่ายใหม่ผ่านบัตรระหว่างที่ทยอยชำระ",
  }),
};
