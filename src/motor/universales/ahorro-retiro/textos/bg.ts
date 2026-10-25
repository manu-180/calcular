import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosBg: TextosUi<UiAhorroRetiro> = {
  slug: "spestyavane-za-pensia",
  ui: () => ({
    edadActual: "Вашата възраст сега",
    edadRetiro: "На каква възраст искате да се пенсионирате",
    actual: "Колко сте спестили досега",
    aporte: "Месечна вноска",
    rendimiento: "Реална годишна доходност (%)",
    rendimientoAyuda: "Колко печели инвестицията над инфлацията. В дългосрочен план 2% до 5% е предпазливо допускане.",
    aniosRenta: "Колко години пенсия да покрият спестяванията",
    aniosRentaAyuda: "През колко години искате да теглите от тези спестявания.",
    capital: "Спестявания при пенсиониране",
    renta: "Месечен доход от спестяванията",
    aportado: "Общо внесено",
    intereses: "Общ ръст",
    tabla: "Ръст по възраст",
    colEdad: "Възраст",
    colAportado: "Внесено до момента",
    colSaldo: "Спестявания",
    errorEdades: "Възрастта за пенсиониране трябва да е по-голяма от сегашната Ви възраст.",
    errorSinAhorro: "Въведете сегашните си спестявания или месечна вноска.",
    observacionDineroDeHoy: "Сумите са в днешни пари, защото доходността вече е без инфлацията.",
    observacionPublica: "Това са само Вашите лични спестявания. Държавната пенсия и допълнителното пенсионно осигуряване не са включени.",
  }),
};
