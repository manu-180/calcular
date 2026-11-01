import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_CNAM, REQUIERE_SALARIO, retenciones } from "../lib/comun";

export default definirCalculadora({
  id: "mr.salaire-net",
  mercado: "mr",
  concepto: "sueldo-neto",
  slug: "salaire-net",
  estado: "publicado",
  requiere: { ...REQUIERE_SALARIO, "mr.cnss-employeur": "numero", "mr.its-indemnites": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "الأجر الإجمالي الشهري", ayuda: "الأجر الأساسي مع العلاوات والتعويضات الخاضعة للضريبة، قبل أي اقتطاع.", min: 0, porDefecto: 30000 },
    CAMPO_CNAM,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("أدخل الأجر الإجمالي الشهري.", "brut");
    const r = retenciones(v, entrada.brut, entrada.cnam);
    const observaciones = ["الحساب لعامل في القطاع الخاص. لا يدخل فيه تسبيق أو قرض أو اقتطاع آخر يرد في عقدك."];
    if (entrada.brut > v["mr.cnss-plafond"]) observaciones.push("اشتراك الضمان الاجتماعي حُسب على سقف الأجر الخاضع للاشتراك وليس على كامل الأجر.");
    if (r.its === 0) observaciones.push("بعد اقتطاع الاشتراكات والمبلغ المعفى لم يبق دخل خاضع للضريبة على الرواتب.");
    return {
      neto: redondear(r.neto),
      cnss: redondear(r.cnss),
      cnam: redondear(r.cnam),
      imponible: r.imponible,
      its: redondear(r.its),
      retenues: redondear(r.cnss + r.cnam + r.its),
      anual: redondear(r.neto * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "صافي الأجر الشهري", formato: "moneda", destacada: true },
    { clave: "cnss", etiqueta: "اشتراك الضمان الاجتماعي (CNSS)", formato: "moneda" },
    { clave: "cnam", etiqueta: "اشتراك التأمين الصحي (CNAM)", formato: "moneda", ocultarSiCero: true },
    { clave: "imponible", etiqueta: "الدخل الخاضع للضريبة على الرواتب", formato: "moneda" },
    { clave: "its", etiqueta: "الضريبة على الرواتب والأجور (ITS)", formato: "moneda" },
    { clave: "retenues", etiqueta: "مجموع الاقتطاعات", formato: "moneda" },
    { clave: "anual", etiqueta: "صافي الأجر في السنة", formato: "moneda" },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { cnam: true } },
});
