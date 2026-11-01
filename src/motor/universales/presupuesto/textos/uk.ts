import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosUk: TextosUi<UiPresupuesto> = {
  slug: "biudzhet-50-30-20",
  ui: () => ({
    ingreso: "Щомісячний дохід на руки",
    ingresoAyuda: "Сума, яка щомісяця надходить на ваш рахунок після податків і утримань.",
    pctNecesidades: "Обовʼязкові витрати (%)",
    pctNecesidadesAyuda: "Житло, продукти, комунальні послуги, транспорт, здоровʼя і мінімальні платежі за боргами.",
    pctGustos: "Бажання (%)",
    pctGustosAyuda: "Кафе й ресторани, необовʼязкові покупки, підписки, подорожі.",
    pctAhorro: "Заощадження (%)",
    pctAhorroAyuda: "Фінансова подушка, цілі, пенсія і додаткові платежі за боргами.",
    necesidades: "На обовʼязкові витрати",
    gustos: "На бажання",
    ahorro: "На заощадження",
    ahorroAnual: "Заощадження за рік",
    errorIngreso: "Введіть свій щомісячний дохід.",
    errorSuma: (suma) => `Сума трьох відсотків становить ${suma}%. Вона має дорівнювати 100%.`,
    observacionAhorroBajo: "Якщо відкладати менше ніж 10%, залишається мало запасу на непередбачене. За можливості скоротіть частину бажань.",
  }),
};
