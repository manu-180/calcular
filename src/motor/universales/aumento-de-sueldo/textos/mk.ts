import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosMk: TextosUi<UiAumentoDeSueldo> = {
  slug: "kalkulator-za-pokachuvanje-na-plata",
  ui: () => ({
    sueldo: "Сегашна месечна плата",
    sueldoAyuda: "Бруто или нето, како што сакате. Резултатот е на истата основа.",
    aumentoPorcentaje: "Покачување (%)",
    aumentoMonto: "Покачување како износ (по желба)",
    aumentoMontoAyuda: "Ако покачувањето е фиксен износ, внесете го овде. Тој се користи наместо процентот.",
    inflacion: "Инфлација за периодот (%, по желба)",
    inflacionAyuda: "Инфлацијата од последното покачување, за да видите дали платата купува повеќе или помалку од порано.",
    sueldosAnio: "Број на плати годишно",
    sueldosAnioAyuda: "12 при месечна плата. 13 или 14 ако добивате и дополнителна плата секоја година.",
    nuevo: "Нова месечна плата",
    diferenciaMensual: "Разлика на месец",
    diferenciaAnual: "Разлика на година",
    porcentaje: "Покачување во проценти",
    real: "Реално покачување (по инфлацијата)",
    realAyuda: "Колку повеќе купува новата плата во споредба со старата.",
    errorSueldo: "Внесете ја сегашната плата.",
    errorSinAumento: "Внесете го покачувањето во проценти или како износ.",
    observacionGana: (puntos) => `Ја престигнувате инфлацијата: вашата плата купува ${puntos} % повеќе од порано.`,
    observacionPierde: (puntos) => `Покачувањето заостанува зад инфлацијата: вашата плата купува ${puntos} % помалку од порано.`,
    observacionIgual: "Покачувањето е колку инфлацијата: вашата плата купува исто колку и порано.",
  }),
};
