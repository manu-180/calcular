import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.porez-na-dohodak",
  h1: "Porez na dohodak fizičkih lica {{anio}}: stope na zaradu",
  title: "Porez na dohodak {{anio}}: 0, {{me.porez-zarada[1].tasa}} i {{me.porez-zarada[2].tasa}} na zaradu",
  description: "Do {{me.porez-zarada[0].hasta}} bez poreza, do {{me.porez-zarada[1].hasta}} stopa {{me.porez-zarada[1].tasa}}, iznad {{me.porez-zarada[2].tasa}}. Izračunajte porez, prirez i stvarnu stopu za svoju platu.",
  intro: [
    "Porez na lična primanja ima tri razreda: {{me.porez-zarada[0].tasa}} do {{me.porez-zarada[0].hasta}}, {{me.porez-zarada[1].tasa}} od {{me.porez-zarada[1].desde}} do {{me.porez-zarada[1].hasta}} i {{me.porez-zarada[2].tasa}} na sve preko toga, po računu za svaki mjesec.",
    "Stvarno opterećenje je manje od najviše stope, jer prvi dio zarade ostaje oslobođen. Kalkulator prikazuje porez po razredima, prirez opštine i stopu koju zaista plaćate.",
  ],
  comoSeCalcula: [
    "Osnovica je bruto iznos ličnih primanja u mjesecu (Zakon o porezu na dohodak fizičkih lica, čl. 15). Doprinosi se od nje ne odbijaju.",
    "Dio od 700 do 1.000 eura plaća 9 odsto, što je najviše 27 eura. Sve iznad 1.000 eura plaća 15 odsto.",
    "Prirez se računa na iznos poreza, po stopi vaše opštine.",
    "Stvarna stopa je zbir poreza i prireza podijeljen sa bruto zaradom.",
  ],
  ejemplo: [
    "Na bruto 1.500 eura porez je 102 eura: 27 eura iz srednjeg razreda i 75 eura iz najvišeg. Uz prirez od 13 odsto dolazi još 13,26 eura. Ukupno 115,26 eura mjesečno, ili 7,68 odsto bruta.",
  ],
  faq: [
    {
      pregunta: "Koje su važeće stope poreza na zaradu?",
      respuesta: "Član 10 tačka 1 Zakona o porezu na dohodak fizičkih lica, izmijenjen u „Službenom listu CG“ 160/25, propisuje {{me.porez-zarada[0].tasa}}, {{me.porez-zarada[1].tasa}} i {{me.porez-zarada[2].tasa}}. Izmjena iz broja 70/26 odnosi se samo na dobitke od igara na sreću.",
    },
    {
      pregunta: "Šta ako imam više poslodavaca?",
      respuesta: "Svaki poslodavac računa akontaciju za sebe. Ako ukupan mjesečni bruto kod više poslodavaca pređe 700 eura, zakon traži godišnju prijavu (član 43, kako je naveden u prečišćenom tekstu).",
    },
    {
      pregunta: "Da li se otpremnina oporezuje?",
      respuesta: "Otpremnina zbog tehnološkog viška ne oporezuje se do najnižeg iznosa iz Zakona o radu (član 5a). Prema poreskoj praksi ministarstva, iznos preko toga plaća porez po stopi od 15 odsto.",
    },
  ],
  glosario: [
    { termino: "Akontacija", definicion: "Mjesečni porez koji poslodavac obračuna, obustavi i uplati pri isplati zarade." },
    { termino: "Poreski razred", definicion: "Dio zarade koji se oporezuje jednom stopom." },
    { termino: "Stvarna stopa", definicion: "Procenat ukupnog poreza u bruto zaradi." },
  ],
});
