import { definirTextos } from "@/motor/edicion";
import calculIrgSalaire from "../../dz/calculadoras/calcul-irg-salaire";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(calculIrgSalaire, {
  calculadora: "dz-ar.calcul-irg-salaire",
  slug: "calcul-irg-salaire",
  campos: {
    montant: { etiqueta: "المبلغ الشهري" },
    base: {
      etiqueta: "هذا المبلغ هو",
      opciones: {
        brut: "أجر إجمالي (قبل اشتراك الضمان الاجتماعي)",
        imposable: "دخل خاضع للضريبة (بعد خصم الاشتراك) أو معاش",
      },
    },
    special: {
      etiqueta: "عامل معوق أو متقاعد من النظام العام",
      ayuda: "إعاقة حركية أو ذهنية، أو كفيف، أو أصم أبكم. يفتح الحق في تخفيض إضافي على المداخيل المتواضعة.",
    },
  },
  filas: {
    irg: { etiqueta: "الضريبة على الدخل الإجمالي المقتطعة كل شهر" },
    imposable: { etiqueta: "الدخل الشهري الخاضع للضريبة" },
    cnas: { etiqueta: "اشتراك الضمان الاجتماعي المخصوم" },
    bareme: { etiqueta: "ضريبة الجدول قبل التخفيض" },
    abattement: { etiqueta: "التخفيض النسبي" },
    apresImpot: { etiqueta: "الدخل بعد الضريبة" },
    tauxMoyen: { etiqueta: "المعدل المتوسط للضريبة" },
    irgAnnuel: { etiqueta: "الضريبة على 12 شهرًا" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Votre revenu imposable ne dépasse pas le seuil d'exonération totale : aucun IRG n'est retenu.":
      "لا يتجاوز دخلك الخاضع للضريبة عتبة الإعفاء الكلي، فلا تُقتطع أي ضريبة على الدخل الإجمالي.",
    "Votre revenu imposable se situe dans la zone du deuxième abattement : l'impôt est réduit par la formule de lissage.":
      "يقع دخلك الخاضع للضريبة في مجال التخفيض الثاني، فتُخفَّف الضريبة بصيغة التمهيد.",
    "Vous bénéficiez de l'abattement supplémentaire réservé aux travailleurs handicapés et aux retraités du régime général.":
      "تستفيد من التخفيض الإضافي المخصص للعمال المعوقين والمتقاعدين من النظام العام.",
    "L'impôt est celui du barème, diminué de l'abattement proportionnel.": "الضريبة هي ضريبة الجدول، مخصومًا منها التخفيض النسبي.",
  },
});
