import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.kira-artis-orani-hesaplama",
  h1: "Kira artış oranı hesaplama",
  title: "Kira Artış Oranı Hesaplama: TÜFE 12 Aylık Ortalama",
  description:
    "Kira yenileme tarihinize göre yasal kira artış oranını ve yeni kiranızı hesaplayın. TÜFE on iki aylık ortalama değişimi, TCMB ve TÜİK verisiyle.",
  intro: [
    "Konut ve çatılı işyeri kiralarında yenilenen kira yılı için yapılacak artış, bir önceki kira yılında tüketici fiyat endeksinin (TÜFE) on iki aylık ortalamalara göre değişim oranını geçemez (Türk Borçlar Kanunu md. 344).",
    "Şu anki kiranızı ve kira yılının yenileneceği tarihi girin. Hesaplama, yenileme ayından önceki ayın oranını kullanır ve yasal üst sınıra göre yeni kirayı gösterir.",
  ],
  comoSeCalcula: [
    "Esas alınan ay: kira yenileme tarihinden bir önceki ay. Örneğin ekim ayında yenilenen bir kira için eylül ayı TÜFE verisi kullanılır.",
    "Oran: son on iki ayın TÜFE endeks ortalaması, ondan önceki on iki ayın ortalamasıyla karşılaştırılır. Bu, TÜİK'in her ay açıkladığı on iki aylık ortalama değişimdir.",
    "Yeni kira: mevcut kira ile oranın çarpımı kadar artış eklenerek bulunur. Bu tutar bir üst sınırdır; taraflar daha düşük bir artış üzerinde anlaşabilir.",
    "Endeksler TCMB'nin TÜİK verisiyle çalışan enflasyon hesaplayıcısından alınır. Son veri: {{tr.tufe#desde}}.",
  ],
  ejemplo: [
    "Ekim 2026 içinde yenilenen 20.000 TL'lik bir kira için Eylül 2026 verisi esas alınır. On iki aylık ortalama değişim yüzde 31,49 olduğundan kira en çok 6.298 TL artarak 26.298 TL olabilir.",
  ],
  faq: [
    {
      pregunta: "Kira artışında yıllık enflasyon mu, on iki aylık ortalama mı kullanılır?",
      respuesta: "On iki aylık ortalamalara göre değişim kullanılır. Yıllık TÜFE değişimi farklı bir göstergedir; sonuçta bilgi için ayrıca gösterilir.",
    },
    {
      pregunta: "Hangi ayın oranı uygulanır?",
      respuesta: "Kira yılının başladığı aydan önceki ayın verisi. Bu veri yenileme ayının içinde açıklanır.",
    },
    {
      pregunta: "Kiracı ile ev sahibi anlaşamazsa ne olur?",
      respuesta: "Kira bedeli, aynı on iki aylık ortalama oranını geçmemek koşuluyla hâkim tarafından, kiralananın durumu göz önüne alınarak hakkaniyete göre belirlenir.",
    },
  ],
  glosario: [
    { termino: "TÜFE", definicion: "Tüketici fiyat endeksi: hanelerin satın aldığı mal ve hizmetlerin fiyat değişimini ölçen, TÜİK'in hesapladığı endeks." },
    { termino: "On iki aylık ortalamalara göre değişim", definicion: "Son on iki ayın endeks ortalamasının, bir önceki on iki ayın ortalamasına göre yüzde değişimi." },
  ],
});
