import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosRu: TextosUi<UiMetaDeAhorro> = {
  slug: "kalkulyator-nakopleniy",
  ui: () => ({
    meta: "Сколько вы хотите накопить?",
    actual: "Сколько уже накоплено (необязательно)",
    meses: "За сколько месяцев",
    rendimiento: "Годовая доходность накоплений (%, необязательно)",
    rendimientoAyuda: "Если деньги лежат на вкладе или в инструменте, который приносит проценты. Оставьте пустым, если дохода нет.",
    aporteMensual: "Нужно откладывать в месяц",
    aporteSemanal: "Это в неделю",
    totalAportado: "Всего вы внесете",
    intereses: "Доход от процентов",
    errorMeta: "Введите сумму, которую хотите накопить.",
    yaLlegas: "Уже накопленных денег хватит, чтобы достичь цели в этот срок без новых взносов.",
  }),
};
