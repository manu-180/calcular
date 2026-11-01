import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosMk: TextosUi<UiSumarDias> = {
  slug: "kalkulator-za-dodavanje-denovi-na-datum",
  ui: () => ({
    fecha: "Почетен датум",
    operacion: "Операција",
    sumar: "Додавање денови",
    restar: "Одземање денови",
    dias: "Број на денови",
    tipo: "Вид денови",
    corridos: "Календарски денови",
    habiles: "Работни денови (од понеделник до петок)",
    resultado: "Добиен датум",
    diaSemana: "Ден во неделата",
    diasCorridos: "Вкупно календарски денови",
    nombresDias: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
    errorDias: "Бројот на денови мора да биде цел број, до 100 години.",
    notaHabiles: "Работните денови ги прескокнуваат саботите и неделите, но не и државните празници. Ако има празник помеѓу, додајте го посебно.",
  }),
};
