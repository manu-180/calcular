import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, salarioSemanal, sumarDias, sumarMeses } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.maternity-leave-calculator",
  mercado: "ps",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "ps.maternity-leave": "numero",
    "ps.maternity-after-birth": "numero",
    "ps.maternity-min-service": "numero",
    "ps.nursing-hour": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "تاريخ الولادة أو التاريخ المتوقع لها", porDefecto: "hoy" },
    { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية العمل لدى صاحب العمل", porDefecto: "2024-01-01" },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 3000 },
    {
      id: "antes",
      tipo: "entero",
      etiqueta: "أسابيع الإجازة قبل الولادة",
      ayuda: "يجوز أخذ جزء من الإجازة قبل الولادة، على أن يبقى بعدها الحد الأدنى الذي يحدده القانون.",
      min: 0,
      max: 10,
      porDefecto: 4,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const semanas = v["ps.maternity-leave"];
    const maxAntes = semanas - v["ps.maternity-after-birth"];
    if (entrada.antes > maxAntes) throw new ErrorEntrada(`لا يجوز أن تزيد الإجازة قبل الولادة على ${maxAntes} أسابيع.`, "antes");
    const servicio = diasEntre(entrada.inicio, entrada.parto);
    if (servicio < 0) throw new ErrorEntrada("تاريخ بداية العمل بعد تاريخ الولادة.", "inicio");
    const cumple = servicio >= v["ps.maternity-min-service"];
    const desde = sumarDias(entrada.parto, -entrada.antes * 7);
    const regreso = sumarDias(desde, semanas * 7);
    const observaciones = cumple
      ? ["لا يجوز فصل العاملة بسبب إجازة الوضع، إلا إذا ثبت أنها عملت عملًا آخر خلالها."]
      : ["لم تُكملي المدة المطلوبة قبل الولادة، فلا تُستحق إجازة الوضع مدفوعة الأجر بموجب القانون. يجوز الحصول على إجازة دون أجر لرعاية الطفل وفق مصلحة العمل."];
    return {
      elegible: cumple ? "نعم" : "لا",
      semanas: cumple ? semanas : 0,
      desde: cumple ? desde : null,
      regreso: cumple ? regreso : null,
      pago: cumple ? redondear(semanas * salarioSemanal(entrada.salario)) : 0,
      servicio,
      lactancia: sumarMeses(entrada.parto, 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "أجر إجازة الوضع", formato: "moneda", destacada: true },
    { clave: "elegible", etiqueta: "تستحقين الإجازة مدفوعة الأجر", formato: "texto" },
    { clave: "semanas", etiqueta: "مدة الإجازة", formato: "semanas" },
    { clave: "desde", etiqueta: "تبدأ الإجازة في", formato: "fecha" },
    { clave: "regreso", etiqueta: "العودة إلى العمل في", formato: "fecha" },
    { clave: "servicio", etiqueta: "أيام العمل قبل الولادة", formato: "dias" },
    { clave: "lactancia", etiqueta: "تستمر ساعة الرضاعة حتى", formato: "fecha" },
  ],
});
