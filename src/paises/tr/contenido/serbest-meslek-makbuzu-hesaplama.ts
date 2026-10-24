import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.serbest-meslek-makbuzu-hesaplama",
  h1: "Serbest meslek makbuzu hesaplama",
  title: "Serbest Meslek Makbuzu Hesaplama: Brüt, Net ve KDV",
  description:
    "Serbest meslek makbuzunda brüt ücreti, {{tr.gvk94[serbest-meslek]}} gelir vergisi stopajını, KDV'yi ve elinize geçecek tutarı hesaplayın. Brütten nete ve netten brüte.",
  intro: [
    "Avukat, doktor, mali müşavir, mühendis, tasarımcı gibi serbest meslek erbabı, işi için serbest meslek makbuzu düzenler. Ödemeyi yapan vergi kesintisi yapmakla yükümlüyse brüt ücretten gelir vergisi stopajı keser.",
    "Brüt ya da net tutarı girin, stopaj ve KDV durumunu seçin. Hesaplama makinesi makbuzda yazacak kalemleri ve tahsil edeceğiniz tutarı gösterir.",
  ],
  comoSeCalcula: [
    "Gelir vergisi stopajı: brüt ücretin {{tr.gvk94[serbest-meslek]}} kadarı (Gelir Vergisi Kanunu md. 94/2-b).",
    "Net ücret: brüt ücretten stopaj düşülünce kalan tutar. Netten brüte giderken net tutar 0,80 ile bölünür.",
    "KDV: brüt ücret üzerinden genel oranla ({{tr.kdv[genel]}}) hesaplanır ve ödeyenden ayrıca tahsil edilir.",
    "Tahsil edilecek tutar: net ücret ile KDV'nin toplamı. Stopajı ödeyen vergi dairesine yatırır.",
  ],
  ejemplo: [
    "Brüt 10.000 TL'lik bir makbuzda 2.000 TL stopaj kesilir, net ücret 8.000 TL olur. 2.000 TL KDV eklenince karşı taraftan 10.000 TL tahsil edersiniz.",
  ],
  faq: [
    {
      pregunta: "Serbest meslek makbuzunda stopaj oranı kaç?",
      respuesta: "Genel oran {{tr.gvk94[serbest-meslek]}}. Gelir Vergisi Kanununun 18. maddesi kapsamındaki işler için oran yüzde 17 olarak uygulanır.",
    },
    {
      pregunta: "Şahıslara kesilen makbuzda stopaj olur mu?",
      respuesta: "Stopajı ödemeyi yapan kesinti yükümlüsü yapar. Ödeyen kesinti yapmakla yükümlü değilse stopaj kesilmez; bu durumda stopaj kutusunun işaretini kaldırın.",
    },
    {
      pregunta: "Net ücret anlaştıysam brüt ne yazmalıyım?",
      respuesta: "Net tutarı girip «Net ücret» seçeneğini seçin. Stopaj yüzde 20 ise brüt, net tutar 0,80 ile bölünerek bulunur.",
    },
  ],
  glosario: [
    { termino: "Serbest meslek makbuzu", definicion: "Serbest meslek erbabının tahsil ettiği ücret için düzenlediği belge." },
    { termino: "Stopaj", definicion: "Ödemeyi yapanın gelir vergisini kaynakta kesip vergi dairesine yatırması." },
  ],
});
