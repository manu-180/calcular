import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosMk: TextosUi<UiConversorSueldo> = {
  slug: "konverzija-na-plata",
  ui: () => ({
    monto: "Примање",
    periodo: "Примањето е за",
    hora: "Час",
    dia: "Ден",
    semana: "Недела",
    quincena: "Половина месец (24 пати годишно)",
    mes: "Месец",
    anio: "Година",
    horasSemana: "Одработени часови неделно",
    diasSemana: "Работни денови во неделата",
    semanasAnio: "Платени недели во годината",
    semanasAnioAyuda: "52 ако добивате платен одмор. Ако ве плаќаат само за неделите кога работите, одземете ги другите.",
    porHora: "На час",
    porDia: "На ден",
    porSemana: "На недела",
    porQuincena: "На половина месец",
    porMes: "На месец",
    porAnio: "На година",
    errorHoras: "Внесете колку часа работите неделно.",
    errorSemanas: "Платените недели во годината мора да бидат повеќе од нула.",
    observacionBruto: "Ова е истиот износ, изразен за други периоди. Бонусите не се додаваат и даноците не се одземаат.",
  }),
};
