import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.prescripcion-laboral",
  h1: "Calculadora de prescripción laboral en Nicaragua",
  title: "Prescripción laboral en Nicaragua: hasta cuándo reclamar",
  description: "En Nicaragua los reclamos laborales prescriben en {{ni.prescripcion-meses[general]}} por regla general. Calculá el último día para reclamar salarios, prestaciones o una indemnización.",
  intro: [
    "Si no reclamás a tiempo, perdés el derecho a cobrar. Eso es la prescripción.",
    "La regla general en Nicaragua es de {{ni.prescripcion-meses[general]}}. Hay plazos más cortos y uno más largo para los accidentes de trabajo.",
  ],
  comoSeCalcula: [
    "Salarios, prestaciones e indemnizaciones: {{ni.prescripcion-meses[general]}}.",
    "Indemnización por accidente de trabajo o enfermedad profesional: {{ni.prescripcion-meses[riesgo-profesional]}}.",
    "Nulidad de un contrato firmado por error, engaño o intimidación: {{ni.prescripcion-meses[nulidad]}}.",
    "Pedir el reintegro o reclamar una sanción: {{ni.prescripcion-meses[reintegro]}}.",
  ],
  ejemplo: ["Si te despidieron el 15 de marzo de 2026 y no te pagaron la liquidación, tenés hasta el 15 de marzo de 2027 para reclamar."],
  faq: [
    {
      pregunta: "¿Cuánto tiempo tengo para reclamar mi liquidación en Nicaragua?",
      respuesta: "{{ni.prescripcion-meses[general]}} desde que se pudo reclamar, por lo general desde el fin del contrato.",
    },
    {
      pregunta: "¿Cuánto tiempo tengo para pedir el reintegro?",
      respuesta: "{{ni.prescripcion-meses[reintegro]}} desde que terminó la relación laboral.",
    },
    {
      pregunta: "¿Cómo detengo el plazo?",
      respuesta: "Presentando un reclamo ante el Ministerio del Trabajo o una demanda en el juzgado. También se corta si el empleador reconoce la deuda o te paga una parte. El plazo vuelve a empezar.",
    },
    {
      pregunta: "¿El plazo corre si estoy de reposo?",
      respuesta: "No. Tampoco corre mientras estás de vacaciones o de descanso por maternidad.",
    },
  ],
  glosario: [
    { termino: "Prescripción", definicion: "La pérdida de un derecho por no reclamarlo dentro del plazo de la ley." },
    { termino: "Interrupción", definicion: "Lo que corta el plazo y lo hace empezar de cero, como presentar un reclamo." },
  ],
});
