import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosKm: TextosUi<UiConversorSueldo> = {
  slug: "hourly-to-salary",
  ui: () => ({
    monto: "ប្រាក់ឈ្នួល",
    periodo: "ប្រាក់ឈ្នួលនេះគិតជា",
    hora: "ប្រចាំម៉ោង",
    dia: "ប្រចាំថ្ងៃ",
    semana: "ប្រចាំសប្តាហ៍",
    quincena: "ប្រចាំកន្លះខែ (24 ដងក្នុងមួយឆ្នាំ)",
    mes: "ប្រចាំខែ",
    anio: "ប្រចាំឆ្នាំ",
    horasSemana: "ម៉ោងធ្វើការក្នុងមួយសប្តាហ៍",
    diasSemana: "ថ្ងៃធ្វើការក្នុងមួយសប្តាហ៍",
    semanasAnio: "ចំនួនសប្តាហ៍ដែលទទួលប្រាក់ឈ្នួលក្នុងមួយឆ្នាំ",
    semanasAnioAyuda: "ដាក់ 52 បើទទួលប្រាក់ឈ្នួលក្នុងថ្ងៃឈប់សម្រាកដែរ។ បើទទួលតែសប្តាហ៍ដែលធ្វើការ សូមដកសប្តាហ៍ដែលនៅសល់ចេញ។",
    porHora: "ក្នុងមួយម៉ោង",
    porDia: "ក្នុងមួយថ្ងៃ",
    porSemana: "ក្នុងមួយសប្តាហ៍",
    porQuincena: "ក្នុងកន្លះខែ",
    porMes: "ក្នុងមួយខែ",
    porAnio: "ក្នុងមួយឆ្នាំ",
    errorHoras: "សូមបញ្ចូលម៉ោងធ្វើការក្នុងមួយសប្តាហ៍។",
    errorSemanas: "ចំនួនសប្តាហ៍ដែលទទួលប្រាក់ឈ្នួលត្រូវតែធំជាង 0។",
    observacionBruto: "នេះជាចំនួនទឹកប្រាក់ដូចគ្នាដែលប្តូរទៅរយៈពេលផ្សេង។ មិនរួមប្រាក់រង្វាន់ និងមិនទាន់ដកពន្ធទេ។",
  }),
};
