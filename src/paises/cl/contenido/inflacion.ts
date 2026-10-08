import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.inflacion",
  h1: "Calculadora de IPC: reajusta un monto por inflación",
  title: "Calculadora IPC Chile: reajusta un monto por inflación",
  description:
    "Reajusta un monto en pesos con el IPC del INE. Elige dos meses y ve la variación acumulada, la mensual y la de 12 meses. Útil para arriendos y contratos.",
  intro: [
    "Esta calculadora te dice cuánto vale hoy un monto del pasado según la inflación. Usa el Índice de Precios al Consumidor (IPC) que publica el INE cada mes.",
    "El último IPC cargado es {{cl.ipc}} puntos. Se actualiza solo cuando sale el dato nuevo, cerca del día 8 de cada mes.",
  ],
  comoSeCalcula: [
    "Se toma el IPC del mes inicial y el del mes final.",
    "El factor de reajuste es el IPC final dividido por el IPC inicial.",
    "El monto reajustado es tu monto por ese factor. La variación acumulada es el factor menos uno, en porcentaje.",
    "La variación en 12 meses compara el mes final con el mismo mes del año anterior. La mensual lo compara con el mes previo.",
  ],
  ejemplo: [
    "500.000 pesos de agosto de 2025 equivalen a 520.661 pesos de agosto de 2026: el IPC pasó de 108,66 a 113,15 puntos, una variación de 4,1 % en 12 meses.",
  ],
  faq: [
    {
      pregunta: "¿Cómo reajusto el arriendo por IPC?",
      respuesta:
        "Pon como mes inicial el del último reajuste y como mes final el último IPC publicado. El monto reajustado es el nuevo arriendo. Revisa tu contrato: algunos usan el IPC de 12 meses o fijan otra regla.",
    },
    {
      pregunta: "¿Desde cuándo puedo calcular?",
      respuesta: "Desde enero de 2024. Ese año el INE cambió la base del IPC (2023 = 100) y el SII publica la serie nueva desde ahí. Para periodos más antiguos conviene usar la UF.",
    },
    {
      pregunta: "¿Por qué no aparece el mes actual?",
      respuesta: "Porque el IPC de un mes se publica a comienzos del mes siguiente. Si eliges una fecha posterior, el cálculo llega hasta el último mes publicado y te lo avisa.",
    },
    {
      pregunta: "¿Es lo mismo reajustar por IPC que por UF?",
      respuesta: "Casi. La UF se reajusta cada día según el IPC del mes anterior, así que los resultados se parecen pero no son idénticos.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cómo cambian los precios que pagan los hogares. Lo calcula el INE." },
    { termino: "Factor de reajuste", definicion: "Cuántas veces creció el IPC entre dos meses. Multiplicado por un monto, lo lleva a precios del mes final." },
  ],
});
