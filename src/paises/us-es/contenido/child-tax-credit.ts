import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.child-tax-credit",
  h1: "Calculadora del crédito tributario por hijos",
  title: "Crédito tributario por hijos {{anio}}: {{us.ctc-amount}} por hijo",
  description: "Calcula tu crédito tributario por hijos de {{anio}}: {{us.ctc-amount}} por hijo menor de 17, hasta {{us.actc-max}} reembolsable, y {{us.odc-amount}} por otros dependientes.",
  intro: [
    "El crédito tributario por hijos baja tu impuesto federal por cada hijo menor de 17 años. Si el crédito es mayor que tu impuesto, una parte puede volver como reembolso.",
    "Escribe cuántos hijos tienes, tus ingresos y tu impuesto para ver cuánto del crédito recibes.",
  ],
  comoSeCalcula: [
    "Se empieza con {{us.ctc-amount}} por cada hijo que califica y {{us.odc-amount}} por cada otro dependiente.",
    "Si tu MAGI pasa de {{us.ctc-threshold[other]}} ({{us.ctc-threshold[mfj]}} en una declaración conjunta), el crédito baja {{us.ctc-phaseout-rate}} del exceso, redondeado hacia arriba a los siguientes $1,000.",
    "El crédito primero reduce tu impuesto sobre el ingreso. Lo que sobra se puede reembolsar como crédito tributario adicional por hijos, hasta {{us.actc-max}} por hijo.",
    "La parte reembolsable no puede ser mayor que el {{us.actc-rate}} de tu ingreso del trabajo por encima de {{us.actc-earned-income-floor}}.",
  ],
  ejemplo: [
    "Un matrimonio con dos hijos, $80,000 de ingresos y $3,000 de impuesto antes de créditos recibe los $4,400 completos. $3,000 eliminan su impuesto y $1,400 vuelven en su reembolso.",
  ],
  faq: [
    { pregunta: "¿De cuánto es el crédito tributario por hijos en 2026?", respuesta: "{{us.ctc-amount}} por hijo que califica menor de 17 años. Hasta {{us.actc-max}} por hijo es reembolsable si tu impuesto es demasiado bajo para usarlo todo." },
    { pregunta: "¿Quién cuenta como hijo que califica?", respuesta: "Un hijo, hija, hijastro, hijo de crianza, hermano o un descendiente de alguno de ellos, menor de 17 años al final del año, que vivió contigo más de la mitad del año y no aportó más de la mitad de su propio sustento." },
    { pregunta: "¿Recibo el crédito si no debo impuestos?", respuesta: "En parte. Necesitas al menos {{us.actc-earned-income-floor}} de ingreso del trabajo, y el reembolso se limita al {{us.actc-rate}} de lo que ganes por encima de eso, hasta {{us.actc-max}} por hijo." },
  ],
  glosario: [
    { termino: "Crédito no reembolsable", definicion: "Un crédito que puede bajar tu impuesto a cero pero no más." },
    { termino: "Crédito tributario adicional por hijos (ACTC)", definicion: "La parte reembolsable del crédito tributario por hijos." },
    { termino: "Crédito por otros dependientes", definicion: "Un crédito no reembolsable menor para dependientes que no califican para el crédito por hijos." },
  ],
});
