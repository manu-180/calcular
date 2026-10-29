import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.prima-anual",
  h1: "Calculadora de prima anual",
  title: "Prima anual Bolivia {{anio}}: calcule cuánto le toca",
  description: "Calcule su prima anual por utilidades: un sueldo por gestión o sus duodécimas, y el reparto cuando el {{bo.prima-utilidades}} de las utilidades no alcanza.",
  intro: [
    "Si la empresa tuvo utilidades en la gestión, debe pagar a su personal una prima anual equivalente a un mes de sueldo. Si no trabajó todo el año, cobra la parte proporcional.",
    "Escriba su sueldo y el tiempo que trabajó. Si conoce la utilidad de la empresa, puede ver si el fondo alcanza.",
  ],
  comoSeCalcula: [
    "Gestión completa: un sueldo mensual.",
    "Gestión incompleta: un doceavo del sueldo por cada mes y 1/360 por cada día.",
    "Hay que haber trabajado más de {{bo.prima-meses-minimos[empleado]}} seguidos (empleados) o más de {{bo.prima-meses-minimos[obrero]}} (obreros).",
    "La empresa destina el {{bo.prima-utilidades}} de sus utilidades a las primas. Si ese fondo no alcanza para un sueldo a cada uno, se reparte en partes iguales.",
  ],
  faq: [
    {
      pregunta: "¿La prima anual es obligatoria?",
      respuesta: "Sí, para las empresas de industria y comercio que tuvieron utilidades en la gestión. Las que no llevan contabilidad para demostrar pérdidas también la pagan.",
    },
    {
      pregunta: "¿Cuándo se paga la prima?",
      respuesta: "Después del cierre de la gestión y del balance, cuando se conocen las utilidades. El Ministerio de Trabajo pide presentar la planilla de primas cada año.",
    },
    {
      pregunta: "¿Qué pasa si las utilidades no alcanzan?",
      respuesta: "Si el {{bo.prima-utilidades}} de las utilidades no cubre un sueldo para cada trabajador, ese fondo se divide en partes iguales entre todo el personal.",
    },
    {
      pregunta: "¿Es lo mismo que el aguinaldo?",
      respuesta: "No. El aguinaldo se paga siempre en diciembre. La prima depende de que la empresa haya tenido utilidades.",
    },
  ],
  glosario: [
    { termino: "Prima anual", definicion: "Pago de un sueldo por gestión cuando la empresa tiene utilidades." },
    { termino: "Duodécimas", definicion: "Un doceavo del sueldo por cada mes trabajado." },
    { termino: "Gestión", definicion: "El año fiscal de la empresa." },
  ],
});
