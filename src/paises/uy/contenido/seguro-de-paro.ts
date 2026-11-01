import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.seguro-de-paro",
  h1: "Calculadora del seguro de paro",
  title: "Seguro de paro {{anio}}: cuánto cobrás cada mes",
  description:
    "Calculá tu seguro de paro (subsidio por desempleo) mes a mes: porcentajes de ley, topes del BPS de {{anio}} y el 20 % extra si tenés familia a cargo.",
  intro: [
    "El seguro de paro (en la ley, subsidio por desempleo) lo paga el BPS cuando te despiden o te suspenden. Se calcula sobre lo que cobraste en los últimos seis meses y baja mes a mes.",
    "Elegí si fue despido o suspensión, cómo cobrabas y tu promedio. Te mostramos cuánto cobrás cada mes y el total.",
  ],
  comoSeCalcula: [
    "Despido, mensuales: {{uy.paro-porcentajes[1]}} del promedio el primer mes, {{uy.paro-porcentajes[2]}} el segundo, {{uy.paro-porcentajes[3]}}, {{uy.paro-porcentajes[4]}}, {{uy.paro-porcentajes[5]}} y {{uy.paro-porcentajes[6]}} el sexto.",
    "Despido, jornaleros: el total de los seis meses se divide entre {{uy.paro-divisor-jornal}} para sacar el jornal. Se cobran {{uy.paro-jornales[1]}} el primer mes y bajan hasta {{uy.paro-jornales[6]}} el sexto.",
    "Cada mes tiene un tope: {{uy.paro-topes[1]}} el primero y {{uy.paro-topes[6]}} el sexto. Nadie cobra menos de {{uy.paro-minimo}} con jornada completa.",
    "Suspensión: {{uy.paro-suspension}} del promedio (o {{uy.paro-suspension-jornales}} por mes si sos jornalero), hasta cuatro meses y con tope de {{uy.paro-tope-suspension}}.",
    "Si tenés cónyuge, hijos u otros familiares a cargo, se suma un {{uy.paro-suplemento}}, también sobre los topes.",
  ],
  ejemplo: [
    "Con un promedio de $ 60.000, despedido y sin familia a cargo: $ 39.600 el primer mes y $ 24.000 el sexto. En total, $ 180.000 nominales.",
  ],
  faq: [
    {
      pregunta: "¿Qué porcentaje del sueldo cobro en el seguro de paro?",
      respuesta: "Si te despidieron y sos mensual, {{uy.paro-porcentajes[1]}} el primer mes y baja hasta {{uy.paro-porcentajes[6]}} el sexto. Si te suspendieron, {{uy.paro-suspension}} todos los meses.",
    },
    {
      pregunta: "¿Cuánto es el máximo del seguro de paro en 2026?",
      respuesta: "Por despido, {{uy.paro-topes[1]}} el primer mes y {{uy.paro-topes[6]}} el sexto. Por suspensión, {{uy.paro-tope-suspension}} por mes. Con familia a cargo se le suma el {{uy.paro-suplemento}}.",
    },
    {
      pregunta: "¿Cuánto tiempo dura?",
      respuesta: "Seis meses por despido y cuatro por suspensión. Si te despiden con 50 años o más, se extiende seis meses.",
    },
    {
      pregunta: "¿Qué necesito para tener derecho?",
      respuesta: "Los mensuales, 180 días en planilla en los últimos 12 meses. Los jornaleros, además, 150 jornales trabajados.",
    },
    {
      pregunta: "¿Puedo cobrar el seguro de paro si renuncio?",
      respuesta: "No. Solo corresponde por despido, suspensión o reducción del trabajo. Tampoco si te despiden por razones disciplinarias.",
    },
    {
      pregunta: "¿Le descuentan aportes al seguro de paro?",
      respuesta: "Sí. El BPS retiene el aporte personal y el Fonasa, así mantenés la mutualista mientras lo cobrás.",
    },
  ],
  glosario: [
    { termino: "Subsidio por desempleo", definicion: "El nombre legal del seguro de paro. Lo paga el BPS." },
    { termino: "Suspensión total", definicion: "El empleador te deja sin trabajo por un tiempo sin despedirte." },
    { termino: "Jornal", definicion: "Lo que se cobra por un día de trabajo." },
  ],
});
