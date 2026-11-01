import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { "m²": "ម៉ែត្រការ៉េ", "ft²": "ហ្វីតការ៉េ", cm: "សង់ទីម៉ែត្រ", in: "អ៊ីញ" };
const u = (x: string) => UNIDAD[x] ?? x;

export const textosKm: TextosUi<UiCeramicos> = {
  slug: "tile-calculator",
  ui: () => ({
    superficie: (x) => `ផ្ទៃដែលត្រូវក្រាលការ៉ូ (${u(x)})`,
    largo: (x) => `បណ្តោយការ៉ូ (${u(x)})`,
    ancho: (x) => `ទទឹងការ៉ូ (${u(x)})`,
    desperdicio: "បម្រុងសម្រាប់ការខូចខាត (%)",
    desperdicioAyuda: "សម្រាប់ការកាត់និងការ៉ូបែក។ ក្រាលត្រង់ប្រើ 10% និងក្រាលទទឹងប្រើ 15%។",
    porCaja: "ចំនួនដុំក្នុងមួយកេស",
    porCajaAyuda: "ស្រេចចិត្ត។ បញ្ចូលដើម្បីមើលថាត្រូវទិញប៉ុន្មានកេស។",
    piezas: "ចំនួនការ៉ូដែលត្រូវប្រើ (ដុំ)",
    cajas: "ចំនួនកេសដែលត្រូវទិញ",
    conDesperdicio: (x) => `ផ្ទៃសរុបរួមទាំងបម្រុង (${u(x)})`,
    cubre: (x) => `ផ្ទៃដែលការ៉ូគ្រប់កេសក្រាលបាន (${u(x)})`,
    errorSuperficie: "ផ្ទៃត្រូវតែធំជាង 0។",
    errorPieza: "ទំហំការ៉ូត្រូវតែធំជាង 0។",
  }),
};
