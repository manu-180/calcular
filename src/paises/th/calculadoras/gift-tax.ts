import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.gift-tax",
  mercado: "th",
  concepto: "propio",
  slug: "gift-tax",
  estado: "publicado",
  requiere: { "th.gift-exempt-family": "numero", "th.gift-exempt-other": "numero", "th.gift-tax-rate": "numero" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "มูลค่าเงินหรือทรัพย์สินที่ได้รับให้ทั้งปี", min: 0, porDefecto: 25000000 },
    {
      id: "relacion",
      tipo: "opcion",
      etiqueta: "ผู้ให้เป็น",
      opciones: [
        { valor: "familia", etiqueta: "บุพการี ผู้สืบสันดาน หรือคู่สมรส" },
        { valor: "otro", etiqueta: "บุคคลอื่น ให้ในพิธีหรือตามขนบธรรมเนียม" },
      ],
      porDefecto: "familia",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("กรุณากรอกมูลค่าที่ได้รับ", "monto");
    const exento = e.relacion === "familia" ? v["th.gift-exempt-family"] : v["th.gift-exempt-other"];
    const excedente = Math.max(0, e.monto - exento);
    const impuesto = redondear(porcentaje(excedente, v["th.gift-tax-rate"]));
    return { impuesto, excedente, exento: Math.min(e.monto, exento), neto: redondear(e.monto - impuesto) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ภาษีถ้าเลือกเสียแยก", formato: "moneda", destacada: true },
    { clave: "excedente", etiqueta: "ส่วนที่เกินเกณฑ์ยกเว้น", formato: "moneda" },
    { clave: "exento", etiqueta: "ส่วนที่ได้รับยกเว้น", formato: "moneda" },
    { clave: "neto", etiqueta: "มูลค่าที่ได้รับหลังหักภาษี", formato: "moneda" },
  ],
});
