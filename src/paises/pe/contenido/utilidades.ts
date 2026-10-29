import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.utilidades",
  h1: "Calculadora de utilidades para trabajadores",
  title: "Utilidades {{anio}}: calcula cuánto te toca",
  description:
    "Calcula tus utilidades según la actividad de la empresa ({{pe.utilidades-por-actividad[otras]}} a {{pe.utilidades-por-actividad[industrial]}} de la renta), tus días y tus remuneraciones. Con el tope legal.",
  intro: [
    "Si trabajas en una empresa privada con más de {{pe.minimo-trabajadores-utilidades}} trabajadores que tuvo ganancias, te toca una parte de las utilidades. El porcentaje depende de la actividad de la empresa.",
    "Con los datos de tu liquidación de utilidades (o los que te dé tu empresa) calculamos tu parte por días trabajados y por remuneraciones.",
  ],
  comoSeCalcula: [
    "La empresa reparte un porcentaje de su renta antes de impuestos: {{pe.utilidades-por-actividad[pesquera]}} si es pesquera, de telecomunicaciones o industrial; {{pe.utilidades-por-actividad[minera]}} si es minera, comercial o restaurante; y {{pe.utilidades-por-actividad[otras]}} en las demás actividades.",
    "La mitad de ese monto se reparte según los días que trabajó cada uno: el monto se divide entre los días de todos y se multiplica por tus días.",
    "La otra mitad se reparte según las remuneraciones: se divide entre lo que cobraron todos en el año y se multiplica por lo que cobraste tú.",
    "Lo que te toca no puede pasar de {{pe.tope-utilidades}} sueldos mensuales vigentes al cierre del año.",
  ],
  ejemplo: [
    "Una empresa comercial ganó S/ 1,000,000 y reparte el 8 %: S/ 80,000. Si trabajaste 360 de los 18,000 días de todos y cobraste S/ 36,000 de S/ 1,500,000, te tocan S/ 800 más S/ 960: S/ 1,760.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo pagan las utilidades?",
      respuesta: "Dentro de los 30 días siguientes al vencimiento de la declaración anual del impuesto a la renta. Por eso suelen pagarse entre abril y mayo.",
    },
    {
      pregunta: "¿Qué empresas no reparten utilidades?",
      respuesta: "Las que no tienen más de {{pe.minimo-trabajadores-utilidades}} trabajadores en promedio en el año, las cooperativas, las empresas autogestionarias y las sociedades civiles.",
    },
    {
      pregunta: "¿Me tocan utilidades si renuncié o me despidieron?",
      respuesta: "Sí, por el tiempo que trabajaste ese año. La empresa te tiene que pagar aunque ya no estés.",
    },
    {
      pregunta: "¿Qué pasa con lo que supera el tope?",
      respuesta: "No se reparte entre los demás trabajadores. Ese remanente va a un fondo para capacitación y promoción del empleo.",
    },
  ],
  glosario: [
    { termino: "Utilidades", definicion: "Participación de los trabajadores en la renta anual de la empresa (DL 892)." },
    { termino: "Renta antes de impuestos", definicion: "La renta neta del año sobre la que se calcula el impuesto, después de compensar pérdidas de años anteriores." },
  ],
});
