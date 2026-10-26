import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.annual-leave",
  mercado: "th",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: { "th.annual-leave-min-days": "numero", "th.hourly-divisor-days": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "เงินเดือน", min: 0, porDefecto: 25000 },
    { id: "diasAnuales", tipo: "numero", etiqueta: "วันหยุดพักผ่อนประจำปีที่ได้ต่อปี", min: 0, max: 30, porDefecto: 6, ayuda: "ตามกฎหมายอย่างน้อย 6 วันทำงานเมื่อทำงานครบ 1 ปี บริษัทอาจให้มากกว่านี้" },
    { id: "meses", tipo: "entero", etiqueta: "เดือนที่ทำงานในปีที่ออกจากงาน", min: 0, max: 12, porDefecto: 6 },
    { id: "usados", tipo: "numero", etiqueta: "วันหยุดพักผ่อนที่ใช้ไปแล้วในปีนี้", min: 0, max: 30, porDefecto: 0 },
    { id: "acumulados", tipo: "numero", etiqueta: "วันหยุดพักผ่อนสะสมจากปีก่อนที่ยังไม่ได้ใช้", min: 0, max: 120, porDefecto: 0 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "เหตุที่ออกจากงาน",
      opciones: [
        { valor: "despido", etiqueta: "นายจ้างเลิกจ้าง (ไม่ใช่กรณีทำผิดตามมาตรา 119)" },
        { valor: "renuncia", etiqueta: "ลาออกเอง หรือถูกเลิกจ้างตามมาตรา 119" },
      ],
      porDefecto: "despido",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("กรุณากรอกเงินเดือน", "salario");
    const observaciones: string[] = [];
    if (e.diasAnuales < v["th.annual-leave-min-days"]) observaciones.push("กฎหมายกำหนดวันหยุดพักผ่อนประจำปีอย่างน้อย 6 วันทำงานสำหรับลูกจ้างที่ทำงานครบ 1 ปี");
    // Artículo 67: el despido sin falta grave paga la parte proporcional del año; los días acumulados se
    // pagan siempre, también si la persona renuncia.
    const proporcional = e.motivo === "despido" ? Math.max(0, redondear((e.diasAnuales * e.meses) / 12) - e.usados) : 0;
    const dias = proporcional + e.acumulados;
    const diario = e.salario / v["th.hourly-divisor-days"];
    return { pago: redondear(diario * dias), dias, proporcional, diario: redondear(diario), observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "ค่าจ้างสำหรับวันหยุดพักผ่อนที่ยังไม่ได้ใช้", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "จำนวนวันที่ได้รับเงิน", formato: "dias", decimales: 2 },
    { clave: "proporcional", etiqueta: "วันหยุดตามส่วนของปีที่ออก", formato: "dias", decimales: 2 },
    { clave: "diario", etiqueta: "ค่าจ้างต่อวัน", formato: "moneda" },
  ],
});
