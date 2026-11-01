import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.ishdan-boshatish-nafaqasi",
  h1: "Ishdan boʻshatish nafaqasini hisoblash",
  title: "Ishdan boʻshatish nafaqasi: staj boʻyicha summa",
  description:
    "Ishdan boʻshatish nafaqasining eng kam miqdorini hisoblang. Stajga qarab u oʻrtacha oylik ish haqining {{uz.ishdan-boshatish-nafaqasi[3-yilgacha]}}, {{uz.ishdan-boshatish-nafaqasi[3-5-yil]}}, {{uz.ishdan-boshatish-nafaqasi[5-10-yil]}}, {{uz.ishdan-boshatish-nafaqasi[10-15-yil]}} yoki {{uz.ishdan-boshatish-nafaqasi[15-yildan-ortiq]}} qismi.",
  intro: [
    "Ishdan boʻshatish nafaqasi mehnat shartnomasi xodimga bogʻliq boʻlmagan sabablarga koʻra bekor qilinganda bir yoʻla toʻlanadigan pul.",
    "Miqdori shu ish beruvchidagi stajingizga bogʻliq. Mehnat kodeksi eng kam miqdorni belgilaydi, jamoa yoki mehnat shartnomasi undan koʻp berishi mumkin.",
  ],
  comoSeCalcula: [
    "Uch yilgacha staj: oʻrtacha oylik ish haqining {{uz.ishdan-boshatish-nafaqasi[3-yilgacha]}}.",
    "Uch yildan besh yilgacha: {{uz.ishdan-boshatish-nafaqasi[3-5-yil]}}. Besh yildan oʻn yilgacha: {{uz.ishdan-boshatish-nafaqasi[5-10-yil]}}.",
    "Oʻn yildan oʻn besh yilgacha: {{uz.ishdan-boshatish-nafaqasi[10-15-yil]}}. Oʻn besh yildan ortiq: {{uz.ishdan-boshatish-nafaqasi[15-yildan-ortiq]}}.",
  ],
  ejemplo: ["Oʻrtacha oylik ish haqi 6 000 000 soʻm, staj 4 yil, shtat qisqargan. Nafaqa kamida 4 500 000 soʻm (75 foiz)."],
  faq: [
    {
      pregunta: "Qaysi hollarda nafaqa toʻlanadi?",
      respuesta: "Ish beruvchi tashabbusi bilan (xodimning aybi boʻlmasa), tashkilot tugatilganda, shuningdek xodim yangi mehnat shartlarida, boshqa joyda yoki sogʻligʻiga mos boshqa ishda ishlashni rad etganda.",
    },
    {
      pregunta: "Oʻz xohishim bilan ketsam nafaqa olamanmi?",
      respuesta: "Yoʻq, qonun bu holda ishdan boʻshatish nafaqasini nazarda tutmaydi. Foydalanilmagan taʼtil uchun pulli kompensatsiya esa har qanday holda toʻlanadi.",
    },
    {
      pregunta: "Nafaqa qaysi ish haqidan hisoblanadi?",
      respuesta: "Oʻrtacha oylik ish haqidan: oxirgi 12 oyda hisoblangan mehnat daromadlarining oʻn ikkidan bir qismi.",
    },
  ],
  glosario: [
    { termino: "Ishdan boʻshatish nafaqasi", definicion: "Shartnoma alohida asoslarda bekor qilinganda xodimga bir yoʻla toʻlanadigan pul." },
  ],
});
