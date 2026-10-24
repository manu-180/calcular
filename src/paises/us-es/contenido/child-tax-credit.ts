import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.child-tax-credit",
  h1: "Calculadora del crédito tributario por hijos",
  title: "Crédito tributario por hijos 2026: {{us.ctc-amount}} por hijo",
  description: "Calcule su crédito tributario por hijos de 2026: {{us.ctc-amount}} por hijo menor de 17, hasta {{us.actc-max}} reembolsable, y {{us.odc-amount}} por otros dependientes.",
  intro: [
    "El crédito tributario por hijos baja su impuesto federal por cada hijo menor de 17 años. Si el crédito es mayor que su impuesto, una parte puede volver como reembolso.",
    "Indique sus hijos, sus ingresos y su impuesto para ver cuánto del crédito recibe.",
  ],
  comoSeCalcula: [
    "Empiece con {{us.ctc-amount}} por cada hijo que califica y {{us.odc-amount}} por cada otro dependiente.",
    "Si su MAGI pasa de {{us.ctc-threshold[other]}} ({{us.ctc-threshold[mfj]}} en una declaración conjunta), el crédito baja {{us.ctc-phaseout-rate}} del exceso, redondeado hacia arriba a los siguientes $1,000.",
    "El crédito primero reduce su impuesto sobre el ingreso. Lo que sobra se puede reembolsar como crédito tributario adicional por hijos, hasta {{us.actc-max}} por hijo.",
    "La parte reembolsable no puede ser mayor que el {{us.actc-rate}} de su ingreso del trabajo por encima de {{us.actc-earned-income-floor}}.",
  ],
  ejemplo: [
    "Un matrimonio con dos hijos, $80,000 de ingresos y $3,000 de impuesto antes de créditos recibe los $4,400 completos. $3,000 eliminan su impuesto y $1,400 vuelven en su reembolso.",
  ],
  faq: [
    { pregunta: "¿De cuánto es el crédito tributario por hijos en 2026?", respuesta: "{{us.ctc-amount}} por hijo que califica menor de 17 años. Hasta {{us.actc-max}} por hijo es reembolsable si su impuesto es demasiado bajo para usarlo todo." },
    { pregunta: "¿Quién cuenta como hijo que califica?", respuesta: "Un hijo, hija, hijastro, hijo de crianza, hermano o un descendiente de alguno de ellos, menor de 17 años al final del año, que vivió con usted más de la mitad del año y no aportó más de la mitad de su propio sustento." },
    { pregunta: "¿Recibo el crédito si no debo impuestos?", respuesta: "En parte. Necesita al menos {{us.actc-earned-income-floor}} de ingreso del trabajo, y el reembolso se limita al {{us.actc-rate}} de lo que gane por encima de eso, hasta {{us.actc-max}} por hijo." },
  ],
  glosario: [
    { termino: "Crédito no reembolsable", definicion: "Un crédito que puede bajar su impuesto a cero pero no más." },
    { termino: "Crédito tributario adicional por hijos (ACTC)", definicion: "La parte reembolsable del crédito tributario por hijos." },
    { termino: "Crédito por otros dependientes", definicion: "Un crédito no reembolsable más chico para dependientes que no califican para el crédito por hijos." },
  ],
});
