import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.gelir-vergisi-hesaplama",
  h1: "Gelir vergisi hesaplama {{anio}}",
  title: "Gelir Vergisi Hesaplama {{anio}}: Vergi Dilimleri",
  description:
    "Yıllık matrahınıza {{anio}} gelir vergisi tarifesini uygulayın: {{tr.gv-tarife-ucret[0].tasa}} ile {{tr.gv-tarife-ucret[-1].tasa}} arasındaki dilimler, ücret ve ücret dışı gelirler için ayrı.",
  intro: [
    "Gelir vergisi artan oranlı bir tarifeyle alınır: matrahın her dilime düşen kısmı o dilimin oranıyla vergilenir. Ücretlerde üçüncü dilim daha geniştir.",
    "Yıllık vergi matrahınızı ve gelirin türünü seçin. Hesaplama makinesi toplam vergiyi, ortalama oranı ve dilim dilim hesabı gösterir.",
  ],
  comoSeCalcula: [
    "İlk dilim: {{tr.gv-tarife-ucret[0].hasta}} tutarına kadar {{tr.gv-tarife-ucret[0].tasa}}. İkinci dilim: {{tr.gv-tarife-ucret[1].hasta}} tutarına kadar {{tr.gv-tarife-ucret[1].tasa}}.",
    "Üçüncü dilim ({{tr.gv-tarife-ucret[2].tasa}}): ücret gelirlerinde {{tr.gv-tarife-ucret[2].hasta}}, ücret dışı gelirlerde {{tr.gv-tarife[2].hasta}} tutarına kadar.",
    "Dördüncü dilim ({{tr.gv-tarife-ucret[3].tasa}}) {{tr.gv-tarife-ucret[3].hasta}} tutarına kadar uygulanır. Bunun üstüne {{tr.gv-tarife-ucret[-1].tasa}} oranı uygulanır.",
    "Matrah, gelirden kanunda sayılan indirimler (sigorta primleri, giderler, istisnalar) düşüldükten sonra kalan tutardır. Bu sayfa matrahı sizin girdiğiniz şekliyle vergilendirir.",
  ],
  ejemplo: [
    "Ücret dışı 600.000 TL matrahın vergisi: ilk 190.000 TL için 28.500 TL, 190.000 ile 400.000 TL arası için 42.000 TL, kalan 200.000 TL için 54.000 TL. Toplam 124.500 TL; ortalama oran yüzde 20,75.",
  ],
  faq: [
    {
      pregunta: "Ücretlilerin vergi dilimi neden farklı?",
      respuesta: "Tarifede ücret gelirleri için üçüncü dilim {{tr.gv-tarife-ucret[2].hasta}} tutarına kadar uzatılmıştır. Diğer gelirlerde bu sınır {{tr.gv-tarife[2].hasta}}. Diğer dilimler aynıdır.",
    },
    {
      pregunta: "Vergi dilimine girince bütün gelirim o orandan mı vergilenir?",
      respuesta: "Hayır. Yalnızca dilimi aşan kısım üst oranla vergilenir. Alt dilimlere düşen kısımların vergisi değişmez.",
    },
    {
      pregunta: "Tek işverenden ücret alan beyanname verir mi?",
      respuesta: "Tek işverenden alınan ve kesinti yoluyla vergilendirilen ücret, tarifenin dördüncü dilim tutarını ({{tr.gv-tarife-ucret[3].hasta}}) aşmıyorsa yıllık beyannameye girmez.",
    },
  ],
  glosario: [
    { termino: "Vergi matrahı", definicion: "Verginin hesaplandığı tutar: gelirden indirim ve istisnalar düşüldükten sonra kalan kısım." },
    { termino: "Artan oranlı tarife", definicion: "Gelir arttıkça üst kısımlara daha yüksek oran uygulanan vergi tarifesi." },
  ],
});
