import { definirTextos } from "@/motor/edicion";
import congeMaternite from "../../dz/calculadoras/conge-maternite";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(congeMaternite, {
  calculadora: "dz-ar.conge-maternite",
  slug: "conge-maternite",
  campos: {
    terme: { etiqueta: "التاريخ المفترض للولادة" },
    brut: { etiqueta: "الأجر الإجمالي الشهري", ayuda: "الأجر الخاضع للاشتراك، قبل اقتطاع الضمان الاجتماعي والضريبة على الدخل الإجمالي." },
  },
  filas: {
    total: { etiqueta: "التعويض عن العطلة" },
    mensuel: { etiqueta: "التعويض المعادل لشهر واحد" },
    journaliere: { etiqueta: "التعويضة اليومية" },
    jours: { etiqueta: "الأيام المعوَّضة" },
    duree: { etiqueta: "مدة عطلة الأمومة المعوَّضة" },
    debut: { etiqueta: "أبكر تاريخ لبداية العطلة" },
    fin: { etiqueta: "نهاية العطلة عند البدء في أبكر تاريخ" },
    finTerme: { etiqueta: "نهاية العطلة عند البدء يوم الولادة" },
  },
  mensajes: MENSAJES_COMUNES,
  traducir: (t) => {
    const m = /^Le congé peut commencer plus tard que la date au plus tôt : il dure toujours (\d+) semaines consécutives\./.exec(t);
    if (m) {
      return `يمكن أن تبدأ العطلة بعد أبكر تاريخ ممكن، ومدتها دائمًا ${m[1]} أسبوعًا متتالية. وتوافق تواريخ النهاية المعروضة البدء في أبكر تاريخ والبدء يوم الولادة.`;
    }
    return undefined;
  },
});
