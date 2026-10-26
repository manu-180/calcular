import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosId: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "kalkulator-bep",
  ui: () => ({
    fijos: "Biaya tetap per bulan",
    fijosAyuda: "Biaya yang tetap dibayar walaupun tidak ada penjualan: sewa tempat, gaji tetap, listrik, langganan aplikasi.",
    precio: "Harga jual per unit",
    variable: "Biaya variabel per unit",
    variableAyuda: "Biaya untuk setiap unit yang terjual: bahan baku, stok barang, komisi, ongkos kirim.",
    objetivo: "Target laba per bulan (opsional)",
    objetivoAyuda: "Untuk melihat berapa yang harus dijual di atas titik impas.",
    unidades: "Unit untuk mencapai BEP",
    facturacion: "Omzet untuk mencapai BEP",
    contribucion: "Margin kontribusi per unit",
    contribucionAyuda: "Sisa dari setiap penjualan untuk menutup biaya tetap: harga jual dikurangi biaya variabel.",
    contribucionPct: "Margin kontribusi (%)",
    unidadesObjetivo: "Unit untuk target laba",
    facturacionObjetivo: "Omzet untuk target laba",
    errorPrecio: "Masukkan harga jual satu unit.",
    errorMargen:
      "Biaya variabel sama dengan atau lebih tinggi dari harga jual: setiap penjualan merugi dan BEP tidak pernah tercapai. Periksa harga atau biayanya.",
    observacionRedondeo: "Jumlah unit dibulatkan ke atas, karena tidak ada penjualan setengah unit.",
  }),
};
