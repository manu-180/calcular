import { definirCasos } from "@/motor/calculo";
import calculadora from "./tax-surcharge";

export default definirCasos(calculadora, [
  {
    nombre: "ชำระช้า 1 วัน คิด 1 เดือน",
    origen: { tipo: "recalculado", detalle: "มาตรา 27: เศษของเดือนนับเป็นเดือน 20,000×1.5% = 300" },
    fecha: "2026-10-26",
    entrada: { impuesto: 20000, vencimiento: "2026-03-31", pago: "2026-04-01", prorroga: false },
    esperado: { meses: 1, recargo: 300, total: 20300 },
  },
  {
    nombre: "ชำระช้า 1 เดือน 1 วัน คิด 2 เดือน",
    origen: { tipo: "recalculado", detalle: "31 มี.ค. ถึง 1 พ.ค. เกิน 1 เดือน นับ 2 เดือน 20,000×1.5%×2 = 600" },
    fecha: "2026-10-26",
    entrada: { impuesto: 20000, vencimiento: "2026-03-31", pago: "2026-05-01", prorroga: false },
    esperado: { meses: 2, recargo: 600 },
  },
  {
    nombre: "ได้รับขยายเวลา",
    origen: { tipo: "recalculado", detalle: "มาตรา 27 วรรคสอง 0.75% ต่อเดือน 3 เดือน 10,000×0.75%×3 = 225" },
    fecha: "2026-10-26",
    entrada: { impuesto: 10000, vencimiento: "2026-03-31", pago: "2026-06-15", prorroga: true },
    esperado: { meses: 3, recargo: 225 },
  },
  {
    nombre: "เงินเพิ่มไม่เกินภาษี",
    origen: { tipo: "recalculado", detalle: "ช้า 80 เดือน 1.5%×80 = 120% เกินภาษี จึงเท่ากับ 5,000" },
    fecha: "2026-10-26",
    entrada: { impuesto: 5000, vencimiento: "2020-03-31", pago: "2026-10-26", prorroga: false },
    esperado: { recargo: 5000, total: 10000 },
  },
]);
