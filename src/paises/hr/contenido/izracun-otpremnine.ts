import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.izracun-otpremnine",
  h1: "Izračun otpremnine {{anio}}: zakonski minimum i porez",
  title: "Izračun otpremnine {{anio}}: minimum i neoporezivo",
  description: "Izračunajte najmanju otpremninu po Zakonu o radu: trećina prosječne plaće po godini rada, najviše šest plaća, neoporezivo {{hr.otpremnina-neoporezivo}} po godini.",
  intro: [
    "Radnik kojem poslodavac otkazuje nakon dvije godine neprekidnog rada ima pravo na otpremninu, osim kad je otkaz uvjetovan njegovim ponašanjem (Zakon o radu, čl. 126.).",
    "Zakonski minimum je trećina prosječne mjesečne plaće iz zadnja tri mjeseca za svaku navršenu godinu rada. Neoporezivo je do {{hr.otpremnina-neoporezivo}} po godini rada.",
  ],
  comoSeCalcula: [
    "Prosječnu plaću iz zadnja tri mjeseca pomnožite s godinama rada i podijelite s {{hr.otpremnina-nazivnik}}.",
    "Najviši zakonski iznos je {{hr.otpremnina-najvise}} prosječnih plaća, ako zakon, kolektivni ugovor, pravilnik ili ugovor o radu ne određuju drukčije.",
    "Za porez usporedite iznos s {{hr.otpremnina-neoporezivo}} puta godine rada kod tog poslodavca. Ostatak je iznad neoporezive svote.",
  ],
  ejemplo: [
    "Prosjek 1.800 eura, osam navršenih godina. Otpremnina je 1.800 x 8 / 3 = 4.800 eura. Neoporeziva svota je 960 x 8 = 7.680 eura, pa je sve neoporezivo.",
    "Kod prosjeka od 2.000 eura i 20 godina izračun daje 13.333,33 eura, ali zakonska granica je 12.000 eura.",
  ],
  faq: [
    {
      pregunta: "Je li otpremnina oporeziva?",
      respuesta: "Otpremnina zbog poslovno i osobno uvjetovanog otkaza neoporeziva je do {{hr.otpremnina-neoporezivo}} za svaku navršenu godinu rada kod tog poslodavca, kako navodi Porezna uprava.",
    },
    {
      pregunta: "Kolika je neoporeziva otpremnina pri odlasku u mirovinu?",
      respuesta: "Do {{hr.otpremnina-mirovina}}. Za ozljedu na radu ili profesionalnu bolest svota je do {{hr.otpremnina-ozljeda}} po godini rada.",
    },
    {
      pregunta: "Može li otpremnina biti veća od izračuna?",
      respuesta: "Može. Ovo je zakonski minimum. Kolektivni ugovor, pravilnik o radu ili ugovor o radu mogu dati više, a mogu odrediti i drukčiju gornju granicu.",
    },
    {
      pregunta: "Računaju li se započete godine?",
      respuesta: "Članak 126. govori o svakoj navršenoj godini rada kod tog poslodavca, pa se u izračun unose samo pune godine.",
    },
  ],
  glosario: [
    { termino: "Otpremnina", definicion: "Isplata pri otkazu koji daje poslodavac." },
    { termino: "Poslovno uvjetovani otkaz", definicion: "Otkaz zbog gospodarskih, tehnoloških ili organizacijskih razloga." },
    { termino: "Prosječna plaća", definicion: "Prosjek plaće iz tri mjeseca prije prestanka ugovora." },
  ],
});
