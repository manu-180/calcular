import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.antiguedad-laboral",
  h1: "Calculadora de antigüedad laboral",
  title: "Antigüedad laboral en Paraguay: calculala con tus derechos",
  description: "Calculá tu antigüedad exacta en años, meses y días, y lo que te da: días de preaviso, vacaciones, indemnización y estabilidad. Según el Código del Trabajo.",
  intro: [
    "Tu antigüedad define cuántos días de vacaciones tenés, el preaviso, la indemnización por despido y cuándo ganás estabilidad.",
    "Poné tu fecha de ingreso y te mostramos todo junto.",
  ],
  comoSeCalcula: [
    "Se cuentan los años, meses y días desde tu ingreso, con el último día incluido.",
    "Preaviso: {{py.preaviso-dias[hasta-1]}} hasta un año, {{py.preaviso-dias[hasta-5]}} hasta cinco, {{py.preaviso-dias[hasta-10]}} hasta diez y {{py.preaviso-dias[mas-10]}} con más de diez.",
    "Vacaciones: {{py.vacaciones-dias[hasta-5]}} hasta cinco años, {{py.vacaciones-dias[hasta-10]}} hasta diez y {{py.vacaciones-dias[mas-10]}} con más de diez.",
    "Indemnización: {{py.indemnizacion-dias-por-anio}} de salario por año o fracción de más de seis meses.",
    "Estabilidad: a los {{py.estabilidad-anios}} seguidos con el mismo empleador.",
  ],
  ejemplo: ["Si entraste el 15 de abril de 2024, al 12 de octubre de 2026 tenés 2 años, 5 meses y 28 días: {{py.preaviso-dias[hasta-5]}} de preaviso y {{py.vacaciones-dias[hasta-5]}} de vacaciones."],
  faq: [
    {
      pregunta: "¿Cómo se calcula la antigüedad laboral?",
      respuesta: "Desde el primer día de trabajo hasta hoy, sin cortar por vacaciones, licencias, reposos ni el período de prueba.",
    },
    {
      pregunta: "¿El preaviso cuenta para la antigüedad?",
      respuesta: "Sí, si trabajaste durante ese tiempo.",
    },
    {
      pregunta: "¿Qué cambia a los 5 y a los 10 años?",
      respuesta: "Pasados los cinco años suben las vacaciones a {{py.vacaciones-dias[hasta-10]}} y el preaviso a {{py.preaviso-dias[hasta-10]}}. A los diez ganás estabilidad, y pasados los diez las vacaciones son {{py.vacaciones-dias[mas-10]}}.",
    },
  ],
  glosario: [
    { termino: "Antigüedad", definicion: "El tiempo de servicio continuo con el mismo empleador." },
    { termino: "Estabilidad", definicion: "La protección contra el despido sin causa que se gana a los diez años." },
  ],
});
