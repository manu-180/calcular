import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.devolucion-irpf",
  h1: "Calculadora de devolución del IRPF",
  title: "Devolución de IRPF: calculá si te devuelven",
  description:
    "Calculá tu IRPF del año con la escala anual y la BPC de {{uy.bpc}}, y compará con lo que te retuvieron. Te decimos si te devuelven o si te falta pagar.",
  intro: [
    "Lo que te retienen de IRPF cada mes es un adelanto. Al cerrar el año se hace la cuenta con todo lo cobrado, y si te retuvieron de más, la DGI te lo devuelve.",
    "Poné lo que cobraste en el año, tus deducciones y lo que te retuvieron. Te mostramos la cuenta como la hace el BPS en el ajuste anual.",
  ],
  comoSeCalcula: [
    "A los sueldos del año, sin aguinaldo ni salario vacacional, se les aplica la escala anual en BPC. Acá no va el 6 % extra que se usa en los adelantos.",
    "Las deducciones (aportes, {{uy.irpf-deduccion-hijo}} por hijo, Fondo de Solidaridad, hipoteca) se multiplican por {{uy.irpf-deducciones-tasa-baja}} si ganaste hasta {{uy.irpf-deducciones-umbral-anual}} en el año, o por {{uy.irpf-deducciones-tasa-alta}} si ganaste más. Eso se resta.",
    "El aguinaldo y el salario vacacional pagan la tasa más alta de tu escala, siempre que el impuesto sobre los sueldos dé más que cero.",
    "Si lo retenido es más que el impuesto, la diferencia es tu devolución.",
  ],
  ejemplo: [
    "Con $ 100.000 por mes todo el año, $ 120.000 de aguinaldo y salario vacacional y $ 250.300 de aportes, el IRPF del año es $ 64.116,40. Si te retuvieron $ 70.000, te devuelven $ 5.883,60.",
  ],
  faq: [
    {
      pregunta: "¿Por qué me devuelven IRPF?",
      respuesta: "Porque los adelantos de cada mes se calculan con el 6 % extra y con el sueldo de ese mes. Si tuviste meses con menos ingresos, hijos que no declaraste o deducciones nuevas, el impuesto del año da menos.",
    },
    {
      pregunta: "¿Cómo pido la devolución?",
      respuesta: "Con la declaración jurada anual ante la DGI, en las fechas que fija cada año.",
    },
    {
      pregunta: "¿Dónde veo cuánto me retuvieron?",
      respuesta: "En tus recibos de sueldo o en los servicios en línea del BPS, en el reporte de retenciones de IRPF.",
    },
    {
      pregunta: "¿Sirve si tengo dos trabajos?",
      respuesta: "Sirve para cada trabajo por separado. Con dos empleadores la DGI suma todo y suele haber un saldo a pagar, porque cada uno te aplicó el mínimo no imponible.",
    },
  ],
  glosario: [
    { termino: "Ajuste anual", definicion: "La cuenta de diciembre que compara el impuesto del año con lo retenido." },
    { termino: "Núcleo familiar", definicion: "Una opción para tributar en pareja con escalas propias. Esta calculadora no la cubre." },
  ],
});
