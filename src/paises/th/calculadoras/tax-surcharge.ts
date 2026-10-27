import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { mesesOFraccion } from "../lib/fechas";

export default definirCalculadora({
  id: "th.tax-surcharge",
  mercado: "th",
  concepto: "propio",
  slug: "tax-surcharge",
  estado: "publicado",
  requiere: { "th.surcharge-rate": "numero", "th.surcharge-rate-extended": "numero" },
  campos: [
    { id: "impuesto", tipo: "moneda", etiqueta: "ภาษีที่ต้องชำระ (ไม่รวมเบี้ยปรับ)", min: 0, porDefecto: 20000 },
    { id: "vencimiento", tipo: "fecha", etiqueta: "วันสุดท้ายของกำหนดยื่นหรือชำระ" },
    { id: "pago", tipo: "fecha", etiqueta: "วันที่ชำระจริง", porDefecto: "hoy" },
    { id: "prorroga", tipo: "si-no", etiqueta: "อธิบดีอนุมัติให้ขยายเวลา และชำระภายในเวลาที่ขยาย", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.impuesto <= 0) throw new ErrorEntrada("กรุณากรอกภาษีที่ต้องชำระ", "impuesto");
    const meses = mesesOFraccion(e.vencimiento, e.pago);
    const tasa = e.prorroga ? v["th.surcharge-rate-extended"] : v["th.surcharge-rate"];
    const calculado = redondear(porcentaje(e.impuesto, tasa) * meses);
    const recargo = Math.min(calculado, e.impuesto);
    const observaciones = calculado > e.impuesto ? ["เงินเพิ่มที่คำนวณได้เกินจำนวนภาษี จึงเท่ากับจำนวนภาษี"] : [];
    return { recargo, total: redondear(e.impuesto + recargo), meses, tasa, observaciones };
  },
  resultado: [
    { clave: "recargo", etiqueta: "เงินเพิ่ม", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "ภาษีรวมเงินเพิ่ม", formato: "moneda" },
    { clave: "meses", etiqueta: "จำนวนเดือนที่คิดเงินเพิ่ม (เศษของเดือนนับเป็น 1 เดือน)", formato: "meses" },
    { clave: "tasa", etiqueta: "อัตราเงินเพิ่มต่อเดือน", formato: "porcentaje", decimales: 2 },
  ],
});
