import { definirTextos } from "@/motor/edicion";
import snmgAlgerie from "../../dz/calculadoras/snmg-algerie";

export default definirTextos(snmgAlgerie, {
  calculadora: "dz-ar.snmg-algerie",
  slug: "snmg-algerie",
  campos: {
    heures: { etiqueta: "ساعات العمل في الأسبوع" },
    salaire: { etiqueta: "أجرك القاعدي الشهري (اختياري)", ayuda: "للتحقق من أنه يبلغ الحد الأدنى." },
  },
  filas: {
    minimum: { etiqueta: "الأجر الأدنى الشهري" },
    horaire: { etiqueta: "الأجر الساعي للأجر الوطني الأدنى المضمون" },
    heuresMois: { etiqueta: "الساعات المدفوعة في الشهر" },
    annuel: { etiqueta: "الحد الأدنى على 12 شهرًا" },
    ecart: { etiqueta: "الفرق بين أجرك والحد الأدنى" },
  },
  mensajes: {
    "Indiquez un nombre d'heures supérieur à zéro.": "أدخل عدد ساعات أكبر من الصفر.",
    "Pour un temps partiel, le minimum est ramené au prorata des heures sur la base du taux horaire du SNMG.":
      "في العمل بالتوقيت الجزئي، يُحسب الحد الأدنى بالتناسب مع الساعات على أساس الأجر الساعي للأجر الوطني الأدنى المضمون.",
    "Les heures au-delà de la durée légale sont des heures supplémentaires, payées avec une majoration en plus du salaire mensuel.":
      "الساعات التي تتجاوز المدة القانونية ساعات إضافية، تُدفع بزيادة فوق الأجر الشهري.",
    "Votre salaire atteint le minimum.": "أجرك يبلغ الحد الأدنى.",
    "Votre salaire est inférieur au minimum pour ces heures.": "أجرك أقل من الحد الأدنى لهذه الساعات.",
  },
});
