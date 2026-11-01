import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.tecaj-hnb",
  h1: "Tečaj HNB {{anio}}: preračun eura po srednjem tečaju",
  title: "Tečaj HNB {{anio}}: preračun eura u dolar, franak i marku",
  description: "Preračunajte eure po srednjem tečaju HNB-a: dolar {{hr.usd}}, funta {{hr.gbp}}, franak {{hr.chf}}, marka {{hr.bam}} za jedan euro. Tečajna lista s datumom.",
  intro: [
    "Hrvatska narodna banka objavljuje koliko valute vrijedi jedan euro. Prema zadnjoj listi to je {{hr.usd}} američkog dolara, {{hr.gbp}} britanske funte i {{hr.chf}} švicarskog franka, s datumom primjene {{hr.usd#desde}}.",
    "Unesite iznos i smjer pretvorbe. Rezultat pokazuje i korišteni tečaj, pa ga možete usporediti s bankom.",
  ],
  comoSeCalcula: [
    "Iz eura u valutu: iznos pomnožite sa srednjim tečajem.",
    "Iz valute u eure: iznos podijelite sa srednjim tečajem.",
    "Tečaj se učitava izravno s liste HNB-a. Na konvertibilnu marku vrijedi {{hr.bam}} za euro, na poljski zlot {{hr.pln}}, na mađarsku forintu {{hr.huf}}, a na češku krunu {{hr.czk}}.",
  ],
  ejemplo: [
    "Za 100 eura uz tečaj od 1,1172 dolara dobivate 111,72 dolara. Obrnuto, 111,72 dolara vrijedi 100 eura.",
    "Banka primjenjuje kupovni ili prodajni tečaj i naknadu, pa će stvarni iznos biti malo drukčiji.",
  ],
  faq: [
    {
      pregunta: "Kako čitati tečajnu listu otkad je euro valuta?",
      respuesta: "Lista HNB-a pokazuje koliko jedinica strane valute vrijedi jedan euro. Veći broj znači jači euro prema toj valuti.",
    },
    {
      pregunta: "Koje valute su ovdje?",
      respuesta: "Dolar, funta, franak, konvertibilna marka, zlot, forinta i češka kruna. Podaci dolaze s tečajne liste HNB-a, koja sadrži i druge valute.",
    },
    {
      pregunta: "Vrijedi li srednji tečaj u mjenjačnici?",
      respuesta: "Ne. Srednji tečaj je referentni iznos, a banke i mjenjačnice određuju vlastite kupovne i prodajne tečajeve.",
    },
    {
      pregunta: "Kako koristiti tečaj za plaćanje u inozemstvu?",
      respuesta: "Srednji tečaj pokaže otprilike koliko vrijedi vaš iznos. Pri kartičnom plaćanju banka primjenjuje svoj tečaj, pa usporedite obračun s izvatkom.",
    },
  ],
  glosario: [
    { termino: "Srednji tečaj", definicion: "Referentni tečaj HNB-a, između kupovnog i prodajnog." },
    { termino: "HNB", definicion: "Hrvatska narodna banka." },
    { termino: "Datum primjene", definicion: "Dan za koji vrijedi tečajna lista." },
  ],
});
