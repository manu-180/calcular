import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.stamp-duty",
  mercado: "th",
  concepto: "propio",
  slug: "stamp-duty",
  estado: "publicado",
  requiere: { "th.stamp-duty-units": "mapa", "th.stamp-duty-loan-cap": "numero", "th.lease-default-years": "numero" },
  campos: [
    { id: "tipo", tipo: "opcion-dato", etiqueta: "ประเภทสัญญา", dato: "th.stamp-duty-units", porDefecto: "lease" },
    {
      id: "monto",
      tipo: "moneda",
      etiqueta: "จำนวนเงินตามสัญญา",
      min: 0,
      porDefecto: 120000,
      ayuda: "สัญญาเช่าใช้ค่าเช่ารวมตลอดอายุสัญญา สัญญากู้ใช้ยอดเงินกู้ สัญญาจ้างทำของใช้สินจ้าง สัญญาเช่าซื้อใช้ราคาทั้งหมด",
    },
  ],
  calcular(e, v) {
    if (e.monto <= 0) throw new ErrorEntrada("กรุณากรอกจำนวนเงินตามสัญญา", "monto");
    const unidad = enMapa(v["th.stamp-duty-units"], e.tipo);
    // El impuesto es 1 baht por cada unidad o fracción de unidad.
    const bruto = Math.ceil(e.monto / unidad);
    const tope = e.tipo === "loan" ? v["th.stamp-duty-loan-cap"] : null;
    const impuesto = tope !== null ? Math.min(bruto, tope) : bruto;
    const observaciones: string[] = [];
    if (tope !== null && bruto > tope) observaciones.push("อากรของสัญญากู้ยืมเงินคำนวณแล้วเกินเพดาน จึงเสียเท่าเพดาน");
    if (e.tipo === "lease") observaciones.push("ถ้าสัญญาเช่าไม่กำหนดอายุการเช่า ให้ถือว่ามีกำหนด 3 ปี ใส่ค่าเช่ารวม 3 ปี");
    return { impuesto, unidad, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "อากรแสตมป์ที่ต้องเสีย", formato: "moneda", destacada: true },
    { clave: "unidad", etiqueta: "อากร 1 บาท ต่อทุกจำนวนเงิน", formato: "moneda" },
  ],
});
