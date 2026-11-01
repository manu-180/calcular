import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosKm: TextosUi<UiConsumoElectrico> = {
  slug: "electricity-cost",
  ui: () => ({
    potencia: "អានុភាពឧបករណ៍អគ្គិសនី (វ៉ាត់)",
    potenciaAyuda: "មើលបាននៅលើស្លាក ឬក្នុងសៀវភៅណែនាំ គិតជាវ៉ាត់ (W)។ បើបញ្ជាក់ជា kW សូមគុណនឹង 1000។",
    cantidad: "ចំនួនឧបករណ៍ដូចគ្នា",
    horas: "ចំនួនម៉ោងប្រើក្នុងមួយថ្ងៃ",
    dias: "ចំនួនថ្ងៃប្រើក្នុងមួយខែ",
    precio: "ថ្លៃអគ្គិសនីក្នុងមួយឯកតា (kWh)",
    precioAyuda: "មើលបានក្នុងវិក្កយបត្រអគ្គិសនី។ ប្រើតម្លៃរួមពន្ធ បើចង់បានចំណាយសរុប។",
    kwhDia: "ឯកតាអគ្គិសនីក្នុងមួយថ្ងៃ (kWh)",
    kwhMes: "ឯកតាអគ្គិសនីក្នុងមួយខែ (kWh)",
    kwhAnio: "ឯកតាអគ្គិសនីក្នុងមួយឆ្នាំ (kWh)",
    costoDia: "ថ្លៃអគ្គិសនីក្នុងមួយថ្ងៃ",
    costoMes: "ថ្លៃអគ្គិសនីក្នុងមួយខែ",
    costoAnio: "ថ្លៃអគ្គិសនីក្នុងមួយឆ្នាំ",
    errorHoras: "មួយថ្ងៃមាន 24 ម៉ោង។ ចំនួនម៉ោងប្រើត្រូវស្ថិតនៅចន្លោះពី 0 ដល់ 24។",
  }),
};
