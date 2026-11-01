import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.mma",
  h1: "MMA {{anio}}: minimalioji mėnesinė alga",
  title: "MMA {{anio}}: {{lt.mma}} ant popieriaus už visą etatą",
  description: "MMA šiuo metu siekia {{lt.mma}} ant popieriaus. Įveskite etato dalį ir apskaičiuokite proporcingą sumą bei skirtumą nuo savo atlyginimo.",
  intro: [
    "Minimalioji mėnesinė alga (MMA) šiuo metu siekia {{lt.mma}} ant popieriaus už visą etatą. Ši suma galioja nuo {{lt.mma#desde}}, o ankstesniais metais buvo {{lt.mma-ankstesne}}.",
    "Skaičiuoklė parodo proporcingą MMA dalį pagal etatą ir palygina ją su jūsų atlyginimu. Suma paimta iš Eurostato minimaliųjų algų duomenų, kurie skelbiami pusmečiais.",
  ],
  comoSeCalcula: [
    "Skaičiuoklė paima visą MMA ({{lt.mma}}) ir padaugina ją iš jūsų etato dalies. Pusė etato reiškia pusę šios sumos.",
    "Jei įvedate savo atlyginimą ant popieriaus, iš jo atimama apskaičiuota dalis. Teigiamas skirtumas reiškia, kad atlyginimas viršija proporcingą MMA dalį, neigiamas, kad jis už ją mažesnis.",
    "Padidėjimas apskaičiuojamas iš dabartinės sumos atėmus ankstesnių metų sumą ({{lt.mma-ankstesne}}).",
  ],
  ejemplo: [
    "Dirbate puse etato, o jūsų atlyginimas ant popieriaus yra 700 eurų. Kai MMA yra 1153 eurai, pusė jos yra 576,50 euro, taigi skirtumas iš viso: 123,50 euro.",
  ],
  faq: [
    {
      pregunta: "Kiek šiuo metu siekia MMA?",
      respuesta: "Visam etatui {{lt.mma}} per mėnesį. Eurostato lentelėje (earn_mw_cur) ši suma nurodyta abiem einamųjų metų pusmečiams.",
    },
    {
      pregunta: "Ar MMA yra suma ant popieriaus, ar į rankas?",
      respuesta: "Ant popieriaus. Eurostato minimaliųjų algų lentelė pateikia sumas prieš mokesčius ir įmokas, todėl į rankas gaunama suma yra mažesnė.",
    },
    {
      pregunta: "Kiek MMA padidėjo per metus?",
      respuesta: "Ankstesniais metais ji buvo {{lt.mma-ankstesne}}, dabar yra {{lt.mma}}. Tikslų skirtumą eurais ir procentais parodo skaičiuoklė.",
    },
    {
      pregunta: "Iš kur paimta ši suma?",
      respuesta: "Iš Eurostato duomenų rinkinio earn_mw_cur, kuriame skelbiamos ES šalių minimaliosios algos. Šaltinį ir jo patikrinimo datą rasite puslapio duomenų skiltyje.",
    },
  ],
  glosario: [
    { termino: "MMA", definicion: "Minimalioji mėnesinė alga, mažiausias mėnesio atlyginimas už visą etatą." },
    { termino: "Ant popieriaus", definicion: "Atlyginimas prieš mokesčius ir įmokas. Į rankas gaunama po jų atskaitymo." },
    { termino: "Etatas", definicion: "Darbo laiko dalis pagal sutartį: visas etatas yra 100 %." },
  ],
});
