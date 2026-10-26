import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-uz.bono",
  h1: "Zetalend yarim yillik mukofot kalkulyatori",
  title: "Zetalend yarim yillik mukofoti: summani hisoblang",
  description: "Yarim yillik mukofotingizni hududingizdagi eng kam ish haqi va qoʻshimcha toʻlov ({{zz.bonificacion}}) bilan hisoblang. Rasmiy maʼlumotlar manbasi bilan.",
  intro: [
    "Yarim yillik mukofot yiliga ikki marta toʻlanadigan bir oylik qoʻshimcha maosh.",
    "Yarim yil davomida toʻliq ishlagan boʻlsangiz, bir oylik maosh va qoʻshimcha toʻlov olasiz. Qoʻshimcha toʻlov miqdori: {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Hisob oylik yalpi maoshdan boshlanadi. Maosh hududingizdagi eng kam ish haqidan past boʻlsa, eng kam ish haqi olinadi.",
    "Bu maosh ishlangan oylar soniga koʻpaytiriladi va oltiga boʻlinadi.",
    "Kichik korxonalarda mukofot yarmiga teng.",
    "Mukofotga qoʻshimcha toʻlov qoʻshiladi. Uning miqdori: {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Shimoliy hududda eng kam ish haqi qancha?", respuesta: "Miqdori: {{zz.minimo@norte}}. Kuchga kirgan sana: {{zz.minimo@norte#desde}}." },
    { pregunta: "Yarim yil toʻliq ishlamagan boʻlsam-chi?", respuesta: "Ishlagan oylaringiz soniga toʻgʻri keladigan qismini olasiz." },
    { pregunta: "Qoʻshimcha toʻlov har doim beriladimi?", respuesta: "Ha. Uning miqdori mukofotga nisbatan {{zz.bonificacion}} va ish beruvchi uni mukofot bilan birga toʻlaydi." },
  ],
  glosario: [
    { termino: "Yarim yillik mukofot", definicion: "Qonunga koʻra iyul va dekabr oylarida toʻlanishi majburiy boʻlgan qoʻshimcha maosh." },
    { termino: "Eng kam ish haqi", definicion: "Har bir hududda toʻliq ish kuni uchun toʻlanishi mumkin boʻlgan eng past haq." },
  ],
});
