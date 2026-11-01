import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosId: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkulator-margin-keuntungan",
  ui: () => ({
    modo: "Apa yang ingin Anda hitung?",
    modoPrecio: "Margin, dari modal dan harga jual",
    modoMargen: "Harga jual untuk target margin",
    modoMarkup: "Harga jual untuk target markup",
    costo: "Harga pokok per unit (HPP)",
    costoAyuda: "Biaya membeli atau membuat satu unit, tanpa pajak yang dibebankan ke pembeli seperti PPN.",
    precio: "Harga jual",
    precioAyuda: "Hanya jika Anda menghitung margin. Tanpa pajak.",
    objetivo: "Target margin atau markup (%)",
    objetivoAyuda: "Hanya jika Anda menghitung harga jual.",
    precioResultado: "Harga jual",
    margen: "Margin keuntungan",
    margenAyuda: "Laba dalam persen dari harga jual.",
    markup: "Markup",
    markupAyuda: "Laba dalam persen dari harga pokok.",
    ganancia: "Laba per unit",
    errorCosto: "Masukkan harga pokok satu unit.",
    errorFaltaPrecio: "Masukkan harga jual untuk menghitung margin.",
    errorFaltaObjetivo: "Masukkan target margin atau markup Anda.",
    errorMargen100: "Margin harus di bawah 100%: angka itu berarti seluruh harga adalah laba tanpa modal.",
    observacionPerdida: "Dengan harga itu Anda menjual di bawah modal: setiap penjualan merugi.",
  }),
};
