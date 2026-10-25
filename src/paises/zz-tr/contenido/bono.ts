import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-tr.bono",
  h1: "Zetaland yarıyıl ikramiyesi hesaplama",
  title: "Zetaland yarıyıl ikramiyesi: alacağınız tutarı hesaplayın",
  description: "Yarıyıl ikramiyenizi bölgenizin asgari ücreti ve {{zz.bonificacion}} ek ödemeyle hesaplayın. Resmî veriler, tarihi ve kaynağıyla birlikte.",
  intro: [
    "Yarıyıl ikramiyesi, yılda iki kez ödenen bir aylık ek maaştır.",
    "Bir yarıyılın tamamında çalıştıysanız bir aylık maaş ve üzerine {{zz.bonificacion}} alırsınız.",
  ],
  comoSeCalcula: [
    "Hesaplama aylık brüt maaştan başlar. Maaş bölgenizin asgari ücretinin altındaysa asgari ücret kullanılır.",
    "Bu maaş çalışılan ay sayısıyla çarpılır ve 6'ya bölünür.",
    "Küçük işletmelerde ikramiye yarı yarıyadır.",
    "İkramiyeye {{zz.bonificacion}} eklenir.",
  ],
  faq: [
    { pregunta: "Kuzey Bölgesi'nde asgari ücret ne kadar?", respuesta: "{{zz.minimo@norte}}. Yürürlük tarihi: {{zz.minimo@norte#desde}}." },
    { pregunta: "Yarıyılın tamamında çalışmadıysam ne olur?", respuesta: "Çalıştığınız ay sayısına düşen kısmı alırsınız." },
    { pregunta: "Ek ödeme her zaman yapılır mı?", respuesta: "Evet. Tutarı ikramiyenin {{zz.bonificacion}} kadarıdır ve işveren bunu ikramiyeyle birlikte öder." },
  ],
  glosario: [
    { termino: "Yarıyıl ikramiyesi", definicion: "Yasaya göre temmuz ve aralık aylarında ödenmesi zorunlu olan ek maaş." },
    { termino: "Asgari ücret", definicion: "Her bölgede tam bir iş günü için ödenebilecek en düşük ücret." },
  ],
});
