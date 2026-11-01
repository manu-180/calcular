import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.bolovanje",
  h1: "Bolovanje u RS {{anio}}: koliki je procenat naknade",
  title: "Bolovanje u RS {{anio}}: naknada od {{ba.bolovanje-rs[opsta]}} do {{ba.bolovanje-rs[maligna]}}",
  description: "Naknada za bolovanje u RS je {{ba.bolovanje-rs[opsta]}} prosječne neto plate za običnu bolest, {{ba.bolovanje-rs[izolacija]}} za izolaciju i {{ba.bolovanje-rs[maligna]}} za teže slučajeve. Procijenite iznos.",
  intro: [
    "U Republici Srpskoj naknada se računa od prosječne neto plate iz zadnjih {{ba.bolovanje-period-rs}}. Za običnu bolest ili povredu dobijate {{ba.bolovanje-rs[opsta]}}, za obaveznu izolaciju {{ba.bolovanje-rs[izolacija]}}, a za komplikacije u trudnoći i malignu bolest {{ba.bolovanje-rs[maligna]}}.",
    "Federacija BiH nije u obračunu, jer važeći prečišćeni tekst njenog propisa nismo mogli pročitati. Tamo pitajte poslodavca ili kantonalni zavod.",
  ],
  comoSeCalcula: [
    "Osnov je prosječna neto plata iz zadnjih {{ba.bolovanje-period-rs}} prije mjeseca u kojem je bolovanje počelo.",
    "Osnov se množi procentom koji zavisi od razloga: {{ba.bolovanje-rs[opsta]}}, {{ba.bolovanje-rs[izolacija]}} ili {{ba.bolovanje-rs[trudnoca]}}.",
    "Dnevni iznos dobijamo dijeljenjem s 30, pa je rezultat procjena. Tačan obračun radi poslodavac ili Fond zdravstvenog osiguranja.",
  ],
  ejemplo: [
    "Uz prosječnu neto platu od 1.500 KM, deset dana obične bolesti znači oko 350 KM, a cio mjesec 1.050 KM.",
    "Za obaveznu izolaciju, 14 dana donosi oko 630 KM.",
  ],
  faq: [
    {
      pregunta: "Odakle dolaze ovi procenti?",
      respuesta: "Iz člana 83 Zakona o obaveznom zdravstvenom osiguranju RS („Službeni glasnik RS” 93/22). Tačke 1 do 3 daju {{ba.bolovanje-rs[maligna]}}, tačka 4 daje {{ba.bolovanje-rs[izolacija]}}, a tačka 5 daje {{ba.bolovanje-rs[opsta]}}.",
    },
    {
      pregunta: "Šta ako nisam radio šest mjeseci?",
      respuesta: "Član 83 stav 2 kaže da je osnov prosječna neto plata iz perioda koji je osiguranik proveo na radu.",
    },
    {
      pregunta: "Važi li povreda na radu po istom procentu?",
      respuesta: "Ne. Član 131 Zakona o radu RS navodi 100 % prosječne plate kod privremene spriječenosti zbog povrede na radu ili profesionalne bolesti. Tu naknadu kalkulator ne računa.",
    },
  ],
  glosario: [
    { termino: "Bolovanje", definicion: "Privremena spriječenost za rad zbog bolesti ili povrede." },
    { termino: "Osnov naknade", definicion: "Prosječna neto plata iz zadnjih šest mjeseci." },
    { termino: "Fond", definicion: "Fond zdravstvenog osiguranja Republike Srpske." },
  ],
});
