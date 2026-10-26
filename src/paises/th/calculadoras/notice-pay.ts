import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { desdeJuliano, diaJuliano, proximoPago } from "../lib/fechas";

export default definirCalculadora({
  id: "th.notice-pay",
  mercado: "th",
  concepto: "preaviso",
  slug: "notice-pay",
  estado: "publicado",
  requiere: { "th.notice-max-months": "numero", "th.hourly-divisor-days": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "เงินเดือน", min: 0, porDefecto: 25000 },
    {
      id: "ciclo",
      tipo: "opcion",
      etiqueta: "วันจ่ายค่าจ้าง",
      opciones: [
        { valor: "mes", etiqueta: "สิ้นเดือน เดือนละครั้ง" },
        { valor: "quincena", etiqueta: "วันที่ 15 และสิ้นเดือน" },
      ],
      porDefecto: "mes",
    },
    { id: "aviso", tipo: "fecha", etiqueta: "วันที่นายจ้างบอกเลิกจ้าง", porDefecto: "hoy" },
    { id: "salida", tipo: "fecha", etiqueta: "วันแรกที่ไม่ได้ทำงาน (นายจ้างให้ออก)", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("กรุณากรอกเงินเดือน", "salario");
    if (e.salida < e.aviso) throw new ErrorEntrada("วันแรกที่ไม่ได้ทำงานต้องไม่ก่อนวันที่บอกเลิกจ้าง", "salida");
    const quincenal = e.ciclo === "quincena";
    // Artículo 17: el aviso dado en o antes de un día de pago surte efecto en el día de pago siguiente.
    const primerPago = proximoPago(e.aviso, quincenal);
    const efecto = proximoPago(desdeJuliano(diaJuliano(primerPago) + 1), quincenal);
    const diasMax = v["th.notice-max-months"] * v["th.hourly-divisor-days"];
    const dias = Math.min(Math.max(0, diaJuliano(efecto) - diaJuliano(e.salida) + 1), diasMax);
    const diario = e.salario / v["th.hourly-divisor-days"];
    return { pago: redondear(diario * dias), dias, efecto, diario: redondear(diario) };
  },
  resultado: [
    { clave: "pago", etiqueta: "สินจ้างแทนการบอกกล่าวล่วงหน้า", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "จำนวนวันที่ต้องจ่าย", formato: "dias" },
    { clave: "efecto", etiqueta: "วันที่การเลิกจ้างมีผลถ้าบอกถูกต้อง", formato: "fecha" },
    { clave: "diario", etiqueta: "ค่าจ้างต่อวัน", formato: "moneda" },
  ],
});
