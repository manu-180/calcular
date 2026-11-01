import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-fi.bono",
  h1: "Zetamaan puolivuotisbonuslaskuri",
  title: "Puolivuotisbonus Zetamaassa: laske, paljonko saat",
  description: "Laske puolivuotisbonuksesi vyöhykkeesi voimassa olevalla vähimmäispalkalla ja {{zz.bonificacion}} lisällä. Viralliset luvut päivämäärän ja lähteen kanssa.",
  intro: [
    "Puolivuotisbonus on ylimääräinen kuukauden palkka, joka maksetaan kahdesti vuodessa.",
    "Jos olet työskennellyt koko puolivuotiskauden, saat täyden kuukausipalkan ja lisäksi {{zz.bonificacion}} lisän.",
  ],
  comoSeCalcula: [
    "Lähtökohta on bruttokuukausipalkkasi. Jos se on vyöhykkeesi vähimmäispalkkaa pienempi, käytetään vähimmäispalkkaa.",
    "Palkka kerrotaan työkuukausien määrällä ja jaetaan kuudella.",
    "Pienessä yrityksessä bonus on puolet.",
    "Bonuksen päälle lisätään {{zz.bonificacion}} lisä.",
  ],
  faq: [
    { pregunta: "Paljonko vähimmäispalkka on pohjoisella vyöhykkeellä?", respuesta: "Se on {{zz.minimo@norte}}, ja se on ollut voimassa {{zz.minimo@norte#desde}} alkaen." },
    { pregunta: "Entä jos en ole työskennellyt koko puolivuotiskautta?", respuesta: "Saat osuuden, joka vastaa työkuukausiesi määrää." },
    { pregunta: "Maksetaanko lisä aina?", respuesta: "Kyllä. Se on {{zz.bonificacion}} bonuksesta, ja yritys maksaa sen bonuksen yhteydessä." },
  ],
  glosario: [
    { termino: "Puolivuotisbonus", definicion: "Ylimääräinen palkka, joka lain mukaan maksetaan heinäkuussa ja joulukuussa." },
    { termino: "Vähimmäispalkka", definicion: "Pienin palkka, jonka saa maksaa täydestä työpäivästä kullakin vyöhykkeellä." },
  ],
});
