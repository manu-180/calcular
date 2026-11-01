import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.izracun-odpravnine",
  h1: "Izračun odpravnine {{anio}} po ZDR-1",
  title: "Odpravnina {{anio}}: izračun po letih dela",
  description: "Odpravnina ob odpovedi iz poslovnega razloga ali nesposobnosti: 1/5, 1/4 ali 1/3 plače za vsako leto. Z zgornjo mejo in davčno obravnavo.",
  intro: [
    "Delodajalec, ki odpove pogodbo iz poslovnega razloga ali nesposobnosti, mora izplačati odpravnino. Višina je po 108. členu ZDR-1 odvisna od let dela pri njem, osnova pa je povprečna plača zadnjih treh mesecev.",
    "Odpravnina je brez dohodnine in prispevkov do desetih povprečnih mesečnih plač v Sloveniji. Zadnji podatek SURS: {{si.povprecna-placa}}.",
  ],
  comoSeCalcula: [
    "Več kot eno leto do deset let: 1/{{si.odpravnina[do10]}} osnove za vsako leto.",
    "Več kot deset let do 20 let: 1/{{si.odpravnina[do20]}} osnove za vsako leto. Več kot 20 let: 1/{{si.odpravnina[nad20]}} osnove za vsako leto.",
    "Odpravnina ne sme preseči {{si.odpravnina[najvec]}}-kratnika osnove, če kolektivna pogodba dejavnosti ne določa drugače.",
  ],
  ejemplo: [
    "Plača 2.000,00 € in osem let dela: 2.000,00 € × 8 / 5 = 3.200,00 €.",
    "Pri 15 letih je znesek 7.500,00 €. Pri 35 letih bi račun dal 23.333,33 €, a zgornja meja ga omeji na 20.000,00 €.",
  ],
  faq: [
    {
      pregunta: "Kdaj mi odpravnina ne pripada?",
      respuesta: "Zakon jo določa za več kot eno leto dela pri odpovedi iz poslovnega razloga ali razloga nesposobnosti. Pri krivdnem razlogu je 108. člen ZDR-1 ne predvideva.",
    },
    {
      pregunta: "Ali se odpravnina obdavči?",
      respuesta: "Po 44. členu ZDoh-2 se v davčno osnovo ne všteva do zakonske višine, največ do desetih povprečnih mesečnih plač. Enako velja za prispevke (144. člen ZPIZ-2).",
    },
    {
      pregunta: "Kdaj se izplača?",
      respuesta: "Ob prenehanju pogodbe o zaposlitvi, če kolektivna pogodba dejavnosti ne določa drugače (šesti odstavek 108. člena ZDR-1).",
    },
  ],
  glosario: [
    { termino: "Osnova za odpravnino", definicion: "Povprečna mesečna plača zadnjih treh mesecev pred odpovedjo." },
    { termino: "Poslovni razlog", definicion: "Prenehanje potrebe po delu iz ekonomskih, organizacijskih ali podobnih razlogov." },
  ],
});
