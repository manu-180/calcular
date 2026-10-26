import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aniosServicio, CAMPO_SALARIO_FINAL, mmkafaa, MOTIVO_FIN, salarioDiario } from "../lib/laboral";

export default definirCalculadora({
  id: "sa.final-settlement",
  mercado: "sa",
  concepto: "liquidacion-final",
  slug: "final-settlement",
  estado: "publicado",
  requiere: {
    "sa.eos": "mapa",
    "sa.eos-resignation": "mapa",
    "sa.month-days": "numero",
  },
  campos: [
    CAMPO_SALARIO_FINAL,
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية الخدمة", porDefecto: "2019-01-01" },
    { id: "fin", tipo: "fecha", etiqueta: "آخر يوم عمل", porDefecto: "hoy" },
    MOTIVO_FIN,
    { id: "vacaciones", tipo: "numero", etiqueta: "أيام الإجازة السنوية المستحقة التي لم تستعملها", min: 0, max: 400, porDefecto: 0 },
    { id: "diasPendientes", tipo: "entero", etiqueta: "أيام عمل في آخر شهر لم تتقاض أجرها", min: 0, max: 31, porDefecto: 0 },
    { id: "otros", tipo: "moneda", etiqueta: "مبالغ أخرى مستحقة لك", ayuda: "مثل أجر عمل إضافي أو بدلات لم تُصرف. اتركه صفرًا إذا لم يكن لك شيء.", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const { anios } = aniosServicio(entrada.inicio, entrada.fin, 0);
    const r = mmkafaa(entrada.salario, anios, entrada.motivo, v["sa.eos"], v["sa.eos-resignation"]);
    const diario = salarioDiario(entrada.salario, v["sa.month-days"]);
    const mkafaa = redondear(r.monto);
    const vacaciones = redondear(entrada.vacaciones * diario);
    const sueldo = redondear(entrada.diasPendientes * diario);
    const otros = redondear(entrada.otros);
    const plazo = entrada.motivo === "resignation" ? "أسبوعين" : "أسبوع";
    return {
      total: redondear(mkafaa + vacaciones + sueldo + otros),
      mkafaa,
      vacaciones,
      sueldo,
      otros,
      diario: redondear(diario),
      anios,
      observaciones: [`يجب أن تُصرف المستحقات خلال ${plazo} على الأكثر من انتهاء العلاقة (المادة الثامنة والثمانون). ويحق لصاحب العمل أن يحسم منها أي دين مستحق له بسبب العمل.`],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "إجمالي المستحقات النهائية", formato: "moneda", destacada: true },
    { clave: "mkafaa", etiqueta: "مكافأة نهاية الخدمة", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "بدل الإجازة غير المستعملة", formato: "moneda" },
    { clave: "sueldo", etiqueta: "أجر الأيام الأخيرة", formato: "moneda", ocultarSiCero: true },
    { clave: "otros", etiqueta: "مبالغ أخرى", formato: "moneda", ocultarSiCero: true },
    { clave: "diario", etiqueta: "الأجر اليومي", formato: "moneda" },
    { clave: "anios", etiqueta: "مدة الخدمة", formato: "anios", decimales: 2 },
  ],
});
