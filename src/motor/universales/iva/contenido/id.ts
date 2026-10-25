import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Kalkulator PPN ${ctx.nombrePais}`,
    title: tituloQueEntre(`Kalkulator PPN (${tasa}) ${ctx.nombrePais}`, `PPN ${tasa} ${ctx.nombrePais}`, `Kalkulator PPN (${tasa})`),
    description: `Tambahkan atau pisahkan PPN ${tasa} dari harga apa pun dalam satu langkah: harga sebelum pajak, nilai PPN, dan totalnya.`,
    intro: [
      `Tarif umum yang dipakai di sini untuk ${ctx.nombrePais} adalah ${tasa}.`,
      "Pilih apakah Anda ingin menambahkan PPN ke harga sebelum pajak atau memisahkannya dari harga yang sudah termasuk pajak, lalu masukkan jumlahnya.",
    ],
    comoSeCalcula: [
      "Menambahkan PPN: PPN = harga sebelum pajak × tarif ÷ 100. Total = harga sebelum pajak + PPN.",
      "Memisahkan PPN: harga sebelum pajak = harga termasuk pajak ÷ (1 + tarif ÷ 100). PPN adalah selisihnya.",
      "Jika barang atau jasa memakai tarif berbeda, masukkan di kolom «Tarif pajak lain».",
    ],
    ejemplo: [
      `Untuk menambahkan PPN ke ${precio}, kalikan dengan ${tasa}, lalu tambahkan hasilnya ke harga.`,
      `Untuk melihat berapa PPN di dalam total ${precio}, bagi total itu dengan 1 ditambah tarifnya, lalu hitung selisihnya.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung harga sebelum PPN?",
        respuesta: "Bagi harga dengan 1 ditambah tarif dalam bentuk desimal. Hasilnya harga sebelum pajak, dan selisihnya adalah PPN.",
      },
      {
        pregunta: "Mengapa tidak cukup mengurangi total dengan persentase PPN?",
        respuesta: "Karena PPN dihitung dari harga sebelum pajak, yang lebih kecil dari total. Jika persentasenya diambil dari total, potongannya jadi terlalu besar.",
      },
      {
        pregunta: `Apakah semua barang dan jasa dikenai PPN ${tasa}?`,
        respuesta:
          "Tidak selalu. Sebagian bahan pokok, layanan kesehatan, atau jasa tertentu bisa memakai tarif berbeda atau dibebaskan. Dalam hal itu, gunakan kolom «Tarif pajak lain».",
      },
    ],
    glosario: [
      { termino: "PPN", definicion: "Pajak pertambahan nilai. Ditambahkan ke harga barang dan jasa, lalu disetorkan oleh penjual." },
      { termino: "Harga sebelum pajak", definicion: "Harga barang atau jasa sebelum ditambah PPN." },
    ],
  };
};
