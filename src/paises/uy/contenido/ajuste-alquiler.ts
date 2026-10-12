import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.ajuste-alquiler",
  h1: "Calculadora de ajuste de alquiler por IPC",
  title: "Ajuste de alquiler por IPC en Uruguay",
  description:
    "Calculá el nuevo alquiler con la inflación del IPC del INE, mes contra mes. Poné el alquiler y las fechas de ajuste: te damos el monto nuevo y el aumento.",
  intro: [
    "La mayoría de los contratos de alquiler se ajustan una vez por año con la inflación. Acá hacés esa cuenta con el IPC oficial del INE.",
    "Escribí el alquiler actual, el mes del último ajuste y el del nuevo. Te mostramos el alquiler nuevo y cuánto sube.",
  ],
  comoSeCalcula: [
    "Tomamos el IPC del mes anterior a cada ajuste, porque es el último publicado cuando toca ajustar. El último que tenemos es {{uy.ipc}}.",
    "El alquiler nuevo es el actual por el IPC de llegada dividido el IPC de partida.",
    "Si el INE todavía no publicó el IPC que hace falta, usamos el último disponible y te avisamos.",
  ],
  ejemplo: ["Un alquiler de $ 30.000 que se ajusta en octubre de 2026 usa el IPC de setiembre de 2025 y el de setiembre de 2026: sube 4,68 % y queda en $ 31.402,80."],
  faq: [
    {
      pregunta: "¿Cómo se ajusta un alquiler por IPC?",
      respuesta: "Se multiplica el alquiler por la variación del IPC entre el mes del último ajuste y el del nuevo. Por costumbre se usa el IPC del mes anterior, que es el último publicado.",
    },
    {
      pregunta: "¿Cada cuánto se puede ajustar?",
      respuesta: "Lo que diga el contrato. Lo más común es una vez por año, pero puede ser cada seis meses.",
    },
    {
      pregunta: "¿Qué pasa si mi contrato dice UI o coeficiente de alquileres?",
      respuesta: "Entonces la cuenta es otra. Para la UI usá el conversor de UI a pesos. El coeficiente oficial lo fija un decreto cada mes.",
    },
    {
      pregunta: "¿De dónde sale el IPC?",
      respuesta: "Del Instituto Nacional de Estadística (INE), que lo publica en los primeros días de cada mes.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de los Precios del Consumo. Mide la inflación." },
    { termino: "Ajuste", definicion: "La suba del alquiler que prevé el contrato." },
  ],
});
