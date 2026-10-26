import type { DiccionarioLegal } from "./tipos";

// Turco con «siz» (ADR 0002, D12). Texto propio, frases cortas, sin jerga legal copiada.
export const tr: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Hakkımızda | CalcularYa",
      description: "CalcularYa her ülke için iş, para ve günlük hayatla ilgili hesaplama araçları hazırlar; rakamlar resmî kaynaklardan alınır.",
      h1: "Hakkımızda",
      bajada: "Her ülke için, o ülkenin resmî verileriyle çalışan hesaplama araçları.",
      bloques: [
        {
          parrafos: [
            "CalcularYa, günlük hesaplar için bir hesaplama aracı sitesidir: maaş, kredi, vergi, tarihler ve daha fazlası.",
            "Siteyi, Arjantin için hesaplama araçları sunan calcular.ar sitesini de yöneten Manuel Navarro hazırlıyor.",
          ],
        },
        {
          titulo: "Nasıl çalışıyoruz",
          parrafos: [
            "Bir hesaplama bir kurala bağlıysa (asgari ücret, prim oranı ya da bir sınır), değeri o ülkenin resmî kaynağından okuruz: resmî gazete, bakanlık, merkez bankası ya da vergi idaresi.",
            "Bağlantıyı ve kontrol tarihini saklar, ikisini de her hesaplama aracının yanında gösteririz.",
            "Resmî kaynakta doğrulanamayan bir değer varsa, onu kullanan hesaplama aracı yayımlanmaz.",
            "Kural değişirse hesaplama aracı da değişir ve bu değişiklik her ülkenin güncellemeler sayfasına kaydedilir.",
          ],
        },
        { titulo: "Ücretsiz", parrafos: ["Tüm hesaplama araçları ücretsizdir ve hesap açmanızı gerektirmez."] },
      ],
    },
    contacto: {
      title: "İletişim | CalcularYa",
      description: "Güncelliğini yitirmiş bir rakam, beklemediğiniz bir sonuç ya da yeni bir hesaplama aracı veya ülke isteği için bize yazın.",
      h1: "İletişim",
      bajada: `E-posta adresimiz: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Güncelliğini yitirmiş bir rakamı, beklemediğiniz bir sonucu ya da henüz olmayan bir hesaplama aracını veya ülkeyi bize bildirirseniz çok yardımcı olursunuz.",
            "Konu bir rakamsa ülkeyi ve rakamı gördüğünüz sayfayı belirtin.",
            "Yanıtları gerçek bir kişi yazar. Birkaç gün sürebilir.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Gizlilik politikası | CalcularYa",
      description: "CalcularYa hangi verileri kullanır: hesaplama araçlarına girdiğiniz bilgiler tarayıcınızda işlenir ve bizde saklanmaz.",
      h1: "Gizlilik politikası",
      bajada: `Son güncelleme: ${actualizado}.`,
      bloques: [
        {
          titulo: "Hesaplama araçlarına girdiğiniz bilgiler",
          parrafos: ["Hesaplama tarayıcınızda yapılır. Girdiğiniz bilgiler hiçbir sunucuya gönderilmez ve bizde saklanmaz."],
        },
        {
          titulo: "Ülkeniz",
          parrafos: [
            "Size doğru ülkenin hesaplama araçlarını önerebilmek için ziyaretinizin hangi ülkeden geldiğine bakarız. Barındırma hizmeti sağlayıcımız bunu IP adresinizden tahmin eder.",
            "IP adresinizi saklamayız. Sonuç yalnızca ziyaretiniz süresince tarayıcınızda tutulur.",
          ],
        },
        {
          titulo: "Tarayıcınızın sakladıkları",
          parrafos: [
            "Sekme kapanınca silinen oturum depolaması; ziyaretinizin geldiği ülkeyi, bunu öneren bildirimi kapatıp kapatmadığınızı ve paylaşılan bir bağlantıyla geldiyseniz o bağlantının kodunu hatırlar.",
            "Siz tarayıcıdan silene kadar duran yerel depolama; kendi seçtiğiniz ülkeyi, ziyaretleri saymak için rastgele bir sayıyı ve size gösterilen tasarım denemesi sürümünü saklar. Böylece site her döndüğünüzde aynı görünür. Bu verilerin hiçbiri kim olduğunuzu göstermez.",
            "Reklam ya da izleme çerezi kullanmayız.",
          ],
        },
        {
          titulo: "Sitenin sunucusu",
          parrafos: ["Site Vercel üzerinde barındırılır. Her sunucu gibi Vercel de sitenin çalışması ve güvenliği için her ziyaretin teknik verilerini (IP adresi ve tarayıcı) kaydeder."],
        },
        {
          titulo: "Ziyaretleri nasıl sayıyoruz",
          parrafos: [
            "Sitenin kullanımını kendi aracımızla ölçeriz: açılan sayfalar ve ne sıklıkla kullanıldıkları, geldiğiniz site, cihaz türü ve ülkeniz. Tarayıcınızın sakladığı rastgele sayı, yeni bir ziyareti tekrar eden bir ziyaretten ayırır. IP adresinizi ve hesaplama araçlarına girdiğiniz bilgileri saklamayız.",
            "Bu siteden paylaşılan bağlantılar, her paylaşımda değişen rastgele bir kod taşır. Böylece her bağlantıdan kaç ziyaret geldiğini sayabiliriz. Bu kod kimseyi tanımlamaz.",
            "Hesaplama araçlarına girdiğiniz tutarlar bağlantının içinde hiçbir zaman tarayıcınızdan çıkmaz.",
          ],
        },
        {
          titulo: "Değişiklikler ve sorular",
          parrafos: [
            "Bir şey değişirse (örneğin reklam eklersek), bunu yürürlüğe girmeden önce bu sayfada duyururuz.",
            `Verilerinizle ilgili sorular için ${mail} adresine yazın.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Kullanım koşulları | CalcularYa",
      description: "CalcularYa hesaplama araçları güncel resmî verilerle tahmin sunar. Sonuçlar yol göstericidir, profesyonel danışmanlık değildir.",
      h1: "Kullanım koşulları",
      bajada: `Son güncelleme: ${actualizado}.`,
      bloques: [
        {
          titulo: "Hesaplama araçlarının amacı",
          parrafos: [
            "Sonuçlar, güncel resmî verilere dayanan tahminlerdir. Onları yol gösterici olarak kullanın.",
            "Sonuçlar işvereninizin, mali müşavirinizin ya da avukatınızın hesabının veya resmî kurumların kararlarının yerini tutmaz.",
          ],
        },
        {
          titulo: "Verilerin kaynağı",
          parrafos: [
            "Her hesaplama aracı, değerlerinin resmî kaynağını ve kontrol ettiğimiz tarihi gösterir.",
            "Verileri güncel tutmaya çalışırız, ancak kurallar biz ekleyemeden değişebilir.",
          ],
        },
        {
          titulo: "Sitenin kullanımı",
          parrafos: ["Site ücretsizdir. Kullanabilir ve bağlantılarını paylaşabilirsiniz. İçeriği toplu olarak kopyalamak ya da kendini CalcularYa olarak tanıtmak yasaktır."],
        },
        {
          titulo: "Sorumluluk",
          parrafos: ["Yalnızca bu sitedeki sonuçlara dayanarak verilen kararlardan sorumlu değiliz. İmzalamadan, ödeme yapmadan ya da talepte bulunmadan önce rakamları yetkili kişi veya kurumla teyit edin."],
        },
        { titulo: "İletişim", parrafos: [`E-posta adresimiz: ${mail}.`] },
      ],
    },
  },
});
