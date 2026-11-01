import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.otpremnina",
  h1: "Otpremnina za tehnološki višak {{anio}}: obračun po Zakonu o radu",
  title: "Otpremnina {{anio}}: trećina plate po godini rada, minimum",
  description: "Otpremnina je trećina neto zarade po godini rada, a ne manje od {{me.otpremnina-najmanje}} prosječne zarade, uz {{me.otpremnina-staz}} rada. Izračunajte svoj iznos.",
  intro: [
    "Ko ostane bez posla kao tehnološki višak ima pravo na otpremninu: najmanje trećinu prosječne neto zarade za svaku godinu rada kod tog poslodavca, a ukupno ne manje od {{me.otpremnina-najmanje}} prosječne zarade.",
    "Uslov je {{me.otpremnina-staz}} rada kod poslodavca. Osnov je vaša zarada ili prosjek Crne Gore, šta god je za vas povoljnije. Trenutno je poslednja objavljena prosječna neto zarada {{me.prosjecna-neto}}.",
  ],
  comoSeCalcula: [
    "Uzima se vaša prosječna neto zarada iz prethodnog polugodišta i prosječna neto zarada u Crnoj Gori za isti period. Veća od njih je osnov.",
    "Trećina osnova množi se brojem punih godina rada kod tog poslodavca.",
    "Taj iznos se poredi sa tri osnova. Isplaćuje se veći.",
    "Prosjek Crne Gore kalkulator računa iz mjesečnih podataka MONSTAT-a. Kolektivni ugovor može propisati više.",
  ],
  ejemplo: [
    "Radnik sa neto zaradom od 1.200 eura i osam godina staža kod poslodavca. Trećina po godini daje 3.200 eura, ali je najniži iznos 3.600 eura, pa mu pripada 3.600 eura.",
    "Sa dvadeset godina rada račun je 8.000 eura, što je više od minimuma.",
  ],
  faq: [
    {
      pregunta: "Kome pripada otpremnina?",
      respuesta: "Zaposlenom za čijim je radom prestala potreba, ako mu nije obezbijeđeno nijedno od prava iz člana 167 stav 2 tačka 6, kao raspored na druge poslove ili prekvalifikacija (Zakon o radu, čl. 169a st. 1).",
    },
    {
      pregunta: "Da li se plaćaju porez i doprinosi na otpremninu?",
      respuesta: "Doprinosi se ne plaćaju (Zakon o doprinosima, čl. 18a). Porez se ne plaća do najnižeg iznosa iz Zakona o radu (Zakon o porezu na dohodak, čl. 5a), a poreska praksa ministarstva navodi 15 odsto na iznos preko toga.",
    },
    {
      pregunta: "Važe li drugačija pravila za lica sa invaliditetom?",
      respuesta: "Da. Član 169a stav 6 predviđa najmanje 12 prosječnih zarada kod invaliditeta van rada, a 36 ako je nastao povredom na radu ili profesionalnom bolešću. Kalkulator ne računa te slučajeve.",
    },
    {
      pregunta: "A otpremnina pri sporazumnom raskidu?",
      respuesta: "Tada poslodavac može, ali ne mora, da je isplati (Zakon o radu, čl. 165). Ako je riječ o državnoj firmi, zaposleni pet godina ne može da se zaposli u javnom sektoru, osim ako je vrati (čl. 21).",
    },
  ],
  glosario: [
    { termino: "Tehnološki višak", definicion: "Zaposleni za čijim je radom prestala potreba." },
    { termino: "Prethodno polugodište", definicion: "Šest mjeseci prije tekućeg polugodišta: januar do jun ili jul do decembar." },
    { termino: "Osnov", definicion: "Mjesečni iznos na koji se primjenjuje račun otpremnine." },
  ],
});
