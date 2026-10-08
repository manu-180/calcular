import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.inflacion",
  h1: "Calculadora de inflación en Venezuela (INPC del BCV)",
  title: "Calculadora de inflación Venezuela: actualiza con el INPC",
  description: "Actualiza un monto en bolívares con el INPC oficial del Banco Central de Venezuela. Mira cuánto subieron los precios entre dos meses, en el mes y en el año.",
  intro: [
    "Con esta calculadora sabes cuánto vale hoy un monto en bolívares del pasado, o cuánto subieron los precios entre dos meses. Usa el Índice Nacional de Precios al Consumidor (INPC) que publica el Banco Central de Venezuela (BCV).",
    "Con la inflación de Venezuela, un monto en bolívares pierde valor en semanas. Te sirve para poner al día una deuda, un alquiler o comparar lo que ganas con lo que suben los precios.",
  ],
  comoSeCalcula: [
    "Se toma el INPC del mes del monto original y el INPC del mes al que lo quieres llevar.",
    "El monto se multiplica por el INPC de destino y se divide entre el INPC de origen. Esa proporción es el factor de actualización.",
    "La inflación entre los dos meses es el factor menos uno, en porcentaje. También ves la inflación mensual y la interanual del mes de destino.",
    "Si el BCV todavía no publicó el mes de destino, se usa el último disponible y te lo indicamos debajo del resultado.",
  ],
  ejemplo: [
    "Bs. 1.000 de diciembre de 2025 equivalen a Bs. 3.253,25 en septiembre de 2026: en esos nueve meses los precios subieron 225,3 %.",
  ],
  faq: [
    {
      pregunta: "¿De dónde salen los datos?",
      respuesta: "Del INPC que publica el Banco Central de Venezuela, con base diciembre de 2007 igual a 100. El dato de cada mes se suma solo cuando aparece en la página del BCV.",
    },
    {
      pregunta: "¿Cada cuánto publica el BCV la inflación?",
      respuesta: "Una vez por mes, en los primeros días del mes siguiente (septiembre de 2026 ya estaba publicado a comienzos de octubre). Hasta que sale, la calculadora usa el último mes publicado.",
    },
    {
      pregunta: "¿Puedo actualizar un monto de antes de octubre de 2021?",
      respuesta: "No con esta calculadora. El 1 de octubre de 2021 la moneda pasó a expresarse sin seis ceros: un bolívar de hoy equivale a un millón de los de antes. Un monto anterior primero hay que pasarlo a la moneda actual.",
    },
    {
      pregunta: "¿Qué diferencia hay entre inflación mensual, acumulada e interanual?",
      respuesta: "La mensual compara un mes con el anterior. La interanual compara con el mismo mes del año anterior. La que ves como inflación entre los dos meses es la acumulada en el período que elegiste.",
    },
    {
      pregunta: "¿Conviene actualizar por inflación o por el dólar BCV?",
      respuesta: "Depende de lo que pactaste. Si el monto quedó atado al dólar, usa la tasa del BCV. Si quieres saber cuánto poder de compra perdió en bolívares, usa la inflación.",
    },
  ],
  glosario: [
    { termino: "INPC", definicion: "Índice Nacional de Precios al Consumidor. Mide cómo cambian los precios de una canasta de bienes y servicios que compran los hogares." },
    { termino: "Factor de actualización", definicion: "INPC del mes de destino dividido entre el INPC del mes de origen." },
  ],
});
