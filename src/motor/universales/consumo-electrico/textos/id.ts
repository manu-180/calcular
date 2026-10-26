import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosId: TextosUi<UiConsumoElectrico> = {
  slug: "kalkulator-listrik",
  ui: () => ({
    potencia: "Daya alat listrik (watt)",
    potenciaAyuda: "Tertera di label atau buku manual, dalam watt (W). Jika tertulis kW, kalikan 1000.",
    cantidad: "Jumlah alat yang sama",
    horas: "Jam pemakaian per hari",
    dias: "Hari pemakaian per bulan",
    precio: "Tarif listrik per kWh",
    precioAyuda: "Lihat di tagihan listrik atau struk token: tarif per kWh, termasuk pajak jika Anda ingin biaya penuhnya.",
    kwhDia: "Pemakaian per hari (kWh)",
    kwhMes: "Pemakaian per bulan (kWh)",
    kwhAnio: "Pemakaian per tahun (kWh)",
    costoDia: "Biaya per hari",
    costoMes: "Biaya per bulan",
    costoAnio: "Biaya per tahun",
    errorHoras: "Satu hari ada 24 jam: jam pemakaian harus antara 0 dan 24.",
  }),
};
