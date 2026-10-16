import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.maaltijdcheques-berekenen",
  h1: "Maaltijdcheques berekenen: wat krijg je per maand?",
  title: "Maaltijdcheques berekenen: tot {{be.maaltijdcheque[werkgever-max]}} van je werkgever",
  description:
    "Bereken wat je maaltijdcheques per maand waard zijn: werkgeversbijdrage tot {{be.maaltijdcheque[werkgever-max]}}, jouw bijdrage van minstens {{be.maaltijdcheque[werknemer-min]}} per cheque.",
  intro: [
    "Een maaltijdcheque bestaat uit een deel van je werkgever, maximaal {{be.maaltijdcheque[werkgever-max]}}, en een deel van jezelf, minstens {{be.maaltijdcheque[werknemer-min]}}.",
    "Vul het aantal gewerkte dagen en de bijdragen uit je cao of contract in. Je ziet wat er op je kaart komt en wat je er echt aan overhoudt.",
  ],
  comoSeCalcula: [
    "Je krijgt één cheque per dag dat je effectief gewerkt hebt.",
    "Waarde per cheque: bijdrage van de werkgever + jouw bijdrage.",
    "Jouw bijdrage betaal je zelf. Je echte voordeel is het deel van je werkgever.",
  ],
  ejemplo: [
    "Met 20 werkdagen, de maximale bijdrage van je werkgever en de minimale eigen bijdrage komt er € 200 op je kaart. Daarvan betaal je zelf € 21,80, dus je voordeel is € 178,20.",
  ],
  faq: [
    {
      pregunta: "Hoelang blijft een maaltijdcheque geldig?",
      respuesta: "Twaalf maanden vanaf het moment dat hij op je maaltijdchequerekening komt. Daarna kan je binnen drie maanden één keer gratis vragen om hem opnieuw te activeren.",
    },
    {
      pregunta: "Waarvoor mag ik maaltijdcheques gebruiken?",
      respuesta: "Alleen om een maaltijd te betalen of om voeding te kopen die klaar is voor verbruik.",
    },
    {
      pregunta: "Zijn maaltijdcheques belastingvrij?",
      respuesta:
        "Het deel van je werkgever is vrij van sociale bijdragen en belastingen als aan de voorwaarden voldaan is. Zo moet de toekenning in een cao of schriftelijke overeenkomst staan, en mogen ze geen loon vervangen.",
    },
  ],
  glosario: [
    { termino: "Maaltijdcheque", definicion: "Een elektronische cheque om maaltijden of voeding mee te betalen, deels betaald door je werkgever." },
    { termino: "Werkgeversbijdrage", definicion: "Het deel van de cheque dat je werkgever betaalt." },
  ],
});
