import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.dokumentavgift",
  h1: "Dokumentavgift: regn ut avgift og tinglysingsgebyr",
  title: "Dokumentavgift {{anio}}: kalkulator for boligkjøp",
  description:
    "Regn ut dokumentavgiften på {{no.dokumentavgift}} av markedsverdien og tinglysingsgebyret på {{no.tinglysingsgebyr}} når du kjøper bolig eller tomt i {{anio}}.",
  intro: [
    "Når du kjøper en selveierbolig, en tomt eller en annen fast eiendom, betaler du dokumentavgift til staten når skjøtet tinglyses. I tillegg kommer tinglysingsgebyr til Kartverket.",
    "Skriv inn markedsverdien, så ser du dokumentavgiften og de samlede kostnadene ved tinglysingen.",
  ],
  comoSeCalcula: [
    "Dokumentavgiften er {{no.dokumentavgift}} av markedsverdien på eiendommen når dokumentet tinglyses, men minst {{no.dokumentavgift-minimum}}.",
    "Kartverket runder avgiftsgrunnlaget ned til nærmeste 1 000 kr.",
    "Tinglysingsgebyret er {{no.tinglysingsgebyr}} for skjøtet. Tar du opp boliglån, kommer {{no.tinglysingsgebyr}} til for pantedokumentet.",
  ],
  ejemplo: ["Kjøper du en bolig til 4 500 000 kr med boliglån, blir dokumentavgiften 112 500 kr. Med to tinglysingsgebyr blir det 113 590 kr til sammen."],
  faq: [
    {
      pregunta: "Hvor mye er dokumentavgiften?",
      respuesta: "{{no.dokumentavgift}} av markedsverdien, men minst {{no.dokumentavgift-minimum}}. Avgiften er fastsatt av Stortinget for 2026.",
    },
    {
      pregunta: "Er det kjøpesummen eller markedsverdien som teller?",
      respuesta: "Markedsverdien når dokumentet tinglyses. Er kjøpesummen lavere, for eksempel ved gave eller overtatt gjeld, regnes avgiften likevel av full markedsverdi.",
    },
    {
      pregunta: "Hva koster tinglysingen?",
      respuesta: "Kartverket tar {{no.tinglysingsgebyr}} for å tinglyse et skjøte og like mye for et pantedokument. Får du fritak for dokumentavgift, må du likevel betale gebyret.",
    },
  ],
  glosario: [
    { termino: "Skjøte", definicion: "Dokumentet som overfører eiendomsretten til kjøperen." },
    { termino: "Tinglysing", definicion: "Registrering av skjøte og pant i grunnboken hos Kartverket." },
    { termino: "Pantedokument", definicion: "Dokumentet som gir banken sikkerhet i boligen for lånet." },
  ],
});
