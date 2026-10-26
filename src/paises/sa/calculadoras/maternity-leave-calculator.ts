import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { salarioDiario } from "../lib/laboral";

function sumarDias(fecha: FechaISO, dias: number): FechaISO {
  const ms = Date.UTC(Number(fecha.slice(0, 4)), Number(fecha.slice(5, 7)) - 1, Number(fecha.slice(8, 10))) + dias * 86400000;
  return new Date(ms).toISOString().slice(0, 10) as FechaISO;
}

export default definirCalculadora({
  id: "sa.maternity-leave-calculator",
  mercado: "sa",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "sa.maternity": "mapa",
    "sa.month-days": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "التاريخ المرجح للوضع", ayuda: "كما في الشهادة الطبية المصدقة.", porDefecto: "hoy" },
    { id: "semanasAntes", tipo: "entero", etiqueta: "كم أسبوعًا تبدأ الإجازة قبل الوضع؟", min: 0, max: 4, porDefecto: 2 },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 9000 },
    { id: "enfermo", tipo: "si-no", etiqueta: "المولود مريض أو من ذوي الإعاقة ويحتاج مرافقًا مستمرًا", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخلي الأجر الشهري.", "salario");
    const t = v["sa.maternity"];
    const maxAntes = enMapa(t, "max-before");
    if (entrada.semanasAntes > maxAntes) throw new ErrorEntrada("لا تبدأ إجازة الوضع قبل أكثر من أربعة أسابيع من التاريخ المرجح.", "semanasAntes");
    const semanas = enMapa(t, "weeks");
    const diasMes = v["sa.month-days"];
    const inicio = sumarDias(entrada.parto, -7 * entrada.semanasAntes);
    const fin = sumarDias(inicio, semanas * 7 - 1);
    const extra = entrada.enfermo ? diasMes : 0;
    const diasPagados = semanas * 7 + extra;
    const diario = salarioDiario(entrada.salario, diasMes);
    return {
      pago: redondear(diasPagados * diario),
      semanas,
      inicio,
      fin,
      finExtra: entrada.enfermo ? sumarDias(fin, extra) : null,
      diasPagados,
      observaciones: [
        "الأسابيع الستة التالية للوضع إلزامية، ويحق تمديد الإجازة شهرًا دون أجر.",
        "قد تصرف التأمينات الاجتماعية تعويض الأمومة نيابة عن صاحب العمل إذا توافرت شروطه، ولا يُجمع بينه وبين الأجر.",
      ],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "أجر إجازة الوضع", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "مدة الإجازة بأجر كامل", formato: "semanas" },
    { clave: "inicio", etiqueta: "بداية الإجازة", formato: "fecha" },
    { clave: "fin", etiqueta: "نهاية الإجازة", formato: "fecha" },
    { clave: "finExtra", etiqueta: "نهاية الشهر الإضافي للمولود المريض", formato: "fecha" },
    { clave: "diasPagados", etiqueta: "أيام مدفوعة الأجر", formato: "dias" },
  ],
});
