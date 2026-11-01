import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.kaibemaksu-kalkulaator",
  h1: "Käibemaksu kalkulaator {{anio}}",
  title: "Käibemaksu kalkulaator {{anio}}: lisa või eemalda {{ee.kaibemaks[tavamaar]}}",
  description: "Arvuta käibemaks: tavamäär {{ee.kaibemaks[tavamaar]}}, majutus {{ee.kaibemaks[majutus]}}, raamatud ja ravimid {{ee.kaibemaks[vahendatud]}}. Lisa käibemaks summale või eemalda see.",
  intro: [
    "Käibemaksu tavamäär on Eestis {{ee.kaibemaks[tavamaar]}}. Majutusele kehtib {{ee.kaibemaks[majutus]}} ning raamatutele, ajakirjandusele ja nimekirjas olevatele ravimitele {{ee.kaibemaks[vahendatud]}} (käibemaksuseadus, § 15).",
    "Kalkulaator töötab mõlemas suunas: lisab käibemaksu netohinnale või võtab selle hinnast välja. Maksukohustuslaseks tuleb registreerida, kui aasta käive ületab {{ee.kaibemaksu-piir}}.",
  ],
  comoSeCalcula: [
    "Lisamisel korrutatakse summa määraga.",
    "Eemaldamisel jagatakse summa arvuga, mis on 1 pluss määr sajandikes. Tavamääraga on see 1,24.",
    "Käibemaks on nende kahe summa vahe.",
  ],
  ejemplo: [
    "Arve 100 eurot pluss käibemaks tavamääraga: käibemaks 24 eurot, kokku 124 eurot.",
    "Raamatu hind 21,80 eurot koos käibemaksuga: ilma maksuta 20 eurot ja maks 1,80 eurot. Hotelliöö 200 eurot lisandub 26 eurot.",
  ],
  faq: [
    {
      pregunta: "Kui suur on käibemaks Eestis?",
      respuesta: "Tavamäär on {{ee.kaibemaks[tavamaar]}}. Kehtib alates: {{ee.kaibemaks#desde}}.",
    },
    {
      pregunta: "Millele kehtivad vähendatud määrad?",
      respuesta: "{{ee.kaibemaks[majutus]}} on majutuse või majutuse koos hommikusöögiga määr. {{ee.kaibemaks[vahendatud]}} kehtib raamatutele ja õppekirjandusele, ajakirjandusväljaannetele, nimekirjas olevatele ravimitele ning meditsiiniseadmetele puudega inimestele.",
    },
    {
      pregunta: "Millal tuleb registreerida käibemaksukohustuslaseks?",
      respuesta: "Kui Eestis tekkiv käive ületab kalendriaasta algusest {{ee.kaibemaksu-piir}} (käibemaksuseadus, § 19). Registreerida võib ka vabatahtlikult.",
    },
  ],
  glosario: [
    { termino: "Käive", definicion: "Kaupade ja teenuste müügi maksustatav väärtus." },
    { termino: "Sisendkäibemaks", definicion: "Ostudelt tasutud käibemaks, mille maksukohustuslane saab maha arvata." },
  ],
});
