import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.jubilacion",
  h1: "Calculadora de jubilación del BPS",
  title: "Calcular mi jubilación en Uruguay (Ley 20.130)",
  description:
    "Estimá tu jubilación del BPS con la reforma: {{uy.jubilacion-tasa-normal}} de tu sueldo básico jubilatorio por año de servicio, y más si te jubilás después de la edad normal.",
  intro: [
    "Con la reforma jubilatoria (Ley 20.130), la jubilación del BPS se calcula con una tasa por cada año de servicio. Cuanto más trabajás y más tarde te retirás, más alta es.",
    "Poné tu año de nacimiento, la edad a la que pensás jubilarte, tus años de aportes y tu sueldo básico jubilatorio. Te mostramos una estimación por mes.",
  ],
  comoSeCalcula: [
    "Primero se calcula el sueldo básico jubilatorio: el promedio de tus 20 años de mejores sueldos, actualizados por el Índice Medio de Salarios.",
    "A la edad normal de retiro cada año de servicio vale {{uy.jubilacion-tasa-normal}} de ese sueldo. Con 30 años, el 45 %.",
    "Si te retirás más tarde, la tasa por año sube según la edad: {{uy.jubilacion-tasas[66]}} a los 66 y {{uy.jubilacion-tasas[70]}} a los 70.",
    "El resultado es la jubilación del BPS. Si aportás a una AFAP, se suma lo que te pague por tu ahorro.",
  ],
  ejemplo: ["Si naciste en 1980, te jubilás a los 65 con 30 años de servicio y tu sueldo básico jubilatorio es $ 60.000, la jubilación del BPS es el 45 %: $ 27.000 por mes."],
  faq: [
    {
      pregunta: "¿Cómo calculo mi jubilación?",
      respuesta: "Multiplicá tus años de servicio por la tasa que te toca según la edad ({{uy.jubilacion-tasa-normal}} a la edad normal) y aplicá ese porcentaje a tu sueldo básico jubilatorio.",
    },
    {
      pregunta: "¿Qué es el sueldo básico jubilatorio?",
      respuesta: "El promedio mensual de tus 20 años de mejores sueldos con aportes, actualizados. Lo calcula el BPS con tu historia laboral.",
    },
    {
      pregunta: "¿Conviene jubilarse más tarde?",
      respuesta: "Para el monto, sí: cada año más suma servicio y sube la tasa. A los 70 la tasa es {{uy.jubilacion-tasas[70]}} por año en lugar de {{uy.jubilacion-tasa-normal}}.",
    },
    {
      pregunta: "¿Sirve si me jubilo antes de 2033?",
      respuesta: "No. Hasta 2032 se aplica el régimen anterior, con otras reglas. Y entre 2033 y 2042 hay una transición que mezcla los dos regímenes, así que el resultado es aproximado.",
    },
    {
      pregunta: "¿Dónde veo mi historia laboral?",
      respuesta: "En los servicios en línea del BPS, con tu usuario personal. Ahí también está el simulador oficial.",
    },
  ],
  glosario: [
    { termino: "Primer pilar", definicion: "La jubilación que paga el BPS." },
    { termino: "AFAP", definicion: "Administradora de ahorro previsional. Paga una renta aparte con lo que ahorraste." },
    { termino: "Tasa de adquisición", definicion: "El porcentaje del sueldo básico jubilatorio que ganás por cada año de servicio." },
  ],
});
