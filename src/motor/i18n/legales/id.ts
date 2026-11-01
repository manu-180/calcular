import type { DiccionarioLegal } from "./tipos";

// Indonesio con «Anda» (ADR 0002, D11). Texto propio, frases cortas, sin jerga legal copiada.
export const id: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Tentang kami | CalcularYa",
      description: "CalcularYa membuat kalkulator untuk pekerjaan, keuangan, dan kebutuhan sehari-hari di setiap negara, dengan angka dari sumber resmi.",
      h1: "Tentang kami",
      bajada: "Kalkulator untuk setiap negara, masing-masing dengan data resminya sendiri.",
      bloques: [
        {
          parrafos: [
            "CalcularYa adalah situs kalkulator untuk hitungan sehari-hari: gaji, pinjaman, pajak, tanggal, dan banyak lagi.",
            "Situs ini dibuat oleh Manuel Navarro, yang juga mengelola calcular.ar, situs kalkulator untuk Argentina.",
          ],
        },
        {
          titulo: "Cara kami bekerja",
          parrafos: [
            "Jika suatu perhitungan bergantung pada aturan (upah minimum, tarif iuran, atau batas tertentu), kami membaca nilainya di sumber resmi negara tersebut: lembaran negara, kementerian, bank sentral, atau otoritas pajak.",
            "Kami menyimpan tautan dan tanggal pemeriksaannya, lalu menampilkan keduanya di samping setiap kalkulator.",
            "Jika suatu nilai tidak dapat dipastikan di sumber resmi, kalkulator yang memakainya tidak diterbitkan.",
            "Jika aturan berubah, kalkulatornya ikut berubah, dan perubahan itu dicatat di halaman pembaruan setiap negara.",
          ],
        },
        { titulo: "Gratis", parrafos: ["Semua kalkulator gratis dan tidak memerlukan akun."] },
      ],
    },
    contacto: {
      title: "Kontak | CalcularYa",
      description: "Hubungi kami jika ada angka yang sudah tidak berlaku, hasil yang tidak sesuai harapan, atau jika Anda ingin kalkulator atau negara baru.",
      h1: "Kontak",
      bajada: `Email kami: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Kami terbantu jika Anda memberi tahu angka yang sudah tidak berlaku, hasil yang tidak sesuai harapan, atau kalkulator dan negara yang belum ada.",
            "Jika menyangkut suatu angka, sebutkan negaranya dan halaman tempat Anda melihatnya.",
            "Balasan ditulis oleh orang sungguhan. Mungkin perlu beberapa hari.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Kebijakan privasi | CalcularYa",
      description: "Data apa yang dipakai CalcularYa: isian Anda di kalkulator diproses di peramban Anda dan tidak kami simpan.",
      h1: "Kebijakan privasi",
      bajada: `Terakhir diperbarui: ${actualizado}.`,
      bloques: [
        {
          titulo: "Isian Anda di kalkulator",
          parrafos: ["Perhitungan berjalan di peramban Anda. Isian Anda tidak dikirim ke server mana pun dan tidak kami simpan."],
        },
        {
          titulo: "Negara Anda",
          parrafos: [
            "Untuk menyarankan kalkulator negara yang tepat, kami melihat dari negara mana kunjungan Anda berasal. Penyedia hosting kami memperkirakannya dari alamat IP Anda.",
            "Kami tidak menyimpan alamat IP Anda. Hasilnya hanya tersimpan di peramban Anda selama kunjungan berlangsung.",
          ],
        },
        {
          titulo: "Yang disimpan peramban Anda",
          parrafos: [
            "Penyimpanan sesi peramban, yang terhapus saat tab ditutup, mengingat negara kunjungan Anda, apakah Anda sudah menutup pemberitahuan yang menyarankannya, dan kode tautan jika Anda datang lewat tautan yang dibagikan.",
            "Penyimpanan lokal, yang tetap ada sampai Anda menghapusnya di peramban, menyimpan negara yang Anda pilih sendiri, angka acak untuk menghitung kunjungan, dan versi uji desain yang ditampilkan kepada Anda, agar situs terlihat sama setiap kali Anda kembali. Tidak satu pun dari data itu menunjukkan siapa Anda.",
            "Kami tidak memakai cookie iklan atau pelacakan.",
          ],
        },
        {
          titulo: "Server situs",
          parrafos: ["Situs ini dihosting di Vercel. Seperti server pada umumnya, Vercel mencatat data teknis setiap kunjungan (alamat IP dan peramban) agar situs berjalan dan tetap aman."],
        },
        {
          titulo: "Cara kami menghitung kunjungan",
          parrafos: [
            "Kami mengukur penggunaan situs dengan alat kami sendiri: halaman yang dibuka dan seberapa sering dipakai, situs asal Anda, jenis perangkat, dan negara Anda. Angka acak yang disimpan peramban Anda membedakan kunjungan baru dari kunjungan ulang. Kami tidak menyimpan alamat IP Anda atau isian Anda di kalkulator.",
            "Tautan yang dibagikan dari situs ini membawa kode acak yang berbeda setiap kali dibagikan, agar kami bisa menghitung berapa kunjungan yang datang dari setiap tautan. Kode itu tidak mengidentifikasi siapa pun.",
            "Nominal yang Anda isi di kalkulator tidak pernah keluar dari peramban Anda di dalam tautan.",
          ],
        },
        {
          titulo: "Perubahan dan pertanyaan",
          parrafos: [
            "Jika ada yang berubah (misalnya kami menambahkan iklan), kami akan mengumumkannya di halaman ini sebelum mulai berlaku.",
            `Untuk pertanyaan tentang data Anda, kirim email ke ${mail}.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Syarat penggunaan | CalcularYa",
      description: "Kalkulator CalcularYa memberi perkiraan dengan data resmi yang berlaku. Hasilnya adalah panduan, bukan nasihat profesional.",
      h1: "Syarat penggunaan",
      bajada: `Terakhir diperbarui: ${actualizado}.`,
      bloques: [
        {
          titulo: "Kegunaan kalkulator",
          parrafos: [
            "Hasil perhitungan adalah perkiraan berdasarkan data resmi yang berlaku. Gunakan sebagai panduan.",
            "Hasil ini tidak menggantikan perhitungan dari pemberi kerja, akuntan, atau pengacara, maupun ketentuan dari instansi resmi.",
          ],
        },
        {
          titulo: "Asal data",
          parrafos: [
            "Setiap kalkulator menampilkan sumber resmi nilainya dan tanggal kami memeriksanya.",
            "Kami berupaya menjaga data tetap terbaru, tetapi aturan bisa berubah sebelum kami sempat memasukkannya.",
          ],
        },
        {
          titulo: "Penggunaan situs",
          parrafos: ["Situs ini gratis. Anda boleh memakainya dan membagikan tautannya. Menyalin konten dalam jumlah besar atau mengaku sebagai CalcularYa tidak diperbolehkan."],
        },
        {
          titulo: "Tanggung jawab",
          parrafos: ["Kami tidak bertanggung jawab atas keputusan yang hanya didasarkan pada hasil dari situs ini. Sebelum menandatangani, membayar, atau mengajukan klaim, pastikan angkanya kepada orang atau instansi yang berwenang."],
        },
        { titulo: "Kontak", parrafos: [`Email kami: ${mail}.`] },
      ],
    },
  },
});
