import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.regimen-simple",
  h1: "Calculadora del Régimen Simple de Tributación (SIMPLE)",
  title: "Régimen Simple {{anio}}: calcula tu tarifa e impuesto",
  description:
    "Calcula el impuesto del Régimen Simple de Tributación según tus ingresos brutos del año y tu actividad, con la UVT vigente y las tarifas de la DIAN.",
  intro: [
    "El Régimen Simple de Tributación (SIMPLE) reúne en un solo pago el impuesto de renta, el de industria y comercio y otros. Se paga con una tarifa sobre los ingresos brutos.",
    "La tarifa depende de tu actividad y de cuántas UVT ingresas en el año. La UVT vale {{co.uvt}}, y para estar en el SIMPLE tienes que ingresar menos de {{co.simple-limite}}.",
  ],
  comoSeCalcula: [
    "Se pasan tus ingresos brutos del año a UVT, dividiéndolos por el valor de la UVT.",
    "Con esa cifra se busca el tramo de tu actividad en la tabla del artículo 908 del Estatuto Tributario: cada actividad tiene cuatro tramos y la tarifa sube con los ingresos.",
    "La tarifa del tramo se aplica sobre todos los ingresos brutos del año.",
    "En expendio de comidas y bebidas se suma el impuesto al consumo de {{co.simple-impoconsumo}}.",
  ],
  ejemplo: [
    "Un comercio con 300 millones de pesos de ingresos al año está por debajo de 6.000 UVT. Su tarifa es 1,6 % y el impuesto del año es de 4.800.000 pesos.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se paga el SIMPLE?",
      respuesta: "Cada dos meses pagas un anticipo con la tabla bimestral, y una vez al año presentas la declaración, donde se ajusta todo con la tarifa anual.",
    },
    {
      pregunta: "¿Quién puede estar en el Régimen Simple?",
      respuesta: "Personas naturales con empresa y sociedades cuyos socios sean personas naturales residentes en Colombia, con ingresos brutos del año anterior menores a {{co.simple-limite}}.",
    },
    {
      pregunta: "¿Hasta cuándo me puedo inscribir?",
      respuesta: "Si ya tienes RUT, hasta el último día hábil de febrero del año en que quieres estar en el SIMPLE, actualizando tu RUT.",
    },
    {
      pregunta: "¿Qué pasa si tengo varias actividades?",
      respuesta: "Se usa la tarifa más alta de todas tus actividades, con el impuesto al consumo si corresponde.",
    },
  ],
  glosario: [
    { termino: "UVT", definicion: "Unidad de Valor Tributario. La DIAN fija su valor en pesos cada año." },
    { termino: "Ingresos brutos", definicion: "Todo lo que facturas o cobras, antes de restar costos y gastos." },
  ],
});
