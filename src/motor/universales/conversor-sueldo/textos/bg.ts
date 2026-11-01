import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosBg: TextosUi<UiConversorSueldo> = {
  slug: "zaplata-na-chas",
  ui: () => ({
    monto: "Възнаграждение",
    periodo: "Възнаграждението е за",
    hora: "Час",
    dia: "Ден",
    semana: "Седмица",
    quincena: "Половин месец (24 пъти в годината)",
    mes: "Месец",
    anio: "Година",
    horasSemana: "Отработени часове на седмица",
    diasSemana: "Работни дни в седмицата",
    semanasAnio: "Платени седмици в годината",
    semanasAnioAyuda: "52, ако получавате платен отпуск. Ако Ви плащат само за седмиците, в които работите, извадете останалите.",
    porHora: "На час",
    porDia: "На ден",
    porSemana: "На седмица",
    porQuincena: "На половин месец",
    porMes: "На месец",
    porAnio: "На година",
    errorHoras: "Въведете колко часа работите на седмица.",
    errorSemanas: "Платените седмици в годината трябва да са повече от нула.",
    observacionBruto: "Това е същата сума, изразена за други периоди. Бонусите не се добавят и данъците не се изваждат.",
  }),
};
