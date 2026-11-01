import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.obracun-otpremnine",
  h1: "Obračun otpremnine {{anio}}",
  title: "Obračun otpremnine {{anio}}: višak i odlazak u penziju",
  description: "Izračunajte otpremninu: trećina zarade za svaku godinu rada za višak, ili dve prosečne zarade od {{rs.prosecna-bruto}} pri odlasku u penziju. Zvanični podaci.",
  intro: [
    "Otpremnina za višak ne može biti manja od trećine vaše zarade za svaku navršenu godinu rada kod poslodavca. Pri odlasku u penziju minimum su dve prosečne zarade u Republici, a poslednja objavljena bruto prosečna zarada je {{rs.prosecna-bruto}}.",
    "Opšti akt ili ugovor o radu mogu da daju više. Ovde je obračun zakonskog minimuma.",
  ],
  comoSeCalcula: [
    "Za višak: uzmite prosečnu mesečnu zaradu isplaćenu za poslednja tri meseca pre meseca isplate otpremnine.",
    "Podelite je sa tri i pomnožite brojem navršenih godina rada kod poslodavca. Računa se i rad kod poslodavca prethodnika i povezanih lica.",
    "Za penziju: dve prosečne zarade prema poslednjem podatku Republičkog zavoda za statistiku.",
  ],
  ejemplo: [
    "Prosečna zarada 120.000 dinara i devet navršenih godina rada: 40.000 dinara po godini, ukupno 360.000 dinara.",
    "Pri odlasku u penziju, po bruto prosečnoj zaradi iz avgusta 2026. od 161.953 dinara, minimum je 323.906 dinara.",
  ],
  faq: [
    {
      pregunta: "Kada se isplaćuje otpremnina za višak?",
      respuesta: "Pre otkaza ugovora o radu: poslodavac je dužan da je isplati pre nego što otkaže ugovor zbog prestanka potrebe za radom (Zakon o radu, čl. 158).",
    },
    {
      pregunta: "Da li se plaća porez na otpremninu?",
      respuesta: "Do zakonskog minimuma ne plaća se porez na dohodak građana. Iznad toga se primenjuju pravila o oporezivanju (Zakon o porezu na dohodak građana, čl. 9 st. 1 tač. 18 i 19).",
    },
    {
      pregunta: "Koja je prosečna zarada za otpremninu pri odlasku u penziju?",
      respuesta: "Prosečna zarada u Republici Srbiji prema poslednjem objavljenom podatku (Zakon o radu, čl. 119). Sada je to {{rs.prosecna-bruto}}, za {{rs.prosecna-bruto#desde}}.",
    },
  ],
  glosario: [
    { termino: "Otpremnina", definicion: "Novčana naknada pri prestanku radnog odnosa." },
    { termino: "Tehnološki višak", definicion: "Uobičajen naziv za prestanak potrebe za radom zaposlenog (Zakon o radu, čl. 158 i 179)." },
    { termino: "RZS", definicion: "Republički zavod za statistiku." },
  ],
});
