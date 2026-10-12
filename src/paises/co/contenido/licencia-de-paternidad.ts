import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.licencia-de-paternidad",
  h1: "Calculadora de licencia de paternidad",
  title: "Licencia de paternidad 2026: días y valor",
  description:
    "Calcula tu licencia de paternidad de {{co.licencia-paternidad-semanas}} semanas, proporcional a las semanas que cotizaste a salud durante el embarazo.",
  intro: [
    "La licencia de paternidad es de {{co.licencia-paternidad-semanas}} semanas pagadas. La reconoce la EPS con tu salario.",
    "La EPS la paga en proporción a las semanas que cotizaste mientras duró el embarazo. Si cotizaste todo el tiempo, recibes el valor completo.",
  ],
  comoSeCalcula: [
    "Días: {{co.licencia-paternidad-semanas}} semanas por 7.",
    "Valor completo: tu salario mensual dividido por 30, por esos días.",
    "Proporción: semanas cotizadas durante el embarazo divididas por las semanas de gestación.",
  ],
  ejemplo: [
    "Con un salario de $3.000.000 y todo el embarazo cotizado, la licencia vale $1.400.000. Si cotizaste 30 de 40 semanas, recibes el 75 %: $1.050.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días son de licencia de paternidad?",
      respuesta: "{{co.licencia-paternidad-semanas}} semanas. La ley prevé que suba hasta cinco semanas si baja el desempleo estructural, pero hoy rigen {{co.licencia-paternidad-semanas}}.",
    },
    {
      pregunta: "¿Qué documento necesito?",
      respuesta: "El registro civil de nacimiento. Tienes que presentarlo a la EPS dentro de los 30 días siguientes al nacimiento.",
    },
    {
      pregunta: "¿También aplica si adopto?",
      respuesta: "Sí. La licencia de paternidad también corresponde al padre adoptante.",
    },
  ],
  glosario: [
    { termino: "Licencia de paternidad", definicion: "Descanso pagado para el padre por el nacimiento o la adopción de un hijo." },
    { termino: "Semanas de gestación", definicion: "Cuánto duró el embarazo, contado en semanas." },
  ],
});
