import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.inflacion",
  h1: "Calculadora de inflación en Costa Rica",
  title: "Calculadora de inflación Costa Rica: actualice por IPC",
  description:
    "Actualice un monto en colones con el IPC del INEC. Elija dos meses y vea la inflación acumulada, la mensual y la interanual con datos oficiales.",
  intro: [
    "Esta calculadora le dice cuánto vale hoy un monto en colones de otro mes, según el índice de precios al consumidor (IPC) del INEC.",
    "Sirve para actualizar un alquiler, una deuda entre personas o un presupuesto viejo, y para saber cuánto subieron los precios entre dos meses.",
  ],
  comoSeCalcula: [
    "Se divide el IPC del mes final entre el IPC del mes de origen. Ese cociente es el factor de actualización.",
    "El monto actualizado es el monto original por ese factor. La inflación acumulada es el factor menos uno, en porcentaje.",
    "La inflación mensual compara el mes final con el mes anterior, y la interanual con el mismo mes del año anterior.",
    "El último IPC publicado es {{cr.ipc}} (base diciembre 2020 = 100). Lo tomamos del Banco Central, que publica la serie del INEC.",
  ],
  ejemplo: [
    "₡100.000 de setiembre de 2025 equivalen a ₡100.343,14 en setiembre de 2026: los precios subieron 0,34 % en ese año.",
  ],
  faq: [
    {
      pregunta: "¿Qué es el IPC?",
      respuesta:
        "Es el índice que mide cómo cambian los precios de una canasta de bienes y servicios que compran los hogares. Lo calcula el INEC todos los meses.",
    },
    {
      pregunta: "¿Puede salir un monto menor al original?",
      respuesta: "Sí. Si entre los dos meses los precios bajaron (deflación), el monto actualizado es menor. En Costa Rica pasó varias veces entre 2025 y 2026.",
    },
    {
      pregunta: "¿Cuándo se publica el IPC de cada mes?",
      respuesta: "El INEC lo publica en los primeros días del mes siguiente. En cuanto sale, lo sumamos a la calculadora.",
    },
    {
      pregunta: "¿Sirve para actualizar un alquiler?",
      respuesta:
        "Sirve como referencia para ver cuánto subieron los precios. El aumento que corresponde lo fijan su contrato y la Ley de Arrendamientos Urbanos y Suburbanos, así que revise los dos antes de aplicarlo.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de precios al consumidor que calcula el INEC." },
    { termino: "Inflación interanual", definicion: "Variación de precios entre un mes y el mismo mes del año anterior." },
    { termino: "INEC", definicion: "Instituto Nacional de Estadística y Censos." },
  ],
});
