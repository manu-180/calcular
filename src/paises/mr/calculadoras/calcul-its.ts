import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_CNAM, REQUIERE_SALARIO, baseItsRedondeada, retenciones } from "../lib/comun";

export default definirCalculadora({
  id: "mr.calcul-its",
  mercado: "mr",
  concepto: "impuesto-renta",
  slug: "calcul-its",
  estado: "publicado",
  requiere: { ...REQUIERE_SALARIO, "mr.its-indemnites": "numero" },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "ما الذي تعرفه",
      opciones: [
        { valor: "brut", etiqueta: "الأجر الإجمالي الشهري" },
        { valor: "imposable", etiqueta: "الدخل الخاضع للضريبة مباشرة" },
      ],
      porDefecto: "brut",
    },
    { id: "montant", tipo: "moneda", etiqueta: "المبلغ الشهري", min: 0, porDefecto: 30000 },
    { id: "indemnites", tipo: "moneda", etiqueta: "تعويضات مهنية معفاة (غير السكن والنقل)", ayuda: "مصاريف مهنية ليست زيادة في الأجر. يُعفى منها حد شهري يحدده القانون.", min: 0, porDefecto: 0, visibleSi: { modo: ["brut"] } },
    { ...CAMPO_CNAM, visibleSi: { modo: ["brut"] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("أدخل المبلغ الشهري.", "montant");
    let imponible: number;
    if (entrada.modo === "brut") {
      const exentas = Math.min(entrada.indemnites ?? 0, v["mr.its-indemnites"]);
      if (exentas > entrada.montant) throw new ErrorEntrada("التعويضات لا يمكن أن تتجاوز الأجر الإجمالي.", "indemnites");
      imponible = retenciones(v, entrada.montant, entrada.cnam ?? true, exentas).imponible;
    } else {
      imponible = baseItsRedondeada(entrada.montant);
    }
    const [t1, t2, t3] = v["mr.its-bareme"];
    const parte = (f: typeof t1) => Math.max(0, Math.min(imponible, f.hasta ?? Infinity) - f.desde) * f.tasa / 100;
    const p1 = parte(t1);
    const p2 = parte(t2);
    const p3 = parte(t3);
    const total = p1 + p2 + p3;
    const marginal = imponible > t3.desde ? t3.tasa : imponible > t2.desde ? t2.tasa : imponible > 0 ? t1.tasa : 0;
    return {
      its: redondear(total),
      imponible,
      tranche1: redondear(p1),
      tranche2: redondear(p2),
      tranche3: redondear(p3),
      moyen: imponible > 0 ? (total / imponible) * 100 : 0,
      marginal,
      anual: redondear(total * 12),
    };
  },
  resultado: [
    { clave: "its", etiqueta: "الضريبة على الرواتب في الشهر", formato: "moneda", destacada: true },
    { clave: "imponible", etiqueta: "الدخل الخاضع للضريبة (مجبورًا إلى العشرة الأدنى)", formato: "moneda" },
    { clave: "tranche1", etiqueta: "ضريبة الشريحة الأولى", formato: "moneda" },
    { clave: "tranche2", etiqueta: "ضريبة الشريحة الثانية", formato: "moneda", ocultarSiCero: true },
    { clave: "tranche3", etiqueta: "ضريبة الشريحة الثالثة", formato: "moneda", ocultarSiCero: true },
    { clave: "moyen", etiqueta: "النسبة المتوسطة", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "النسبة الحدية", formato: "porcentaje" },
    { clave: "anual", etiqueta: "الضريبة في السنة", formato: "moneda" },
  ],
});
