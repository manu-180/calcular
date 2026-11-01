import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.minimalna-placa",
  h1: "Minimalna plaća {{anio}}: bruto {{hr.minimalna-placa}} i neto",
  title: "Minimalna plaća {{anio}}: {{hr.minimalna-placa}} bruto, koliko je neto",
  description: "Minimalna bruto plaća je {{hr.minimalna-placa}}. Odaberite grad i pogledajte neto, doprinose, porez i trošak poslodavca po Uredbi Vlade.",
  intro: [
    "Minimalna plaća iznosi {{hr.minimalna-placa}} bruto mjesečno i vrijedi od {{hr.minimalna-placa#desde}}. Određuje je Vlada uredbom za svaku godinu.",
    "Neto nije jedan broj jer ovisi o stopi poreza vašeg grada. Odaberite mjesto stanovanja i dobit ćete iznos koji stiže na račun.",
  ],
  comoSeCalcula: [
    "Polazi se od bruto iznosa iz Uredbe, a na njega se primjenjuje umanjenje osnovice I. stupa, jer je plaća ispod {{hr.umanjenje-gornja}}.",
    "Mirovinski doprinosi su {{hr.mio-i}} na umanjenu osnovicu i {{hr.mio-ii}} na cijeli bruto. Nakon osobnog odbitka od {{hr.osobni-odbitak}} porez se plaća samo na ostatak, po nižoj stopi grada.",
    "Poslodavac povrh toga plaća {{hr.zdravstveno}} za zdravstveno osiguranje.",
  ],
  ejemplo: [
    "Za 2026.: bruto 1.050 eura u Zagrebu. Umanjenje osnovice je 125 eura, doprinosi 191,25 eura, a porez 59,51 euro. Neto je 799,24 eura. Poslodavca to stoji 1.223,25 eura.",
    "Od 1. siječnja 2027. bruto je 1.130 eura. Uz iste uvjete neto raste na 843,90 eura.",
  ],
  faq: [
    {
      pregunta: "Kolika je minimalna plaća u 2027.?",
      respuesta: "Uredba objavljena u Narodnim novinama 124/2026 određuje 1.130,00 eura bruto za razdoblje od 1. siječnja do 31. prosinca 2027. To je 80 eura više nego u 2026.",
    },
    {
      pregunta: "Je li minimalna plaća jednaka u svim gradovima?",
      respuesta: "Bruto iznos jest, jer ga određuje Uredba za cijelu državu. Neto se razlikuje jer se razlikuju porezne stope: niža stopa u Zagrebu je {{hr.stopa-niza[zagreb]}}, a u Rijeci {{hr.stopa-niza[rijeka]}}.",
    },
    {
      pregunta: "Plaća li se porez na minimalnu plaću?",
      respuesta: "Da, na dio iznad osobnog odbitka od {{hr.osobni-odbitak}}. Uz djecu odbitak raste, pa porez može pasti na nulu.",
    },
    {
      pregunta: "Kolika je minimalna plaća bila prije?",
      respuesta: "Za 2025. Uredba (NN 124/2024) određivala je 970,00 eura bruto, a za 2026. Uredba (NN 132/2025) određuje 1.050,00 eura bruto.",
    },
  ],
  glosario: [
    { termino: "Minimalna plaća", definicion: "Najniži bruto iznos za puno radno vrijeme, određen uredbom Vlade." },
    { termino: "Uredba", definicion: "Propis Vlade objavljen u Narodnim novinama." },
    { termino: "Umanjenje osnovice", definicion: "Manja osnovica za I. mirovinski stup kod nižih plaća." },
  ],
});
