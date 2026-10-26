import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosBn: TextosUi<UiVariacion> = {
  slug: "percentage-change",
  ui: () => ({
    inicial: "আগের মান",
    final: "পরের মান",
    variacion: "শতকরা পরিবর্তন",
    diferencia: "পার্থক্য",
    vuelta: "আগের মানে ফিরতে যতটা পরিবর্তন লাগবে",
    vueltaAyuda: "পরের মান থেকে আবার আগের মানে ফিরতে কত শতাংশ বদলাতে হবে, তা দেখায়।",
    errorInicialCero: "আগের মানের ঘরে শূন্য দেওয়া যাবে না, কারণ শূন্য থেকে শতকরা পরিবর্তন হিসাব করা যায় না।",
    subio: (p) => `${cifrasBn(p)}% বেড়েছে।`,
    bajo: (p) => `${cifrasBn(p)}% কমেছে।`,
    igual: "কোনো পরিবর্তন হয়নি, দুটি মান একই।",
  }),
};
