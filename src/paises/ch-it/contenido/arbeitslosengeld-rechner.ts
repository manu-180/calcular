import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.arbeitslosengeld-rechner",
  h1: "Calcolo dell'indennità di disoccupazione in Svizzera",
  title: "Indennità di disoccupazione Svizzera: calcola l'indennità AD",
  description: "Calcola l'indennità di disoccupazione: {{ch.alv-taggeld-reduziert}} o {{ch.alv-taggeld-voll}} del guadagno assicurato, indennità giornaliera, importo mensile e numero massimo secondo la LADI.",
  intro: [
    "Chi è disoccupato e negli ultimi due anni ha versato contributi per almeno dodici mesi riceve indennità giornaliere dell'assicurazione contro la disoccupazione. Un'indennità ammonta all'{{ch.alv-taggeld-voll}} o al {{ch.alv-taggeld-reduziert}} del guadagno assicurato.",
    "Il calcolatore mostra l'indennità giornaliera, l'importo mensile e il numero massimo di indennità. Decide in modo vincolante la tua cassa di disoccupazione.",
  ],
  comoSeCalcula: [
    "Guadagno assicurato: il tuo salario mensile medio degli ultimi sei o dodici mesi di contribuzione, conta il valore più alto. Al massimo {{ch.hoechster-versicherter-verdienst}} all'anno.",
    "Guadagno giornaliero: guadagno mensile diviso per {{ch.alv-tage-pro-monat}}.",
    "Hanno diritto all'{{ch.alv-taggeld-voll}} le persone con obbligo di mantenimento verso figli sotto i 25 anni, con una rendita AI per un grado d'invalidità di almeno il 40 % o con un'indennità intera che non supera {{ch.alv-schwelle-volles-taggeld}}. Gli altri ricevono il {{ch.alv-taggeld-reduziert}}.",
    "Numero massimo: 260 indennità da 12 mesi di contribuzione, 400 da 18, 520 da 22 mesi per chi ha almeno 55 anni o una rendita AI. Sotto i 25 anni senza figli, al massimo 200.",
  ],
  ejemplo: [
    "Con un guadagno assicurato di 6000 franchi e senza figli l'indennità giornaliera è di circa 194 franchi, circa 4200 franchi lordi al mese. Con 24 mesi di contribuzione e 35 anni ci sono al massimo 400 indennità.",
  ],
  faq: [
    { pregunta: "Quanto ricevo?", respuesta: "Il {{ch.alv-taggeld-reduziert}} del guadagno assicurato, oppure l'{{ch.alv-taggeld-voll}} se mantieni figli sotto i 25 anni, ricevi una rendita AI di almeno il 40 % o se la tua indennità intera non supera {{ch.alv-schwelle-volles-taggeld}}." },
    { pregunta: "Per quanto tempo ricevo le indennità?", respuesta: "Dipende dal periodo di contribuzione e dall'età: 260, 400 o 520 indennità in due anni. Sotto i 25 anni senza obbligo di mantenimento, al massimo 200 indennità." },
    { pregunta: "Che cosa si deduce dall'indennità?", respuesta: "I contributi AVS/AI/IPG, un contributo alla previdenza professionale per i rischi di morte e invalidità e al massimo due terzi del premio per gli infortuni non professionali." },
    { pregunta: "Come si calcola un mese?", respuesta: "Un mese corrisponde a {{ch.alv-tage-pro-monat}} indennità. Per settimana sono versate cinque indennità." },
  ],
  glosario: [
    { termino: "Guadagno assicurato", definicion: "Il salario medio su cui si calcola l'indennità, al massimo fino all'importo massimo dell'assicurazione contro gli infortuni." },
    { termino: "Termine quadro", definicion: "Periodo di due anni per il periodo di contribuzione e per la riscossione delle indennità." },
  ],
});
