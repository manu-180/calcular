import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { m: "ម៉ែត្រ", "m²": "ម៉ែត្រការ៉េ", ft: "ហ្វីត", "ft²": "ហ្វីតការ៉េ", "m²/L": "ម៉ែត្រការ៉េ/លីត្រ", "ft²/gal": "ហ្វីតការ៉េ/ហ្គាឡុង" };
const u = (x: string) => UNIDAD[x] ?? x;
const volumen = (x: string) => (x === "L" ? "លីត្រ" : "ហ្គាឡុង");

export const textosKm: TextosUi<UiPintura> = {
  slug: "paint-calculator",
  ui: () => ({
    modo: "តើមានទំហំបែបណា?",
    modoMedidas: "បណ្តោយ និងកម្ពស់ជញ្ជាំង",
    modoSuperficie: "ផ្ទៃសរុប",
    largo: (x) => `បណ្តោយជញ្ជាំងសរុប (${u(x)})`,
    largoAyuda: "បូកបណ្តោយជញ្ជាំងគ្រប់ផ្នែកដែលនឹងលាប។ សម្រាប់បន្ទប់មួយ គឺបរិមាត្របន្ទប់។",
    alto: (x) => `កម្ពស់ជញ្ជាំង (${u(x)})`,
    superficie: (x) => `ផ្ទៃដែលត្រូវលាប (${u(x)})`,
    aberturas: (x) => `ផ្ទៃទ្វារ និងបង្អួចដែលមិនលាប (${u(x)})`,
    aberturasAyuda: "ទ្វារមួយប្រហែល 2 ម៉ែត្រការ៉េ (21 ហ្វីតការ៉េ) និងបង្អួចធម្មតា 1 ដល់ 2 ម៉ែត្រការ៉េ។",
    manos: "ចំនួនស្រទាប់លាប",
    rendimiento: (x) => `អត្រាគ្របដណ្តប់នៃថ្នាំលាប (${u(x)})`,
    rendimientoAyuda: "មើលនៅលើកំប៉ុងថា ថ្នាំមួយឯកតាលាបបានប៉ុន្មានម៉ែត្រការ៉េក្នុងមួយស្រទាប់។ បើមិនដឹង សូមប្រើតម្លៃដែលបានណែនាំ។",
    recomendado: (x) => `បរិមាណថ្នាំដែលគួរទិញ (${volumen(x)})`,
    recomendadoAyuda: "រួមទាំងបម្រុង 10% សម្រាប់ជួសជុល និងថ្នាំដែលជាប់ឡូឡែរ។",
    necesario: (x) => `បរិមាណដែលប្រើពិត (${volumen(x)})`,
    neta: (x) => `ផ្ទៃដែលត្រូវលាប (${u(x)})`,
    errorMedidas: "សូមបញ្ចូលបណ្តោយ និងកម្ពស់ជញ្ជាំង។",
    errorSuperficie: "សូមបញ្ចូលផ្ទៃដែលត្រូវលាប។",
    errorAberturas: "ទ្វារ និងបង្អួចមិនអាចយកផ្ទៃទាំងអស់នៃជញ្ជាំងបានទេ។",
    errorRendimiento: "អត្រាគ្របដណ្តប់ត្រូវធំជាង 0។",
  }),
};
