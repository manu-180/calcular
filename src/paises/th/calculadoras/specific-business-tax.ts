import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.specific-business-tax",
  mercado: "th",
  concepto: "propio",
  slug: "specific-business-tax",
  estado: "publicado",
  requiere: { "th.sbt-rate": "numero", "th.sbt-local-rate": "numero", "th.property-stamp-unit": "numero" },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "ราคาซื้อขายตามที่แจ้งต่อสำนักงานที่ดิน", min: 0, porDefecto: 3000000 },
    { id: "tasacion", tipo: "moneda", etiqueta: "ราคาประเมินทุนทรัพย์ของกรมที่ดิน", min: 0, porDefecto: 2500000 },
    { id: "cincoAnios", tipo: "si-no", etiqueta: "ขายภายใน 5 ปีนับแต่วันที่ได้มา (นับวันชนวัน)", porDefecto: true },
    { id: "padron", tipo: "si-no", etiqueta: "ผู้ขายมีชื่อในทะเบียนบ้านหลังนี้รวมกันไม่น้อยกว่า 1 ปี", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.precio <= 0 && e.tasacion <= 0) throw new ErrorEntrada("กรุณากรอกราคาซื้อขายหรือราคาประเมิน", "precio");
    const base = Math.max(e.precio, e.tasacion);
    const pagaSbt = e.cincoAnios && !e.padron;
    const sbt = pagaSbt ? redondear(porcentaje(base, v["th.sbt-rate"])) : 0;
    const local = pagaSbt ? redondear(porcentaje(sbt, v["th.sbt-local-rate"])) : 0;
    // Quien paga el impuesto específico no paga el timbre; si no, 1 baht por cada 200 o fracción.
    const sello = pagaSbt ? 0 : Math.ceil(base / v["th.property-stamp-unit"]);
    return {
      total: redondear(sbt + local + sello),
      sbt,
      local,
      sello,
      base,
      tipo: pagaSbt ? "ภาษีธุรกิจเฉพาะ" : "อากรแสตมป์",
      observaciones: ["ยังไม่รวมภาษีเงินได้หัก ณ ที่จ่ายของผู้ขาย และค่าธรรมเนียมโอนของกรมที่ดิน"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "ภาษีธุรกิจเฉพาะหรืออากรแสตมป์ที่ต้องจ่าย", formato: "moneda", destacada: true },
    { clave: "tipo", etiqueta: "ประเภทภาษีที่ต้องเสีย", formato: "texto" },
    { clave: "sbt", etiqueta: "ภาษีธุรกิจเฉพาะ", formato: "moneda", ocultarSiCero: true },
    { clave: "local", etiqueta: "ภาษีท้องถิ่น", formato: "moneda", ocultarSiCero: true },
    { clave: "sello", etiqueta: "อากรแสตมป์", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "ฐานที่ใช้คำนวณ (ราคาที่สูงกว่า)", formato: "moneda" },
  ],
});
