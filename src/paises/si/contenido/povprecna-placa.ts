import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.povprecna-placa",
  h1: "Povprečna plača v Sloveniji {{anio}}: primerjava",
  title: "Povprečna plača v Sloveniji {{anio}}: {{si.povprecna-placa}}",
  description: "Povprečna bruto plača znaša {{si.povprecna-placa}} po podatkih SURS. Primerjajte svojo plačo s povprečjem v odstotkih in evrih.",
  intro: [
    "Po zadnjih podatkih SURS je povprečna mesečna bruto plača {{si.povprecna-placa}}. Podatek velja za ta mesec: {{si.povprecna-placa#desde}}. Za celo leto 2025 je povprečje {{si.povprecna-letna-placa}}.",
    "Vpišite svojo bruto plačo in preverite, kje ste glede na povprečje. Upoštevajte, da povprečje ni isto kot mediana.",
  ],
  comoSeCalcula: [
    "Delež = vaša bruto plača / povprečna bruto plača × 100.",
    "Razlika je vaša plača minus povprečje. Negativna razlika pomeni, da ste pod povprečjem.",
    "Serija je iz tabele SURS H285S, ki jo objavljajo mesečno, praviloma z zamikom približno dveh mesecev.",
  ],
  ejemplo: [
    "Bruto plača 2.500,00 € pri povprečju 2.695,56 € pomeni 92,7 odstotka povprečja, razlika je 195,56 € manj.",
  ],
  faq: [
    {
      pregunta: "Zakaj je ta podatek pomemben?",
      respuesta: "Povprečna plača določa več meja: regres je brez dohodnine do zadnje znane povprečne mesečne plače, najnižja osnova za prispevke pa je 60 odstotkov povprečne plače preteklega leta.",
    },
    {
      pregunta: "Kaj je mesečni in kaj letni podatek?",
      respuesta: "Mesečni podatek SURS niha po mesecih zaradi izplačil. Letno povprečje {{si.povprecna-letna-placa}} je FURS uporabil za izračun osnov.",
    },
    {
      pregunta: "Ali je primerjava z neto plačo smiselna?",
      respuesta: "Primerjamo bruto z bruto. Neto znesek izračunate z izračunom plače, saj je odvisen od olajšav.",
    },
  ],
  glosario: [
    { termino: "SURS", definicion: "Statistični urad Republike Slovenije." },
    { termino: "Povprečna bruto plača", definicion: "Plača pred odbitki, povprečna za vse zaposlene pri pravnih osebah." },
  ],
});
