import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosBn: TextosUi<UiCeramicos> = {
  slug: "tile-calculator",
  ui: () => ({
    superficie: (u) => `টাইলস বসানোর ক্ষেত্রফল (${cifrasBn(u)})`,
    largo: (u) => `টাইলসের দৈর্ঘ্য (${cifrasBn(u)})`,
    ancho: (u) => `টাইলসের প্রস্থ (${cifrasBn(u)})`,
    desperdicio: "অপচয়ের জন্য বাড়তি (%)",
    desperdicioAyuda: "কাটা আর ভাঙার জন্য। সোজা বসালে ১০%, কোনাকুনি বসালে ১৫% ধরুন।",
    porCaja: "প্রতি বাক্সে কয়টি টাইলস",
    porCajaAyuda: "ঐচ্ছিক। দিলে কয় বাক্স কিনতে হবে তা দেখতে পাবেন।",
    piezas: "কয়টি টাইলস লাগবে",
    cajas: "কয় বাক্স কিনবেন",
    conDesperdicio: (u) => `অপচয়সহ ক্ষেত্রফল (${cifrasBn(u)})`,
    cubre: (u) => `বাক্সগুলোতে যতটা জায়গা হয় (${cifrasBn(u)})`,
    errorSuperficie: "ক্ষেত্রফল শূন্যের বেশি হতে হবে।",
    errorPieza: "টাইলসের মাপ শূন্যের বেশি হতে হবে।",
  }),
};
