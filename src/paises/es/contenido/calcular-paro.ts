import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.paro",
  h1: "Calculadora del paro",
  title: "Calcular el paro {{anio}}: cuánto cobras y durante cuánto tiempo",
  description:
    "Calcula tu prestación por desempleo: cuánto cobras al mes, durante cuántos días y el total, con los topes mínimo y máximo del SEPE para {{anio}}.",
  intro: [
    "Si pierdes tu trabajo y has cotizado lo suficiente, cobras la prestación contributiva por desempleo, el paro. La paga el SEPE.",
    "Cuánto cobras depende de lo que cotizaste en los últimos seis meses. Cuánto tiempo, de lo que cotizaste en los últimos seis años.",
  ],
  comoSeCalcula: [
    "La duración sale de los días cotizados en los últimos seis años: con 360 días cotizados te corresponden {{es.paro-duracion[360]}} de paro, y con 2.160 o más, el máximo: {{es.paro-duracion[2160]}}.",
    "La base reguladora es la media de tus bases de cotización por desempleo de los últimos 180 días, sin horas extra.",
    "Los primeros 180 días cobras el {{es.paro-porcentajes[primeros-180]}} de esa base. Desde el día 181, el {{es.paro-porcentajes[desde-181]}}.",
    "El resultado no puede bajar de {{es.paro-cuantia-minima[sin-hijos]}} al mes sin hijos ({{es.paro-cuantia-minima[con-hijos]}} con hijos) ni pasar de {{es.paro-cuantia-maxima[sin-hijos]}} sin hijos, {{es.paro-cuantia-maxima[un-hijo]}} con uno y {{es.paro-cuantia-maxima[dos-o-mas]}} con dos o más.",
    "Si trabajabas a tiempo parcial, los topes se reducen en proporción a tu jornada.",
  ],
  ejemplo: [
    "Con una base media de 2.000 euros y 1.500 días cotizados, sin hijos, te corresponden 480 días de paro (16 meses).",
    "El 70 % serían 1.400 euros, pero el tope es 1.225 euros: cobras eso los primeros seis meses y 1.200 euros después. En total, 19.350 euros brutos.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto tiempo hay que trabajar para cobrar el paro?",
      respuesta: "Al menos 360 días cotizados en los últimos seis años, y que el fin del trabajo no sea voluntario.",
    },
    {
      pregunta: "¿Cuál es el paro máximo en 2026?",
      respuesta: "{{es.paro-cuantia-maxima[sin-hijos]}} al mes sin hijos, {{es.paro-cuantia-maxima[un-hijo]}} con un hijo y {{es.paro-cuantia-maxima[dos-o-mas]}} con dos o más.",
    },
    {
      pregunta: "¿Me descuentan algo del paro?",
      respuesta: "Sí. El SEPE te descuenta tu parte de la cotización a la Seguridad Social y la retención de IRPF si te corresponde.",
    },
    {
      pregunta: "¿Puedo cobrar el paro si me voy voluntariamente?",
      respuesta: "No. Hace falta estar en situación legal de desempleo: despido, fin de contrato temporal u otras causas ajenas a tu voluntad.",
    },
  ],
  glosario: [
    { termino: "Prestación contributiva", definicion: "El paro que se cobra por haber cotizado. Es distinto del subsidio, que depende de los ingresos." },
    { termino: "Base reguladora", definicion: "Media de lo que cotizaste por desempleo en los últimos 180 días." },
    { termino: "SEPE", definicion: "Servicio Público de Empleo Estatal, que reconoce y paga el paro." },
  ],
});
