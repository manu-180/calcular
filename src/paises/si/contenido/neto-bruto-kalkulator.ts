import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.neto-bruto-kalkulator",
  h1: "Neto bruto kalkulator {{anio}}",
  title: "Neto bruto kalkulator {{anio}}: koliko bruto za želeni neto",
  description: "Vpišite želeno neto plačo in dobite potrebno bruto plačo ter strošek delodajalca. Z OZP {{si.ozp}} in lestvico dohodnine za to leto.",
  intro: [
    "Pri pogajanju za plačo običajno vemo, koliko želimo dobiti na račun, pogodba pa navaja bruto znesek. Ta kalkulator išče obratno pot: poišče bruto plačo, pri kateri po prispevkih, OZP {{si.ozp}} in akontaciji ostane vaš neto.",
    "Hkrati pokaže, koliko bo ta plača stala delodajalca, ki na bruto doda še {{si.prispevki-delodajalec[piz]}} za pokojninsko zavarovanje in druge svoje prispevke.",
  ],
  comoSeCalcula: [
    "Lestvica dohodnine je progresivna, zato preprost faktor ne pride v poštev. Kalkulator postopoma preizkuša bruto zneske in vsakega preračuna po celotnem izračunu plače, dokler ne doseže želenega neta na cent.",
    "Upošteva obvezni zdravstveni prispevek {{si.ozp}}, splošno olajšavo {{si.splosna-olajsava}} na leto, olajšave za otroke in olajšavo do 29. leta {{si.olajsava-do-29}}, če jih izberete.",
    "Strošek delodajalca je bruto plača s prispevki delodajalca. Če je bruto pod najnižjo osnovo {{si.najnizja-osnova}}, doda še prispevke od razlike.",
  ],
  ejemplo: [
    "Za neto plačo 1.600,00 € brez otrok je potrebna bruto plača 2.509,09 €. Prispevki z OZP znašajo 618,96 €, akontacija 290,13 €, delodajalca pa ta plača stane 2.938,14 € na mesec.",
  ],
  faq: [
    {
      pregunta: "Zakaj vsak dodatni evro neta stane več kot evro bruta?",
      respuesta: "Od vsakega dodatnega bruto evra se odštejejo prispevki {{si.prispevki-delavec[piz]}} in še ostali ter dohodnina po razredu, v katerem ste. Pri višjih plačah je razred višji, na primer {{si.dohodnina[2].tasa}}.",
    },
    {
      pregunta: "Ali izračun velja za več zaposlitev?",
      respuesta: "Ne. Računamo eno zaposlitev pri glavnem delodajalcu. Drugi delodajalec po navedbah državnega portala SPOT akontacijo računa po stopnji 25 odstotkov in brez olajšav.",
    },
    {
      pregunta: "Ali so upoštevani prevoz, malica in regres?",
      respuesta: "Ne. Povračila stroškov in regres so ločeni prejemki in ne vplivajo na ta izračun. Regres za letni dopust izračunate na svoji strani.",
    },
  ],
  glosario: [
    { termino: "Bruto plača", definicion: "Plača pred odbitkom prispevkov delavca in akontacije dohodnine." },
    { termino: "Neto plača", definicion: "Znesek, ki ga delavec dobi na račun, brez povračil stroškov." },
  ],
});
