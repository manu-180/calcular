import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosKm: TextosUi<UiIva> = {
  slug: "vat",
  ui: () => ({
    operacion: "តើចង់គណនាបែបណា?",
    agregar: "បូក VAT ទៅលើតម្លៃមុន VAT",
    quitar: "ដក VAT ចេញពីតម្លៃរួម VAT",
    monto: "តម្លៃ",
    montoAyuda: "តម្លៃមុន VAT បើចង់បូកអាករ ឬតម្លៃរួម VAT បើចង់ដកអាករចេញ។",
    otraTasa: "អត្រាផ្សេង (%)",
    otraTasaAyuda: "មិនចាំបាច់ទេ។ បើទំនិញមានអត្រាបញ្ចុះ ឬអត្រាពិសេស សូមបញ្ចូលនៅទីនេះ។ បើទុកទទេ នឹងប្រើអត្រាទូទៅ។",
    neto: "តម្លៃមុន VAT",
    impuesto: "អាករលើតម្លៃបន្ថែម (VAT)",
    total: "តម្លៃរួម VAT",
    tasaUsada: "អត្រាដែលបានប្រើ",
    errorTasa: "អត្រាពន្ធមិនត្រឹមត្រូវ។",
  }),
};
