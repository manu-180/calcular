import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.ortacha-ish-haqi-hisoblash",
  h1: "Oʻrtacha ish haqini hisoblash (Mehnat kodeksi, 257-modda)",
  title: "Oʻrtacha ish haqi hisoblash: oylik, kunlik, soatlik",
  description:
    "Oxirgi 12 oyda hisoblangan ish haqidan oʻrtacha oylik, kunlik ({{uz.ish-kunlari-ortacha}} ish kuniga) va soatlik ish haqini Mehnat kodeksi tartibida hisoblang.",
  intro: [
    "Oʻrtacha ish haqi taʼtil puli, ishdan boʻshatish nafaqasi va Mehnat kodeksida nazarda tutilgan boshqa toʻlovlar uchun asos boʻladi.",
    "Mehnat kodeksi uni barcha hollar uchun bir xil tartibda hisoblashni belgilaydi: oxirgi 12 kalendar oyda hisoblangan mehnat daromadlaridan.",
  ],
  comoSeCalcula: [
    "Hisob-kitob davri: oʻrtacha ish haqi saqlanadigan oydan oldingi 12 oy. 12 oydan kam ishlagan boʻlsangiz, amalda ishlagan oylaringiz olinadi.",
    "Oʻrtacha oylik: shu davrda hisoblangan, soliq solinadigan barcha mehnat daromadlari ÷ oylar soni.",
    "Oʻrtacha kunlik: oʻrtacha oylik ÷ {{uz.ish-kunlari-ortacha}}.",
    "Oʻrtacha soatlik: oʻrtacha oylik ÷ oxirgi kalendar oyda ishlangan soatlar.",
  ],
  ejemplo: ["12 oyda 72 000 000 soʻm hisoblangan boʻlsa, oʻrtacha oylik 6 000 000 soʻm, kunlik 237 154 soʻm. Oxirgi oyda 168 soat ishlangan boʻlsa, soatlik 35 714 soʻm."],
  faq: [
    {
      pregunta: "Oʻrtacha ish haqiga qaysi toʻlovlar kiradi?",
      respuesta: "Soliq toʻgʻrisidagi qonunchilikka koʻra soliq solinadigan va ish beruvchi haqiqatda toʻlagan barcha mehnatga haq toʻlash tarzidagi daromadlar: maosh, ustamalar, mukofotlar.",
    },
    {
      pregunta: "Kasal boʻlgan oylar nima boʻladi?",
      respuesta: "Vaqtincha mehnatga layoqatsizlik nafaqasi olingan, oʻrtacha ish haqi saqlangan yoki ish beruvchiga bogʻliq boʻlmagan sababdan bekor turilgan vaqt va shu vaqtdagi summalar hisobdan chiqariladi.",
    },
    {
      pregunta: "Oʻrtacha ish haqi eng kam miqdordan past boʻlishi mumkinmi?",
      respuesta: "Oylik normani toʻliq ishlagan xodimning oʻrtacha oylik ish haqi mehnatga haq toʻlashning eng kam miqdoridan ({{uz.mhtekm}}) kam boʻlishi mumkin emas.",
    },
  ],
  glosario: [
    { termino: "Hisob-kitob davri", definicion: "Oʻrtacha ish haqi hisoblanadigan oydan oldingi 12 kalendar oy." },
  ],
});
