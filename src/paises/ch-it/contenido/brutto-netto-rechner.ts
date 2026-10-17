import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.brutto-netto-rechner",
  h1: "Calcolo dello stipendio netto in Svizzera",
  title: "Stipendio lordo-netto Svizzera 2026: calcola le deduzioni",
  description: "Dal salario lordo al netto: AVS/AI/IPG, AD, cassa pensioni e AINP con le aliquote 2026. Al mese e all'anno, per 12 o 13 mensilità.",
  intro: [
    "In Svizzera dal salario lordo si deducono i contributi AVS, AI e IPG, l'assicurazione contro la disoccupazione, la cassa pensioni e il premio per gli infortuni non professionali. Datore di lavoro e dipendente pagano ciascuno metà dell'AVS/AI/IPG ({{ch.ahv-iv-eo-beitragssatz}}) e dell'AD ({{ch.alv-beitragssatz}}).",
    "Il calcolatore mostra il tuo salario netto prima delle imposte. Un'eventuale imposta alla fonte non è dedotta.",
  ],
  comoSeCalcula: [
    "AVS/AI/IPG: metà di {{ch.ahv-iv-eo-beitragssatz}} su tutto il salario lordo.",
    "AD: metà di {{ch.alv-beitragssatz}}, ma solo fino al guadagno massimo assicurato di {{ch.hoechster-versicherter-verdienst}} all'anno.",
    "Cassa pensioni: se il salario annuo supera {{ch.bvg-eintrittsschwelle}}, è assicurato il salario coordinato, cioè il salario annuo fino a {{ch.bvg-obere-grenze}} meno {{ch.bvg-koordinationsabzug}}. L'accredito di vecchiaia legale va dal 7 al 18 % secondo l'età. Senza la tua indicazione, il calcolatore ne considera la metà come tua quota.",
    "AINP e perdita di guadagno malattia: l'aliquota che inserisci.",
  ],
  ejemplo: [
    "Con 6500 franchi lordi, 13 mensilità e 35 anni si deducono ogni mese circa 345 franchi di AVS/AI/IPG, 72 franchi di AD, 242 franchi di cassa pensioni e 65 franchi di AINP. Restano circa 5777 franchi netti.",
  ],
  faq: [
    { pregunta: "Quali deduzioni sono fisse e quali no?", respuesta: "Sono fisse l'AVS/AI/IPG con metà di {{ch.ahv-iv-eo-beitragssatz}} e l'AD con metà di {{ch.alv-beitragssatz}}. Il contributo alla cassa pensioni dipende dall'età e dal regolamento, il premio AINP dall'assicuratore infortuni." },
    { pregunta: "Perché prima dei 25 anni pago meno cassa pensioni?", respuesta: "Gli accrediti di vecchiaia legali iniziano a 25 anni. Prima la cassa pensioni ti assicura solo per i rischi di morte e invalidità." },
    { pregunta: "Anche la tredicesima è soggetta alle deduzioni?", respuesta: "Sì. Le gratifiche e le rimunerazioni simili fanno parte del salario soggetto all'AVS. Per la LPP la tredicesima conta nel salario annuo." },
    { pregunta: "Perché con salari alti l'AD è più bassa del previsto?", respuesta: "L'AD è riscossa solo fino al guadagno massimo assicurato di {{ch.hoechster-versicherter-verdienst}} all'anno. Sulla parte che supera questo importo non c'è contributo AD." },
  ],
  glosario: [
    { termino: "Salario coordinato", definicion: "La parte del salario annuo assicurata obbligatoriamente nella cassa pensioni." },
    { termino: "AINP", definicion: "Assicurazione contro gli infortuni non professionali. Chi lavora almeno otto ore alla settimana presso lo stesso datore di lavoro è assicurato anche contro gli infortuni non professionali. Il premio è a carico del dipendente, salvo accordi più favorevoli." },
    { termino: "Certificato di salario", definicion: "Attestazione annua del datore di lavoro con salario lordo, deduzioni e salario netto, per la dichiarazione d'imposta." },
  ],
});
