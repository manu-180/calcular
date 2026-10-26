import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { REQ_SSO, ssoMensual } from "../lib/renta";

export default definirCalculadora({
  id: "th.social-security",
  mercado: "th",
  concepto: "aportes-seguridad-social",
  slug: "social-security",
  estado: "publicado",
  requiere: { ...REQ_SSO, "th.sso-rate-government": "numero", "th.sso-deduction-cap": "numero" },
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "ค่าจ้างต่อเดือน", min: 0, porDefecto: 20000, ayuda: "ค่าจ้างที่นายจ้างจ่ายเป็นประจำในเดือนนั้น" }],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("กรุณากรอกค่าจ้างต่อเดือน", "sueldo");
    const s = ssoMensual(e.sueldo, v);
    const persona = redondear(s.persona);
    const empleador = redondear(s.empleador);
    const gobierno = redondear(porcentaje(s.base, v["th.sso-rate-government"]));
    const observaciones: string[] = [];
    if (e.sueldo > v["th.sso-wage-ceiling"]) observaciones.push("ค่าจ้างเกินเพดาน จึงคิดเงินสมทบจากเพดานค่าจ้าง");
    if (e.sueldo < v["th.sso-wage-floor"]) observaciones.push("ค่าจ้างต่ำกว่าค่าจ้างขั้นต่ำที่ใช้คำนวณ จึงคิดเงินสมทบจากค่าจ้างขั้นต่ำนั้น");
    return {
      persona,
      empleador,
      gobierno,
      total: redondear(persona + empleador + gobierno),
      anual: redondear(persona * 12),
      base: s.base,
      observaciones,
    };
  },
  resultado: [
    { clave: "persona", etiqueta: "ลูกจ้างจ่ายต่อเดือน", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "นายจ้างจ่ายต่อเดือน", formato: "moneda" },
    { clave: "gobierno", etiqueta: "รัฐบาลสมทบต่อเดือน", formato: "moneda" },
    { clave: "total", etiqueta: "เงินสมทบรวมต่อเดือน", formato: "moneda" },
    { clave: "anual", etiqueta: "ลูกจ้างจ่ายทั้งปี", formato: "moneda" },
    { clave: "base", etiqueta: "ค่าจ้างที่ใช้คำนวณ", formato: "moneda" },
  ],
});
