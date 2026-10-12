import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.rop",
  h1: "Calculadora del ROP (pensión complementaria)",
  title: "ROP en Costa Rica: aportes a su pensión complementaria",
  description:
    "Calcule cuánto se deposita cada mes en su Régimen Obligatorio de Pensiones Complementarias (ROP) y cuánto suma en los años que elija.",
  intro: [
    "El ROP es una pensión adicional a la de la Caja. Se llena con aportes del patrono y con parte de lo que va al Banco Popular.",
    "Escriba su salario y le mostramos de dónde sale cada aporte y cuánto se acumula, sin contar rendimientos.",
  ],
  comoSeCalcula: [
    "Su aporte de {{cr.banco-popular-trabajador}} al Banco Popular pasa al ROP.",
    "La mitad ({{cr.rop-parte-bp-patrono}}) del aporte patronal de {{cr.banco-popular-patrono}} al Banco Popular también pasa al ROP.",
    "El patrono aporta además {{cr.rop-patrono}} de su salario directo al ROP.",
  ],
  ejemplo: ["Con un salario de ₡1.000.000 entran ₡42.500 por mes a su ROP: ₡510.000 al año."],
  faq: [
    {
      pregunta: "¿Cuánto se aporta al ROP?",
      respuesta: "En total, 4,25 % de su salario: 1 % que viene de su aporte al Banco Popular, 0,25 % del aporte patronal al Banco Popular y {{cr.rop-patrono}} que paga el patrono.",
    },
    {
      pregunta: "¿Me rebajan el ROP del salario?",
      respuesta: "No se rebaja nada aparte. El 1 % del Banco Popular ya forma parte de sus rebajos de ley.",
    },
    {
      pregunta: "¿Cuándo puedo usar el ROP?",
      respuesta: "Al pensionarse. Su operadora de pensiones le explica las formas de recibirlo.",
    },
  ],
  glosario: [
    { termino: "ROP", definicion: "Régimen Obligatorio de Pensiones Complementarias, de la Ley de Protección al Trabajador." },
    { termino: "Operadora de pensiones", definicion: "La entidad que administra su ROP y su FCL." },
  ],
});
