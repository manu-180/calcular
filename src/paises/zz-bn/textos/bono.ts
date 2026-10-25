import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-bn.bono",
  slug: "half-year-bonus",
  campos: {
    sueldo: { etiqueta: "মাসিক মোট বেতন" },
    meses: { etiqueta: "এই ছয় মাসে কত মাস কাজ করেছেন" },
    region: { etiqueta: "কর্মস্থলের অঞ্চল" },
    regimen: { etiqueta: "প্রতিষ্ঠানের আকার", opciones: { general: "মাঝারি বা বড় প্রতিষ্ঠান", pequena: "ছোট প্রতিষ্ঠান" } },
  },
  filas: {
    base: { etiqueta: "হিসাবে ধরা বেতন" },
    bono: { etiqueta: "বোনাস" },
    bonificacion: { etiqueta: "অতিরিক্ত অংশ" },
    total: { etiqueta: "মোট যা পাবেন" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "মাসের সংখ্যা ১ থেকে ৬ এর মধ্যে হতে হবে।",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "আপনার বেতন আপনার অঞ্চলের ন্যূনতম মজুরির চেয়ে কম, তাই বোনাস হিসাব করা হয়েছে ন্যূনতম মজুরি ধরে।",
  },
});
