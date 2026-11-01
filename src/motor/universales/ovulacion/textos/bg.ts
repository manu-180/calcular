import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosBg: TextosUi<UiOvulacion> = {
  slug: "kalkulator-za-ovulatsia",
  ui: () => ({
    fum: "Първи ден на последната менструация",
    fumAyuda: "Първият ден на кървенето, не последният.",
    ciclo: "Продължителност на цикъла (дни)",
    cicloAyuda: "От първия ден на една менструация до деня преди следващата. Ако варира, въведете средна стойност.",
    ovulacion: "Очаквана овулация",
    fertilDesde: "Плодни дни от",
    fertilHasta: "Плодни дни до",
    proxima: "Следваща менструация",
    tabla: "Следващи цикли",
    colRegla: "Менструация",
    colDesde: "Плодни от",
    colHasta: "Плодни до",
    colOvulacion: "Овулация",
    errorCiclo: "Продължителността на цикъла трябва да е между 21 и 45 дни.",
    aviso: "Това е ориентировъчна оценка за редовен цикъл. Не е метод за контрацепция и не замества консултацията с медицински специалист.",
  }),
};
