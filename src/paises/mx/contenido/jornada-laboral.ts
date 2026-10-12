import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.jornada-laboral",
  h1: "Jornada laboral de 40 horas: cuántas horas te tocan",
  title: "Jornada laboral 2026 a 2030: horas por semana y por día",
  description:
    "Mira la jornada máxima semanal de este año con la reforma de 40 horas, cuántas horas son por día y cuántas horas extra se permiten.",
  intro: [
    "La reforma a la Ley Federal del Trabajo baja la jornada máxima de 48 a 40 horas por semana. No es de golpe: baja dos horas cada 1 de enero hasta llegar a 40 en 2030.",
    "Este año la jornada máxima es de {{mx.jornada-semanal}} por semana. Escribe cuántos días trabajas para ver cuántas horas son por día.",
  ],
  comoSeCalcula: [
    "Jornada máxima de este año: {{mx.jornada-semanal}} por semana.",
    "Si repartes las horas parejo, divide entre los días que trabajas.",
    "Las horas extra dobles permitidas son {{mx.horas-extra-semana}} por semana; además puede haber hasta {{mx.horas-triples-semana}} más, que se pagan triples.",
  ],
  ejemplo: ["En 2026, con 48 horas y cinco días de trabajo, son 9.6 horas por día. En 2027 la jornada baja a 46 horas."],
  faq: [
    {
      pregunta: "¿Cuándo empieza la jornada de 40 horas?",
      respuesta: "La reforma rige desde el 1 de mayo de 2026, pero la jornada baja por escalones: 48 horas en 2026, 46 en 2027, 44 en 2028, 42 en 2029 y 40 en 2030.",
    },
    {
      pregunta: "¿Me van a bajar el sueldo por trabajar menos horas?",
      respuesta: "La reforma reduce la jornada máxima. Si tu empresa te quiere bajar el sueldo, revisa tu contrato y pide orientación en la Procuraduría Federal de la Defensa del Trabajo.",
    },
    {
      pregunta: "¿Cuántas horas extra puedo trabajar?",
      respuesta: "Este año, hasta {{mx.horas-extra-semana}} por semana pagadas al doble. Las que pasen de ese límite se pagan triples, y nunca más de {{mx.maximo-horas-dia}} de trabajo en un día.",
    },
    {
      pregunta: "¿Cuántos días de descanso me tocan?",
      respuesta: "Al menos uno por cada seis días de trabajo, con goce de sueldo.",
    },
  ],
  glosario: [{ termino: "Jornada máxima", definicion: "Horas de trabajo ordinario que la ley permite por semana, sin contar horas extra." }],
});
