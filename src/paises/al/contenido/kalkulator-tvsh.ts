import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.kalkulator-tvsh",
  h1: "Kalkulator TVSH {{anio}}",
  title: "Kalkulator TVSH {{anio}}: {{al.tvsh[standarde]}}, {{al.tvsh[reduktuar-10]}} dhe {{al.tvsh[reduktuar-6]}}",
  description: "Shtoni ose hiqni TVSH-në nga një çmim, me shkallën standarde {{al.tvsh[standarde]}} ose ato të reduktuara. Vendosni shumën dhe zgjidhni shkallën.",
  intro: [
    "Shkalla standarde e TVSH-së në Shqipëri është {{al.tvsh[standarde]}}, sipas nenit 48 të ligjit nr. 92/2014. Neni 49 lejon dy shkallë të reduktuara: {{al.tvsh[reduktuar-6]}} për disa shërbime dhe {{al.tvsh[reduktuar-10]}} për inputet bujqësore.",
    "Kalkulatori shkon në të dy drejtimet: nga çmimi pa TVSH te çmimi përfundimtar, ose nga çmimi me TVSH te vlera e tatueshme.",
  ],
  comoSeCalcula: [
    "Për të shtuar TVSH-në: çmimi pa TVSH shumëzohet me shkallën.",
    "Për ta hequr: çmimi me TVSH pjesëtohet me 1 plus shkallën. Me {{al.tvsh[standarde]}} pjesëtohet me 1,2, jo thjesht zbriten 20%.",
    "Shkalla {{al.tvsh[reduktuar-6]}} vlen për akomodimin në strukturat akomoduese, agroturizmin, reklamat nga media audiovizive, librat, autobusët elektrikë dhe disa punime në infrastrukturën sportive.",
    "Shkalla {{al.tvsh[reduktuar-10]}} vlen për plehrat kimike, pesticidet, farat dhe fidanët.",
  ],
  ejemplo: [
    "Një shërbim kushton 10 000 lekë pa TVSH. Me {{al.tvsh[standarde]}}, TVSH-ja është 2 000 lekë dhe fatura del 12 000 lekë. Nga ana tjetër, një libër me çmim 5 300 lekë me TVSH ka 5 000 lekë vlerë dhe 300 lekë TVSH me {{al.tvsh[reduktuar-6]}}.",
  ],
  faq: [
    {
      pregunta: "Cilat mallra kanë TVSH {{al.tvsh[reduktuar-6]}}?",
      respuesta: "Neni 49 i ligjit nr. 92/2014 përmend librat e çdo lloji, mjetet elektrike të transportit publik të udhëtarëve dhe disa shërbime si akomodimi dhe reklamat audiovizive. Kushtet e akomodimit përcaktohen me vendim të Këshillit të Ministrave.",
    },
    {
      pregunta: "Si e heq TVSH-në nga një çmim?",
      respuesta: "Pjesëtoni çmimin me 1,2 për shkallën {{al.tvsh[standarde]}}. Për 12 000 lekë del 10 000 lekë pa TVSH dhe 2 000 lekë TVSH. Zbritja e thjeshtë e 20% nga 12 000 do të jepte një shifër të gabuar.",
    },
    {
      pregunta: "Cila shkallë vlen kur ndryshon ligji?",
      respuesta: "Sipas nenit 47, shkalla e zbatueshme është ajo në fuqi në momentin e lindjes së tatimit, përveç rasteve të veçanta që parashikon ligji.",
    },
  ],
  glosario: [
    { termino: "TVSH", definicion: "Tatimi mbi vlerën e shtuar, që i shtohet çmimit të mallrave dhe shërbimeve." },
    { termino: "Vlera e tatueshme", definicion: "Çmimi pa TVSH, mbi të cilin zbatohet shkalla." },
  ],
});
