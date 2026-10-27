import { definirTextos } from "@/motor/edicion";
import calculIfu from "../../dz/calculadoras/calcul-ifu";

export default definirTextos(calculIfu, {
  calculadora: "dz-ar.calcul-ifu",
  slug: "calcul-ifu",
  campos: {
    ca: { etiqueta: "رقم الأعمال السنوي" },
    activite: { etiqueta: "النشاط أو الوضعية" },
  },
  filas: {
    ifu: { etiqueta: "الضريبة الجزافية الوحيدة المستحقة للسنة" },
    taux: { etiqueta: "النسبة المطبقة" },
    calcule: { etiqueta: "الضريبة المحسوبة على رقم الأعمال" },
    minimum: { etiqueta: "الحد الأدنى للضريبة" },
    mensuel: { etiqueta: "ما يعادلها في الشهر" },
  },
  mensajes: {
    "Indiquez un chiffre d'affaires positif.": "أدخل رقم أعمال موجبًا.",
    "Le montant calculé est inférieur au minimum d'imposition : c'est le minimum qui est dû.":
      "المبلغ المحسوب أقل من الحد الأدنى للضريبة، فيُستحق الحد الأدنى.",
    "Ce chiffre d'affaires dépasse le plafond de l'IFU. Le régime reste applicable l'année du dépassement et l'année suivante.":
      "يتجاوز رقم الأعمال هذا سقف الضريبة الجزافية الوحيدة. ويبقى النظام مطبقًا في سنة التجاوز والسنة التي تليها.",
  },
});
