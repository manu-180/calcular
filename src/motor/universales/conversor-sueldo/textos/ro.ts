import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosRo: TextosUi<UiConversorSueldo> = {
  slug: "calculator-salariu-pe-ora",
  ui: () => ({
    monto: "Salariul",
    periodo: "Salariul este pe",
    hora: "Oră",
    dia: "Zi",
    semana: "Săptămână",
    quincena: "Jumătate de lună (24 pe an)",
    mes: "Lună",
    anio: "An",
    horasSemana: "Ore lucrate pe săptămână",
    diasSemana: "Zile lucrate pe săptămână",
    semanasAnio: "Săptămâni plătite pe an",
    semanasAnioAyuda: "52 dacă aveți concediu plătit. Dacă sunteți plătit doar pentru săptămânile lucrate, scădeți-le pe celelalte.",
    porHora: "Pe oră",
    porDia: "Pe zi",
    porSemana: "Pe săptămână",
    porQuincena: "Pe jumătate de lună",
    porMes: "Pe lună",
    porAnio: "Pe an",
    errorHoras: "Introduceți câte ore lucrați pe săptămână.",
    errorSemanas: "Săptămânile plătite pe an trebuie să fie mai multe decât zero.",
    observacionBruto: "Este aceeași sumă exprimată pe alte perioade. Nu se adaugă bonusuri și nu se scad impozite.",
  }),
};
