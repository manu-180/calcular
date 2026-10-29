import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.jubilacion-ips",
  h1: "Calculadora de jubilación del IPS",
  title: "Jubilación IPS {{anio}}: calculá cuánto vas a cobrar",
  description: "Calculá tu jubilación ordinaria del IPS: el {{py.jubilacion-ips[tasa-ordinaria]}}% del promedio de tus últimos {{py.jubilacion-ips[meses-promedio]}} meses con {{py.jubilacion-ips[edad-ordinaria]}} años de edad y {{py.jubilacion-ips[anios-ordinaria]}} de aporte.",
  intro: [
    "La jubilación ordinaria del IPS se cobra con {{py.jubilacion-ips[edad-ordinaria]}} años de edad y {{py.jubilacion-ips[anios-ordinaria]}} años de aporte. Es el {{py.jubilacion-ips[tasa-ordinaria]}}% del salario promedio de los últimos {{py.jubilacion-ips[meses-promedio]}} meses.",
    "Con {{py.jubilacion-ips[anios-anticipada]}} años de aporte te podés jubilar desde los {{py.jubilacion-ips[edad-anticipada]}}, con un porcentaje menor.",
  ],
  comoSeCalcula: [
    "Se promedian los salarios por los que aportaste en los últimos {{py.jubilacion-ips[meses-promedio]}} meses.",
    "Con {{py.jubilacion-ips[edad-ordinaria]}} años y {{py.jubilacion-ips[anios-ordinaria]}} de aporte, cobrás el {{py.jubilacion-ips[tasa-ordinaria]}}% de ese promedio.",
    "Con {{py.jubilacion-ips[anios-anticipada]}} años de aporte y {{py.jubilacion-ips[edad-anticipada]}} de edad, cobrás el {{py.jubilacion-ips[tasa-anticipada]}}%, y suma {{py.jubilacion-ips[aumento-por-anio]}} puntos por cada año que pasás de esa edad.",
    "Cada 50 semanas de aporte cuentan como un año.",
  ],
  ejemplo: ["Con 57 años, 31 de aporte y un promedio de Gs. 4.000.000, cobrás el 88 %: Gs. 3.520.000 por mes."],
  faq: [
    {
      pregunta: "¿A qué edad me jubilo en el IPS?",
      respuesta: "A los {{py.jubilacion-ips[edad-ordinaria]}} años con {{py.jubilacion-ips[anios-ordinaria]}} de aporte, o desde los {{py.jubilacion-ips[edad-anticipada]}} si tenés {{py.jubilacion-ips[anios-anticipada]}} años de aporte.",
    },
    {
      pregunta: "¿Cuánto cobro de jubilación?",
      respuesta: "El {{py.jubilacion-ips[tasa-ordinaria]}}% del promedio de tus últimos {{py.jubilacion-ips[meses-promedio]}} meses si cumplís los requisitos completos. Antes de los {{py.jubilacion-ips[edad-ordinaria]}}, entre el {{py.jubilacion-ips[tasa-anticipada]}}% y el 96 %.",
    },
    {
      pregunta: "¿Y si tengo menos de 25 años de aporte?",
      respuesta: "Con 65 años y al menos 750 semanas (15 años) podés pedir la jubilación proporcional, que el IPS calcula según tus aportes.",
    },
  ],
  glosario: [
    { termino: "Jubilación ordinaria", definicion: "La que se cobra por edad y años de aporte (artículo 60 del Decreto-Ley 1860/50, según la Ley 98/92)." },
    { termino: "Años de aporte", definicion: "El tiempo cotizado al IPS. 50 semanas equivalen a un año." },
  ],
});
