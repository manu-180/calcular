import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosHu: TextosUi<UiIva> = {
  slug: "afa-kalkulator",
  ui: () => ({
    operacion: "Mit szeretnél kiszámolni?",
    agregar: "ÁFA hozzáadása a nettó árhoz",
    quitar: "ÁFA kivonása a bruttó árból",
    monto: "Ár",
    montoAyuda: "Nettó ár, ha hozzáadod az adót. Bruttó ár, ha kivonod belőle.",
    otraTasa: "Más ÁFA-kulcs (%)",
    otraTasaAyuda: "Nem kötelező. Ha a termékre vagy a szolgáltatásra kedvezményes kulcs vonatkozik, írd be ide. Ha üresen hagyod, az általános kulccsal számolunk.",
    neto: "Nettó ár",
    impuesto: "ÁFA összege",
    total: "Bruttó ár",
    tasaUsada: "Alkalmazott kulcs",
    errorTasa: "Az ÁFA-kulcs nem érvényes.",
  }),
};
