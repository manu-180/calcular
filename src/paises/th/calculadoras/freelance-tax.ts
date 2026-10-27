import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { REQ_RENTA, rentaSueldo } from "../lib/renta";

export default definirCalculadora({
  id: "th.freelance-tax",
  mercado: "th",
  concepto: "propio",
  slug: "freelance-tax",
  estado: "publicado",
  requiere: { ...REQ_RENTA, "th.wht-rates": "mapa" },
  campos: [
    { id: "honorarios", tipo: "moneda", etiqueta: "ค่าจ้างฟรีแลนซ์ ค่านายหน้า ค่าธรรมเนียมทั้งปี (มาตรา 40 (2))", min: 0, porDefecto: 600000 },
    { id: "sueldo", tipo: "moneda", etiqueta: "เงินเดือนทั้งปี (ถ้ามี)", min: 0, porDefecto: 0 },
    { id: "sso", tipo: "moneda", etiqueta: "เงินสมทบประกันสังคมทั้งปี", min: 0, porDefecto: 0 },
    { id: "otras", tipo: "moneda", etiqueta: "ค่าลดหย่อนอื่นทั้งปี (นอกจากส่วนตัว)", min: 0, porDefecto: 0 },
    {
      id: "retenido",
      tipo: "moneda",
      etiqueta: "ภาษีที่ถูกหัก ณ ที่จ่ายแล้วทั้งปี",
      min: 0,
      requerido: false,
      ayuda: "เว้นว่างไว้เพื่อใช้ 3% ของค่าจ้างฟรีแลนซ์ ตามอัตราหัก ณ ที่จ่ายของค่าบริการ",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.honorarios <= 0) throw new ErrorEntrada("กรุณากรอกเงินได้จากงานฟรีแลนซ์", "honorarios");
    const familia = { conyuge: false, hijos: 0, hijosDesde2561: 0, padres: 0, otras: e.otras };
    // Sueldo (40 (1)) y honorarios (40 (2)) comparten la deducción de gastos del 50 % con un solo tope.
    const r = rentaSueldo(e.honorarios + e.sueldo, e.sso, familia, v);
    const impuesto = redondear(r.impuesto);
    const retenido = e.retenido ?? redondear(porcentaje(e.honorarios, enMapa(v["th.wht-rates"], "service")));
    const saldo = redondear(impuesto - retenido);
    return {
      impuesto,
      retenido,
      pagar: saldo > 0 ? saldo : 0,
      devolver: saldo < 0 ? -saldo : 0,
      neta: r.neta,
      gastos: r.gastos,
      marginal: r.marginal,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ภาษีเงินได้ทั้งปี", formato: "moneda", destacada: true },
    { clave: "devolver", etiqueta: "ขอคืนภาษีได้", formato: "moneda", ocultarSiCero: true },
    { clave: "pagar", etiqueta: "ต้องชำระเพิ่ม", formato: "moneda", ocultarSiCero: true },
    { clave: "retenido", etiqueta: "ภาษีที่ถูกหัก ณ ที่จ่าย", formato: "moneda" },
    { clave: "gastos", etiqueta: "หักค่าใช้จ่าย", formato: "moneda" },
    { clave: "neta", etiqueta: "เงินได้สุทธิ", formato: "moneda" },
    { clave: "marginal", etiqueta: "อัตราภาษีขั้นสูงสุดที่ใช้", formato: "porcentaje", decimales: 0 },
  ],
});
