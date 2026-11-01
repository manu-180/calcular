import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosUz: TextosUi<UiFondoDeEmergencia> = {
  slug: "favqulodda-jamgarma-kalkulyatori",
  ui: () => ({
    gastos: "Oylik zarur xarajatlar",
    gastosAyuda: "Toʻlamasdan iloji boʻlmagan xarajatlar: uy-joy, oziq-ovqat, kommunal xizmatlar, transport, sogʻliq va qarz toʻlovlari.",
    meses: "Necha oylik xarajatni qoplash kerak",
    mesesAyuda: "Daromadingiz barqaror boʻlsa, 3 oydan 6 oygacha. Daromad oʻzgarib tursa yoki oilada bitta daromad boʻlsa, koʻproq.",
    actual: "Allaqachon ajratib qoʻygan mablagʻingiz (ixtiyoriy)",
    aporte: "Har oy jamgʻara oladigan summangiz (ixtiyoriy)",
    meta: "Tavsiya etiladigan favqulodda jamgʻarma",
    falta: "Yana jamgʻarish kerak",
    mesesParaLlegar: "Toʻldirish muddati (oy)",
    cobertura: "Bugungi jamgʻarma necha oyni qoplaydi",
    errorGastos: "Bir oylik zarur xarajatlaringizni kiriting.",
    yaCubierto: "Jamgʻarmangiz toʻliq. Bundan buyon jamgʻarganingizni boshqa maqsadlarga yoʻnaltirishingiz mumkin.",
    sinAporte: "Har oy qancha jamgʻara olishingizni kiriting, qancha vaqt ketishini aytamiz.",
    observacionDonde: "Uni oʻsha kuniyoq yechib olish mumkin boʻlgan va qiymatini yoʻqotmaydigan alohida hisobda saqlang, masalan muddatsiz omonatda.",
  }),
};
