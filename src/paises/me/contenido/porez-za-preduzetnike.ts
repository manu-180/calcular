import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.porez-za-preduzetnike",
  h1: "Porez i doprinosi za preduzetnike {{anio}}",
  title: "Preduzetnik {{anio}}: porez do {{me.porez-samostalna[2].tasa}} i doprinosi po prometu",
  description: "Godišnji dohodak do {{me.porez-samostalna[0].hasta}} je bez poreza, a doprinosi zavise od prometa. Izračunajte šta preduzetniku ostaje i kad može da traži paušal do {{me.pausal-limit}}.",
  intro: [
    "Preduzetnik sa osnovnom djelatnošću plaća porez na godišnji dohodak: {{me.porez-samostalna[0].tasa}} do {{me.porez-samostalna[0].hasta}}, {{me.porez-samostalna[1].tasa}} do {{me.porez-samostalna[1].hasta}} i {{me.porez-samostalna[2].tasa}} preko toga.",
    "Doprinosi su {{me.pio-preduzetnik}} za PIO i {{me.nezaposlenost-preduzetnik}} za nezaposlenost. Ne računaju se na stvarnu zaradu, već na osnovicu koja zavisi od prometa i prosječne bruto zarade iz prethodne godine, koja za 2025. iznosi {{me.prosjecna-bruto-2025}}.",
  ],
  comoSeCalcula: [
    "Promet određuje osnovicu: do {{me.preduzetnik-prag-niski}} je {{me.preduzetnik-osnovica-niska}} prosječne zarade, do {{me.preduzetnik-prag-visi}} {{me.preduzetnik-osnovica-srednja}}, a iznad toga {{me.preduzetnik-osnovica-visoka}}.",
    "Doprinosi su 11 odsto te mjesečne osnovice, puta dvanaest mjeseci.",
    "Porez se računa na oporezivi dohodak koji unesete, po tri razreda, a prirez na iznos poreza.",
    "Kalkulator ne procjenjuje priznate rashode: to je posao poslovnih knjiga i poreske prijave.",
  ],
  ejemplo: [
    "Promet 20.000 eura i oporezivi dohodak 15.000 eura. Osnovica je 1.809 eura, pa doprinosi izlaze 198,99 eura mjesečno, ili 2.387,88 eura godišnje. Porez je 774 eura, a prirez uz stopu od 13 odsto 100,62 eura. Ostaje 11.737,50 eura.",
  ],
  faq: [
    {
      pregunta: "Ko može da plaća paušalni porez?",
      respuesta: "Obveznik sa osnovnom samostalnom djelatnošću i prometom manjim od 30.000,01 eura, na svoj zahtjev (Zakon o porezu na dohodak fizičkih lica, čl. 49). Pravilnik razvrstava djelatnosti u četiri grupe i tri podgrupe prometa. Skalu paušala ovaj kalkulator ne računa.",
    },
    {
      pregunta: "Mogu li da plaćam doprinose na višu osnovicu?",
      respuesta: "Da. Član 9 tačka 7 Zakona o doprinosima dozvoljava osnovicu iznad propisane.",
    },
    {
      pregunta: "Kad se preduzetnik mora registrovati za PDV?",
      respuesta: "Kad promet u poslednjih 12 mjeseci ili kraćem periodu pređe {{me.pdv-limit}}, prijava se podnosi do 20. dana narednog mjeseca (Zakon o PDV, član 55, „Službeni list CG“ 12/26).",
    },
  ],
  glosario: [
    { termino: "Osnovna samostalna djelatnost", definicion: "Djelatnost koju preduzetnik obavlja kao osnovno zanimanje." },
    { termino: "Dopunska preduzetnička djelatnost", definicion: "Djelatnost uz radni odnos, sa drugom stopom poreza." },
    { termino: "Paušal", definicion: "Godišnji iznos poreza i doprinosa po skali, bez stvarnog obračuna dohotka." },
  ],
});
