import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Untuk 150 ft² dengan keramik 12 × 12 in (1 ft² per keping) dan cadangan 10%, Anda butuh ${piezas} keping.`,
          `Jika satu dus berisi 10 keping, berarti ${Math.ceil(piezas / 10)} dus.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Untuk 20 m² dengan keramik 60 × 60 cm (${n(pieza)} m² per keping) dan cadangan 10%, Anda butuh ${piezas} keping.`,
          `Jika satu dus berisi 4 keping, berarti ${Math.ceil(piezas / 4)} dus.`,
        ];
      })();
  return {
    h1: "Kalkulator keramik",
    title: tituloQueEntre(`Kalkulator kebutuhan keramik lantai ${ctx.nombrePais}`, `Kalkulator keramik ${ctx.nombrePais}`, "Kalkulator keramik"),
    description: "Hitung berapa keping keramik yang dibutuhkan untuk lantai atau dinding, sudah termasuk cadangan potongan, dan berapa dus yang perlu dibeli.",
    intro: [
      "Masukkan luas area, ukuran tiap keramik, dan isi per dus. Anda akan melihat berapa keping dan berapa dus yang perlu dibeli.",
      "Cadangan potongan menutup potongan di pinggir dan keramik yang pecah.",
    ],
    comoSeCalcula: [
      `Luas satu keramik = panjang × lebar, diubah ke ${imperial ? "kaki persegi" : "meter persegi"}.`,
      "Jumlah keramik = luas × (1 + cadangan ÷ 100) ÷ luas satu keramik, dibulatkan ke atas.",
      "Jumlah dus = jumlah keramik ÷ isi per dus, dibulatkan ke atas.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Berapa cadangan keramik yang sebaiknya disiapkan?",
        respuesta: "10% untuk pola lurus. Untuk pola diagonal, pola tulang ikan, atau ruangan dengan banyak potongan, 15% sampai 20%.",
      },
      {
        pregunta: "Apakah lebar nat perlu dihitung?",
        respuesta: "Tidak. Nat hanya beberapa milimeter dan selisihnya sudah tertutup oleh cadangan potongan.",
      },
      {
        pregunta: "Perlukah membeli keramik lebih?",
        respuesta: "Ya, beberapa keping dari kode produksi yang sama. Jika nanti ada yang pecah, warna dari produksi lain bisa sedikit berbeda.",
      },
    ],
    glosario: [
      { termino: "Cadangan potongan", definicion: "Persentase tambahan yang dibeli untuk potongan dan keramik pecah." },
      { termino: "Nat", definicion: "Celah di antara keramik yang diisi semen nat." },
    ],
  };
};
