import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 60, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 60, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Kalkulator dana pensiun",
    title: tituloQueEntre(`Kalkulator Dana Pensiun ${ctx.nombrePais}`, "Kalkulator Dana Pensiun Pribadi", "Kalkulator Dana Pensiun"),
    description:
      "Lihat berapa dana pensiun yang bisa Anda kumpulkan dengan setoran bulanan dan berapa penghasilan per bulan yang bisa dihasilkannya, dalam nilai uang hari ini.",
    intro: [
      "Jaminan pensiun dari pemerintah atau kantor sering tidak cukup untuk mempertahankan gaya hidup. Tabungan pensiun pribadi, walau kecil, sangat berpengaruh jika dimulai sejak dini.",
      "Masukkan usia Anda, kapan ingin pensiun, dana yang sudah ada, dan setoran per bulan. Kami tampilkan dana saat pensiun dan berapa yang bisa Anda ambil setiap bulan.",
    ],
    comoSeCalcula: [
      "Dana tumbuh setiap bulan dengan imbal hasil riil, yaitu imbal hasil dikurangi inflasi. Dengan begitu hasilnya tetap dalam nilai uang hari ini.",
      "Saat pensiun, dana dibagikan dalam jumlah bulanan yang sama selama tahun yang Anda pilih. Sisa dana tetap berkembang selama itu.",
      "Jaminan pensiun pemerintah, pajak, dan biaya investasi tidak termasuk.",
    ],
    ejemplo: [
      `Dengan dana ${m(actual)} di usia 30 dan setoran ${m(aporte)} per bulan dengan imbal hasil riil 4%, dana Anda mencapai ${m(capital30)} di usia 60. Dana itu memberi ${m(rentaMensual(capital30, 4, 25))} per bulan selama 25 tahun.`,
      `Jika baru mulai di usia 40 dengan angka yang sama, dana Anda hanya ${m(capital40)}. Selisih sepuluh tahun sangat besar pengaruhnya.`,
    ],
    faq: [
      {
        pregunta: "Apa itu imbal hasil riil?",
        respuesta: "Hasil investasi setelah dikurangi inflasi. Jika investasi menghasilkan 7% dan inflasi 3%, imbal hasil riilnya sekitar 4%.",
      },
      {
        pregunta: "Apakah ini menggantikan jaminan pensiun dari pemerintah?",
        respuesta: "Tidak. Ini dana pribadi di luar jaminan pensiun pemerintah atau program pensiun kantor. Untuk memperkirakan jaminan pensiun resmi, tanyakan ke lembaga penyelenggaranya.",
      },
      {
        pregunta: "Berapa yang sebaiknya ditabung untuk pensiun?",
        respuesta: "Tidak ada satu angka yang pas untuk semua. Patokan yang umum adalah 10% sampai 15% dari penghasilan. Yang terpenting adalah mulai sedini mungkin.",
      },
    ],
    glosario: [
      { termino: "Imbal hasil riil", definicion: "Hasil investasi di atas inflasi." },
      { termino: "Nilai uang hari ini", definicion: "Jumlah di masa depan yang dinyatakan dengan daya belinya sekarang." },
    ],
  };
};
