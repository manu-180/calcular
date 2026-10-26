import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosId: TextosUi<UiIva> = {
  slug: "kalkulator-ppn",
  ui: () => ({
    operacion: "Apa yang ingin Anda hitung?",
    agregar: "Tambahkan PPN ke harga sebelum pajak",
    quitar: "Pisahkan PPN dari harga yang sudah termasuk pajak",
    monto: "Harga",
    montoAyuda: "Harga sebelum pajak jika Anda menambahkan PPN; harga termasuk pajak jika Anda memisahkannya.",
    otraTasa: "Tarif pajak lain (%)",
    otraTasaAyuda: "Opsional. Jika barang Anda memakai tarif berbeda, masukkan di sini. Jika tidak, dipakai tarif umum.",
    neto: "Harga sebelum pajak",
    impuesto: "PPN",
    total: "Harga termasuk PPN",
    tasaUsada: "Tarif yang dipakai",
    errorTasa: "Tarif pajak tidak valid.",
  }),
};
