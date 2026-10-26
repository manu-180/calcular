import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "id.pp-20-2026-umkm",
    fecha: "2026-10-24",
    titulo: "PPh final UMKM 0,5% tidak lagi dibatasi waktu untuk orang pribadi",
    texto:
      "PP 20/2026 mengubah PP 55/2022. Wajib pajak orang pribadi dengan peredaran bruto sampai Rp4,8 miliar setahun tetap bisa memakai PPh final 0,5% tanpa batas jangka waktu, sedangkan jasa pekerjaan bebas tidak lagi masuk skema ini. Kalkulator PPh final UMKM sudah memakai aturan baru.",
    vigenteDesde: "2026-04-22",
    calculadoras: ["id.kalkulator-pph-final-umkm"],
    fuente: {
      organismo: "Kementerian Keuangan (JDIH)",
      titulo: "PP Nomor 20 Tahun 2026",
      url: "https://jdih.kemenkeu.go.id/api/download/d057ff82-50e7-4127-b66b-f704a36f071d/2026pp020.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "id.ump-2026",
    fecha: "2026-10-24",
    titulo: "UMP 2026 berlaku sejak 1 Januari",
    texto:
      "Gubernur menetapkan upah minimum provinsi 2026 dengan formula PP 49/2025. Kalkulator UMP memuat provinsi yang keputusan gubernurnya sudah kami baca di situs resmi, misalnya DKI Jakarta Rp5.729.876.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["id.upah-minimum-provinsi"],
    fuente: {
      organismo: "Pemprov DKI Jakarta (JDIH)",
      titulo: "Keputusan Gubernur DKI Jakarta Nomor 1142 Tahun 2025",
      url: "https://jdih.jakarta.go.id/dokumenPeraturanDirectory/0031/2025KEPGUB00311142.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
