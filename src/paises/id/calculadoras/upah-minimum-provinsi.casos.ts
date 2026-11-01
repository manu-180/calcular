import { definirCasos } from "@/motor/calculo";
import calculadora from "./upah-minimum-provinsi";

export default definirCasos(calculadora, [
  {
    nombre: "DKI Jakarta, 5 hari kerja",
    origen: {
      tipo: "oficial",
      url: "https://jdih.jakarta.go.id/dokumenPeraturanDirectory/0031/2025KEPGUB00311142.pdf",
      detalle: "Kepgub DKI 1142/2025: UMP 2026 Rp5.729.876. Upah sehari 5.729.876 / 21 = 272.851,24; sejam / 173 = 33.120,67.",
    },
    fecha: "2026-10-24",
    entrada: { provinsi: "dki-jakarta", pola: "5-hari", gaji: null },
    esperado: { ump: 5729876, harian: 272851, perJam: 33121, setahun: 68758512 },
  },
  {
    nombre: "Jawa Tengah, 6 hari kerja, gaji di bawah UMP",
    origen: {
      tipo: "oficial",
      url: "https://jdih.jatengprov.go.id/produk_hukum/kepgub/sk_100.3.3.1-504_th_2025_auten.pdf",
      detalle: "Kepgub Jateng 100.3.3.1/504/2025: UMP 2026 Rp2.327.386,07. Sehari / 25 = 93.095,44. Gaji 2.200.000 - 2.327.386,07 = -127.386,07.",
    },
    fecha: "2026-10-24",
    entrada: { provinsi: "jawa-tengah", pola: "6-hari", gaji: 2200000 },
    esperado: { ump: 2327386.07, harian: 93095, selisih: -127386 },
  },
  {
    nombre: "Jawa Timur",
    origen: { tipo: "oficial", url: "https://files.jdih.jatimprov.go.id/jdih-prod/uploads/topics/2025kg00350934.pdf", detalle: "Kepgub Jatim 100.3.3.1/934/013/2025: UMP 2026 Rp2.446.880,68." },
    fecha: "2026-10-24",
    entrada: { provinsi: "jawa-timur", pola: "5-hari", gaji: null },
    esperado: { ump: 2446880.68 },
  },
  {
    nombre: "Papua Tengah",
    origen: { tipo: "oficial", url: "https://papuatengahprov.go.id/2025/12/24/pemprov-papua-tengah-tetapkan-ump-2026-sebesar-rp4-285-848/", detalle: "UMP 2026 Papua Tengah Rp4.285.848." },
    fecha: "2026-10-24",
    entrada: { provinsi: "papua-tengah", pola: "5-hari", gaji: null },
    esperado: { ump: 4285848 },
  },
]);
