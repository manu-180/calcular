import { definirTextos } from "@/motor/edicion";
import plusValueCessionActions from "../../dz/calculadoras/plus-value-cession-actions";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(plusValueCessionActions, {
  calculadora: "dz-ar.plus-value-cession-actions",
  slug: "plus-value-cession-actions",
  campos: {
    cession: { etiqueta: "سعر التنازل عن السندات" },
    frais: { etiqueta: "الحقوق والرسوم والمصاريف التي دفعها البائع" },
    acquisition: {
      etiqueta: "سعر الاقتناء أو الاكتتاب",
      ayuda: "بالنسبة لسندات آلت إليك بهبة أو إرث، قيمتها التجارية في ذلك التاريخ.",
    },
    situation: {
      etiqueta: "وضعية المتنازل",
      opciones: {
        normal: "مقيم جبائيًا في الجزائر",
        reinvesti: "مقيم جبائيًا في الجزائر، مع التزام بإعادة الاستثمار",
        "non-resident": "مقيم جبائيًا خارج الجزائر",
      },
    },
  },
  filas: {
    impot: { etiqueta: "الضريبة على الدخل الإجمالي عن فائض القيمة" },
    plusValue: { etiqueta: "فائض القيمة الخاضع للضريبة" },
    taux: { etiqueta: "النسبة المطبقة" },
    net: { etiqueta: "الحاصل الصافي من التنازل" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Les frais du vendeur doivent rester inférieurs au prix de cession.": "يجب أن تبقى مصاريف البائع أقل من سعر التنازل.",
    "L'impôt est payé dans les 30 jours qui suivent la cession, à la recette des impôts dont dépend le siège social de la société.":
      "تُدفع الضريبة في أجل 30 يومًا من التنازل، لدى قباضة الضرائب التي يتبعها المقر الاجتماعي للشركة.",
    "Le taux réduit suppose de réinvestir la plus-value au capital d'une ou plusieurs entreprises au plus tard le 31 décembre de l'année qui suit la cession. Sinon, l'administration rappelle la différence d'impôt avec une majoration de 25 %.":
      "تفترض النسبة المخفضة إعادة استثمار فائض القيمة في رأسمال مؤسسة أو أكثر في أجل أقصاه 31 ديسمبر من السنة التي تلي التنازل. وإلا تطالب الإدارة بفارق الضريبة مع زيادة قدرها 25 %.",
  },
});
