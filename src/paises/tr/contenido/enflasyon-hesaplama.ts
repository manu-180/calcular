import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.enflasyon-hesaplama",
  h1: "Enflasyon hesaplama: paranın bugünkü değeri",
  title: "Enflasyon Hesaplama: TÜFE ile Paranın Bugünkü Değeri",
  description:
    "Geçmişteki bir tutarın bugün kaç lira ettiğini TÜFE ile hesaplayın. 2003 yılından bu yana aylık endeks, toplam enflasyon ve alım gücü kaybı.",
  intro: [
    "Bir tutarın ait olduğu ayı ve güncellemek istediğiniz ayı seçin. Hesaplama makinesi, iki ayın tüketici fiyat endeksi (TÜFE) oranıyla aynı alım gücüne denk gelen tutarı bulur.",
    "Endeks değerleri, TÜİK verisiyle çalışan TCMB enflasyon hesaplayıcısından alınır ve her ay güncellenir. Açıklanan son ay: {{tr.tufe#desde}}.",
  ],
  comoSeCalcula: [
    "Güncel tutar: tutar × (bitiş ayı TÜFE endeksi / başlangıç ayı TÜFE endeksi).",
    "Toplam enflasyon: iki endeks arasındaki yüzde değişim.",
    "Alım gücü: bugünkü tutarın başlangıç ayı fiyatlarıyla ne kadar mal alabileceği, yani tutarın endeks oranına bölünmüş hali.",
    "Endeks 2003=100 tabanıyla zincirlenmiştir; TÜİK'in yeni tabanı farklı olsa da iki ay arasındaki oran aynıdır.",
  ],
  ejemplo: [
    "2020 yılı Ocak ayındaki 10.000 TL, Eylül 2026 fiyatlarıyla 97.846,34 TL eder. Bu dönemde fiyatlar yüzde 878,46 arttı.",
  ],
  faq: [
    {
      pregunta: "Hesaplama TCMB'nin enflasyon hesaplayıcısıyla aynı sonucu verir mi?",
      respuesta: "Evet. Aynı endeks değerleri kullanıldığı için sonuç TCMB'nin hesaplayıcısıyla kuruşuna kadar aynıdır.",
    },
    {
      pregunta: "Bu ayın enflasyonu neden yok?",
      respuesta: "Bir ayın TÜFE verisi o ay bittikten sonra açıklanır. Henüz açıklanmamış bir ay seçerseniz açıklanan son ay kullanılır.",
    },
    {
      pregunta: "Kira artışı için bu sayfayı kullanabilir miyim?",
      respuesta: "Kira artışında yasal sınır on iki aylık ortalama değişimdir, iki ay arasındaki değişim değil. Bunun için kira artış oranı hesaplama sayfasını kullanın.",
    },
  ],
  glosario: [
    { termino: "Enflasyon", definicion: "Fiyatlar genel düzeyinin sürekli artması." },
    { termino: "Alım gücü", definicion: "Bir para tutarıyla satın alınabilecek mal ve hizmet miktarı." },
  ],
});
