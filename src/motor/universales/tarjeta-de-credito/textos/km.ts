import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosKm: TextosUi<UiTarjetaDeCredito> = {
  slug: "credit-card-payoff",
  ui: () => ({
    saldo: "សមតុល្យជំពាក់លើប័ណ្ណឥណទាន",
    tasa: "អត្រាការប្រាក់ប្រចាំឆ្នាំ (%)",
    tasaAyuda: "អត្រាការប្រាក់សម្រាប់ការចំណាយ មើលបានលើរបាយការណ៍ប័ណ្ណ។",
    modo: "វិធីទូទាត់",
    modoFijo: "ទូទាត់ចំនួនដូចគ្នារៀងរាល់ខែ",
    modoMinimo: "ទូទាត់ចំនួនអប្បបរមា",
    pagoFijo: "ចំនួនទូទាត់ប្រចាំខែ",
    minimoPorcentaje: "ចំនួនអប្បបរមា (% នៃសមតុល្យ)",
    minimoPorcentajeAyuda: "ចំនួនដែលអ្នកចេញប័ណ្ណកំណត់ឱ្យទូទាត់រៀងរាល់ខែ។ បើមិនច្បាស់ 5% ជាអត្រាដែលឃើញញឹកញាប់។",
    minimoPiso: "ចំនួនអប្បបរមាមិនតិចជាង",
    meses: "ចំនួនខែរហូតដល់ទូទាត់អស់",
    intereses: "ការប្រាក់ដែលត្រូវបង់",
    total: "ចំនួនទូទាត់សរុប",
    primerPago: "ចំនួនអប្បបរមាខែទីមួយ",
    tabla: "ផែនការទូទាត់ប្រចាំខែ",
    colMes: "ខែទី",
    colPago: "ការទូទាត់",
    colInteres: "ការប្រាក់",
    colCapital: "ប្រាក់ដើម",
    colSaldo: "សមតុល្យនៅសល់",
    errorSaldo: "សូមបញ្ចូលសមតុល្យជំពាក់លើប័ណ្ណឥណទាន។",
    errorFaltaPago: "សូមបញ្ចូលចំនួនដែលនឹងទូទាត់ប្រចាំខែ។",
    errorNoCubre: (interes) => `ជាមួយចំនួនទូទាត់នេះ បំណុលនឹងមិនថយទេ ព្រោះការប្រាក់ខែទីមួយតែឯងក៏ស្មើនឹង ${interes} រួចហើយ។ សូមបង្កើនចំនួនទូទាត់។`,
    errorMuyLargo: "ជាមួយចំនួនទូទាត់នេះ ត្រូវប្រើពេលជាង 50 ឆ្នាំទើបទូទាត់អស់។ សូមបង្កើនចំនួនទូទាត់។",
    observacionAnios: (anios, meses) => `គិតជា ${anios} ឆ្នាំ${meses === "0" ? "" : ` ${meses} ខែ`}`,
    observacionFijo: (pago, meses, ahorro) =>
      `បើទូទាត់ ${pago} រៀងរាល់ខែ ស្មើនឹងចំនួនអប្បបរមាខែទីមួយ នឹងទូទាត់អស់ក្នុង ${meses} ខែ និងសន្សំការប្រាក់បាន ${ahorro}។`,
    observacionNoGastar: "ការគណនានេះសន្មតថាមិនមានការចំណាយថ្មីតាមប័ណ្ណ អំឡុងពេលកំពុងទូទាត់។",
  }),
};
