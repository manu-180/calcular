import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.pension-ips",
  h1: "Calculadora de pensión del IPS por fallecimiento",
  title: "Pensión IPS por fallecimiento: cuánto cobra la familia",
  description: "Calculá la pensión del IPS para la viuda, el viudo y los hijos: el {{py.pension-ips[porcentaje]}}% de la jubilación. Con menos de {{py.pension-ips[semanas-minimas]}} semanas, el subsidio único.",
  intro: [
    "Cuando fallece una persona jubilada o con al menos {{py.pension-ips[semanas-minimas]}} semanas de aporte al IPS, su familia cobra una pensión. Es el {{py.pension-ips[porcentaje]}}% de la jubilación que cobraba o que le hubiera correspondido.",
    "Si tenía menos semanas, los herederos cobran una sola vez un subsidio de un salario mínimo ({{py.salario-minimo}}) por cada año de aporte.",
  ],
  comoSeCalcula: [
    "La pensión total es el {{py.pension-ips[porcentaje]}}% de la jubilación.",
    "Si hay cónyuge e hijos, la mitad es para el cónyuge y la otra mitad se reparte entre los hijos.",
    "Si hay solo cónyuge, o solo hijos, se llevan toda la pensión.",
    "Con menos de {{py.pension-ips[semanas-minimas]}} semanas, se paga un salario mínimo por cada {{py.pension-ips[semanas-por-anio]}} semanas de aporte, una sola vez.",
  ],
  ejemplo: ["Si el jubilado cobraba Gs. 5.000.000 y deja esposa y dos hijos, la pensión es de Gs. 3.000.000: Gs. 1.500.000 para la esposa y Gs. 750.000 para cada hijo."],
  faq: [
    {
      pregunta: "¿Cuánto es la pensión por viudez del IPS?",
      respuesta: "El {{py.pension-ips[porcentaje]}}% de la jubilación. Si hay hijos menores, la viuda o el viudo cobra la mitad de esa pensión.",
    },
    {
      pregunta: "¿Quiénes cobran la pensión?",
      respuesta: "La viuda, el viudo o la pareja de hecho junto con los hijos solteros menores o con incapacidad. Si no hay, los padres que vivían a su cargo.",
    },
    {
      pregunta: "¿Qué pasa si la viuda se vuelve a casar?",
      respuesta: "Pierde la pensión y cobra una sola vez el equivalente a dos años de pensión.",
    },
    {
      pregunta: "¿Y si tenía pocos aportes?",
      respuesta: "Con menos de {{py.pension-ips[semanas-minimas]}} semanas no hay pensión, salvo que haya muerto por un accidente de trabajo. Los herederos cobran un subsidio único.",
    },
  ],
  glosario: [
    { termino: "Pensión", definicion: "El pago mensual del IPS a la familia de un asegurado que falleció (artículo 62 de la Ley 98/92)." },
    { termino: "Semanas de aporte", definicion: "El tiempo cotizado al IPS. 50 semanas equivalen a un año." },
  ],
});
