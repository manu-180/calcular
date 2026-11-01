import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "th.overtime-pay",
  mercado: "th",
  concepto: "horas-extra",
  slug: "overtime-pay",
  estado: "publicado",
  requiere: { "th.overtime-multipliers": "mapa", "th.hourly-divisor-days": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ค่าจ้าง", min: 0, porDefecto: 20000 },
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
    { id: "horasDia", tipo: "numero", etiqueta: "ชั่วโมงทำงานปกติต่อวัน", min: 1, max: 12, porDefecto: 8 },
    { id: "extra", tipo: "numero", etiqueta: "ชั่วโมงล่วงเวลาในวันทำงาน", min: 0, max: 300, porDefecto: 10 },
    { id: "feriado", tipo: "numero", etiqueta: "ชั่วโมงทำงานในวันหยุด (ภายในเวลาทำงานปกติ)", min: 0, max: 300, porDefecto: 0 },
    { id: "extraFeriado", tipo: "numero", etiqueta: "ชั่วโมงล่วงเวลาในวันหยุด", min: 0, max: 300, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("กรุณากรอกค่าจ้าง", "salario");
    const f = v["th.overtime-multipliers"];
    // Artículo 68: con sueldo mensual, la hora vale el sueldo dividido por 30 y por las horas diarias.
    const hora = e.periodo === "mes" ? e.salario / (v["th.hourly-divisor-days"] * e.horasDia) : e.salario / e.horasDia;
    // Artículo 62: quien ya cobra el día de descanso (sueldo mensual) recibe un adicional de una vez; quien
    // no lo cobra (jornal diario), dos veces.
    const factorFeriado = e.periodo === "mes" ? enMapa(f, "holiday-paid") : enMapa(f, "holiday-unpaid");
    const pagoExtra = redondear(hora * enMapa(f, "workday") * e.extra);
    const pagoFeriado = redondear(hora * factorFeriado * e.feriado);
    const pagoExtraFeriado = redondear(hora * enMapa(f, "holiday-overtime") * e.extraFeriado);
    return {
      total: redondear(pagoExtra + pagoFeriado + pagoExtraFeriado),
      pagoExtra,
      pagoFeriado,
      pagoExtraFeriado,
      hora: redondear(hora),
      factorFeriado,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "ค่าล่วงเวลาและค่าทำงานในวันหยุดรวม", formato: "moneda", destacada: true },
    { clave: "pagoExtra", etiqueta: "ค่าล่วงเวลาในวันทำงาน", formato: "moneda" },
    { clave: "pagoFeriado", etiqueta: "ค่าทำงานในวันหยุด", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoExtraFeriado", etiqueta: "ค่าล่วงเวลาในวันหยุด", formato: "moneda", ocultarSiCero: true },
    { clave: "hora", etiqueta: "ค่าจ้างต่อชั่วโมง", formato: "moneda" },
    { clave: "factorFeriado", etiqueta: "อัตราค่าทำงานในวันหยุด (เท่า)", formato: "numero", decimales: 0 },
  ],
});
