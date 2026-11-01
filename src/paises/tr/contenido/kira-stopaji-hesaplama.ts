import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.kira-stopaji-hesaplama",
  h1: "Kira stopajı hesaplama",
  title: "Kira Stopajı Hesaplama: Brüt ve Net İşyeri Kirası",
  description:
    "İşyeri kirasında {{tr.gvk94[kira]}} stopajı hesaplayın: net kiradan brüte, brüt kiradan nete, aylık ve dönem toplamı.",
  intro: [
    "Vergi kesintisi yapmakla yükümlü kiracılar (şirketler, defter tutan işletmeler gibi) işyeri kirasını öderken gelir vergisi stopajı keser ve vergi dairesine yatırır.",
    "Kira sözleşmesinde net kira yazıyorsa brüt kirayı, brüt kira yazıyorsa ev sahibine ödenecek neti bulmak için tutarı girin.",
  ],
  comoSeCalcula: [
    "Stopaj oranı: brüt kiranın {{tr.gvk94[kira]}} kadarı (Gelir Vergisi Kanunu md. 94/5-a).",
    "Netten brüte: net kira 0,80 ile bölünür. Brüt ile net arasındaki fark stopajdır.",
    "Dönem toplamı: aylık stopaj, girdiğiniz ay sayısıyla çarpılır.",
  ],
  ejemplo: [
    "Ev sahibine aylık net 40.000 TL ödenecekse brüt kira 50.000 TL olur ve kiracı her ay 10.000 TL stopaj yatırır. Bir yılda stopaj toplamı 120.000 TL'dir.",
  ],
  faq: [
    {
      pregunta: "Konut kirasında stopaj var mı?",
      respuesta: "Kiracı vergi kesintisi yapmakla yükümlü değilse (çoğu konut kiracısı gibi) stopaj kesilmez. Stopaj, kesinti yükümlüsünün yaptığı kira ödemelerinde uygulanır.",
    },
    {
      pregunta: "Kira stopajını kim öder?",
      respuesta: "Kiracı, kirayı öderken stopajı keser ve muhtasar beyannameyle vergi dairesine öder. Ev sahibi net kirayı alır.",
    },
    {
      pregunta: "Stopaj ev sahibinin vergisinden düşülür mü?",
      respuesta: "Ev sahibi kira gelirini beyan ederse, yıl içinde kesilen stopajı hesaplanan vergiden mahsup eder.",
    },
  ],
  glosario: [
    { termino: "Brüt kira", definicion: "Stopaj dahil kira bedeli." },
    { termino: "Muhtasar beyanname", definicion: "Vergi kesintisi yapanların kestikleri vergileri bildirdiği beyanname." },
  ],
});
