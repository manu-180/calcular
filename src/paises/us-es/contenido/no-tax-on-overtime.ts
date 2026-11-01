import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.no-tax-on-overtime",
  h1: "Calculadora de horas extras sin impuestos",
  title: "Horas extras sin impuestos: tu deducción y ahorro",
  description: "Calcula tu deducción federal por horas extras que califican, hasta {{us.overtime-deduction-max[other]}} o {{us.overtime-deduction-max[mfj]}} en una declaración conjunta, y el impuesto que ahorras.",
  intro: [
    "De 2025 a 2028 puedes deducir de tu ingreso tributable federal el pago extra que ganas por horas extras, la mitad adicional del tiempo y medio.",
    "Escribe tu pago de horas extras y tus ingresos para ver cuánto puedes deducir y más o menos cuánto impuesto ahorras.",
  ],
  comoSeCalcula: [
    "Solo cuenta la prima. A tiempo y medio, es un tercio de tu pago total de horas extras.",
    "La deducción tiene un tope de {{us.overtime-deduction-max[other]}} al año, o {{us.overtime-deduction-max[mfj]}} para matrimonios con declaración conjunta.",
    "Si tu MAGI pasa de {{us.tips-overtime-threshold[other]}} ({{us.tips-overtime-threshold[mfj]}} en una declaración conjunta), el tope baja {{us.tips-overtime-phaseout-step}} por cada $1,000 completos de exceso.",
    "El impuesto ahorrado es la diferencia entre el impuesto sobre tu ingreso tributable con y sin la deducción.",
  ],
  ejemplo: [
    "Una persona soltera con $15,000 de pago por horas extras tiene una prima de $5,000. Con $63,900 de ingreso tributable en el tramo de 22%, deducirla le ahorra $1,100 de impuesto federal.",
  ],
  faq: [
    { pregunta: "¿Todo mi pago de horas extras queda libre de impuestos?", respuesta: "No. Solo se puede deducir la prima sobre tu tarifa normal, y solo baja el impuesto sobre el ingreso. El Seguro Social, Medicare y los impuestos estatales se siguen pagando." },
    { pregunta: "¿Dónde encuentro mis horas extras que califican?", respuesta: "Para 2026, los empleadores las informan en el Formulario W-2, casilla 12, con el código TT. Los contratistas independientes pueden verlas en el Formulario 1099." },
    { pregunta: "¿Tengo que detallar deducciones para tomarla?", respuesta: "No. Se reclama en el Anexo 1-A (Schedule 1-A) y funciona también con la deducción estándar." },
    { pregunta: "¿Cuentan las horas extras de un contrato sindical?", respuesta: "Solo la parte que exige la Ley de Normas Justas de Trabajo. Las horas extras adicionales que suma un contrato o una ley estatal, como las diarias o el pago doble, no califican." },
  ],
  glosario: [
    { termino: "Compensación por horas extras que califica", definicion: "El pago sobre tu tarifa normal que exige la ley federal por las horas sobre 40 en una semana laboral." },
    { termino: "MAGI", definicion: "Ingreso bruto ajustado modificado. Para la mayoría de las personas es igual al AGI." },
  ],
});
