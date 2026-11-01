import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.felmondasi-ido-kalkulator",
  h1: "Felmondási idő kalkulátor",
  title: "Felmondási idő kalkulátor: hány nap és meddig tart?",
  description:
    "A felmondási idő {{hu.felmondasi-ido-alap}}, munkáltatói felmondásnál a munkaviszony hosszával nő, legfeljebb 90 napig. Felmentés és utolsó munkanap.",
  intro: [
    "A felmondási idő alapesetben {{hu.felmondasi-ido-alap}}. Ha a munkáltató mond fel, a munkaviszony hosszával meghosszabbodik.",
    "Munkáltatói felmondásnál a felmondási idő legalább felére a munkáltató felment a munkavégzés alól, erre az időre távolléti díj jár.",
  ],
  comoSeCalcula: [
    "Alap: {{hu.felmondasi-ido-alap}}.",
    "Munkáltatói felmondásnál ennyivel hosszabb: három év után {{hu.felmondasi-ido-hosszabbitas[3]}}, öt év után {{hu.felmondasi-ido-hosszabbitas[5]}}, nyolc év után {{hu.felmondasi-ido-hosszabbitas[8]}}, tíz év után {{hu.felmondasi-ido-hosszabbitas[10]}}, tizenöt év után {{hu.felmondasi-ido-hosszabbitas[15]}}, tizennyolc év után {{hu.felmondasi-ido-hosszabbitas[18]}}, húsz év után {{hu.felmondasi-ido-hosszabbitas[20]}}.",
    "A felmondási idő legkorábban a felmondás közlését követő napon kezdődik.",
    "A felmentés legalább a felmondási idő fele. A töredéknap egész napnak számít.",
  ],
  ejemplo: [
    "Négy év után a munkáltató felmond: a felmondási idő 35 nap. Ebből legalább 18 napra felmentenek a munka alól.",
  ],
  faq: [
    {
      pregunta: "Mennyi a felmondási idő 10 év után?",
      respuesta: "Munkáltatói felmondásnál 55 nap: 30 nap alap és 25 nap meghosszabbítás. Ha te mondasz fel, 30 nap.",
    },
    {
      pregunta: "Mennyi a felmondási idő, ha én mondok fel?",
      respuesta: "{{hu.felmondasi-ido-alap}}, függetlenül attól, mennyi ideje dolgozol ott. A felek megállapodhatnak hosszabb, legfeljebb hathavi felmondási időben.",
    },
    {
      pregunta: "Kell dolgoznom a felmondási idő alatt?",
      respuesta: "Munkáltatói felmondásnál legalább a felére felmentenek a munkavégzés alól. A többi időben a munkáltató kérheti, hogy dolgozz.",
    },
  ],
  glosario: [
    { termino: "Felmondási idő", definicion: "A felmondás közlése és a munkaviszony megszűnése közötti idő." },
    { termino: "Felmentési idő", definicion: "A felmondási idő része, amikor nem kell dolgoznod, de fizetést kapsz." },
  ],
});
