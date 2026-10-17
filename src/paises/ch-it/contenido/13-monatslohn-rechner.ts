import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.13-monatslohn-rechner",
  h1: "Calcolo della tredicesima",
  title: "Calcolo tredicesima: pro rata in caso di entrata o uscita",
  description: "Quanta tredicesima ti spetta? Quota per un anno intero o in caso di entrata e uscita durante l'anno, al mese e all'anno.",
  intro: [
    "Se è pattuita una tredicesima, per un anno intero corrisponde a una mensilità in più.",
    "Il calcolatore mostra la quota se non hai lavorato tutto l'anno. Conta quello che il tuo contratto prevede per entrate e uscite.",
  ],
  comoSeCalcula: [
    "Tredicesima = salario mensile × mesi lavorati / 12.",
    "Ogni mese lavorato dà un dodicesimo di salario mensile.",
    "Sulla tredicesima si deducono gli stessi contributi sociali del salario normale.",
  ],
  ejemplo: [
    "Chi inizia a metà maggio con un salario mensile di 6500 franchi lavora 7.5 mesi fino a fine anno. La tredicesima ammonta allora a 4062.50 franchi.",
  ],
  faq: [
    { pregunta: "Ho diritto alla tredicesima?", respuesta: "Solo se è pattuita, nel contratto di lavoro, in un contratto collettivo o in un contratto normale di lavoro. La legge non la prescrive." },
    { pregunta: "Che differenza c'è con la gratificazione?", respuesta: "La gratificazione è una retribuzione speciale per determinate occasioni. Se il rapporto termina prima di quell'occasione, una quota è dovuta solo se è stata pattuita." },
    { pregunta: "Sulla tredicesima si paga l'AVS?", respuesta: "Sì. Fa parte del salario soggetto all'AVS. Il calcolo dello stipendio netto ti mostra le deduzioni." },
  ],
  glosario: [
    { termino: "Gratificazione", definicion: "Retribuzione speciale per determinate occasioni, per esempio a Natale. È dovuta solo se è stata pattuita." },
  ],
});
