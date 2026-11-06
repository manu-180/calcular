import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosKm: TextosUi<UiPropina> = {
  slug: "tip",
  ui: () => ({
    cuenta: "ចំនួនទឹកប្រាក់លើវិក្កយបត្រ",
    porcentaje: "ប្រាក់ទឹកតែ (%)",
    porcentajeAyuda: "ទំនៀមនៃការឱ្យប្រាក់ទឹកតែខុសគ្នាតាមប្រទេស និងទីកន្លែង។ សូមជ្រើសរើសតាមការយល់ឃើញ។",
    personas: "ចំនួនអ្នកចែកគ្នាបង់",
    redondear: "បង្គត់ចំនួនម្នាក់ៗឡើងជាចំនួនគត់",
    redondearAyuda: "ដើម្បីឱ្យម្នាក់ៗបង់ជាចំនួនគត់។ ចំនួនលើសត្រូវបូកចូលប្រាក់ទឹកតែ។",
    propina: "ប្រាក់ទឹកតែ",
    total: "សរុបរួមទាំងប្រាក់ទឹកតែ",
    porPersona: "ម្នាក់បង់",
    propinaEfectiva: "ប្រាក់ទឹកតែក្រោយបង្គត់",
    errorPersonas: "ត្រូវមានអ្នកបង់យ៉ាងហោចណាស់ម្នាក់។",
    observacionRedondeo: (efectiva) => `ក្រោយបង្គត់ឡើង ប្រាក់ទឹកតែស្មើនឹង ${efectiva}% នៃវិក្កយបត្រ។`,
  }),
};
