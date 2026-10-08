import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.retencion-en-la-fuente",
  h1: "Calculadora de retención en la fuente por salarios 2026",
  title: "Retención en la fuente por salarios 2026: calculadora",
  description:
    "Calcula cuánto te retienen de tu salario cada mes con el procedimiento 1, la UVT de {{co.uvt}} y la tabla del artículo 383. Incluye dependientes y prepagada.",
  intro: [
    "La retención en la fuente por salarios es un anticipo del impuesto de renta que la empresa te descuenta cada mes. Se calcula con la tabla del artículo 383 del Estatuto Tributario, en UVT (hoy una UVT vale {{co.uvt}}).",
    "Esta calculadora usa el procedimiento 1, el que aplican la mayoría de empresas, y resta tus aportes, deducciones y la renta exenta de trabajo.",
  ],
  comoSeCalcula: [
    "Se parte de tus pagos laborales del mes.",
    "Se restan tus aportes obligatorios a salud y pensión, porque no pagan impuesto.",
    "Se restan las deducciones: hasta el {{co.deduccion-dependientes}} por dependientes (con tope de {{co.deduccion-dependientes-tope}} al mes) y la medicina prepagada (hasta {{co.deduccion-salud-tope}} al mes).",
    "Se resta la renta exenta de trabajo: el {{co.renta-exenta-trabajo}} de lo que queda, con un tope de {{co.renta-exenta-trabajo-tope}} al año.",
    "Deducciones y rentas exentas juntas no pueden pasar del {{co.limite-beneficios}} ni de {{co.limite-beneficios-tope}} al año. Los topes anuales se dividen por 12 para el mes.",
    "La base que queda se pasa a UVT ({{co.uvt}}) y se aplica la tabla del artículo 383. El resultado en UVT se vuelve a pasar a pesos.",
  ],
  ejemplo: [
    "Con pagos de $8.000.000 al mes en 2026 y sin dependientes, se restan $720.000 de aportes y $1.820.000 de renta exenta. La base queda en unas 104 UVT y la retención del mes es de $92.049.",
  ],
  faq: [
    {
      pregunta: "¿Desde qué salario me hacen retención en la fuente?",
      respuesta: "Depende de tus deducciones. Hay retención cuando la base que queda, después de restar aportes, deducciones y la renta exenta, pasa del primer tramo de la tabla del artículo 383, que no paga nada.",
    },
    {
      pregunta: "¿Qué es el procedimiento 1?",
      respuesta: "Es el cálculo mes a mes con los pagos de ese mes. El procedimiento 2 usa un porcentaje fijo que se calcula dos veces al año.",
    },
    {
      pregunta: "¿Quién cuenta como dependiente?",
      respuesta:
        "Tus hijos de hasta 18 años, tus hijos de 18 a 25 años si les pagas la educación superior, y tu pareja o tus padres si dependen de ti, entre otros casos (artículo 387 del Estatuto Tributario). Le entregas los soportes a la empresa.",
    },
    {
      pregunta: "¿Puedo pedir que me retengan más?",
      respuesta: "Sí. Puedes pedirle a la empresa por escrito una tarifa más alta. Se aplica desde el mes siguiente (artículo 383, parágrafo 3).",
    },
    {
      pregunta: "¿La retención es lo mismo que el impuesto de renta?",
      respuesta: "No. Es un anticipo. En tu declaración de renta se descuenta lo que ya te retuvieron.",
    },
  ],
  glosario: [
    { termino: "UVT", definicion: "Unidad de Valor Tributario. Hoy vale {{co.uvt}}." },
    { termino: "Renta exenta", definicion: "Parte de tu ingreso que la ley libera del impuesto." },
    { termino: "Deducción", definicion: "Un gasto que la ley te deja restar de la base, como los dependientes o la medicina prepagada." },
  ],
});
