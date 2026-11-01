import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.maamaks",
  h1: "Maamaksu kalkulaator",
  title: "Maamaks {{anio}}: arvuta maksustamishinnast ja määrast",
  description: "Arvuta maamaks: määr {{ee.maamaks-alam}} kuni {{ee.maamaks-ulem[muu]}} maa maksustamishinnast, kodualuse maa soodustus kuni {{ee.maamaks-soodustus}}.",
  intro: [
    "Maamaks on aastane maks, mis arvutatakse maa maksustamishinnast. Määra kehtestab omavalitsus seaduse piirides: elamumaal ja õuemaal {{ee.maamaks-alam}} kuni {{ee.maamaks-ulem[elamu]}}, muul maatulundusmaal kuni {{ee.maamaks-ulem[maatulundus]}} ja ülejäänud maal kuni {{ee.maamaks-ulem[muu]}} (maamaksuseadus, § 5).",
    "Volikogu võib kehtestada kodualuse maa soodustuse kuni {{ee.maamaks-soodustus}}. Oma omavalitsuse määra ja maa maksustamishinna leiad Maksu- ja Tolliameti andmetest ning maamaksuteatelt.",
  ],
  comoSeCalcula: [
    "Korruta maa maksustamishind omavalitsuse määraga.",
    "Lahuta kodualuse maa soodustus. Maks ei saa minna alla nulli.",
    "Soodustus eeldab, et sinu elukoht on rahvastikuregistri järgi sellel maal asuvas hoones (§ 11).",
  ],
  ejemplo: [
    "Maksustamishind 50 000 eurot ja määr 0,3% annavad 150 eurot aastas. Soodustusega 100 eurot jääb tasuda 50 eurot.",
    "Maksustamishind 20 000 eurot, määr 0,5% ja soodustus 500 eurot: arvutatud maks on 100 eurot, soodustus katab selle ja tasuda pole midagi.",
  ],
  faq: [
    {
      pregunta: "Kust leida maa maksustamishind?",
      respuesta: "See on kirjas maamaksuteatel. Määrad kehtestab volikogu ja need avaldab Maksu- ja Tolliamet oma veebilehel (maamaksuseadus, § 5 lõige 3).",
    },
    {
      pregunta: "Kes maamaksu maksab?",
      respuesta: "Maa omanik või seaduses nimetatud maa kasutaja. Aasta jooksul tasutakse see vastavalt maamaksuteatele.",
    },
    {
      pregunta: "Kas maamaks võib järsult tõusta?",
      respuesta: "Seadusel on maamaksu tõusu piirmäär ja omavalitsus saab seda määrata (§ 81). Kalkulaator seda ei arvesta, sest piir sõltub sinu eelmise aasta maksust.",
    },
  ],
  glosario: [
    { termino: "Maksustamishind", definicion: "Maa väärtus, millest maks arvutatakse." },
    { termino: "Kodualune maa", definicion: "Maa, millel on sinu registreeritud elukoht." },
  ],
});
