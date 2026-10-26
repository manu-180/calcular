import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.kpi-kalkulator",
  h1: "KPI-kalkulator: regn om kroner med prisstigningen",
  title: "KPI-kalkulator: hva er kronebeløpet verdt i dag?",
  description:
    "Regn om et beløp fra en måned til en annen med konsumprisindeksen fra SSB. Se prisstigningen siden år 2000 og hva pengene tilsvarer i dag.",
  intro: [
    "Konsumprisindeksen (KPI) måler hvordan prisene på varer og tjenester endrer seg. Med den kan du se hva et beløp fra et tidligere år tilsvarer i dagens kroner.",
    "Velg beløp, startmåned og sluttmåned. Kalkulatoren bruker KPI fra Statistisk sentralbyrå, med tall fra januar 2000.",
  ],
  comoSeCalcula: [
    "Beløpet ganges med KPI for sluttmåneden og deles på KPI for startmåneden.",
    "Prisstigningen i perioden er forholdet mellom de to indeksene minus 1.",
    "SSB publiserer KPI for en måned i løpet av måneden etter. Velger du en måned uten tall ennå, regner kalkulatoren til siste publiserte måned og sier fra om det i resultatet.",
  ],
  ejemplo: ["1 000 kr i januar 2015 tilsvarer 1 452,51 kr i september 2026. Prisene har steget med 45,3 % i perioden."],
  faq: [
    {
      pregunta: "Hva er 1 000 kr fra 2015 verdt i dag?",
      respuesta: "Omtrent 1 450 kr i september 2026, regnet med KPI fra SSB. Prisene steg med rundt 45 % i perioden.",
    },
    {
      pregunta: "Hvilken indeks bruker kalkulatoren?",
      respuesta: "Totalindeksen i konsumprisindeksen fra SSB, med 2025 som basisår (2025 = 100). Tallene oppdateres automatisk når SSB publiserer en ny måned.",
    },
    {
      pregunta: "Kan jeg bruke KPI til å regulere husleie?",
      respuesta: "Ja. Etter husleieloven § 4-2 kan leien endres med høyst endringen i KPI siden forrige leiefastsetting, tidligst ett år etter forrige endring og med minst én måneds skriftlig varsel. Kalkulatoren viser endringen i KPI mellom to måneder.",
    },
  ],
  glosario: [
    { termino: "KPI", definicion: "Konsumprisindeksen, SSBs mål på prisutviklingen for husholdningene." },
    { termino: "Kjøpekraft", definicion: "Hvor mye du får kjøpt for et kronebeløp." },
  ],
});
