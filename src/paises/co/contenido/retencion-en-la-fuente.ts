import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.retencion-en-la-fuente",
  h1: "Calculadora de retención en la fuente por salarios",
  title: "Retención en la fuente 2026: calcula la de tu salario",
  description:
    "Calcula la retención en la fuente de tu salario con el procedimiento 1, la UVT de {{co.uvt}} y la tabla del artículo 383 del Estatuto Tributario.",
  intro: [
    "La retención en la fuente es un descuento que la empresa le paga a la DIAN como anticipo de tu impuesto de renta.",
    "Esta calculadora usa el procedimiento 1, que es el que aplican la mayoría de empresas cada mes.",
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
    "Con pagos de $8.000.000 al mes y sin dependientes, se restan $720.000 de aportes y $1.820.000 de renta exenta. La base queda en unas 104 UVT y la retención del mes es de $92.049.",
  ],
  faq: [
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
    { termino: "UVT", definicion: "Unidad de Valor Tributario. En 2026 vale {{co.uvt}}." },
    { termino: "Renta exenta", definicion: "Parte de tu ingreso que la ley libera del impuesto." },
    { termino: "Deducción", definicion: "Un gasto que la ley te deja restar de la base, como los dependientes o la medicina prepagada." },
  ],
});
