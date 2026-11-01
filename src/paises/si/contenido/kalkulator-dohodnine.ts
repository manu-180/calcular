import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.kalkulator-dohodnine",
  h1: "Kalkulator dohodnine {{anio}}",
  title: "Kalkulator dohodnine {{anio}}: lestvica in olajšave",
  description: "Letna dohodnina po lestvici od {{si.dohodnina[0].tasa}} do {{si.dohodnina[-1].tasa}} s splošno olajšavo {{si.splosna-olajsava}} in olajšavami za otroke.",
  intro: [
    "Dohodnina se odmeri od neto letne davčne osnove: od dohodka se odštejejo prispevki in olajšave, na ostanek pa se uporabi lestvica s petimi razredi. Stopnje so od {{si.dohodnina[0].tasa}} do {{si.dohodnina[-1].tasa}}.",
    "Če vpišete plačano akontacijo, kalkulator oceni tudi doplačilo ali vračilo. Pravi znesek je na informativnem izračunu FURS, ki upošteva vse vaše dohodke.",
  ],
  comoSeCalcula: [
    "Lestvica za 2026: do {{si.dohodnina[0].hasta}} velja {{si.dohodnina[0].tasa}}, nad {{si.dohodnina[1].desde}} {{si.dohodnina[1].tasa}}, nad {{si.dohodnina[2].desde}} {{si.dohodnina[2].tasa}}, nad {{si.dohodnina[3].desde}} {{si.dohodnina[3].tasa}} in nad {{si.dohodnina[4].desde}} {{si.dohodnina[4].tasa}}.",
    "Splošna olajšava je {{si.splosna-olajsava}}. Če je skupni dohodek pod {{si.dodatna-olajsava-prag}}, se prišteje dodatna olajšava: {{si.dodatna-olajsava-znesek}} minus {{si.dodatna-olajsava-faktor}} krat skupni dohodek.",
    "Olajšava za prvega otroka je {{si.olajsava-otroci[prvi]}}. Olajšava do 29. leta je {{si.olajsava-do-29}}. Če prispevkov ne vpišete, jih ocenimo po stopnjah delavca in z dvanajstimi zneski OZP {{si.ozp}}.",
  ],
  ejemplo: [
    "Letni bruto dohodek 30.000,00 € brez otrok: prispevki 7.402,32 € in splošna olajšava 5.551,93 € dajo osnovo 17.045,75 €. Dohodnina je 1.555,43 € in 26 odstotkov od razlike nad prvim razredom, skupaj 3.459,75 €.",
    "Pri dohodku 16.000,00 € je zaradi dodatne olajšave skupna olajšava 7.622,88 €, osnova 4.208,80 €, dohodnina pa 673,41 €.",
  ],
  faq: [
    {
      pregunta: "Kje je določena lestvica za leto 2026?",
      respuesta: "V Pravilniku o določitvi usklajenih zneskov olajšav, enačbe za določitev olajšave in lestvice za odmero dohodnine za leto 2026 (Uradni list RS, št. 104/25), ki usklajuje zneske iz 111. in 122. člena ZDoh-2.",
    },
    {
      pregunta: "Kdaj se dohodnina doplača ali vrne?",
      respuesta: "FURS izda informativni izračun po koncu leta. Razlika med odmerjeno dohodnino in med letom plačano akontacijo je doplačilo ali vračilo.",
    },
    {
      pregunta: "Ali so upoštevani dohodki iz najema ali kapitala?",
      respuesta: "Ne. Dohodki iz oddajanja premoženja, obresti in dividende imajo svoje cedularne stopnje. Računamo dohodek iz zaposlitve.",
    },
  ],
  glosario: [
    { termino: "Neto letna davčna osnova", definicion: "Dohodek po odbitku prispevkov in olajšav, na katerega se uporabi lestvica." },
    { termino: "Informativni izračun", definicion: "Predizpolnjen izračun dohodnine, ki ga FURS pošlje zavezancu." },
    { termino: "Skupni dohodek", definicion: "Vsota dohodkov, ki se upoštevajo pri dodatni splošni olajšavi." },
  ],
});
