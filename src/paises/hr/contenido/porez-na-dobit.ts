import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.porez-na-dobit",
  h1: "Porez na dobit {{anio}}: kalkulator {{hr.porez-dobit-niza}} i {{hr.porez-dobit-visa}}",
  title: "Porez na dobit {{anio}}: stopa {{hr.porez-dobit-niza}} ili {{hr.porez-dobit-visa}}",
  description: "Izračunajte porez na dobit: {{hr.porez-dobit-niza}} uz prihode do {{hr.porez-dobit-prag}}, a {{hr.porez-dobit-visa}} iznad te granice. Unesite prihode i osnovicu.",
  intro: [
    "Stopa poreza na dobit ovisi o prihodima u poreznom razdoblju: {{hr.porez-dobit-niza}} do {{hr.porez-dobit-prag}} prihoda, a {{hr.porez-dobit-visa}} ako su prihodi veći.",
    "Porez se ne računa na prihode, nego na poreznu osnovicu, a stopa se bira prema prihodima. Unesite oba iznosa.",
  ],
  comoSeCalcula: [
    "Prvo provjerite prihode. Ako nisu veći od {{hr.porez-dobit-prag}}, vrijedi niža stopa, a inače viša.",
    "Odabranu stopu primijenite na cijelu poreznu osnovicu. Nema podjele osnovice na dva dijela, kao kod poreza na dohodak.",
  ],
  ejemplo: [
    "Tvrtka ima 500.000 eura prihoda i 60.000 eura osnovice. Stopa je 10 %, a porez 6.000 eura.",
    "Uz 2.000.000 eura prihoda i 300.000 eura osnovice stopa je 18 %, a porez 54.000 eura. Prelaskom granice viša stopa vrijedi za cijelu osnovicu.",
  ],
  faq: [
    {
      pregunta: "Tko plaća porez na dobit?",
      respuesta: "Trgovačko društvo i druga pravna ili fizička osoba rezident koja gospodarsku djelatnost obavlja samostalno, trajno i radi ostvarivanja dobiti, prema Zakonu o porezu na dobit.",
    },
    {
      pregunta: "Što je s obrtom?",
      respuesta: "Obrtnik može biti obveznik poreza na dobit, a Porezna uprava navodi iste stope od {{hr.porez-dobit-niza}} i {{hr.porez-dobit-visa}}. Paušalni obrt ima vlastiti izračun.",
    },
    {
      pregunta: "Vrijedi li viša stopa samo na dio iznad milijuna?",
      respuesta: "Ne. Prema Poreznoj upravi stopa ovisi o ukupnim prihodima u razdoblju, pa se na cijelu osnovicu primjenjuje jedna stopa.",
    },
    {
      pregunta: "Do kada se predaje prijava?",
      respuesta: "Porezna uprava navodi da se prijava poreza na dobit na obrascu PD za 2025. predaje do 30. travnja 2026. Uz prijavu se plaća i razlika poreza, ako je ima.",
    },
  ],
  glosario: [
    { termino: "Porezna osnovica", definicion: "Dobit iz računa dobiti i gubitka, s poreznim uvećanjima i umanjenjima." },
    { termino: "Porezno razdoblje", definicion: "Obično poslovna godina." },
    { termino: "Prijava PD", definicion: "Godišnja prijava poreza na dobit, predaje se do 30. travnja." },
  ],
});
