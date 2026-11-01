import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-sl.bono",
  h1: "Kalkulator polletne nagrade v Zetalandiji",
  title: "Polletna nagrada v Zetalandiji: koliko boste prejeli",
  description: "Izračunajte polletno nagrado z minimalno plačo svoje regije in dodatkom {{zz.bonificacion}}, z uradnimi vrednostmi, datumom in virom.",
  intro: [
    "Polletna nagrada je dodatno plačilo, ki ga delodajalec izplača dvakrat na leto.",
    "Če ste delali celo polletje, prejmete eno mesečno plačo in dodatek {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Izračun izhaja iz bruto mesečne plače. Če je nižja od minimalne plače v vaši regiji, se upošteva minimalna plača.",
    "Ta plača se pomnoži s številom mesecev, ki ste jih delali, in deli s šest.",
    "V majhnih podjetjih je nagrada za polovico manjša.",
    "Nagradi se doda dodatek {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Kolikšna je minimalna plača v Severni regiji?", respuesta: "{{zz.minimo@norte}}. Začetek veljavnosti: {{zz.minimo@norte#desde}}." },
    { pregunta: "Kaj če v polletju ni bilo polnih šestih mesecev dela?", respuesta: "Prejmete sorazmeren del, glede na število mesecev, ki ste jih delali." },
    { pregunta: "Se dodatek izplača vedno?", respuesta: "Da. Znaša {{zz.bonificacion}} nagrade in podjetje ga izplača skupaj z nagrado." },
  ],
  glosario: [
    { termino: "Polletna nagrada", definicion: "Dodatno plačilo, ki ga zakon določa za julij in december." },
    { termino: "Minimalna plača", definicion: "Najnižje plačilo za delo s polnim delovnim časom v vsaki regiji." },
  ],
});
