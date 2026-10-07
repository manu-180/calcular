import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.ptu",
  h1: "Calculadora de PTU (reparto de utilidades)",
  title: "Calculadora de PTU: cuánto te toca de utilidades",
  description:
    "Calcula tu PTU por días trabajados y por salario, con el tope de {{mx.tope-ptu-meses}} de salario y la parte exenta de {{mx.exencion-ptu}}. Ley Federal del Trabajo vigente.",
  intro: [
    "La PTU es la parte de las ganancias de la empresa que se reparte entre su personal cada año.",
    "Para calcular la tuya necesitas datos de la empresa: el monto total a repartir, la suma de días y la suma de salarios de todo el personal. Vienen en el proyecto de reparto que la empresa tiene que mostrar.",
  ],
  comoSeCalcula: [
    "El monto total se divide en dos mitades.",
    "La primera se reparte según los días trabajados: tus días entre la suma de días de todo el personal.",
    "La segunda se reparte según el salario: tu salario del año entre la suma de salarios de todo el personal.",
    "Tu PTU no puede pasar de {{mx.tope-ptu-meses}} de salario o del promedio de la PTU que recibiste en los últimos tres años. Se usa el que te convenga más.",
    "Si eres eventual, te toca PTU solo si trabajaste al menos {{mx.dias-minimos-ptu-eventual}} en el año.",
    "Hasta {{mx.exencion-ptu}} de PTU no pagan ISR. Hoy una UMA vale {{mx.uma-diaria}}.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se paga la PTU?",
      respuesta: "Dentro de los 60 días siguientes a la fecha en que la empresa tiene que pagar su impuesto anual. En la práctica, a fines de mayo si es empresa y a fines de junio si tu patrón es persona física.",
    },
    {
      pregunta: "¿A quién no le toca PTU?",
      respuesta: "A directores, administradores y gerentes generales, y a las trabajadoras y trabajadores del hogar. Tampoco a eventuales con menos de {{mx.dias-minimos-ptu-eventual}} trabajados.",
    },
    {
      pregunta: "¿Qué salario se usa?",
      respuesta: "Tu salario por cuota diaria, sin horas extra, bonos ni otras prestaciones.",
    },
    {
      pregunta: "¿Por qué no me tocó PTU?",
      respuesta: "Si la empresa no tuvo ganancias para efectos fiscales, no hay utilidades que repartir. También hay empresas exentas, como las de nueva creación en su primer año.",
    },
  ],
  glosario: [
    { termino: "PTU", definicion: "Participación de los trabajadores en las utilidades de las empresas." },
    { termino: "Proyecto de reparto", definicion: "Documento con los montos de la PTU que la empresa tiene que poner a la vista del personal." },
  ],
});
