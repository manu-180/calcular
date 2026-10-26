import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosUz: TextosUi<UiHipoteca> = {
  slug: "ipoteka-kalkulyatori",
  ui: () => ({
    precio: "Uy narxi",
    entradaPorcentaje: "Boshlangʻich toʻlov (narxning foizi, %)",
    entradaMonto: "Boshlangʻich toʻlov summasi (ixtiyoriy)",
    entradaMontoAyuda: "Toʻldirsangiz, foiz oʻrniga shu summa olinadi.",
    tasa: "Yillik foiz stavkasi (%)",
    anios: "Ipoteka muddati (yil)",
    gastos: "Uy uchun oylik xarajatlar (ixtiyoriy)",
    gastosAyuda: "Ipoteka toʻlovi bilan birga toʻlaydigan mol-mulk soligʻi, uy sugʻurtasi yoki kommunal xizmatlar.",
    cuota: "Ipoteka boʻyicha oylik toʻlov",
    cuotaTotal: "Xarajatlar bilan oylik toʻlov",
    entrada: "Boshlangʻich toʻlov",
    prestado: "Kredit summasi",
    intereses: "Jami foizlar",
    total: "Ipoteka boʻyicha jami toʻlovlar",
    tabla: "Yillar boʻyicha",
    colAnio: "Yil",
    colIntereses: "Toʻlangan foizlar",
    colCapital: "Toʻlangan asosiy qarz",
    colSaldo: "Yil oxiridagi qolgan qarz",
    errorPrecio: "Uy narxini kiriting.",
    errorEntrada: "Boshlangʻich toʻlov uy narxini toʻliq qoplaydi, hisoblanadigan kredit qolmaydi. Boshlangʻich toʻlovni kamaytiring.",
    observacionPrestado: (porcentaje) => `Uy narxining kredit hisobidan olinadigan ulushi: ${porcentaje}%. Bu ulush qancha katta boʻlsa, banklar odatda shunchalik qatʼiy shartlar qoʻyadi.`,
    observacionCostos: "Notarius va roʻyxatdan oʻtkazish xarajatlari, baholash xizmati, bank komissiyasi va majburiy sugʻurta kirmaydi. Ular uchun boshlangʻich toʻlovdan tashqari alohida mablagʻ ajrating.",
  }),
};
