import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.id;

// Indonesio con «Anda», el registro de los servicios digitales del país (ADR 0002, D11).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Anda berada ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} dengan nilai resmi yang berlaku.`,
    ultimoDato: "Data terakhir yang dimuat",
    ir: (pais) => `Buka ${g.nombre(pais)}`,
    otro: "Pilih negara lain",
    argentina: "Kalkulator Anda ada di calcular.ar, dengan data resmi Argentina.",
    argentinaIr: "Buka calcular.ar",
    neutroTitulo: (paises) => `${paises} negara, masing-masing dengan hukum dan mata uangnya sendiri`,
    neutroTexto: "Kami memeriksa sumber resmi setiap hari.",
    neutroIr: "Lihat negara",
  },
  selector: {
    buscar: "Cari negara",
    sinResultados: (q) => `Tidak ada negara yang cocok dengan “${q}”`,
    ubicacion: "Lokasi saat ini",
    mismaCalculadora: "Kalkulator yang sama",
    paises: "Negara",
  },
  aviso: { mismaCalculadora: (pais) => `Hitung dengan data ${g.para(pais)}` },
  vivo: {
    titulo: "Data resmi, diperbarui otomatis",
    vigilado: "Proses otomatis memeriksa sumber resmi setiap hari. Perubahan aturan baru berlaku setelah kami verifikasi.",
    sinVigilar: "Setiap nilai punya sumber resmi dan tanggal kami memeriksanya.",
    verificado: "Pemeriksaan aturan terakhir",
    automatico: "Data otomatis terakhir",
    fuentes: "Sumber resmi",
    nFuentes: (n) => `${n} dokumen resmi`,
    verFuentes: "Lihat sumber",
    verNovedades: "Lihat pembaruan",
    hoy: "hari ini",
    ayer: "kemarin",
    elDia: (fecha) => `pada ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Data diperiksa dengan sumber resmi pada ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: diperbarui ${cuando}, dengan data terakhir dari ${organismo}.`,
    diario: "Kami memeriksa sumber resmi secara otomatis setiap hari.",
    actualizado: "Diperbarui",
  },
  novedades: {
    pildora: "Pembaruan",
    titulo: (pais) => `Perubahan data resmi ${g.para(pais)}`,
    acento: "pada hari perubahannya",
    bajada: "Setiap angka baru yang masuk ke kalkulator dicatat di sini: apa yang berubah, kapan berlaku, dan dari mana asalnya.",
    ultimoCambio: "Perubahan terakhir",
    revision: "Pemeriksaan sumber",
    diaria: "Setiap hari",
    porNorma: "Setiap ada aturan baru",
    siguiendo: "Sumber yang kami pantau",
    masOrganismos: (n) => `dan ${n} lainnya`,
    proximos: "Sudah diumumkan, segera berlaku",
    proximosTexto: "Nilai resmi yang sudah dimuat dan mulai berlaku dalam beberapa hari ke depan.",
    registro: "Catatan perubahan",
    rss: "Ikuti lewat RSS",
    vacio: "Belum ada perubahan yang dicatat untuk negara ini.",
    etiqueta: { editorial: "Aturan", dato: "Angka baru", proximo: "Segera", serie: "Otomatis", revision: "Pemeriksaan" },
    rige: (fecha) => `Berlaku mulai ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Berlaku mulai ${desde} sampai ${hasta}`,
    antes: (valor, fecha) => `Sebelumnya: ${valor} (${fecha})`,
    revisados: (n) => `Kami memeriksa ${n} angka dengan sumber resmi`,
    revisadosTexto: (organismos) => `Nilai yang berlaku sudah dikonfirmasi dengan ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Lihat angkanya" : `Lihat ${n} angka`),
    calculadoras: "Dipakai oleh",
    rango: (min, max, zonas) => `dari ${min} sampai ${max} tergantung wilayah (${zonas} wilayah)`,
    tabla: (filas) => `tabel dengan ${filas} lapisan`,
    valores: (n) => `${n} nilai`,
    pasosTitulo: "Cara data tetap terbaru",
    pasos: [
      { titulo: "Instansi menerbitkan", texto: "Peraturan, indeks, atau kurs terbit di sumber resmi." },
      { titulo: "Diperiksa sebelum dipakai", texto: "Indeks dan kurs masuk otomatis, dengan pemeriksaan rentang nilai. Aturan dimuat dengan dokumen resminya di tangan." },
      { titulo: "Kalkulator diperbarui", texto: "Kalkulator beralih ke angka baru, dan perubahannya dicatat di sini beserta sumbernya." },
    ],
    feedTitulo: (pais) => `Pembaruan ${g.de(pais)} di CalcularYa`,
    feedSubtitulo: (pais) => `Perubahan data resmi yang dipakai kalkulator ${g.para(pais)}, dengan tanggal berlaku dan sumbernya.`,
  },
};

export const id: Diccionario<TextosInicio> = { base };
