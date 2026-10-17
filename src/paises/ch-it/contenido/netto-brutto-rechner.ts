import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.netto-brutto-rechner",
  h1: "Calcolare il lordo partendo dal netto",
  title: "Stipendio netto-lordo Svizzera: il lordo per il tuo netto",
  description: "Quale salario lordo dà il netto che desideri? Con AVS/AI/IPG, AD, cassa pensioni e AINP secondo le aliquote 2026, per 12 o 13 mensilità.",
  intro: [
    "Se per una trattativa salariale hai in mente un importo netto, ti serve il salario lordo corrispondente. Il calcolatore mostra quanto deve essere il lordo perché ti resti l'importo desiderato.",
    "Il calcolo considera i contributi sociali senza le imposte: AVS/AI/IPG, AD, la cassa pensioni legale e il premio AINP che inserisci.",
  ],
  comoSeCalcula: [
    "Il calcolatore cerca il salario lordo con cui le deduzioni del calcolo lordo-netto portano esattamente al tuo netto.",
    "AVS/AI/IPG e AD ti costano metà di {{ch.ahv-iv-eo-beitragssatz}} e di {{ch.alv-beitragssatz}}. La cassa pensioni è calcolata con metà dell'accredito di vecchiaia legale.",
    "Se il salario annuo supera {{ch.bvg-eintrittsschwelle}}, si aggiunge la deduzione LPP. Per questo il lordo necessario fa un salto a questa soglia.",
  ],
  ejemplo: [
    "Per 5777 franchi netti con 13 mensilità e 35 anni servono circa 6500 franchi lordi al mese.",
  ],
  faq: [
    { pregunta: "Perché la cassa pensioni è solo stimata?", respuesta: "Ogni cassa pensioni ha il proprio regolamento. Il calcolatore usa il minimo legale, la tua deduzione può essere più alta." },
    { pregunta: "Le imposte sono considerate?", respuesta: "No. L'imposta sul reddito dipende dal cantone e dal comune. Per l'imposta federale diretta c'è il calcolatore dedicato." },
    { pregunta: "Che cosa cambia la tredicesima?", respuesta: "Aumenta il salario annuo. Di conseguenza aumenta il salario coordinato per la cassa pensioni e con esso la deduzione LPP mensile." },
  ],
  glosario: [
    { termino: "Salario lordo", definicion: "Salario prima della deduzione dei contributi sociali e di un'eventuale imposta alla fonte." },
  ],
});
