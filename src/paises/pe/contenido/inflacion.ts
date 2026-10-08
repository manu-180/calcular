import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.inflacion",
  h1: "Calculadora de inflación con el IPC del INEI",
  title: "Calculadora de inflación Perú: actualiza con el IPC",
  description:
    "Actualiza un monto en soles con el IPC de Lima Metropolitana del INEI. Elige dos meses y ve la inflación acumulada, la mensual y la de 12 meses.",
  intro: [
    "Esta calculadora te dice cuánto vale hoy un monto del pasado. Usa el Índice de Precios al Consumidor de Lima Metropolitana, que calcula el INEI y publica también el BCRP.",
    "El último IPC cargado es {{pe.ipc}}. Se actualiza solo cuando sale el mes nuevo, el primer día del mes siguiente.",
  ],
  comoSeCalcula: [
    "Se toma el IPC del mes inicial y el del mes final.",
    "El factor de actualización es el IPC final dividido entre el IPC inicial.",
    "El monto actualizado es tu monto por ese factor. La inflación acumulada es el factor menos uno, en porcentaje.",
    "La inflación de 12 meses compara el mes final con el mismo mes del año anterior. La mensual lo compara con el mes previo.",
  ],
  ejemplo: [
    "S/ 1,000 de agosto de 2025 equivalen a S/ 1,044.38 de agosto de 2026: una inflación de 4.44 % en 12 meses.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es la inflación en el Perú?",
      respuesta: "Pon como mes final el último publicado: la fila «Inflación anual (12 meses)» es la cifra que reportan el INEI y el BCRP.",
    },
    {
      pregunta: "¿Por qué se usa el IPC de Lima?",
      respuesta: "Porque es el índice que el INEI y el BCRP toman como inflación oficial del país. Hay índices para otras ciudades, pero no los usamos aquí.",
    },
    {
      pregunta: "¿Por qué no aparece el mes actual?",
      respuesta: "Porque el IPC de un mes sale el primer día del mes siguiente. Si eliges una fecha posterior, el cálculo llega hasta el último mes publicado y te lo avisa.",
    },
    {
      pregunta: "¿Sirve para actualizar una deuda o un alquiler?",
      respuesta: "Sí, como referencia. Si un contrato o una sentencia fijan otro índice u otra fecha, usa esa regla.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cómo cambian los precios que pagan los hogares." },
    { termino: "Factor de actualización", definicion: "Cuántas veces creció el IPC entre dos meses. Multiplicado por un monto, lo lleva a precios del mes final." },
  ],
});
