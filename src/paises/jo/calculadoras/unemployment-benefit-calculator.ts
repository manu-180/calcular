import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPO_SEXO } from "../lib/pension";

export default definirCalculadora({
  id: "jo.unemployment-benefit-calculator",
  mercado: "jo",
  concepto: "propio",
  slug: "unemployment-benefit-calculator",
  estado: "publicado",
  requiere: {
    "jo.unemployment-benefit": "mapa",
    "jo.unemployment-benefit-terms": "mapa",
    "jo.unemployment-benefit-cap": "numero",
    "jo.ssc-optional-old-age": "numero",
    "jo.ssc-wage-cap": "numero",
    "jo.pension-age": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "آخر أجر شهري خاضع للاقتطاع", min: 0, porDefecto: 600 },
    { id: "aportes", tipo: "entero", etiqueta: "عدد اشتراكاتك في الضمان", min: 0, max: 720, porDefecto: 120 },
    CAMPO_SEXO,
    { id: "edad", tipo: "entero", etiqueta: "العمر", min: 16, max: 100, porDefecto: 35 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شهري.", "salario");
    const terms = v["jo.unemployment-benefit-terms"];
    const minimo = enMapa(terms, "contributions");
    const edadTope = enMapa(v["jo.pension-age"], entrada.sexo);
    if (entrada.aportes < minimo || entrada.edad >= edadTope) {
      return {
        mes1: null,
        total: null,
        meses: null,
        descuento: null,
        elegible: entrada.aportes < minimo ? `يلزم ${minimo} اشتراكًا على الأقل` : "لا يُصرف بدل التعطل بعد بلوغ سن التقاعد",
        observaciones: [],
      };
    }
    const salario = Math.min(entrada.salario, v["jo.ssc-wage-cap"]);
    const tasas = v["jo.unemployment-benefit"];
    const largo = entrada.aportes >= enMapa(terms, "long-contributions");
    const meses = largo ? enMapa(terms, "long-months") : enMapa(terms, "short-months");
    const descuento = porcentaje(salario, v["jo.ssc-optional-old-age"]);
    const tope = v["jo.unemployment-benefit-cap"];
    const tasaMes = (m: number) => enMapa(tasas, m === 1 ? "month-1" : m === 2 ? "month-2" : m === 3 ? "month-3" : "month-4-6");
    const netos: number[] = [];
    for (let m = 1; m <= meses; m++) netos.push(redondear(Math.min(tope, Math.max(0, porcentaje(salario, tasaMes(m)) - descuento))));
    return {
      mes1: netos[0],
      total: redondear(netos.reduce((a, b) => a + b, 0)),
      meses,
      descuento: redondear(descuento),
      elegible: "تتوافر الشروط العامة",
      observaciones: [
        "يُشترط أيضًا أن يكون لك اشتراك واحد على الأقل في تأمين التعطل، وأن تكون قد تركت العمل. ولا يُصرف البدل لأكثر من ثلاث مرات طيلة مدة الشمول.",
        "يُخصم من البدل اشتراك تأمين الشيخوخة والعجز والوفاة لأن مدة صرفه تُحسب مدة خدمة فعلية.",
      ],
    };
  },
  resultado: [
    { clave: "mes1", etiqueta: "صافي بدل التعطل في الشهر الأول", formato: "moneda", destacada: true },
    { clave: "elegible", etiqueta: "الاستحقاق", formato: "texto" },
    { clave: "meses", etiqueta: "مدة الصرف بالأشهر", formato: "numero" },
    { clave: "total", etiqueta: "مجموع البدل عن المدة كلها", formato: "moneda" },
    { clave: "descuento", etiqueta: "اشتراك الشيخوخة المخصوم كل شهر", formato: "moneda" },
  ],
});
