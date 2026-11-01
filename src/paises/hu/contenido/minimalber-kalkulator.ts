import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.minimalber-kalkulator",
  h1: "Minimálbér és garantált bérminimum",
  title: "Minimálbér {{anio}}: bruttó, nettó, órabér és bérminimum",
  description:
    "A minimálbér {{hu.minimalber[havi]}}, a garantált bérminimum {{hu.garantalt-berminimum[havi]}} bruttó. Nettó összeg, heti-, napi- és órabér, részmunkaidőre is.",
  intro: [
    "A kötelező legkisebb munkabér (minimálbér) havonta {{hu.minimalber[havi]}} bruttó. A legalább középfokú iskolai végzettséget vagy középfokú szakképzettséget igénylő munkakörökben a garantált bérminimum jár, ez {{hu.garantalt-berminimum[havi]}}.",
    "A kalkulátor kiszámolja a nettó összeget, a heti-, napi- és órabért, és részmunkaidőben az arányos havi összeget is.",
  ],
  comoSeCalcula: [
    "Az összegeket kormányrendelet állapítja meg, havi-, heti-, napi- és órabérre is. A minimálbér órabére {{hu.minimalber[orai]}}, a garantált bérminimumé {{hu.garantalt-berminimum[orai]}}.",
    "Részmunkaidőben a havi összeg a heti óraszámmal arányos: heti 20 órában a fele.",
    "A nettó a bruttóból a TB-járulék ({{hu.tb-jarulek}}) és az SZJA ({{hu.szja}}) levonása után marad, kedvezmények nélkül.",
  ],
  ejemplo: [
    "Teljes munkaidőben a minimálbérből kedvezmények nélkül 214 662 Ft nettó marad, a garantált bérminimumból 248 178 Ft.",
  ],
  faq: [
    {
      pregunta: "Mennyi a minimálbér nettóban?",
      respuesta: "Kedvezmények nélkül 214 662 Ft. Egy gyermek után járó családi kedvezménnyel 234 663 Ft, 25 év alatt pedig 263 082 Ft.",
    },
    {
      pregunta: "Kinek jár a garantált bérminimum?",
      respuesta: "Annak, akinek a munkaköre legalább középfokú iskolai végzettséget vagy középfokú szakképzettséget igényel. Ilyenkor a havi bér nem lehet kevesebb ennél: {{hu.garantalt-berminimum[havi]}}.",
    },
    {
      pregunta: "Mióta érvényes ez az összeg?",
      respuesta: "A minimálbér és a garantált bérminimum mostani összege ettől a naptól érvényes: {{hu.minimalber#desde}}.",
    },
  ],
  glosario: [
    { termino: "Minimálbér", definicion: "A kötelező legkisebb munkabér teljes munkaidőre." },
    { termino: "Garantált bérminimum", definicion: "Magasabb bérminimum a középfokú végzettséget igénylő munkakörökben." },
  ],
});
