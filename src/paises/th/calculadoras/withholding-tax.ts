import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.withholding-tax",
  mercado: "th",
  concepto: "retencion-honorarios",
  slug: "withholding-tax",
  estado: "publicado",
  requiere: { "th.wht-rates": "mapa", "th.wht-min-payment": "numero" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "ยอดเงินได้ที่ต้องหักภาษี", min: 0, porDefecto: 10000, ayuda: "ค่าบริการ ค่าเช่า หรือค่าโฆษณาตามสัญญา ไม่รวมยอดที่ไม่ใช่เงินได้ของผู้รับ" },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "ประเภทเงินได้", dato: "th.wht-rates", porDefecto: "service" },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("กรุณากรอกยอดเงินที่จ่าย", "monto");
    const tasa = enMapa(v["th.wht-rates"], e.tipo);
    if (e.monto < v["th.wht-min-payment"]) {
      return { retencion: 0, neto: e.monto, tasa, observaciones: ["ยอดตามสัญญาต่ำกว่าเกณฑ์ จึงไม่ต้องหักภาษี ณ ที่จ่าย ถ้าแบ่งจ่ายเป็นงวดให้ดูยอดรวมทั้งสัญญา"] };
    }
    const retencion = redondear(porcentaje(e.monto, tasa));
    return { retencion, neto: redondear(e.monto - retencion), tasa, observaciones: [] };
  },
  resultado: [
    { clave: "retencion", etiqueta: "ภาษีหัก ณ ที่จ่าย", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "ยอดที่ผู้รับได้รับหลังหักภาษี", formato: "moneda" },
    { clave: "tasa", etiqueta: "อัตราภาษีหัก ณ ที่จ่าย", formato: "porcentaje", decimales: 0 },
  ],
});
