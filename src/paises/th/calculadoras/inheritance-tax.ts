import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.inheritance-tax",
  mercado: "th",
  concepto: "propio",
  slug: "inheritance-tax",
  estado: "publicado",
  requiere: { "th.inheritance-exempt": "numero", "th.inheritance-rate": "numero", "th.inheritance-rate-family": "numero" },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "มูลค่ามรดกที่ได้รับจากเจ้ามรดกรายนี้ (หลังหักหนี้สิน)", min: 0, porDefecto: 150000000 },
    {
      id: "relacion",
      tipo: "opcion",
      etiqueta: "ความสัมพันธ์กับเจ้ามรดก",
      opciones: [
        { valor: "familia", etiqueta: "บุพการีหรือผู้สืบสันดาน (พ่อแม่ ลูก หลาน)" },
        { valor: "otro", etiqueta: "บุคคลอื่น" },
      ],
      porDefecto: "familia",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("กรุณากรอกมูลค่ามรดก", "valor");
    const base = Math.max(0, e.valor - v["th.inheritance-exempt"]);
    const tasa = e.relacion === "familia" ? v["th.inheritance-rate-family"] : v["th.inheritance-rate"];
    const impuesto = redondear(porcentaje(base, tasa));
    return { impuesto, base, tasa, neto: redondear(e.valor - impuesto) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ภาษีการรับมรดก", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "มูลค่าส่วนที่ต้องเสียภาษี", formato: "moneda" },
    { clave: "tasa", etiqueta: "อัตราภาษี", formato: "porcentaje", decimales: 0 },
    { clave: "neto", etiqueta: "มรดกหลังหักภาษี", formato: "moneda" },
  ],
});
