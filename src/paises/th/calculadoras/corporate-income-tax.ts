import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.corporate-income-tax",
  mercado: "th",
  concepto: "propio",
  slug: "corporate-income-tax",
  estado: "publicado",
  requiere: {
    "th.cit-rate": "numero",
    "th.cit-sme-brackets": "escala",
    "th.sme-capital-cap": "numero",
    "th.sme-revenue-cap": "numero",
  },
  campos: [
    { id: "ganancia", tipo: "moneda", etiqueta: "กำไรสุทธิทางภาษีทั้งรอบบัญชี", porDefecto: 2000000 },
    { id: "capital", tipo: "moneda", etiqueta: "ทุนชำระแล้ว ณ วันสุดท้ายของรอบบัญชี", min: 0, porDefecto: 1000000 },
    { id: "ingresos", tipo: "moneda", etiqueta: "รายได้จากการขายสินค้าและให้บริการทั้งรอบบัญชี", min: 0, porDefecto: 10000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ganancia === 0) throw new ErrorEntrada("กรุณากรอกกำไรสุทธิ", "ganancia");
    const sme = e.capital <= v["th.sme-capital-cap"] && e.ingresos <= v["th.sme-revenue-cap"];
    if (e.ganancia < 0) {
      return { impuesto: 0, general: 0, ahorro: 0, efectiva: 0, sme: sme ? "ใช่" : "ไม่ใช่", observaciones: ["ขาดทุนสุทธิไม่ต้องเสียภาษี แต่ยังต้องยื่นแบบ ภ.ง.ด.50"] };
    }
    const general = redondear(porcentaje(e.ganancia, v["th.cit-rate"]));
    const impuesto = sme ? redondear(aplicarEscalaMarginal(v["th.cit-sme-brackets"], e.ganancia)) : general;
    const observaciones = sme
      ? ["ใช้อัตรา SME เพราะทุนชำระแล้วและรายได้ไม่เกินเกณฑ์ ทั้งนี้ต้องเป็นบริษัทหรือห้างหุ้นส่วนนิติบุคคลที่เข้าเงื่อนไขต่อเนื่องตามที่กรมสรรพากรกำหนด"]
      : ["ทุนชำระแล้วหรือรายได้เกินเกณฑ์ SME จึงเสียอัตราทั่วไปทั้งจำนวน"];
    return {
      impuesto,
      general,
      ahorro: redondear(general - impuesto),
      efectiva: (impuesto / e.ganancia) * 100,
      sme: sme ? "ใช่" : "ไม่ใช่",
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ภาษีเงินได้นิติบุคคล", formato: "moneda", destacada: true },
    { clave: "sme", etiqueta: "ใช้อัตรา SME", formato: "texto" },
    { clave: "general", etiqueta: "ภาษีถ้าใช้อัตราทั่วไป", formato: "moneda" },
    { clave: "ahorro", etiqueta: "ประหยัดจากอัตรา SME", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "อัตราภาษีเฉลี่ย", formato: "porcentaje", decimales: 2 },
  ],
});
