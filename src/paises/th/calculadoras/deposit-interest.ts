import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.deposit-interest",
  mercado: "th",
  concepto: "plazo-fijo",
  slug: "deposit-interest",
  estado: "publicado",
  requiere: { "th.interest-wht": "numero", "th.savings-interest-exempt": "numero" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "เงินฝาก", min: 0, porDefecto: 100000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "อัตราดอกเบี้ยต่อปี", min: 0, max: 20, porDefecto: 1.5 },
    { id: "meses", tipo: "entero", etiqueta: "ระยะเวลาฝาก (เดือน)", min: 1, max: 120, porDefecto: 12 },
    {
      id: "cuenta",
      tipo: "opcion",
      etiqueta: "ประเภทบัญชี",
      opciones: [
        { valor: "fija", etiqueta: "เงินฝากประจำ" },
        { valor: "ahorro", etiqueta: "เงินฝากออมทรัพย์" },
      ],
      porDefecto: "fija",
    },
    {
      id: "otros",
      tipo: "moneda",
      etiqueta: "ดอกเบี้ยออมทรัพย์จากบัญชีอื่นในปีเดียวกัน",
      min: 0,
      porDefecto: 0,
      visibleSi: { cuenta: ["ahorro"] },
      ayuda: "ดอกเบี้ยออมทรัพย์รวมทุกธนาคารที่ไม่เกินเกณฑ์ได้รับยกเว้นภาษี",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("กรุณากรอกจำนวนเงินฝาก", "monto");
    const interes = redondear((e.monto * e.tasa * e.meses) / 100 / 12);
    const exento = e.cuenta === "ahorro" && interes * (12 / Math.max(e.meses, 12)) + (e.otros ?? 0) <= v["th.savings-interest-exempt"];
    const impuesto = exento ? 0 : redondear(porcentaje(interes, v["th.interest-wht"]));
    const observaciones = exento
      ? ["ดอกเบี้ยออมทรัพย์ทั้งปีไม่เกินเกณฑ์ จึงได้รับยกเว้นภาษี"]
      : ["ธนาคารหักภาษี ณ ที่จ่ายจากดอกเบี้ยก่อนโอนเข้าบัญชี"];
    return { interes, impuesto, neto: redondear(interes - impuesto), total: redondear(e.monto + interes - impuesto), observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "ดอกเบี้ยหลังหักภาษี", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "ดอกเบี้ยก่อนหักภาษี", formato: "moneda" },
    { clave: "impuesto", etiqueta: "ภาษีหัก ณ ที่จ่าย", formato: "moneda" },
    { clave: "total", etiqueta: "เงินต้นรวมดอกเบี้ยสุทธิเมื่อครบกำหนด", formato: "moneda" },
  ],
});
