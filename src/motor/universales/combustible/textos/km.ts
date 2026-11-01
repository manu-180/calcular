import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

// En jemer el kilómetro se escribe «គីឡូម៉ែត្រ» y la milla «ម៉ាយ».
const unidad = (u: string) => (u === "km" ? "គីឡូម៉ែត្រ" : u === "mi" ? "ម៉ាយ" : u);

export const textosKm: TextosUi<UiCombustible> = {
  slug: "fuel-cost",
  ui: () => ({
    distancia: (u) => `ចម្ងាយ (${unidad(u)})`,
    idaYVuelta: "ទៅមក",
    tipoConsumo: "ឯកតាអត្រាប្រើប្រេង",
    l100: "លីត្រក្នុង 100 គីឡូម៉ែត្រ",
    kml: "គីឡូម៉ែត្រក្នុងមួយលីត្រ",
    consumo: "អត្រាប្រើប្រេង",
    consumoMpg: "អត្រាប្រើប្រេង (ម៉ាយក្នុងមួយហ្គាឡុង)",
    consumoAyuda: "មើលបានក្នុងសៀវភៅណែនាំរថយន្ត ឬអេក្រង់បង្ហាញអត្រាប្រើប្រេង។ ជាទូទៅការបើកបរផ្លូវឆ្ងាយសន្សំប្រេងជាងក្នុងទីក្រុង។",
    precio: (u) => (u === "L" ? "តម្លៃប្រេងក្នុងមួយលីត្រ" : "តម្លៃប្រេងក្នុងមួយហ្គាឡុង"),
    personas: "ចំនួនអ្នកចែកថ្លៃប្រេង",
    costo: "ថ្លៃប្រេង",
    porPersona: "ក្នុងម្នាក់",
    combustible: (u) => (u === "L" ? "ប្រេងដែលត្រូវប្រើ (លីត្រ)" : "ប្រេងដែលត្រូវប្រើ (ហ្គាឡុង)"),
    distanciaTotal: (u) => `ចម្ងាយសរុប (${unidad(u)})`,
    costoPorDistancia: (u) => (u === "mi" ? "ថ្លៃប្រេងក្នុងមួយម៉ាយ" : u === "km" ? "ថ្លៃប្រេងក្នុងមួយគីឡូម៉ែត្រ" : `ថ្លៃប្រេងក្នុងមួយ ${u}`),
    errorConsumo: "អត្រាប្រើប្រេងត្រូវតែធំជាង 0។",
    errorPersonas: "ត្រូវមានយ៉ាងហោចណាស់ម្នាក់។",
  }),
};
