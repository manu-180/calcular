import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.valutakalkulator",
  h1: "Valutakalkulator med kurser fra Norges Bank",
  title: "Valutakalkulator: euro, dollar og svenske kroner",
  description:
    "Regn om mellom kroner og euro, dollar, svenske og danske kroner eller pund med midtkursen fra Norges Bank. Euro: {{no.eur}} ({{no.eur#desde}}).",
  intro: [
    "Kalkulatoren regner om beløp med valutakursene Norges Bank publiserer hver virkedag. Det er midtkurser, uten påslag fra banken.",
    "Velg valuta og retning, og skriv inn beløpet.",
  ],
  comoSeCalcula: [
    "Fra valuta til kroner: beløpet ganges med kursen (kroner for én enhet av valutaen).",
    "Fra kroner til valuta: beløpet deles på kursen.",
    "Norges Bank oppgir svenske og danske kroner per 100. Kalkulatoren regner om til kurs per én krone.",
    "Kursene oppdateres automatisk fra Norges Bank. Datoen for kursen står i resultatet.",
  ],
  ejemplo: ["Med kursen fra 23. oktober 2026 (10,4665) blir 100 euro til 1 046,65 kroner."],
  faq: [
    {
      pregunta: "Hva er en euro i norske kroner i dag?",
      respuesta: "Siste kurs fra Norges Bank er {{no.eur}} for én euro ({{no.eur#desde}}). Banken din bruker en kurs med påslag når du veksler eller betaler med kort.",
    },
    {
      pregunta: "Hvorfor får jeg en annen kurs i banken?",
      respuesta: "Norges Bank publiserer midtkurser. Banker, kortselskaper og vekslingskontorer legger på en margin når de kjøper eller selger valuta.",
    },
    {
      pregunta: "Hvor ofte oppdateres kursene?",
      respuesta: "Norges Bank publiserer nye kurser hver virkedag. Kalkulatoren bruker siste publiserte kurs.",
    },
  ],
  glosario: [
    { termino: "Midtkurs", definicion: "Gjennomsnittet av kjøps- og salgskurs i markedet, uten påslag." },
    { termino: "Valutakurs", definicion: "Hvor mange kroner én enhet av en annen valuta koster." },
  ],
});
