import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosCompletos, diasTrabajados } from "../lib/fechas";

export default definirCalculadora({
  id: "th.severance-pay",
  mercado: "th",
  concepto: "indemnizacion-despido",
  slug: "severance-pay",
  estado: "publicado",
  requiere: { "th.severance-days": "mapa", "th.hourly-divisor-days": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ค่าจ้างอัตราสุดท้าย", min: 0, porDefecto: 25000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "ค่าจ้างข้างบนเป็นค่าจ้าง",
      opciones: [
        { valor: "mes", etiqueta: "รายเดือน" },
        { valor: "dia", etiqueta: "รายวัน" },
      ],
      porDefecto: "mes",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "วันที่เริ่มงาน" },
    { id: "fin", tipo: "fecha", etiqueta: "วันทำงานวันสุดท้าย", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("กรุณากรอกค่าจ้างอัตราสุดท้าย", "salario");
    if (e.fin < e.inicio) throw new ErrorEntrada("วันทำงานวันสุดท้ายต้องไม่ก่อนวันที่เริ่มงาน", "fin");
    const dias = diasTrabajados(e.inicio, e.fin);
    const anios = aniosCompletos(e.inicio, e.fin);
    const tabla = v["th.severance-days"];
    const clave = anios >= 20 ? "y20" : anios >= 10 ? "y10" : anios >= 6 ? "y6" : anios >= 3 ? "y3" : anios >= 1 ? "y1" : dias >= 120 ? "d120" : null;
    const diasPago = clave ? enMapa(tabla, clave) : 0;
    const diario = e.periodo === "mes" ? e.salario / v["th.hourly-divisor-days"] : e.salario;
    const observaciones = clave ? [] : ["ทำงานไม่ครบ 120 วัน จึงไม่มีสิทธิได้ค่าชดเชย"];
    return { compensacion: redondear(diario * diasPago), diasPago, diario: redondear(diario), anios, dias, observaciones };
  },
  resultado: [
    { clave: "compensacion", etiqueta: "ค่าชดเชย", formato: "moneda", destacada: true },
    { clave: "diasPago", etiqueta: "จำนวนวันของค่าจ้างที่ได้รับ", formato: "dias" },
    { clave: "diario", etiqueta: "ค่าจ้างต่อวัน", formato: "moneda" },
    { clave: "anios", etiqueta: "อายุงานเต็มปี", formato: "anios" },
    { clave: "dias", etiqueta: "จำนวนวันที่ทำงาน", formato: "dias" },
  ],
});
