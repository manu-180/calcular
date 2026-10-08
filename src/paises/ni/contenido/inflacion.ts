import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.inflacion",
  h1: "Calculadora de inflación en Nicaragua",
  title: "Calculadora de inflación Nicaragua: actualizá con el IPC",
  description: "Actualizá un monto en córdobas con el IPC oficial del INIDE. Mirá cuánto subieron los precios entre dos meses, la inflación mensual y la interanual.",
  intro: [
    "Con esta calculadora sabés cuánto vale hoy un monto en córdobas del pasado, o cuánto subieron los precios entre dos meses. Usa el Índice de Precios al Consumidor (IPC) nacional que publica el INIDE.",
    "Te sirve para revisar un alquiler, comparar tu salario con el costo de vida o poner al día una deuda de hace años.",
  ],
  comoSeCalcula: [
    "Se toma el IPC del mes del monto original y el IPC del mes al que lo querés llevar.",
    "El monto se multiplica por el IPC de destino y se divide entre el IPC de origen. Esa proporción es el factor de actualización.",
    "La inflación entre los dos meses es el factor menos uno, en porcentaje. También ves la inflación mensual y la interanual del mes de destino.",
    "Si el mes de destino todavía no tiene IPC publicado, se usa el último disponible y te lo avisamos debajo del resultado.",
  ],
  ejemplo: [
    "C$1,000 de julio de 2025 equivalen a C$1,040 en julio de 2026: en ese año los precios subieron 4 %.",
  ],
  faq: [
    {
      pregunta: "¿De dónde salen los datos?",
      respuesta: "Del IPC nacional que publica el Instituto Nacional de Información de Desarrollo (INIDE), con base 2006 igual a 100.",
    },
    {
      pregunta: "¿Cada cuánto se publica el IPC?",
      respuesta: "Una vez por mes. El INIDE lo publica unas seis semanas después de que termina el mes. Hasta que sale, la calculadora usa el último mes publicado.",
    },
    {
      pregunta: "¿Qué diferencia hay entre inflación mensual, acumulada e interanual?",
      respuesta: "La mensual compara un mes con el anterior. La interanual compara con el mismo mes del año anterior. La que ves como inflación entre los dos meses es la acumulada en el período que elegiste.",
    },
    {
      pregunta: "¿Puedo usarla para ajustar un contrato?",
      respuesta: "Sí, como referencia. Si el contrato dice qué índice y qué meses usar, aplicá exactamente esos.",
    },
    {
      pregunta: "¿Desde qué mes puedo calcular?",
      respuesta: "Desde enero de 2011. El cuadro del INIDE no trae los meses de 2008 a 2010.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cómo cambian los precios de una canasta de bienes y servicios que compran los hogares." },
    { termino: "INIDE", definicion: "Instituto Nacional de Información de Desarrollo, que calcula el IPC de Nicaragua." },
  ],
});
