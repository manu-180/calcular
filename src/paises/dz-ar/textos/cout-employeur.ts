import { definirTextos } from "@/motor/edicion";
import coutEmployeur from "../../dz/calculadoras/cout-employeur";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(coutEmployeur, {
  calculadora: "dz-ar.cout-employeur",
  slug: "cout-employeur",
  campos: {
    brut: { etiqueta: "الأجر الإجمالي الشهري" },
    salaries: { etiqueta: "عدد العمال بهذا الأجر" },
  },
  filas: {
    cout: { etiqueta: "الكلفة الشهرية لعامل واحد" },
    patronale: { etiqueta: "اشتراك صاحب العمل لدى CNAS" },
    oeuvres: { etiqueta: "حصة الخدمات الاجتماعية" },
    coutMensuelTotal: { etiqueta: "الكلفة الشهرية لجميع العمال" },
    coutAnnuel: { etiqueta: "الكلفة على 12 شهرًا" },
    surcout: { etiqueta: "الأعباء فوق الأجر الإجمالي" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Le coût comprend le salaire brut, la part patronale de la cotisation de sécurité sociale et la quote-part du fonds des œuvres sociales. Il ne comprend pas les primes et avantages prévus par la convention collective ou le contrat.":
      "تشمل الكلفة الأجر الإجمالي وحصة صاحب العمل من اشتراك الضمان الاجتماعي وحصة صندوق الخدمات الاجتماعية. ولا تشمل المنح والامتيازات التي تنص عليها الاتفاقية الجماعية أو العقد.",
  },
});
