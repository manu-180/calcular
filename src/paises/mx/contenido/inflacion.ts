import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.inflacion",
  h1: "Calculadora de inflación con el INPC",
  title: "Calculadora de inflación México: actualiza con el INPC",
  description:
    "Actualiza un monto en pesos con el INPC del INEGI. Elige dos meses y ve la inflación acumulada, la mensual y la anual, con el último índice publicado.",
  intro: [
    "Esta calculadora te dice cuánto vale hoy un monto del pasado. Usa el Índice Nacional de Precios al Consumidor (INPC), que mide el INEGI cada mes.",
    "El último INPC cargado es {{mx.inpc}}. Se actualiza solo cuando el INEGI publica el mes nuevo, cerca del día 9.",
  ],
  comoSeCalcula: [
    "Se toma el INPC del mes inicial y el del mes final.",
    "El factor de actualización es el INPC final dividido entre el INPC inicial.",
    "El monto actualizado es tu monto por ese factor. La inflación acumulada es el factor menos uno, en porcentaje.",
    "La inflación anual compara el mes final con el mismo mes del año anterior. La mensual lo compara con el mes previo.",
  ],
  ejemplo: [
    "1,000 pesos de agosto de 2025 equivalen a 1,032.62 pesos de agosto de 2026: el INPC pasó de 140.867 a 145.462, una inflación de 3.26 % en 12 meses.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es la inflación anual en México?",
      respuesta: "Pon como mes final el último publicado: la fila «Inflación anual (12 meses)» te da la variación contra el mismo mes del año anterior, que es la cifra que reporta el INEGI.",
    },
    {
      pregunta: "¿Sirve para el factor de actualización del SAT?",
      respuesta:
        "Usa la misma fórmula (un INPC entre otro), pero para impuestos el artículo 17-A del Código Fiscal de la Federación dice qué meses tomar. Revisa esa regla antes de elegir las fechas.",
    },
    {
      pregunta: "¿Por qué no aparece el mes actual?",
      respuesta: "Porque el INEGI publica el INPC de un mes hasta los primeros días del mes siguiente. Si eliges una fecha posterior, el cálculo llega hasta el último mes publicado y te lo avisa.",
    },
    {
      pregunta: "¿Puedo usarla para ajustar una renta o una pensión?",
      respuesta: "Sí, como referencia. Revisa tu contrato: muchos fijan el aumento con el INPC de un mes concreto o con un tope.",
    },
  ],
  glosario: [
    { termino: "INPC", definicion: "Índice Nacional de Precios al Consumidor. Mide cómo cambian los precios que pagan los hogares." },
    { termino: "Factor de actualización", definicion: "Cuántas veces creció el INPC entre dos meses. Multiplicado por un monto, lo lleva a precios del mes final." },
  ],
});
