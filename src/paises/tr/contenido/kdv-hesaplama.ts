import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.kdv-hesaplama",
  h1: "KDV hesaplama: {{tr.kdv[genel]}}, {{tr.kdv[indirimli]}} ve {{tr.kdv[dusuk]}}",
  title: "KDV Hesaplama: KDV Dahil ve Hariç Tutar ({{tr.kdv[genel]}})",
  description:
    "KDV hariç tutara KDV ekleyin ya da KDV dahil fiyattan KDV'yi ayırın. Türkiye'deki {{tr.kdv[genel]}}, {{tr.kdv[indirimli]}} ve {{tr.kdv[dusuk]}} oranlarıyla, kuruşuna kadar.",
  intro: [
    "Türkiye'de katma değer vergisinin genel oranı {{tr.kdv[genel]}}. (I) sayılı listedeki mal ve hizmetlerde {{tr.kdv[dusuk]}}, (II) sayılı listedekilerde {{tr.kdv[indirimli]}} uygulanır.",
    "Tutarı girin, KDV eklemek mi ayırmak mı istediğinizi ve oranı seçin.",
  ],
  comoSeCalcula: [
    "KDV ekleme: KDV hariç tutar oranla çarpılır, çıkan KDV tutara eklenir.",
    "KDV ayırma: KDV dahil tutar (1 + oran) ile bölünür, örneğin genel oranda 1,20 ile. Kalan fark KDV'dir.",
    "KDV dahil tutardan doğrudan yüzde 20 düşmek yanlıştır: KDV hariç tutar olması gerekenden az çıkar.",
  ],
  ejemplo: [
    "KDV hariç 1.000 TL'lik bir hizmetin genel oranda KDV'si 200 TL, KDV dahil fiyatı 1.200 TL'dir. Tersine, 1.200 TL'lik KDV dahil fiyatın içinde 200 TL KDV vardır.",
  ],
  faq: [
    {
      pregunta: "KDV dahil fiyattan KDV nasıl ayrılır?",
      respuesta: "Genel oranda KDV dahil fiyatı 1,20 ile bölün. 1.200 TL'den 1.000 TL KDV hariç tutar ve 200 TL KDV çıkar.",
    },
    {
      pregunta: "Türkiye'de KDV oranları nedir?",
      respuesta: "Genel oran {{tr.kdv[genel]}}. Ayrıca (II) sayılı listedeki mal ve hizmetler için {{tr.kdv[indirimli]}}, (I) sayılı listedekiler için {{tr.kdv[dusuk]}} oranı vardır. Hangi listenin uygulanacağı mal veya hizmete göre değişir.",
    },
    {
      pregunta: "Matrah ne demek?",
      respuesta: "KDV'nin hesaplandığı tutar, yani KDV hariç bedel.",
    },
  ],
  glosario: [
    { termino: "KDV hariç", definicion: "Vergi eklenmemiş bedel; KDV matrahı." },
    { termino: "KDV dahil", definicion: "Vergisi eklenmiş, alıcının ödediği toplam fiyat." },
  ],
});
