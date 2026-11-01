import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPO_CNAM } from "../lib/comun";

export default definirCalculadora({
  id: "mr.cout-employeur",
  mercado: "mr",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: {
    "mr.cnss-plafond": "numero",
    "mr.cnss-employeur": "numero",
    "mr.medecine-travail": "numero",
    "mr.cnam-employeur": "numero",
    "mr.taxe-apprentissage": "numero",
  },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "الأجر الإجمالي الشهري للعامل", min: 0, porDefecto: 30000 },
    CAMPO_CNAM,
    { id: "reel", tipo: "si-no", etiqueta: "المؤسسة خاضعة لنظام حقيقي في الضريبة على الأرباح", ayuda: "هذه المؤسسات تدفع رسم التمهين على مجموع الأجور.", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("أدخل الأجر الإجمالي الشهري.", "brut");
    const base = Math.min(entrada.brut, v["mr.cnss-plafond"]);
    const cnss = porcentaje(base, v["mr.cnss-employeur"]);
    const medecine = porcentaje(base, v["mr.medecine-travail"]);
    const cnam = entrada.cnam ? porcentaje(entrada.brut, v["mr.cnam-employeur"]) : 0;
    const apprentissage = entrada.reel ? porcentaje(entrada.brut, v["mr.taxe-apprentissage"]) : 0;
    const charges = cnss + medecine + cnam + apprentissage;
    const cout = entrada.brut + charges;
    return {
      cout: redondear(cout),
      charges: redondear(charges),
      cnss: redondear(cnss),
      medecine: redondear(medecine),
      cnam: redondear(cnam),
      apprentissage: redondear(apprentissage),
      taux: (charges / entrada.brut) * 100,
      annuel: redondear(cout * 12),
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "الكلفة الشهرية على المشغل", formato: "moneda", destacada: true },
    { clave: "charges", etiqueta: "الأعباء فوق الأجر الإجمالي", formato: "moneda" },
    { clave: "cnss", etiqueta: "حصة المشغل في CNSS", formato: "moneda" },
    { clave: "medecine", etiqueta: "اشتراك طب الشغل", formato: "moneda" },
    { clave: "cnam", etiqueta: "حصة المشغل في CNAM", formato: "moneda", ocultarSiCero: true },
    { clave: "apprentissage", etiqueta: "رسم التمهين", formato: "moneda", ocultarSiCero: true },
    { clave: "taux", etiqueta: "الأعباء كنسبة من الأجر الإجمالي", formato: "porcentaje", decimales: 2 },
    { clave: "annuel", etiqueta: "الكلفة في السنة", formato: "moneda" },
  ],
});
