import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.contributi-artigiani-commercianti",
  h1: "Calcolo contributi INPS artigiani e commercianti",
  title: "Contributi INPS artigiani e commercianti 2026",
  description:
    "Calcola i contributi INPS 2026 di artigiani e commercianti: quota fissa sul minimale di {{it.minimale-autonomi}}, contributi sull'eccedenza e riduzione per il forfettario.",
  intro: [
    "Se hai un'impresa artigiana o commerciale sei iscritto alla gestione INPS di artigiani o commercianti. Paghi una quota fissa ogni anno e, se guadagni di più, contributi in percentuale sul reddito.",
    "Con questo calcolo vedi quanto versi in tutto, quanto va nelle quattro rate fisse e quanto con il saldo e gli acconti.",
  ],
  comoSeCalcula: [
    "Anche con un reddito basso si paga sul minimale di {{it.minimale-autonomi}}: è la quota fissa, divisa in quattro rate.",
    "Sul reddito oltre il minimale si paga la stessa aliquota fino a {{it.fascia-pensionabile}} e un punto in più sopra quella soglia.",
    "I contributi si fermano al massimale: {{it.massimale-contributivo}} per chi è iscritto dal 1996, {{it.massimale-ante-1996}} per chi ha contributi più vecchi.",
    "A tutto si aggiunge il contributo di maternità di {{it.maternita-autonomi}} al mese. Nel regime forfettario puoi chiedere una riduzione del {{it.riduzione-forfettari}}.",
  ],
  ejemplo: [
    "Un artigiano con un reddito di 30.000 euro paga 7.200 euro di contributi IVS più 7,44 euro di maternità. Di questi, 4.521,36 euro sono la quota fissa e il resto si versa con il saldo.",
  ],
  faq: [
    {
      pregunta: "Quanto paga di contributi fissi un artigiano nel 2026?",
      respuesta: "4.521,36 euro l'anno, compresa la maternità, divisi in quattro rate. Un commerciante paga 4.611,64 euro.",
    },
    {
      pregunta: "Quando si pagano le rate fisse?",
      respuesta: "Nel 2026 le scadenze sono il 18 maggio, il 20 agosto, il 16 novembre e il 16 febbraio 2027. I contributi sull'eccedenza si pagano con le imposte sui redditi.",
    },
    {
      pregunta: "Conviene la riduzione contributiva del forfettario?",
      respuesta: "Paghi meno subito, ma anche la pensione si riduce, perché l'INPS accredita meno contributi. Si chiede all'INPS e vale finché resti nel regime.",
    },
    {
      pregunta: "Perché i commercianti pagano di più?",
      respuesta: "Perché versano anche un piccolo contributo in più che finanzia l'indennizzo per chi chiude un'attività commerciale.",
    },
  ],
  glosario: [
    { termino: "Minimale", definicion: "Il reddito minimo su cui si pagano comunque i contributi." },
    { termino: "IVS", definicion: "Invalidità, vecchiaia e superstiti: i contributi che finanziano la pensione." },
    { termino: "Eccedenza", definicion: "La parte di reddito che supera il minimale." },
  ],
});
