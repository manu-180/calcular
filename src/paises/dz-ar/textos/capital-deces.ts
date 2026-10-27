import { definirTextos } from "@/motor/edicion";
import capitalDeces from "../../dz/calculadoras/capital-deces";

export default definirTextos(capitalDeces, {
  calculadora: "dz-ar.capital-deces",
  slug: "capital-deces",
  campos: {
    salaire: { etiqueta: "الأجر الشهري الأكثر فائدة", ayuda: "أعلى أجر شهري خاضع للاشتراك خلال السنة التي سبقت الوفاة." },
  },
  filas: {
    capital: { etiqueta: "رأسمال الوفاة الذي يدفعه الضمان الاجتماعي" },
    calcule: { etiqueta: "اثنا عشر شهرًا من الأجر المدخل" },
    minimum: { etiqueta: "الحد الأدنى القانوني" },
  },
  mensajes: {
    "Indiquez un salaire positif ou nul.": "أدخل أجرًا موجبًا أو صفرًا.",
    "Le capital est versé en une seule fois, dès le décès, aux ayants droit de l'assuré : conjoint, enfants à charge et ascendants à charge. Le droit suppose d'avoir travaillé au moins quinze jours ou cent heures dans les trois mois précédant le décès.":
      "يُدفع رأسمال الوفاة دفعة واحدة، فور الوفاة، لذوي حقوق المؤمَّن له: الزوج والأولاد المكفولون والأصول المكفولون. ويشترط الحق أن يكون المؤمَّن له قد عمل خمسة عشر يومًا أو مائة ساعة على الأقل خلال الأشهر الثلاثة السابقة للوفاة.",
  },
});
