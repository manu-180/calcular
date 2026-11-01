import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.lohnkosten-rechner",
  h1: "Costo del datore di lavoro in Svizzera: quanto costa un posto",
  title: "Costo datore di lavoro Svizzera: contributi {{anio}}",
  description: "Quanto costa un salario lordo al datore di lavoro? AVS/AI/IPG, AD, cassa pensioni, cassa per assegni familiari e infortuni professionali al mese e all'anno.",
  intro: [
    "Al salario lordo il datore di lavoro aggiunge i propri contributi sociali. Paga metà dell'AVS/AI/IPG e dell'AD, almeno metà della cassa pensioni e tutto il premio per gli infortuni professionali.",
    "Il contributo alla cassa di compensazione per assegni familiari varia da cantone a cantone. Inserisci l'aliquota della tua cassa e il premio del tuo assicuratore infortuni.",
  ],
  comoSeCalcula: [
    "AVS/AI/IPG: metà di {{ch.ahv-iv-eo-beitragssatz}} sul salario lordo.",
    "AD: metà di {{ch.alv-beitragssatz}} fino al guadagno massimo assicurato di {{ch.hoechster-versicherter-verdienst}} all'anno.",
    "Cassa pensioni: il datore di lavoro paga almeno quanto tutti i dipendenti insieme. Senza la tua indicazione, il calcolatore usa metà dell'accredito di vecchiaia legale sul salario coordinato.",
    "CAF e infortuni professionali: l'aliquota inserita. Come l'AD, il premio AIP vale solo fino al guadagno massimo assicurato.",
  ],
  ejemplo: [
    "Un salario di 6500 franchi (13 mensilità, 35 anni) costa circa 7288 franchi al mese con l'1.5 % di CAF e lo 0.5 % di AIP. Sull'anno sono circa 94’500 franchi.",
  ],
  faq: [
    { pregunta: "Chi paga l'assicurazione contro gli infortuni professionali?", respuesta: "I premi per gli infortuni e le malattie professionali sono a carico del datore di lavoro. Il premio per gli infortuni non professionali è a carico del dipendente, salvo accordi più favorevoli." },
    { pregunta: "Il datore di lavoro deve pagare metà della cassa pensioni?", respuesta: "Deve pagare almeno quanto tutti i suoi dipendenti insieme. Può pagare di più, se è d'accordo." },
    { pregunta: "Che cosa manca in questo calcolo?", respuesta: "Le spese di amministrazione della cassa di compensazione AVS, i contributi previsti da un contratto collettivo di lavoro e le prestazioni volontarie. Verificali nei tuoi contratti." },
  ],
  glosario: [
    { termino: "CAF", definicion: "Cassa di compensazione per assegni familiari. Versa gli assegni familiari e riscuote per questo contributi sui salari." },
    { termino: "AIP", definicion: "Assicurazione contro gli infortuni professionali. Il premio è a carico del datore di lavoro." },
  ],
});
