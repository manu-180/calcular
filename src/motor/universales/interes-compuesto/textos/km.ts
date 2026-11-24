import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosKm: TextosUi<UiInteresCompuesto> = {
  slug: "compound-interest",
  ui: () => ({
    capital: "ប្រាក់ដើមដំបូង",
    aporte: "ប្រាក់សន្សំបន្ថែមប្រចាំខែ (ស្រេចចិត្ត)",
    aporteAyuda: "ប្រាក់ដែលនឹងបន្ថែមរៀងរាល់ខែ ដោយរាប់បញ្ចូលនៅថ្ងៃចុងខែ។",
    tasa: "អត្រាការប្រាក់ប្រចាំឆ្នាំ (%)",
    anios: "ចំនួនឆ្នាំ",
    capitalizacion: "ភាពញឹកញាប់នៃការបូកការប្រាក់",
    anual: "ប្រចាំឆ្នាំ",
    semestral: "ប្រចាំឆមាស",
    trimestral: "ប្រចាំត្រីមាស",
    mensual: "ប្រចាំខែ",
    diaria: "ប្រចាំថ្ងៃ",
    saldo: "សមតុល្យចុងក្រោយ",
    aportado: "ប្រាក់សន្សំសរុប",
    intereses: "ការប្រាក់ដែលទទួលបាន",
    tabla: "កំណើនតាមឆ្នាំ",
    colAnio: "ឆ្នាំទី",
    colAportado: "ប្រាក់សន្សំ",
    colIntereses: "ការប្រាក់",
    colSaldo: "សមតុល្យចុងឆ្នាំ",
    errorSinDinero: "សូមបញ្ចូលប្រាក់ដើមដំបូង ឬប្រាក់សន្សំបន្ថែមប្រចាំខែ។",
    observacionIntereses: (porcentaje) => `${porcentaje}% នៃសមតុល្យចុងក្រោយគឺជាការប្រាក់។`,
  }),
};
