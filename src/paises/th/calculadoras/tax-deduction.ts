import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { REQ_RENTA, rentaSueldo } from "../lib/renta";

export default definirCalculadora({
  id: "th.tax-deduction",
  mercado: "th",
  concepto: "propio",
  slug: "tax-deduction",
  estado: "publicado",
  requiere: {
    ...REQ_RENTA,
    "th.life-insurance-cap": "numero",
    "th.health-insurance-cap": "numero",
    "th.pension-insurance-rate": "numero",
    "th.pension-insurance-cap": "numero",
    "th.rmf-rate": "numero",
    "th.retirement-group-cap": "numero",
    "th.home-loan-interest-cap": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "เงินเดือนและโบนัสทั้งปี", min: 0, porDefecto: 1200000 },
    { id: "sso", tipo: "moneda", etiqueta: "เงินสมทบประกันสังคมทั้งปี", min: 0, porDefecto: 9000 },
    { id: "base", tipo: "moneda", etiqueta: "ค่าลดหย่อนอื่นที่มีอยู่แล้ว (นอกจากส่วนตัวและประกันสังคม)", min: 0, porDefecto: 0 },
    { id: "vida", tipo: "moneda", etiqueta: "เบี้ยประกันชีวิต", min: 0, porDefecto: 0 },
    { id: "salud", tipo: "moneda", etiqueta: "เบี้ยประกันสุขภาพของตัวเอง", min: 0, porDefecto: 0 },
    { id: "pension", tipo: "moneda", etiqueta: "เบี้ยประกันชีวิตแบบบำนาญ", min: 0, porDefecto: 0 },
    { id: "rmf", tipo: "moneda", etiqueta: "ซื้อกองทุน RMF", min: 0, porDefecto: 100000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "ดอกเบี้ยเงินกู้ซื้อที่อยู่อาศัย", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("กรุณากรอกเงินได้ทั้งปี", "ingreso");
    const salud = Math.min(e.salud, v["th.health-insurance-cap"]);
    const vidaYSalud = Math.min(Math.min(e.vida, v["th.life-insurance-cap"]) + salud, v["th.life-insurance-cap"]);
    const pension = Math.min(e.pension, porcentaje(e.ingreso, v["th.pension-insurance-rate"]), v["th.pension-insurance-cap"]);
    const rmf = Math.min(e.rmf, porcentaje(e.ingreso, v["th.rmf-rate"]));
    // RMF y seguro de pensión comparten el tope del grupo de ahorro para el retiro: se recorta el RMF primero.
    const exceso = Math.max(0, pension + rmf - v["th.retirement-group-cap"]);
    const rmfFinal = Math.max(0, rmf - exceso);
    const vivienda = Math.min(e.vivienda, v["th.home-loan-interest-cap"]);
    const nuevas = vidaYSalud + pension + rmfFinal + vivienda;
    const familia = { conyuge: false, hijos: 0, hijosDesde2561: 0, padres: 0 };
    const antes = rentaSueldo(e.ingreso, e.sso, { ...familia, otras: e.base }, v);
    const despues = rentaSueldo(e.ingreso, e.sso, { ...familia, otras: e.base + nuevas }, v);
    const impuestoAntes = redondear(antes.impuesto);
    const impuestoDespues = redondear(despues.impuesto);
    const invertido = e.vida + e.salud + e.pension + e.rmf + e.vivienda;
    const observaciones: string[] = [];
    if (invertido > nuevas) observaciones.push("บางรายการเกินเพดาน ส่วนที่เกินไม่ได้ลดหย่อนภาษี");
    observaciones.push("กองทุนสำรองเลี้ยงชีพและกองทุนบำเหน็จบำนาญข้าราชการอยู่ในเพดานรวม 500,000 บาทเดียวกับ RMF และประกันบำนาญ ถ้ามีให้ลดยอด RMF ลงตามนั้น");
    return {
      ahorro: redondear(impuestoAntes - impuestoDespues),
      impuestoAntes,
      impuestoDespues,
      deducible: nuevas,
      vidaYSalud,
      pension,
      rmf: rmfFinal,
      vivienda,
      marginal: antes.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "ahorro", etiqueta: "ภาษีที่ประหยัดได้", formato: "moneda", destacada: true },
    { clave: "impuestoAntes", etiqueta: "ภาษีก่อนใช้สิทธิลดหย่อนเพิ่ม", formato: "moneda" },
    { clave: "impuestoDespues", etiqueta: "ภาษีหลังใช้สิทธิลดหย่อนเพิ่ม", formato: "moneda" },
    { clave: "deducible", etiqueta: "ค่าลดหย่อนเพิ่มที่ใช้ได้จริง", formato: "moneda" },
    { clave: "vidaYSalud", etiqueta: "ประกันชีวิตและสุขภาพที่ลดหย่อนได้", formato: "moneda", ocultarSiCero: true },
    { clave: "pension", etiqueta: "ประกันบำนาญที่ลดหย่อนได้", formato: "moneda", ocultarSiCero: true },
    { clave: "rmf", etiqueta: "RMF ที่ลดหย่อนได้", formato: "moneda", ocultarSiCero: true },
    { clave: "vivienda", etiqueta: "ดอกเบี้ยบ้านที่ลดหย่อนได้", formato: "moneda", ocultarSiCero: true },
    { clave: "marginal", etiqueta: "อัตราภาษีขั้นสูงสุดก่อนลดหย่อนเพิ่ม", formato: "porcentaje", decimales: 0 },
  ],
});
