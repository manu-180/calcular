import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.impuesto-global-complementario",
  h1: "Calculadora de impuesto global complementario",
  title: "Impuesto global complementario: estima tu Operación Renta",
  description:
    "Estima tu impuesto global complementario con la tabla anual en UTA del artículo 52 de la Ley de la Renta, y compáralo con lo que ya te retuvieron.",
  intro: [
    "El impuesto global complementario es el impuesto anual de las personas. Se declara en abril, en la Operación Renta, y suma todas tus rentas del año: sueldos de uno o más empleadores, honorarios y otras.",
    "Si durante el año te retuvieron más de lo que corresponde, el SII te devuelve la diferencia. Si te retuvieron menos, pagas el saldo.",
  ],
  comoSeCalcula: [
    "Tu renta anual se pasa a UTA (12 veces la UTM).",
    "Se aplica la tabla por tramos: exento hasta 13,5 UTA y tasas de 4 % a 40 % sobre lo que pasa cada límite.",
    "El impuesto se compara con lo que ya pagaste (impuesto único retenido y retenciones de honorarios) para ver si te falta pagar o te devuelven.",
  ],
  ejemplo: [
    "Con una renta anual de $30.000.000 y la UTA de octubre de 2026 ($865.812), tu renta es de 34,6 UTA y el impuesto es de $893.487. Si ya te retuvieron $600.000, te faltarían $293.487.",
  ],
  faq: [
    {
      pregunta: "¿Quién tiene que declarar global complementario?",
      respuesta: "Quien recibe honorarios, tiene más de un empleador en el año o tiene otras rentas que declarar. Si solo tuviste un sueldo con impuesto único retenido, por lo general no necesitas reliquidar.",
    },
    {
      pregunta: "¿Por qué el resultado es una estimación?",
      respuesta: "Porque la Operación Renta reajusta los montos por IPC y usa la UTA de diciembre. Además, las retenciones de honorarios también se usan para pagar tus cotizaciones, así que la devolución puede ser menor.",
    },
    {
      pregunta: "¿Es la misma tabla que el impuesto único?",
      respuesta: "Sí, tiene los mismos tramos y tasas. El impuesto único usa la UTM de cada mes y el global complementario usa la UTA del año.",
    },
    {
      pregunta: "¿Cuándo se declara?",
      respuesta: "En abril de cada año, por las rentas del año anterior, en el sitio del SII.",
    },
  ],
  glosario: [
    { termino: "UTA", definicion: "Unidad Tributaria Anual. Vale 12 UTM y se usa para la tabla del impuesto anual." },
    { termino: "Operación Renta", definicion: "Proceso anual en que las personas declaran sus rentas al SII." },
    { termino: "Tasa efectiva", definicion: "Impuesto dividido por tu renta total. Es menor que la tasa de tu tramo." },
  ],
});
