import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.ogohlantirish-muddati",
  h1: "Ishdan ketishda ogohlantirish muddati kalkulyatori",
  title: "Ogohlantirish muddati: ishdan ketish va boʻshatish",
  description:
    "Ishdan oʻz xohishingiz bilan ketsangiz yoki ish beruvchi shartnomani bekor qilsa, ogohlantirish muddati qachon tugashini Mehnat kodeksi boʻyicha hisoblang.",
  intro: [
    "Mehnat shartnomasini bekor qilishdan oldin tomonlar bir-birini yozma ogohlantirishi kerak. Muddat kimning tashabbusi va qaysi asos ekaniga bogʻliq.",
    "Oʻz xohishingiz bilan ketsangiz, ish beruvchini {{uz.ogohlantirish-kun[xodim]}} oldin ogohlantirasiz. Tashkilot tugatilsa yoki shtat qisqarsa, ish beruvchi sizni kamida {{uz.ogohlantirish-oy}} oldin ogohlantiradi.",
  ],
  comoSeCalcula: [
    "Xodim tashabbusi: {{uz.ogohlantirish-kun[xodim]}}, ish beruvchi arizani olgan kunning ertasidan boshlab.",
    "Tashkilot tugatilishi yoki shtat qisqarishi: kamida {{uz.ogohlantirish-oy}}.",
    "Malaka yetarli emasligi: kamida {{uz.ogohlantirish-kun[malaka]}}. Aybli harakatlar: kamida {{uz.ogohlantirish-kun[aybli]}}.",
    "Ish beruvchi ogohlantirishni muddatiga mos pulli kompensatsiya bilan almashtirishi mumkin.",
  ],
  ejemplo: ["Arizani 24-oktabrda bersangiz, muddat 25-oktabrdan boshlanadi va 7-noyabrda tugaydi."],
  faq: [
    {
      pregunta: "Ishdan ketish uchun necha kun oldin ariza yozish kerak?",
      respuesta: "Umumiy holda {{uz.ogohlantirish-kun[xodim]}} oldin. Tashkilot rahbari, mavsumiy va vaqtinchalik xodimlar kabi ayrim toifalar uchun boshqa muddatlar belgilangan.",
    },
    {
      pregunta: "Muddat tugashidan oldin ketish mumkinmi?",
      respuesta: "Ha, ish beruvchi bilan kelishsangiz. Oʻqishga kirish, pensiyaga chiqish kabi ishni davom ettirib boʻlmaydigan hollarda ish beruvchi shartnomani siz soʻragan muddatda bekor qilishi kerak.",
    },
    {
      pregunta: "Arizani qaytarib olsa boʻladimi?",
      respuesta: "Ha. Ogohlantirish muddati davomida, oxirgi kuni ish vaqti tugaguncha arizani qaytarib olishingiz mumkin.",
    },
    {
      pregunta: "Ogohlantirish muddatida kasal boʻlsam nima boʻladi?",
      respuesta: "Ish beruvchi ogohlantirgan boʻlsa, vaqtincha mehnatga qobiliyatsizlik davri muddatga kiritilmaydi. Tashkilot tugatilayotgan hol bundan mustasno.",
    },
  ],
  glosario: [
    { termino: "Ogohlantirish muddati", definicion: "Shartnomani bekor qilish haqida yozma xabar berilgandan keyin ishlab berilishi kerak boʻlgan vaqt." },
  ],
});
