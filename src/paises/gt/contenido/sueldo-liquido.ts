import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.sueldo-liquido",
  h1: "Calculadora de sueldo líquido en Guatemala",
  title: "Sueldo líquido en Guatemala: calcule descuentos IGSS e ISR",
  description: "Calcule su sueldo líquido: le restamos la cuota laboral del IGSS y la retención del ISR y le mostramos cuánto recibe en mano cada mes.",
  intro: [
    "El sueldo líquido en Guatemala es lo que recibe en mano después de los descuentos de ley: la cuota laboral del IGSS y la retención mensual del ISR.",
    "Escriba su salario y su bonificación. Le mostramos cada descuento y lo que le queda.",
  ],
  comoSeCalcula: [
    "Cuota del IGSS: salario × ({{gt.igss-laboral-ivs}} + {{gt.igss-laboral-ema}}). La bonificación incentivo no paga IGSS.",
    "ISR: a la renta del año (salario y bonificaciones por 12) se le restan {{gt.isr-deduccion-gastos-personales}} sin comprobantes, la deducción extraordinaria de {{gt.isr-deduccion-extraordinaria}} y las cuotas del IGSS del año. Al resto se le aplica la escala del ISR.",
    "Retención mensual: el ISR del año dividido entre 12.",
    "Sueldo líquido = salario + bonificaciones menos IGSS menos ISR.",
  ],
  ejemplo: ["Con Q20,000 de salario más Q250 de bonificación incentivo, le descuentan Q966 de IGSS y Q751.60 de ISR. Su sueldo líquido es de Q18,532.40."],
  faq: [
    {
      pregunta: "¿Cuánto me descuentan de IGSS?",
      respuesta: "La suma de {{gt.igss-laboral-ivs}} y {{gt.igss-laboral-ema}} de su salario. La bonificación incentivo no paga IGSS.",
    },
    {
      pregunta: "¿Desde qué salario se paga ISR?",
      respuesta: "Desde que la renta del año pasa las deducciones. Con las deducciones de 2026, quien gana el salario mínimo no paga ISR.",
    },
    {
      pregunta: "¿Puedo pagar menos ISR?",
      respuesta: "Sí. Si presenta la planilla del IVA con las facturas de sus gastos personales, puede restar el IVA de esas compras, con el tope que fija la ley. Su retención baja.",
    },
    {
      pregunta: "¿El aguinaldo y el Bono 14 tienen descuentos?",
      respuesta: "No pagan IGSS, y para el ISR están exentos hasta un salario cada uno. Por eso no los incluimos en esta cuenta.",
    },
  ],
  glosario: [
    { termino: "Sueldo líquido", definicion: "Lo que recibe en mano después de los descuentos." },
    { termino: "Planilla del IVA", definicion: "Declaración anual en la que el asalariado detalla sus facturas de gastos personales para pagar menos ISR." },
  ],
});
