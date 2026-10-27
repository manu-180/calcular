import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.salario-basico",
  h1: "Salario básico unificado {{anio}} en Ecuador",
  title: "Salario básico {{anio}} Ecuador: {{ec.sbu}} y cuánto recibes en mano",
  description: "El salario básico {{anio}} en Ecuador es {{ec.sbu}}. Mira cuánto es por día y por hora, cuánto te descuenta el IESS y lo que recibes en mano con los décimos.",
  intro: [
    "El salario básico unificado (SBU) de 2026 en Ecuador es {{ec.sbu}} al mes y rige desde el {{ec.sbu#desde}}. Es el sueldo mínimo para una jornada completa.",
    "Con esta calculadora ves cuánto vale tu día y tu hora, cuánto te descuenta el IESS y cuánto recibes si cobras los décimos cada mes.",
  ],
  comoSeCalcula: [
    "El valor del día es el salario básico dividido para 30, porque el sueldo mensual paga también el descanso semanal.",
    "El valor de la hora es el del día dividido para la jornada de {{ec.jornada-diaria}}.",
    "Del sueldo se descuenta el aporte personal al IESS: {{ec.aporte-personal-iess}}.",
    "Si cobras los décimos cada mes, se suman la doceava parte de tu sueldo (décimo tercero) y la doceava parte del salario básico (décimo cuarto).",
  ],
  ejemplo: [
    "Con el básico de 2026 y el mes completo, te descuentan $45,55 de IESS. Si cobras los décimos cada mes, suman $40,17 cada uno, y recibes $516,79.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el salario básico en Ecuador en 2026?",
      respuesta: "{{ec.sbu}} al mes, desde el {{ec.sbu#desde}}. Lo fijó el Ministerio del Trabajo en diciembre de 2025.",
    },
    {
      pregunta: "¿Cuánto es el salario básico por hora?",
      respuesta: "Se divide el básico para 30 días y luego para {{ec.jornada-diaria}}. Con el básico de 2026 da unos $2,01 la hora.",
    },
    {
      pregunta: "¿Cuánto recibo en mano con el salario básico?",
      respuesta: "Del básico te descuentan el {{ec.aporte-personal-iess}} de aporte al IESS. Si cobras los décimos cada mes, se suman a tu sueldo y recibes más que el básico. La calculadora te da el monto exacto.",
    },
    {
      pregunta: "¿A quién se aplica?",
      respuesta: "A toda persona que trabaja jornada completa en relación de dependencia. Algunas ramas tienen un mínimo sectorial más alto.",
    },
    {
      pregunta: "¿Cuándo cambia el salario básico?",
      respuesta: "Se fija cada diciembre para el año siguiente y rige desde el 1 de enero. Cuando salga el de 2027, lo actualizamos.",
    },
  ],
  glosario: [
    { termino: "SBU", definicion: "Salario básico unificado: el sueldo mínimo mensual de una jornada completa." },
    { termino: "Aporte personal", definicion: "La parte de tu sueldo que se descuenta para el IESS cada mes." },
    { termino: "Salario sectorial", definicion: "Mínimo propio de una rama de actividad. Nunca puede ser menor al básico." },
  ],
});
