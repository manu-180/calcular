import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.kalkulator-plate",
  h1: "Kalkulator plate {{anio}}: iz bruto u neto",
  title: "Kalkulator plate {{anio}}: neto zarada iz bruto iznosa",
  description: "Izračunajte neto platu iz bruto zarade: porez {{rs.porez-na-zarade}}, neoporezivi deo {{rs.neoporezivi-iznos}} i doprinosi za PIO, zdravstvo i nezaposlenost.",
  intro: [
    "Od bruto zarade zaposleni plaća porez od {{rs.porez-na-zarade}} i doprinose za PIO ({{rs.pio-zaposleni}}), zdravstvo ({{rs.zdravstvo}}) i nezaposlenost ({{rs.nezaposlenost}}). Porez se ne plaća na prvih {{rs.neoporezivi-iznos}} mesečno.",
    "Kalkulator plate polazi od bruto iznosa iz ugovora i pokazuje šta stiže na račun, šta odlazi državi i koliko vas ukupno plaća poslodavac.",
  ],
  comoSeCalcula: [
    "Doprinosi se računaju na bruto zaradu. Ako je niža od {{rs.najniza-osnovica}}, uzima se ta najniža osnovica. Ako je viša od {{rs.najvisa-osnovica}}, doprinosi se računaju samo do te granice.",
    "Osnovica poreza je bruto zarada umanjena za neoporezivi iznos. Pri nepunom radnom vremenu i on se smanjuje srazmerno.",
    "Porez je {{rs.porez-na-zarade}} te osnovice.",
    "Neto zarada = bruto zarada, minus doprinosi, minus porez.",
  ],
  ejemplo: [
    "Bruto 100.000 dinara uz puno radno vreme, po propisima za {{rs.neoporezivi-iznos#desde}}. Doprinosi su 19.900 dinara (14.000 za PIO, 5.150 za zdravstvo, 750 za nezaposlenost). Osnovica poreza je 65.779 dinara, a porez 6.577,90 dinara. Na račun stiže 73.522,10 dinara.",
    "Poslodavac na isti bruto plaća još 15.150 dinara doprinosa, pa ga ta zarada košta 115.150 dinara.",
  ],
  faq: [
    {
      pregunta: "Koliki je neoporezivi deo zarade?",
      respuesta: "Važi iznos od {{rs.neoporezivi-iznos}} mesečno za puno radno vreme (Zakon o porezu na dohodak građana, čl. 15a). Izmenom objavljenom u „Službenom glasniku RS“ 80/2026 od 1. januara 2027. godine raste na 37.369 dinara.",
    },
    {
      pregunta: "Kolika je ukupna stopa doprinosa na teret zaposlenog?",
      respuesta: "Zbir je 19,9 odsto: {{rs.pio-zaposleni}} za PIO, {{rs.zdravstvo}} za zdravstvo i {{rs.nezaposlenost}} za nezaposlenost (Zakon o doprinosima, čl. 44).",
    },
    {
      pregunta: "Da li se doprinosi plaćaju na celu zaradu i kad je veoma visoka?",
      respuesta: "Ne. Osnovica je ograničena na {{rs.najvisa-osnovica}} mesečno, a deo iznad toga ne ulazi u doprinose. Porez se i dalje plaća na ceo iznos.",
    },
    {
      pregunta: "Zašto je neto veći od prošlogodišnjeg ako je bruto isti?",
      respuesta: "Neoporezivi iznos raste, pa je osnovica poreza manja. Svaki dinar neoporezivog iznosa štedi deset para poreza.",
    },
  ],
  glosario: [
    { termino: "Bruto zarada", definicion: "Zarada koja sadrži porez i doprinose koji se plaćaju iz zarade (Zakon o radu, čl. 105)." },
    { termino: "Neto zarada", definicion: "Iznos koji zaposleni dobija posle poreza i doprinosa." },
    { termino: "Osnovica doprinosa", definicion: "Iznos na koji se računaju doprinosi, između najniže i najviše mesečne osnovice." },
    { termino: "PIO", definicion: "Penzijsko i invalidsko osiguranje." },
  ],
});
