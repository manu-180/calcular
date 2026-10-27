import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.gastos-educativos",
  h1: "Calculadora de gastos educativos para el ISR",
  title: "Gastos educativos {{anio}}: calcula cuánto te devuelven",
  description: "Calcula cuánto ISR te ahorras con los gastos educativos: hasta {{do.gastos-educativos-tope-ingreso}} de tu ingreso y {{do.gastos-educativos-tope-exento}} del mínimo exento, según la Ley 30-26.",
  intro: [
    "Si pagas colegio o universidad, puedes restar esos gastos de tu ingreso para el ISR. Eso baja tu impuesto del año.",
    "La Ley 30-26 subió el tope desde el ejercicio 2026. Pon tu salario y tus gastos, y ves cuánto te devuelven.",
  ],
  comoSeCalcula: [
    "Tu ingreso del año es el salario menos AFP y SFS, por 12.",
    "Puedes deducir hasta el {{do.gastos-educativos-tope-ingreso}} de ese ingreso.",
    "Además, la deducción no pasa del {{do.gastos-educativos-tope-exento}} del monto exento del ISR ({{do.gastos-educativos-tope-discapacidad}} si los gastos son de una persona con discapacidad).",
    "La diferencia entre el ISR sin y con la deducción es lo que te devuelven.",
  ],
  ejemplo: [
    "Con un salario de RD$80,000 y RD$150,000 de colegio, puedes deducir RD$90,326.40. Tu ISR del año baja de RD$88,811.25 a RD$68,937.72: te devuelven RD$19,873.53.",
  ],
  faq: [
    { pregunta: "¿Cuánto puedo deducir de gastos educativos?", respuesta: "Hasta el {{do.gastos-educativos-tope-ingreso}} de tu ingreso gravado, sin pasar del {{do.gastos-educativos-tope-exento}} del monto exento del ISR." },
    { pregunta: "¿Qué gastos cuentan?", respuesta: "Los servicios educativos facturados por el centro con comprobante fiscal válido para crédito fiscal, tuyos o de tus dependientes que no trabajan." },
    { pregunta: "¿Cómo me devuelven el dinero si soy asalariado?", respuesta: "Declaras los gastos ante la DGII y tu empleador te compensa el saldo a favor en los meses siguientes." },
    { pregunta: "¿Cambió algo en 2026?", respuesta: "Sí. La Ley 30-26 fija el tope en el {{do.gastos-educativos-tope-exento}} del monto exento desde el ejercicio 2026, y en el {{do.gastos-educativos-tope-discapacidad}} para personas con discapacidad." },
  ],
  glosario: [
    { termino: "Deducción", definicion: "Monto que se resta del ingreso antes de calcular el impuesto." },
    { termino: "Monto exento", definicion: "La parte del ingreso anual que no paga ISR." },
  ],
});
