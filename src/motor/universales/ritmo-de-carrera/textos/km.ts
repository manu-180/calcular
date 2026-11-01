import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { km: "គ.ម", mi: "ម៉ាយ", "km/h": "គ.ម/ម៉ោង", mph: "ម៉ាយ/ម៉ោង" };
const u = (x: string) => UNIDAD[x] ?? x;

export const textosKm: TextosUi<UiRitmo> = {
  slug: "running-pace",
  ui: () => ({
    calcular: "តើចង់គណនាអ្វី?",
    calcRitmo: "ល្បឿនរត់ (ពីចម្ងាយ និងពេលវេលា)",
    calcTiempo: "ពេលវេលា (ពីចម្ងាយ និងល្បឿនរត់)",
    calcDistancia: "ចម្ងាយ (ពីពេលវេលា និងល្បឿនរត់)",
    distancia: "ចម្ងាយ",
    distanciaAyuda: "ជ្រើសរើសការរត់ប្រណាំង ឬជ្រើសរើស «ចម្ងាយផ្សេង» ដើម្បីបញ្ចូលចម្ងាយដោយខ្លួនឯង។",
    otra: "ចម្ងាយផ្សេង",
    cincoK: "5 គ.ម",
    diezK: "10 គ.ម",
    media: "កន្លះម៉ារ៉ាតុង",
    maraton: "ម៉ារ៉ាតុង",
    distanciaOtra: (x) => `ចម្ងាយផ្សេង (${u(x)})`,
    horas: "ពេលវេលា៖ ម៉ោង",
    minutos: "ពេលវេលា៖ នាទី",
    segundos: "ពេលវេលា៖ វិនាទី",
    ritmoMin: (x) => `ល្បឿនរត់៖ នាទីក្នុងមួយ ${u(x)}`,
    ritmoSeg: "ល្បឿនរត់៖ វិនាទី",
    ritmo: (x) => `ល្បឿនរត់ (នាទី/${u(x)})`,
    tiempo: "ពេលវេលាដល់ទី",
    distanciaRes: (x) => `ចម្ងាយ (${u(x)})`,
    velocidad: (x) => `ល្បឿនមធ្យម (${u(x)})`,
    errorDistancia: "សូមបញ្ចូលចម្ងាយធំជាង 0។",
    errorTiempo: "សូមបញ្ចូលពេលវេលាជាម៉ោង នាទី ឬវិនាទី។",
    errorRitmo: "សូមបញ្ចូលល្បឿនរត់ជានាទី និងវិនាទីក្នុងមួយឯកតាចម្ងាយ។",
  }),
};
