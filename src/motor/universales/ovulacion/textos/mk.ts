import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosMk: TextosUi<UiOvulacion> = {
  slug: "kalkulator-za-ovulacija",
  ui: () => ({
    fum: "Прв ден од последната менструација",
    fumAyuda: "Првиот ден на крварењето, не последниот.",
    ciclo: "Должина на циклусот (денови)",
    cicloAyuda: "Од првиот ден на една менструација до денот пред следната. Ако варира, внесете просечна вредност.",
    ovulacion: "Очекувана овулација",
    fertilDesde: "Плодни денови од",
    fertilHasta: "Плодни денови до",
    proxima: "Следна менструација",
    tabla: "Следни циклуси",
    colRegla: "Менструација",
    colDesde: "Плодни од",
    colHasta: "Плодни до",
    colOvulacion: "Овулација",
    errorCiclo: "Должината на циклусот треба да биде меѓу 21 и 45 дена.",
    aviso: "Ова е ориентациона проценка за редовен циклус. Не е метод за контрацепција и не ја заменува консултацијата со здравствен работник.",
  }),
};
