import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.yer-soligi-kalkulyatori",
  h1: "Yer soligʻi kalkulyatori (jismoniy shaxslar)",
  title: "Yer soligʻi {{anio}}: hovli va tomorqa uchun hisoblash",
  description:
    "Jismoniy shaxslardan olinadigan yer soligʻini hudud boʻyicha bazaviy stavka (Toshkent 1-zonasida 1 kv.m uchun {{uz.yer-soligi[toshkent-1]}}), maydon va koeffitsiyentdan hisoblang.",
  intro: [
    "Uy-joy, hovli va tomorqa yeriga ega jismoniy shaxslar har yili yer soligʻi toʻlaydi. Soliq bazasi yer uchastkasining maydoni.",
    "Bazaviy stavka 1 kv.m uchun soʻmda belgilangan va hududga bogʻliq. Viloyat va tuman Kengashlari unga koeffitsiyent qoʻllab, aniq stavkani belgilaydi.",
  ],
  comoSeCalcula: [
    "Soliq: bazaviy stavka × koeffitsiyent × maydon.",
    "Toshkent shahrida zonaga qarab: 1-zona {{uz.yer-soligi[toshkent-1]}}, 3-zona {{uz.yer-soligi[toshkent-3]}}, 5-zona {{uz.yer-soligi[toshkent-5]}}.",
    "Viloyatlarda, masalan, Samarqand {{uz.yer-soligi[samarqand]}}, Fargʻona {{uz.yer-soligi[fargona]}}, Sirdaryo {{uz.yer-soligi[sirdaryo]}}.",
    "Viloyat Kengashlari 0,5 dan 2,0 gacha, tuman va shahar Kengashlari yana 0,7 dan 3,0 gacha koeffitsiyent qoʻllashi mumkin.",
  ],
  ejemplo: ["Toshkentning 3-zonasida 6 sotix (600 kv.m) hovli uchun koeffitsiyentsiz soliq 774 000 soʻm."],
  faq: [
    {
      pregunta: "Yer soligʻini kim hisoblaydi?",
      respuesta: "Yer uchastkasi joylashgan yerdagi soliq organi. Toʻlov xabarnomasi har yili 1-martdan kechiktirmay topshiriladi.",
    },
    {
      pregunta: "Tomorqaga ekin ekilmasa soliq oshadimi?",
      respuesta: "Ha. Yakka tartibda uy-joy qurish uchun berilgan uchastkaning tomorqa qismiga ekin ekilmasa yoki obodonlashtirilmasa, soliq uch baravar toʻlanadi.",
    },
    {
      pregunta: "Hujjatsiz yoki ortiqcha maydondan foydalansam-chi?",
      respuesta: "Hujjatsiz yoki hujjatdagidan katta maydondan foydalanilganda stavka belgilanganidan uch baravar qilib olinadi.",
    },
  ],
  glosario: [
    { termino: "Sotix", definicion: "Yuz kvadrat metr yer maydoni." },
    { termino: "Bazaviy stavka", definicion: "Soliq kodeksida hudud boʻyicha belgilangan, 1 kv.m uchun soʻmdagi stavka." },
  ],
});
