import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias, sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "eg.maternity-leave",
  mercado: "eg",
  concepto: "propio",
  slug: "maternity-leave",
  estado: "publicado",
  requiere: { "eg.maternity-months": "numero", "eg.maternity-after-days": "numero" },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "التاريخ المرجح للولادة", porDefecto: "hoy", ayuda: "كما تذكره الشهادة الطبية." },
    { id: "diasAntes", tipo: "entero", etiqueta: "أيام الإجازة قبل الولادة", min: 0, max: 120, porDefecto: 15 },
    { id: "previas", tipo: "entero", etiqueta: "عدد إجازات الوضع التي حصلتِ عليها من قبل", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.parto)) throw new ErrorEntrada("أدخلي تاريخًا صحيحًا.", "parto");
    const meses = v["eg.maternity-months"];
    const minDespues = v["eg.maternity-after-days"];
    const observaciones: string[] = [];
    if (e.previas >= 3) {
      observaciones.push("لا تُستحق إجازة الوضع أكثر من ثلاث مرات طوال مدة الخدمة.");
      return { inicio: null, fin: null, diasDespues: 0, diasTotal: 0, observaciones };
    }
    const inicio = sumarDias(e.parto, -e.diasAntes);
    const fin = sumarDias(sumarMeses(inicio, meses), -1);
    const diasDespues = diasEntre(e.parto, fin) + 1;
    if (diasDespues < minDespues) throw new ErrorEntrada("يجب ألا تقل الإجازة بعد الولادة عن الحد الأدنى. قللي أيام الإجازة قبل الولادة.", "diasAntes");
    observaciones.push("الإجازة مدفوعة الأجر. ما تصرفه التأمينات من تعويض يُخصم من الأجر الذي يلتزم به صاحب العمل.");
    return { inicio, fin, diasDespues, diasTotal: diasEntre(inicio, fin) + 1, observaciones };
  },
  resultado: [
    { clave: "fin", etiqueta: "آخر يوم في إجازة الوضع", formato: "fecha", destacada: true },
    { clave: "inicio", etiqueta: "أول يوم في الإجازة", formato: "fecha" },
    { clave: "diasDespues", etiqueta: "الأيام بعد الولادة", formato: "dias" },
    { clave: "diasTotal", etiqueta: "مدة الإجازة كلها", formato: "dias" },
  ],
});
