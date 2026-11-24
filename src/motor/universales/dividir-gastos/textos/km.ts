import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosKm: TextosUi<UiDividirGastos> = {
  slug: "split-bill",
  ui: () => ({
    persona: (n) => `អ្នកទី ${n}`,
    personaAyuda: "បញ្ចូលចំនួនទឹកប្រាក់ដែលម្នាក់ៗបានចំណាយ។ ប្រសិនបើមាននរណាម្នាក់មិនទាន់ចំណាយ តែត្រូវចូលរួមចែក សូមបញ្ចូល 0។ ប្រអប់ដែលនៅសល់ទុកទទេ។",
    total: "ការចំណាយសរុប",
    personas: "ចំនួនអ្នកចូលរួម",
    cuota: "ចំណែកដែលម្នាក់ៗត្រូវចេញ",
    transferencias: "ចំនួនដងដែលត្រូវផ្ទេរប្រាក់",
    tabla: "នរណាត្រូវផ្ទេរឱ្យនរណា",
    colDe: "អ្នកផ្ទេរ",
    colPara: "អ្នកទទួល",
    colMonto: "ចំនួនទឹកប្រាក់",
    errorPocas: "ត្រូវមានយ៉ាងហោចណាស់ពីរនាក់ ទើបអាចចែកការចំណាយបាន។",
    aMano: "គ្មាននរណាត្រូវផ្ទេរប្រាក់ទេ ព្រោះគ្រប់គ្នាបានចេញស្មើគ្នារួចហើយ។",
  }),
};
