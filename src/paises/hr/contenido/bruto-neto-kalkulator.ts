import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.bruto-neto-kalkulator",
  h1: "Bruto neto kalkulator {{anio}}: kalkulator plaće po gradovima",
  title: "Kalkulator plaće {{anio}}: bruto u neto po gradu",
  description: "Izračunajte neto plaću iz bruto iznosa: doprinosi {{hr.mio-i}} i {{hr.mio-ii}}, osobni odbitak {{hr.osobni-odbitak}} i stope poreza za 556 gradova i općina.",
  intro: [
    "Od bruto plaće oduzimaju se mirovinski doprinosi ({{hr.mio-i}} za I. stup i {{hr.mio-ii}} za II. stup), a zatim porez na dohodak. Osnovni osobni odbitak je {{hr.osobni-odbitak}} mjesečno i na njega se porez ne plaća.",
    "Neto ovisi o mjestu u kojem živite. Stope određuje grad ili općina: u Zagrebu su {{hr.stopa-niza[zagreb]}} i {{hr.stopa-visa[zagreb]}}, u Rijeci {{hr.stopa-niza[rijeka]}} i {{hr.stopa-visa[rijeka]}}. Kalkulator ima svih 556 jedinica lokalne samouprave iz tablice Porezne uprave.",
  ],
  comoSeCalcula: [
    "Doprinosi: {{hr.mio-i}} i {{hr.mio-ii}} bruto plaće, ili {{hr.mio-samo-i}} ako ste samo u I. stupu. Računaju se najviše do {{hr.najvisa-osnovica}} mjesečno.",
    "Umanjenje osnovice: do {{hr.umanjenje-donja}} bruto osnovica I. stupa manja je za {{hr.umanjenje-iznos}}. Između te svote i {{hr.umanjenje-gornja}} umanjenje je pola razlike do gornje granice.",
    "Porezna osnovica: bruto minus doprinosi minus osobni odbitak. Svako dijete i uzdržavani član povećavaju odbitak.",
    "Porez: niža stopa do {{hr.prag-mjesecni}} osnovice mjesečno, viša na ostatak. Neto je dohodak nakon doprinosa umanjen za porez.",
  ],
  ejemplo: [
    "Bruto 2.000 eura, Zagreb, II. stup, bez djece. Doprinosi su 300 + 100 = 400 eura, a dohodak 1.600 eura. Nakon odbitka od 600 eura osnovica je 1.000 eura, a porez po 23 % iznosi 230 eura. Na račun stiže 1.370 eura.",
    "Poslodavac na to plaća još 330 eura zdravstvenog osiguranja, pa ga ta plaća stoji 2.330 eura mjesečno.",
  ],
  faq: [
    {
      pregunta: "Koliko iznosi osobni odbitak?",
      respuesta: "Osnovni osobni odbitak je {{hr.osobni-odbitak}} mjesečno (Zakon o porezu na dohodak, čl. 14., NN 152/2024). Za prvo dijete dodaje se koeficijent {{hr.koeficijenti-odbitka[d1]}}, za drugo {{hr.koeficijenti-odbitka[d2]}}, a za treće {{hr.koeficijenti-odbitka[d3]}}.",
    },
    {
      pregunta: "Zašto je neto u Zagrebu manji nego u Rijeci?",
      respuesta: "Jer porez ide gradu ili općini prebivališta, a oni sami biraju stope unutar zakonskih granica. U Zagrebu je niža stopa {{hr.stopa-niza[zagreb]}}, u Splitu {{hr.stopa-niza[split]}}, a u Osijeku {{hr.stopa-niza[osijek]}}. Mjesto rada nije važno.",
    },
    {
      pregunta: "Što je umanjenje osnovice za I. mirovinski stup?",
      respuesta: "Olakšica za niže plaće (Zakon o doprinosima, čl. 21.a). Do {{hr.umanjenje-donja}} bruto osnovica se smanjuje za {{hr.umanjenje-iznos}}, a do {{hr.umanjenje-gornja}} za pola razlike. Mirovinska prava računaju se kao da umanjenja nema.",
    },
    {
      pregunta: "Vrijedi li najviša osnovica i za zdravstveno?",
      respuesta: "Ovaj izračun primjenjuje najvišu osnovicu od {{hr.najvisa-osnovica}} na doprinose iz plaće, jer Porezna uprava kaže da se primjenjuje u izračunu doprinosa zaposlenika. Zdravstveno od {{hr.zdravstveno}} računamo na cijelu bruto plaću.",
    },
    {
      pregunta: "Plaćaju li mladi porez na plaću?",
      respuesta: "Mjesečni porez se obračunava, a umanjenje za osobe do 30 godina ({{hr.umanjenje-mladi[do25]}} i {{hr.umanjenje-mladi[do30]}}) priznaje se u godišnjem obračunu, kako piše Porezna uprava. Zato ga ovaj mjesečni kalkulator ne uključuje.",
    },
  ],
  glosario: [
    { termino: "Bruto plaća", definicion: "Iznos iz ugovora, prije doprinosa iz plaće i poreza." },
    { termino: "Neto plaća", definicion: "Iznos koji stiže na račun." },
    { termino: "Osobni odbitak", definicion: "Neoporezivi dio dohotka. Raste s djecom i uzdržavanim članovima." },
    { termino: "I. i II. mirovinski stup", definicion: "Generacijska solidarnost i individualna kapitalizirana štednja." },
    { termino: "Porezna kartica", definicion: "Evidencija Porezne uprave o odbitku koji poslodavac primjenjuje." },
  ],
});
