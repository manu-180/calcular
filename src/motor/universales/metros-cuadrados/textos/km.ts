import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { m: "ម៉ែត្រ", "m²": "ម៉ែត្រការ៉េ", ft: "ហ្វីត", "ft²": "ហ្វីតការ៉េ" };
const u = (x: string) => UNIDAD[x] ?? x;

export const textosKm: TextosUi<UiMetrosCuadrados> = {
  slug: "square-footage",
  ui: () => ({
    forma: (n) => `ផ្ទៃផ្នែកទី ${n}: រូបរាង`,
    formaAyuda: "បើបន្ទប់មានរាងអក្សរ L ឬមិនមែនរាងចតុកោណ សូមបែងចែកជាផ្នែកៗ រួចបូកបញ្ចូលគ្នា។",
    ninguna: "មិនប្រើ",
    rectangulo: "ចតុកោណកែង ឬការ៉េ",
    triangulo: "ត្រីកោណ",
    circulo: "រង្វង់",
    medidaA: (n, x) => `ផ្ទៃផ្នែកទី ${n}: បណ្តោយ បាត ឬអង្កត់ផ្ចិត (${u(x)})`,
    medidaAAyuda: "ចតុកោណ: បណ្តោយ និងទទឹង។ ត្រីកោណ: បាត និងកម្ពស់។ រង្វង់: អង្កត់ផ្ចិតតែប៉ុណ្ណោះ។",
    medidaB: (n, x) => `ផ្ទៃផ្នែកទី ${n}: ទទឹង ឬកម្ពស់ (${u(x)})`,
    total: (x) => `ផ្ទៃសរុប (${u(x)})`,
    equivale: (x) => `ស្មើនឹងជា ${u(x)}`,
    parcial: (n, x) => `ផ្ទៃផ្នែកទី ${n} (${u(x)})`,
    errorMedida: "មិនទាន់បញ្ចូលទំហំនេះ ឬទំហំស្មើនឹង 0។",
  }),
};
