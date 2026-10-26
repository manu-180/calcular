import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.jarulek-kalkulator",
  h1: "Járulék kalkulátor: TB-járulék és szocho",
  title: "Járulék kalkulátor: TB-járulék és szocho egy helyen",
  description:
    "TB-járulék ({{hu.tb-jarulek}}) és szocho ({{hu.szocho}}) munkavállalónak és főfoglalkozású egyéni vállalkozónak, a minimálbér szerinti alsó határral.",
  intro: [
    "A bér után két közteher jár a társadalombiztosításnak: a TB-járulék, amit a munkavállaló fizet, és a szociális hozzájárulási adó, amit a munkáltató.",
    "Egyéni vállalkozóként mindkettőt te fizeted. Főfoglalkozásban a havi alap legalább a minimálbér, vagy ha a tevékenységed középfokú végzettséget igényel, a garantált bérminimum.",
  ],
  comoSeCalcula: [
    "TB-járulék = járulékalap × {{hu.tb-jarulek}}.",
    "Szocho = járulékalap × {{hu.szocho}}.",
    "Munkavállalónál a járulékalap a bruttó bér.",
    "Főfoglalkozású egyéni vállalkozónál a járulékalap a jövedelem, de legalább {{hu.minimalber[havi]}} (garantált bérminimummal {{hu.garantalt-berminimum[havi]}}).",
  ],
  ejemplo: [
    "Főfoglalkozású egyéni vállalkozó havi 150 000 Ft jövedelemmel: az alap a minimálbér, a TB-járulék 59 718 Ft, a szocho 41 964 Ft, együtt 101 682 Ft havonta.",
  ],
  faq: [
    {
      pregunta: "Mennyi a TB-járulék?",
      respuesta: "A társadalombiztosítási járulék mértéke {{hu.tb-jarulek}}. Munkaviszonyban a munkáltató vonja le a bruttó bérből.",
    },
    {
      pregunta: "Mennyi a minimum járulék egyéni vállalkozóként?",
      respuesta: "Főfoglalkozásban havonta legalább a minimálbér után kell fizetni, ez 59 718 Ft TB-járulék és 41 964 Ft szocho. Garantált bérminimum esetén 69 042 Ft és 48 516 Ft.",
    },
    {
      pregunta: "Változott a szocho minimuma?",
      respuesta: "Igen. Január elsejétől a főfoglalkozású vállalkozók szochoalapja legalább a minimálbér vagy a garantált bérminimum, nem annak 112,5 százaléka.",
    },
  ],
  glosario: [
    { termino: "Járulékalap", definicion: "Az az összeg, amely után a járulékot és a szochót számolják." },
    { termino: "Főfoglalkozású egyéni vállalkozó", definicion: "Akinek a vállalkozás a fő tevékenysége, mellette nincs teljes munkaidős állása." },
  ],
});
