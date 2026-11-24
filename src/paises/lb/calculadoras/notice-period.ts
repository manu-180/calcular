import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { mesesDeAviso } from "../lib/laboral";

export default definirCalculadora({
  id: "lb.notice-period",
  mercado: "lb",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: { "lb.notice": "mapa" },
  campos: [
    { id: "anios", tipo: "numero", etiqueta: "مدة تنفيذ العقد بالسنوات", min: 0, max: 60, porDefecto: 5 },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري بالليرة", min: 0, porDefecto: 30000000 },
    { id: "prueba", tipo: "si-no", etiqueta: "ما زال العامل تحت التجربة (الأشهر الثلاثة الأولى)", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const meses = entrada.prueba ? 0 : mesesDeAviso(v["lb.notice"], entrada.anios);
    return {
      meses,
      compensacion: redondear(meses * entrada.salario),
      ausencia: meses > 0 ? "ساعة في اليوم للبحث عن عمل آخر" : "لا تنطبق",
      observaciones: ["الإنذار واجب على الطرفين ويكون خطيًا. ومن يخالفه يدفع للطرف الآخر بدل أجر المدة. لا يوجَّه الإنذار إلى المرأة الحامل أو المجازة بداعي الولادة، ولا خلال الإجازة العادية أو المرضية."],
    };
  },
  resultado: [
    { clave: "meses", etiqueta: "مهلة الإنذار", formato: "meses", destacada: true },
    { clave: "compensacion", etiqueta: "بدل الإنذار إذا لم يُحترم", formato: "moneda" },
    { clave: "ausencia", etiqueta: "حق الغياب خلال المهلة", formato: "texto" },
  ],
});
