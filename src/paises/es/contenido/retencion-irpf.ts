import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.retencion-irpf",
  h1: "Calculadora de retención de IRPF {{anio}}",
  title: "Retención IRPF {{anio}}: calcula tu tipo en la nómina",
  description:
    "Calcula qué porcentaje de IRPF te tienen que retener en la nómina de {{anio}} con el procedimiento de la Agencia Tributaria. Con hijos, edad y tipo de contrato.",
  intro: [
    "La retención de IRPF es el porcentaje de tu sueldo que la empresa se queda cada mes y entrega a Hacienda a cuenta de tu declaración de la renta.",
    "No es un porcentaje fijo: depende de lo que ganas, de lo que cotizas y de tu familia. Esta calculadora sigue el algoritmo que publica la Agencia Tributaria para 2026.",
  ],
  comoSeCalcula: [
    "A tu sueldo bruto anual se le resta lo que cotizas a la Seguridad Social y {{es.irpf-otros-gastos}} de otros gastos deducibles.",
    "Si tu rendimiento neto es bajo, se resta además la reducción por rendimientos del trabajo, que llega a {{es.irpf-reduccion-trabajo[maxima]}}.",
    "Al resultado (la base) se le aplica la escala de retención por tramos: cada tramo de la base paga un porcentaje más alto que el anterior.",
    "Se calcula también la escala sobre tu mínimo personal y familiar: {{es.irpf-minimo-contribuyente[general]}} por ti, más lo que corresponda por hijos y por edad. Esa cantidad se resta.",
    "La cuota se divide entre el sueldo bruto y se trunca a dos decimales. En contratos de menos de un año el tipo mínimo es del {{es.irpf-tipo-minimo-temporal}}.",
  ],
  ejemplo: [
    "La propia Agencia Tributaria pone este caso: 28.500 euros brutos al año con unos 1.700 euros de cotizaciones. La base queda en 24.800 euros y la cuota en 4.551 euros.",
    "El tipo de retención es del 15,96 % y la retención del año, 4.548,60 euros.",
  ],
  faq: [
    {
      pregunta: "¿Qué porcentaje de IRPF me corresponde con 30.000 euros?",
      respuesta: "Sin hijos y con contrato indefinido, alrededor del 16,4 %. Con hijos o con un cónyuge a cargo baja, porque el mínimo familiar es mayor.",
    },
    {
      pregunta: "¿Puedo pedir que me retengan más?",
      respuesta: "Sí. Puedes pedir por escrito a tu empresa un tipo más alto que el calculado. Nunca uno más bajo.",
    },
    {
      pregunta: "¿Por qué me cambia el tipo de IRPF a mitad de año?",
      respuesta: "La empresa tiene que regularizarlo si cambia tu sueldo o tu familia, por ejemplo al nacer un hijo o al pasar de temporal a indefinido.",
    },
    {
      pregunta: "¿La retención es lo que pago de IRPF?",
      respuesta: "Es un pago a cuenta. En la declaración de la renta se calcula el impuesto real con la escala de tu comunidad y te devuelven o te cobran la diferencia.",
    },
  ],
  glosario: [
    { termino: "IRPF", definicion: "Impuesto sobre la Renta de las Personas Físicas." },
    { termino: "Mínimo personal y familiar", definicion: "Parte de tus ingresos que no paga IRPF porque la ley la considera necesaria para vivir. Sube con hijos, edad o discapacidad." },
    { termino: "Modelo 145", definicion: "Formulario con el que comunicas a tu empresa tu situación familiar para que calcule bien la retención." },
  ],
});
