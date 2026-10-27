import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQ_RENTA, rentaSueldo } from "../lib/renta";

export default definirCalculadora({
  id: "th.income-tax",
  mercado: "th",
  concepto: "impuesto-renta",
  slug: "income-tax",
  estado: "publicado",
  requiere: REQ_RENTA,
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "เงินเดือนและโบนัสทั้งปี (ก่อนหัก)", min: 0, porDefecto: 600000 },
    { id: "sso", tipo: "moneda", etiqueta: "เงินสมทบประกันสังคมที่จ่ายทั้งปี", min: 0, porDefecto: 9000 },
    { id: "conyuge", tipo: "si-no", etiqueta: "มีคู่สมรสที่ไม่มีเงินได้", porDefecto: false },
    { id: "hijos", tipo: "entero", etiqueta: "จำนวนบุตรที่ใช้สิทธิลดหย่อน", min: 0, max: 15, porDefecto: 0 },
    {
      id: "hijos2561",
      tipo: "entero",
      etiqueta: "ในจำนวนนี้ เป็นบุตรคนที่ 2 ขึ้นไปที่เกิดตั้งแต่ พ.ศ. 2561",
      min: 0,
      max: 14,
      porDefecto: 0,
    },
    { id: "padres", tipo: "entero", etiqueta: "บิดามารดาอายุ 60 ปีขึ้นไปที่อุปการะเลี้ยงดู", min: 0, max: 4, porDefecto: 0 },
    {
      id: "otras",
      tipo: "moneda",
      etiqueta: "ค่าลดหย่อนอื่นทั้งปี",
      min: 0,
      porDefecto: 0,
      ayuda: "เช่น เบี้ยประกันชีวิต ประกันสุขภาพ กองทุนสำรองเลี้ยงชีพ SSF RMF ดอกเบี้ยเงินกู้ซื้อบ้าน ใส่ยอดหลังเพดานของแต่ละรายการ",
    },
    { id: "retenido", tipo: "moneda", etiqueta: "ภาษีที่ถูกหัก ณ ที่จ่ายแล้วทั้งปี", min: 0, porDefecto: 0, ayuda: "ดูได้จากหนังสือรับรองการหักภาษี ณ ที่จ่าย (50 ทวิ)" },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("กรุณากรอกเงินได้ทั้งปี", "ingreso");
    if (e.hijos2561 > Math.max(0, e.hijos - 1)) throw new ErrorEntrada("บุตรคนที่ 2 ขึ้นไปต้องน้อยกว่าจำนวนบุตรทั้งหมดอย่างน้อย 1 คน", "hijos2561");
    const r = rentaSueldo(e.ingreso, e.sso, { conyuge: e.conyuge, hijos: e.hijos, hijosDesde2561: e.hijos2561, padres: e.padres, otras: e.otras }, v);
    const impuesto = redondear(r.impuesto);
    const saldo = redondear(impuesto - e.retenido);
    return {
      impuesto,
      efectiva: e.ingreso > 0 ? (impuesto / e.ingreso) * 100 : 0,
      marginal: r.marginal,
      gastos: r.gastos,
      deducciones: r.deducciones,
      neta: r.neta,
      pagar: saldo > 0 ? saldo : 0,
      devolver: saldo < 0 ? -saldo : 0,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ภาษีเงินได้ทั้งปี", formato: "moneda", destacada: true },
    { clave: "pagar", etiqueta: "ต้องชำระเพิ่ม", formato: "moneda", ocultarSiCero: true },
    { clave: "devolver", etiqueta: "ขอคืนภาษีได้", formato: "moneda", ocultarSiCero: true },
    { clave: "neta", etiqueta: "เงินได้สุทธิ", formato: "moneda" },
    { clave: "gastos", etiqueta: "หักค่าใช้จ่าย", formato: "moneda" },
    { clave: "deducciones", etiqueta: "ค่าลดหย่อนรวม", formato: "moneda" },
    { clave: "marginal", etiqueta: "อัตราภาษีขั้นสูงสุดที่ใช้", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "อัตราภาษีเฉลี่ยเทียบเงินได้", formato: "porcentaje", decimales: 2 },
  ],
});
