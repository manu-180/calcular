import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQ_RENTA, rentaSueldo } from "../lib/renta";

export default definirCalculadora({
  id: "th.bonus-tax",
  mercado: "th",
  concepto: "propio",
  slug: "bonus-tax",
  estado: "publicado",
  requiere: REQ_RENTA,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "เงินเดือนก่อนหักต่อเดือน", min: 0, porDefecto: 40000 },
    { id: "bono", tipo: "moneda", etiqueta: "โบนัสที่ได้รับ", min: 0, porDefecto: 80000 },
    { id: "sso", tipo: "moneda", etiqueta: "เงินสมทบประกันสังคมทั้งปี", min: 0, porDefecto: 9000 },
    { id: "otras", tipo: "moneda", etiqueta: "ค่าลดหย่อนอื่นทั้งปี (นอกจากส่วนตัวและประกันสังคม)", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bono <= 0) throw new ErrorEntrada("กรุณากรอกโบนัส", "bono");
    if (e.sueldo < 0) throw new ErrorEntrada("กรุณากรอกเงินเดือน", "sueldo");
    const familia = { conyuge: false, hijos: 0, hijosDesde2561: 0, padres: 0, otras: e.otras };
    const sin = rentaSueldo(e.sueldo * 12, e.sso, familia, v);
    const con = rentaSueldo(e.sueldo * 12 + e.bono, e.sso, familia, v);
    const impuestoBono = redondear(con.impuesto - sin.impuesto);
    return {
      impuestoBono,
      netoBono: redondear(e.bono - impuestoBono),
      tasaBono: (impuestoBono / e.bono) * 100,
      impuestoSin: redondear(sin.impuesto),
      impuestoCon: redondear(con.impuesto),
      marginal: con.marginal,
    };
  },
  resultado: [
    { clave: "impuestoBono", etiqueta: "ภาษีที่เพิ่มขึ้นเพราะโบนัส", formato: "moneda", destacada: true },
    { clave: "netoBono", etiqueta: "โบนัสหลังหักภาษี", formato: "moneda" },
    { clave: "tasaBono", etiqueta: "ภาษีคิดเป็นร้อยละของโบนัส", formato: "porcentaje", decimales: 2 },
    { clave: "impuestoSin", etiqueta: "ภาษีทั้งปีถ้าไม่มีโบนัส", formato: "moneda" },
    { clave: "impuestoCon", etiqueta: "ภาษีทั้งปีเมื่อรวมโบนัส", formato: "moneda" },
    { clave: "marginal", etiqueta: "อัตราภาษีขั้นสูงสุดเมื่อรวมโบนัส", formato: "porcentaje", decimales: 0 },
  ],
});
