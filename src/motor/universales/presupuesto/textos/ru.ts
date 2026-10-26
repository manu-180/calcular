import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosRu: TextosUi<UiPresupuesto> = {
  slug: "byudzhet-50-30-20",
  ui: () => ({
    ingreso: "Доход на руки в месяц",
    ingresoAyuda: "Сумма, которая каждый месяц приходит на ваш счет после налогов и удержаний.",
    pctNecesidades: "Обязательные расходы (%)",
    pctNecesidadesAyuda: "Жилье, продукты, коммунальные услуги, транспорт, здоровье и минимальные платежи по кредитам.",
    pctGustos: "Желания (%)",
    pctGustosAyuda: "Кафе и рестораны, необязательные покупки, подписки, поездки.",
    pctAhorro: "Сбережения (%)",
    pctAhorroAyuda: "Финансовая подушка, цели, пенсия и досрочное погашение долгов.",
    necesidades: "На обязательные расходы",
    gustos: "На желания",
    ahorro: "В сбережения",
    ahorroAnual: "Сбережения за год",
    errorIngreso: "Введите ваш доход в месяц.",
    errorSuma: (suma) => `Сумма трех долей равна ${suma}%. Нужно, чтобы она составляла 100%.`,
    observacionAhorroBajo: "Если откладывать меньше 10%, на непредвиденные расходы почти ничего не остается. По возможности сократите траты на желания.",
  }),
};
