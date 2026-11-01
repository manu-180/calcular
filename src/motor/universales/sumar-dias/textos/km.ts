import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosKm: TextosUi<UiSumarDias> = {
  slug: "add-days-to-date",
  ui: () => ({
    fecha: "កាលបរិច្ឆេទចាប់ផ្តើម",
    operacion: "តើចង់ធ្វើអ្វី?",
    sumar: "បូកថ្ងៃ",
    restar: "ដកថ្ងៃ",
    dias: "ចំនួនថ្ងៃ",
    tipo: "ប្រភេទថ្ងៃ",
    corridos: "ថ្ងៃតាមប្រតិទិន",
    habiles: "ថ្ងៃធ្វើការ (ច័ន្ទដល់សុក្រ)",
    resultado: "កាលបរិច្ឆេទដែលទទួលបាន",
    diaSemana: "ត្រូវនឹងថ្ងៃ",
    diasCorridos: "សរុបជាថ្ងៃតាមប្រតិទិន",
    nombresDias: ["ថ្ងៃអាទិត្យ", "ថ្ងៃចន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"],
    errorDias: "ចំនួនថ្ងៃត្រូវតែជាចំនួនគត់ និងមិនលើស 100 ឆ្នាំ។",
    notaHabiles: "ថ្ងៃធ្វើការរំលងថ្ងៃសៅរ៍ និងថ្ងៃអាទិត្យ ប៉ុន្តែមិនរំលងថ្ងៃឈប់សម្រាកបុណ្យទេ។ បើមានថ្ងៃឈប់សម្រាកក្នុងរយៈពេលនោះ សូមបូកបន្ថែមដោយខ្លួនឯង។",
  }),
};
