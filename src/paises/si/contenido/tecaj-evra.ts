import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.tecaj-evra",
  h1: "Tečaj evra {{anio}}: preračun v dolar, funt in frank",
  title: "Tečaj evra {{anio}}: dolar, funt in frank",
  description: "Preračunajte evre v ameriške dolarje, britanske funte in švicarske franke po referenčnem tečaju iz tečajnice Banke Slovenije.",
  intro: [
    "Kalkulator uporablja referenčne tečaje ECB, kot jih objavlja Banka Slovenije v dnevni tečajnici. Trenutno velja 1 EUR = {{si.tecaj-usd}}, {{si.tecaj-gbp}} in {{si.tecaj-chf}}. Datum tečaja: {{si.tecaj-usd#desde}}.",
    "Referenčni tečaj je informativen. Banke in menjalnice dodajo svojo maržo, zato bo znesek pri nakupu nekoliko drugačen.",
  ],
  comoSeCalcula: [
    "Iz evrov v valuto: znesek × tečaj.",
    "Iz valute v evre: znesek / tečaj.",
    "Tečaj je kotiran kot količina tuje valute za 1 evro. Višji tečaj torej pomeni močnejši evro: za isti znesek v evrih dobite več tuje valute.",
    "Rezultat je zaokrožen na dva decimalna mesta, tečaj pa je prikazan s štirimi, tako kot v tečajnici.",
  ],
  ejemplo: [
    "Pri tečaju 1,1172 dobite za 100,00 € skupaj 111,72 USD. Za 100,00 USD dobite 89,51 €.",
    "Pri nakupu v tujini kartični sistem praviloma ne uporabi prav tega tečaja, zato izračun razumite kot primerjalno vrednost za načrtovanje stroškov ali preverjanje računa.",
  ],
  faq: [
    {
      pregunta: "Kako pogosto se tečaj osveži?",
      respuesta: "Banka Slovenije objavlja dnevno tečajnico z referenčnimi tečaji ECB. Na tej strani je datum zadnje tečajnice, ki smo jo prebrali.",
    },
    {
      pregunta: "Ali je to tečaj moje banke?",
      respuesta: "Ne. Referenčni tečaj je osnova. Banka ali kartičarski sistem uporablja svoj tečaj s provizijo.",
    },
    {
      pregunta: "Katere valute lahko izberem?",
      respuesta: "Ameriški dolar, britanski funt in švicarski frank. Tečajnica Banke Slovenije vsebuje še druge valute, a jih tu ne računamo.",
    },
  ],
  glosario: [
    { termino: "Referenčni tečaj", definicion: "Uradni informativni tečaj, ki ga objavlja ECB." },
    { termino: "Marža", definicion: "Razlika, ki jo banka doda k tečaju." },
  ],
});
