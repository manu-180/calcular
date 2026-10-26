import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQ_RENTA, REQ_SSO, rentaSueldo, ssoMensual } from "../lib/renta";

export default definirCalculadora({
  id: "th.take-home-pay",
  mercado: "th",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: { ...REQ_RENTA, ...REQ_SSO },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "เงินเดือนก่อนหักต่อเดือน", min: 0, porDefecto: 30000 },
    { id: "bono", tipo: "moneda", etiqueta: "โบนัสและเงินได้อื่นจากนายจ้างทั้งปี", min: 0, porDefecto: 0 },
    { id: "sso", tipo: "si-no", etiqueta: "เป็นผู้ประกันตนมาตรา 33 (หักประกันสังคม)", porDefecto: true },
    { id: "conyuge", tipo: "si-no", etiqueta: "มีคู่สมรสที่ไม่มีเงินได้", porDefecto: false },
    { id: "hijos", tipo: "entero", etiqueta: "จำนวนบุตรที่ใช้สิทธิลดหย่อน", min: 0, max: 15, porDefecto: 0 },
    {
      id: "hijos2561",
      tipo: "entero",
      etiqueta: "ในจำนวนนี้ เป็นบุตรคนที่ 2 ขึ้นไปที่เกิดตั้งแต่ พ.ศ. 2561",
      min: 0,
      max: 14,
      porDefecto: 0,
      ayuda: "บุตรคนที่ 2 เป็นต้นไปที่เกิดตั้งแต่ พ.ศ. 2561 ลดหย่อนได้มากกว่าบุตรคนแรก",
    },
    { id: "padres", tipo: "entero", etiqueta: "บิดามารดาอายุ 60 ปีขึ้นไปที่อุปการะเลี้ยงดู", min: 0, max: 4, porDefecto: 0 },
    {
      id: "otras",
      tipo: "moneda",
      etiqueta: "ค่าลดหย่อนอื่นทั้งปี",
      min: 0,
      porDefecto: 0,
      ayuda: "เช่น เบี้ยประกันชีวิต กองทุนสำรองเลี้ยงชีพ SSF RMF ดอกเบี้ยบ้าน ใส่ยอดที่ใช้สิทธิได้จริงหลังเพดานแล้ว",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("กรุณากรอกเงินเดือนก่อนหัก", "sueldo");
    if (e.hijos2561 > Math.max(0, e.hijos - 1)) throw new ErrorEntrada("บุตรคนที่ 2 ขึ้นไปต้องน้อยกว่าจำนวนบุตรทั้งหมดอย่างน้อย 1 คน", "hijos2561");
    const sso = e.sso ? ssoMensual(e.sueldo, v) : { base: 0, persona: 0, empleador: 0 };
    const ssoMes = redondear(sso.persona);
    const ingreso = e.sueldo * 12 + e.bono;
    const r = rentaSueldo(ingreso, ssoMes * 12, { conyuge: e.conyuge, hijos: e.hijos, hijosDesde2561: e.hijos2561, padres: e.padres, otras: e.otras }, v);
    const impuesto = redondear(r.impuesto);
    const netoAnual = redondear(ingreso - ssoMes * 12 - impuesto);
    const observaciones = [
      "ภาษีคิดจากเงินได้ทั้งปีแล้วเฉลี่ยเป็นรายเดือน นายจ้างหักภาษี ณ ที่จ่ายแต่ละเดือนด้วยวิธีเดียวกัน ยอดจริงจึงต่างกันได้เล็กน้อย",
    ];
    if (e.sso && e.sueldo > v["th.sso-wage-ceiling"]) observaciones.push("เงินเดือนเกินเพดานค่าจ้างของประกันสังคม จึงหักเงินสมทบตามเพดาน");
    if (ssoMes * 12 > r.deduccionSso) observaciones.push("เงินสมทบประกันสังคมทั้งปีเกินเพดานค่าลดหย่อนที่กรมสรรพากรประกาศ จึงลดหย่อนได้ตามเพดาน");
    return {
      neto: redondear(netoAnual / 12),
      netoAnual,
      sso: ssoMes,
      impuestoMes: redondear(impuesto / 12),
      impuesto,
      ingreso,
      gastos: r.gastos,
      deducciones: r.deducciones,
      neta: r.neta,
      marginal: r.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "เงินเดือนสุทธิเฉลี่ยต่อเดือน", formato: "moneda", destacada: true },
    { clave: "netoAnual", etiqueta: "รายได้สุทธิทั้งปี", formato: "moneda" },
    { clave: "sso", etiqueta: "เงินสมทบประกันสังคมต่อเดือน", formato: "moneda", ocultarSiCero: true },
    { clave: "impuestoMes", etiqueta: "ภาษีเงินได้เฉลี่ยต่อเดือน", formato: "moneda" },
    { clave: "impuesto", etiqueta: "ภาษีเงินได้ทั้งปี", formato: "moneda" },
    { clave: "ingreso", etiqueta: "เงินได้ทั้งปี", formato: "moneda" },
    { clave: "gastos", etiqueta: "หักค่าใช้จ่าย", formato: "moneda" },
    { clave: "deducciones", etiqueta: "ค่าลดหย่อนรวม", formato: "moneda" },
    { clave: "neta", etiqueta: "เงินได้สุทธิที่ใช้คำนวณภาษี", formato: "moneda" },
    { clave: "marginal", etiqueta: "อัตราภาษีขั้นสูงสุดที่ใช้", formato: "porcentaje", decimales: 0 },
  ],
  mundo: { bruto: "sueldo", periodoBruto: "mes", neto: "netoAnual", periodoNeto: "anio", entrada: { bono: 0 } },
});
