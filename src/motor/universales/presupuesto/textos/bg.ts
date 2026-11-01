import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosBg: TextosUi<UiPresupuesto> = {
  slug: "byudzhet-50-30-20",
  ui: () => ({
    ingreso: "Месечен нетен доход",
    ingresoAyuda: "Сумата, която постъпва в сметката Ви всеки месец, след данъците и осигуровките.",
    pctNecesidades: "Нужди (%)",
    pctNecesidadesAyuda: "Жилище, храна, сметки за ток и вода, транспорт, здраве и минималните вноски по кредити.",
    pctGustos: "Желания (%)",
    pctGustosAyuda: "Заведения, покупки, без които можете, абонаменти, пътувания.",
    pctAhorro: "Спестявания (%)",
    pctAhorroAyuda: "Финансова възглавница, цели, пенсия и допълнителни вноски по дългове.",
    necesidades: "За нужди",
    gustos: "За желания",
    ahorro: "За спестявания",
    ahorroAnual: "Спестявания за година",
    errorIngreso: "Въведете месечния си доход.",
    errorSuma: (suma) => `Трите процента правят общо ${suma}%. Сборът им трябва да е 100%.`,
    observacionAhorroBajo: "Ако спестявате по-малко от 10%, остава малко място за непредвидени разходи. Ако можете, намалете част от желанията.",
  }),
};
