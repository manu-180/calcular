import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.afp-o-onp",
  h1: "¿AFP u ONP? Compara cuánto te descuentan",
  title: "AFP u ONP {{anio}}: compara tu descuento mensual",
  description:
    "Compara el descuento de la ONP ({{pe.aporte-onp}}) con el de tu AFP: aporte de {{pe.aporte-afp}}, prima de seguro y comisión. Tasas de la SBS al día.",
  intro: [
    "En Perú tienes que aportar a un sistema de pensiones: la ONP (sistema nacional) o una AFP (sistema privado). Cada uno te descuenta distinto del sueldo.",
    "Pon tu sueldo y elige una AFP. Te mostramos cuánto te quitaría cada sistema este mes, con las comisiones y la prima que publica la SBS.",
  ],
  comoSeCalcula: [
    "En la ONP el descuento es el {{pe.aporte-onp}} de tu sueldo, sin tope.",
    "En la AFP se descuenta el {{pe.aporte-afp}} que va a tu fondo, más la prima de seguro de {{pe.prima-seguro-afp}} (solo hasta la remuneración máxima asegurable de {{pe.rma-afp}}).",
    "Si tu AFP te cobra comisión sobre el sueldo (flujo), se suma: Habitat {{pe.comision-afp[habitat]}}, Integra {{pe.comision-afp[integra]}}, Prima {{pe.comision-afp[prima]}} y Profuturo {{pe.comision-afp[profuturo]}}. Con comisión mixta, sobre el sueldo es 0 %.",
  ],
  ejemplo: [
    "Con un sueldo de S/ 3,000 en la ONP te descuentan S/ 390. En una AFP con comisión mixta, S/ 300 a tu fondo más S/ 41.10 de prima: S/ 341.10.",
  ],
  faq: [
    {
      pregunta: "¿Qué es mejor, AFP u ONP?",
      respuesta: "Depende de tu caso. La AFP guarda tus aportes en una cuenta a tu nombre que puedes heredar. La ONP paga una pensión fija si cumples los años mínimos de aporte. Esta calculadora compara solo el descuento del mes.",
    },
    {
      pregunta: "¿Cuánto es la prima de seguro de la AFP?",
      respuesta: "Es {{pe.prima-seguro-afp}} del sueldo para todas las AFP, y se cobra solo hasta la remuneración máxima asegurable de {{pe.rma-afp}}.",
    },
    {
      pregunta: "¿Qué es la comisión mixta?",
      respuesta: "Es la que tienen casi todos los afiliados desde 2013. Sobre el sueldo hoy es 0 %, y la AFP cobra una comisión anual sobre el saldo de tu fondo.",
    },
    {
      pregunta: "¿Puedo pasarme de la ONP a una AFP?",
      respuesta: "Sí, puedes afiliarte a una AFP en cualquier momento. Volver de la AFP a la ONP solo es posible en casos que la ley permite.",
    },
  ],
  glosario: [
    { termino: "ONP", definicion: "Oficina de Normalización Previsional: administra el sistema nacional de pensiones." },
    { termino: "AFP", definicion: "Administradora privada de fondos de pensiones. Guarda tus aportes en una cuenta individual." },
    { termino: "RMA", definicion: "Remuneración máxima asegurable: el tope de sueldo sobre el que se cobra la prima de seguro de la AFP." },
  ],
});
