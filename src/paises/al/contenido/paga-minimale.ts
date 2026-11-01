import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.paga-minimale",
  h1: "Paga minimale {{anio}} në Shqipëri",
  title: "Paga minimale {{anio}}: {{al.paga-minimale}} bruto, sa neto",
  description: "Paga minimale është {{al.paga-minimale}} në muaj dhe {{al.paga-minimale-orare}} në orë. Shihni pagën neto, koston dhe minimumin për orët që punoni.",
  intro: [
    "Paga bazë minimale në Shqipëri është {{al.paga-minimale}} në muaj për {{al.ore-mujore}} orë pune, nga {{al.paga-minimale#desde}}. Paga minimale orare është {{al.paga-minimale-orare}}. E vendos VKM nr. 776, datë 19.12.2025, dhe është e detyrueshme për çdo punëdhënës, vendas ose të huaj.",
    "Vendosni orët që punoni në muaj dhe, nëse doni, pagën tuaj. Kalkulatori tregon minimumin dhe diferencën.",
  ],
  comoSeCalcula: [
    "Për {{al.ore-mujore}} orë ose më shumë, minimumi është paga mujore {{al.paga-minimale}}. Për më pak orë, shumëzohen orët me pagën orare {{al.paga-minimale-orare}}.",
    "Paga neto del pasi mbahen {{al.kontribute[shoqerore-punonjes]}} sigurime shoqërore dhe {{al.kontribute[shendetesore-punonjes]}} shëndetësore. Tatimi është zero, sepse zbritja e nenit 22 e mbulon këtë pagë.",
    "Shtesat me karakter të përhershëm jepen mbi pagën bazë, sipas pikës 4 të vendimit.",
  ],
  ejemplo: [
    "Një punonjës me 87 orë në muaj ka minimum 87 × 287,3 = 24 995 lekë. Nëse paga e tij është 30 000 lekë, ajo është 5 005 lekë mbi minimumin. Për 174 orë minimumi është 50 000 lekë bruto dhe 44 400 lekë neto.",
  ],
  faq: [
    {
      pregunta: "Sa është paga minimale neto?",
      respuesta: "44 400 lekë në muaj për një punonjës me kohë të plotë. Nga {{al.paga-minimale}} mbahen 4 750 lekë sigurime shoqërore dhe 850 lekë shëndetësore. Tatimi mbi pagën është zero.",
    },
    {
      pregunta: "Sa ishte paga minimale më parë?",
      respuesta: "40 000 lekë deri më 31 dhjetor 2025. INSTAT e shënon rritjen në 50 000 lekë më 1 janar 2026 si shkakun e rritjes së numrit të punonjësve me pagë minimale.",
    },
    {
      pregunta: "Sa peshon paga minimale kundrejt mesatares?",
      respuesta: "Paga mesatare bruto në tremujorin e parë 2026 ishte {{al.paga-mesatare}}, sipas INSTAT. Paga minimale është rreth 55% e saj.",
    },
    {
      pregunta: "Kush e paguan pagën minimale?",
      respuesta: "Pika 1 e VKM nr. 776/2025 e bën të detyrueshme për çdo person, juridik a fizik, vendas ose të huaj. Asnjë kontratë nuk mund të shkojë nën të.",
    },
  ],
  glosario: [
    { termino: "Paga bazë minimale", definicion: "Shuma më e ulët që lejon ligji për muajin e plotë, para kontributeve." },
    { termino: "Paga orare", definicion: "Minimumi për një orë pune në kohën normale." },
  ],
});
