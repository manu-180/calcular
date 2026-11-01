import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQ_SSO, ssoMensual } from "../lib/renta";

export default definirCalculadora({
  id: "th.employer-cost",
  mercado: "th",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "publicado",
  requiere: REQ_SSO,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "เงินเดือนลูกจ้าง", min: 0, porDefecto: 25000 },
    { id: "empleados", tipo: "entero", etiqueta: "จำนวนลูกจ้างที่ได้เงินเดือนเท่านี้", min: 1, max: 10000, porDefecto: 1 },
    { id: "bono", tipo: "moneda", etiqueta: "โบนัสต่อคนต่อปี", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("กรุณากรอกเงินเดือน", "sueldo");
    const s = ssoMensual(e.sueldo, v);
    const ssoEmpleador = redondear(s.empleador);
    const mensual = redondear(e.sueldo + ssoEmpleador);
    const anualPorPersona = redondear(mensual * 12 + e.bono);
    return {
      mensual,
      ssoEmpleador,
      anualPorPersona,
      total: redondear(anualPorPersona * e.empleados),
      recargo: (ssoEmpleador / e.sueldo) * 100,
      observaciones: ["ยังไม่รวมเงินสมทบกองทุนเงินทดแทนซึ่งอัตราขึ้นกับประเภทกิจการ และสวัสดิการอื่นที่นายจ้างให้เอง"],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "ต้นทุนต่อคนต่อเดือน", formato: "moneda", destacada: true },
    { clave: "ssoEmpleador", etiqueta: "เงินสมทบประกันสังคมส่วนนายจ้างต่อเดือน", formato: "moneda" },
    { clave: "anualPorPersona", etiqueta: "ต้นทุนต่อคนต่อปี", formato: "moneda" },
    { clave: "total", etiqueta: "ต้นทุนรวมทั้งปี", formato: "moneda" },
    { clave: "recargo", etiqueta: "ส่วนเพิ่มจากเงินเดือน", formato: "porcentaje", decimales: 2 },
  ],
});
