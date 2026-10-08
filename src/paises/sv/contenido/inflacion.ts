import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.inflacion",
  h1: "Calculadora de inflación en El Salvador",
  title: "Calculadora de inflación El Salvador: actualice por IPC",
  description: "Actualice un monto en dólares con el IPC oficial del BCR y la ONEC. Vea cuánto subieron los precios entre dos meses, la inflación mensual y la interanual.",
  intro: [
    "Con esta calculadora sabe cuánto vale hoy un monto del pasado, o cuánto subieron los precios entre dos meses. Usa el Índice de Precios al Consumidor (IPC) que publican el Banco Central de Reserva (BCR) y la Oficina Nacional de Estadística y Censos (ONEC).",
    "Sirve para revisar un alquiler, comparar un salario con el costo de vida o poner al día una deuda pactada hace años.",
  ],
  comoSeCalcula: [
    "Se toma el IPC del mes del monto original y el IPC del mes al que lo quiere llevar.",
    "El monto se multiplica por el IPC de destino y se divide entre el IPC de origen. Esa proporción es el factor de actualización.",
    "La inflación entre los dos meses es el factor menos uno, expresada en porcentaje. También se muestra la inflación mensual y la interanual del mes de destino.",
    "Si el mes de destino todavía no tiene IPC publicado, se usa el último disponible y se lo indica debajo del resultado.",
  ],
  ejemplo: [
    "Un alquiler de $300 de enero de 2020 se multiplica por el IPC del mes de destino y se divide entre el IPC de enero de 2020. El resultado es lo que hoy compra lo mismo que esos $300.",
  ],
  faq: [
    {
      pregunta: "¿De dónde salen los datos?",
      respuesta: "Del IPC general que publica el BCR con la ONEC, con base diciembre de 2009 igual a 100. Se actualiza solo cuando sale el dato de cada mes.",
    },
    {
      pregunta: "¿Cada cuánto se publica el IPC?",
      respuesta: "Una vez por mes, en los primeros días del mes siguiente. Hasta que sale, la calculadora usa el último mes publicado.",
    },
    {
      pregunta: "¿Qué diferencia hay entre inflación mensual, acumulada e interanual?",
      respuesta: "La mensual compara un mes con el anterior. La interanual compara con el mismo mes del año anterior. La que se ve como inflación entre los dos meses es la acumulada en el período que usted eligió.",
    },
    {
      pregunta: "¿Puedo usarla para ajustar un contrato?",
      respuesta: "Sí, como referencia. Si el contrato dice qué índice y qué meses usar, aplique exactamente esos: el resultado cambia según el mes que se tome.",
    },
    {
      pregunta: "¿Qué pasa si elijo un mes de destino anterior al de origen?",
      respuesta: "La cuenta se hace hacia atrás y muestra cuánto valía ese dinero en el pasado.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cómo cambian los precios de una canasta de bienes y servicios que compran los hogares." },
    { termino: "Factor de actualización", definicion: "IPC del mes de destino dividido entre el IPC del mes de origen." },
  ],
});
