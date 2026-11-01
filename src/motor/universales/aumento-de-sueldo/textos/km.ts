import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosKm: TextosUi<UiAumentoDeSueldo> = {
  slug: "pay-raise",
  ui: () => ({
    sueldo: "ប្រាក់ខែបច្ចុប្បន្ន",
    sueldoAyuda: "ប្រើប្រាក់ខែសរុប ឬប្រាក់ខែសុទ្ធក៏បាន។ លទ្ធផលនឹងប្រើមូលដ្ឋានដូចគ្នា។",
    aumentoPorcentaje: "ការដំឡើងប្រាក់ខែ (%)",
    aumentoMonto: "ចំនួនទឹកប្រាក់ដែលដំឡើង (ស្រេចចិត្ត)",
    aumentoMontoAyuda: "បើដំឡើងជាចំនួនថេរ សូមបញ្ចូលនៅទីនេះ។ តម្លៃនេះនឹងប្រើជំនួសភាគរយ។",
    inflacion: "អតិផរណាក្នុងរយៈពេលដូចគ្នា (% ស្រេចចិត្ត)",
    inflacionAyuda: "អតិផរណាគិតពីការដំឡើងលើកមុន ដើម្បីមើលថាប្រាក់ខែទិញបានច្រើនឬតិចជាងមុន។",
    sueldosAnio: "ចំនួនដងទទួលប្រាក់ខែក្នុងមួយឆ្នាំ",
    sueldosAnioAyuda: "ដាក់ 12 សម្រាប់ប្រាក់ខែប្រចាំខែ ឬ 13 ដល់ 14 បើទទួលប្រាក់បន្ថែមមួយខែរៀងរាល់ឆ្នាំ។",
    nuevo: "ប្រាក់ខែថ្មី",
    diferenciaMensual: "ភាពខុសគ្នាក្នុងមួយខែ",
    diferenciaAnual: "ភាពខុសគ្នាក្នុងមួយឆ្នាំ",
    porcentaje: "អត្រាដំឡើងប្រាក់ខែ",
    real: "ការដំឡើងពិត (ក្រោយដកអតិផរណា)",
    realAyuda: "ប្រាក់ខែថ្មីទិញបានច្រើនជាងប្រាក់ខែចាស់ប៉ុន្មាន។",
    errorSueldo: "សូមបញ្ចូលប្រាក់ខែបច្ចុប្បន្ន។",
    errorSinAumento: "សូមបញ្ចូលការដំឡើងជាភាគរយ ឬជាចំនួនទឹកប្រាក់។",
    observacionGana: (puntos) => `ការដំឡើងខ្ពស់ជាងអតិផរណា។ ប្រាក់ខែទិញបានច្រើនជាងមុន ${puntos}%។`,
    observacionPierde: (puntos) => `ការដំឡើងទាបជាងអតិផរណា។ ប្រាក់ខែទិញបានតិចជាងមុន ${puntos}%។`,
    observacionIgual: "ការដំឡើងស្មើនឹងអតិផរណា។ ប្រាក់ខែទិញបានដូចមុន។",
  }),
};
