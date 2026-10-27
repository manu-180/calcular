import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.csed-kalkulator",
  h1: "CSED kalkulátor",
  title: "CSED kalkulátor: csecsemőgondozási díj {{anio}}",
  description:
    "A csecsemőgondozási díj a napi átlagkereset {{hu.csed}} része, legfeljebb {{hu.csed-napok}} napig, SZJA nélkül. Számold ki, mennyit kapsz.",
  intro: [
    "A csecsemőgondozási díj (CSED) a szülés utáni első hónapokra jár az anyának, ha a szülés előtti két évben legalább 365 napig biztosított volt.",
    "A CSED a korábbi napi átlagkereset {{hu.csed}} része, felső határ nélkül. Személyi jövedelemadót nem vonnak le belőle.",
  ],
  comoSeCalcula: [
    "Napi alap: a havi átlagkereset harmincad része (a kalkulátor így közelít).",
    "Napi CSED = napi alap × {{hu.csed}}.",
    "A CSED legfeljebb a szülés napjától számított {{hu.csed-napok}} napig jár.",
  ],
  ejemplo: [
    "Havi 500 000 Ft átlagkereset mellett a CSED napi 16 667 Ft, a teljes 168 napra 2 800 056 Ft.",
  ],
  faq: [
    {
      pregunta: "Mennyi a CSED összege?",
      respuesta: "A napi átlagkereset {{hu.csed}} része. Mivel SZJA-mentes, nagyjából annyit kapsz kézhez, amennyi korábban a bruttó béred volt.",
    },
    {
      pregunta: "Meddig jár a CSED?",
      respuesta: "Legfeljebb a szülés napjától számított {{hu.csed-napok}} napig. Utána a GYED következhet.",
    },
    {
      pregunta: "Kell adózni a CSED után?",
      respuesta: "Nem. A 2025. június 30. után folyósított CSED SZJA-mentes.",
    },
  ],
  glosario: [
    { termino: "CSED", definicion: "Csecsemőgondozási díj, a szülés utáni hónapok egészségbiztosítási ellátása." },
    { termino: "Biztosítási idő", definicion: "Az az idő, amíg biztosított vagy, például munkaviszonyban." },
  ],
});
