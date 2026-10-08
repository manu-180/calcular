import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.gratificacion",
  h1: "Calculadora de gratificación legal 2026",
  title: "Gratificación legal 2026: calcula tu monto y el tope",
  description:
    "Calcula tu gratificación legal mensual y anual: {{cl.gratificacion-porcentaje}} de tu remuneración con tope de {{cl.gratificacion-tope}} al año. Con el ingreso mínimo vigente de {{cl.imm}}.",
  intro: [
    "La gratificación legal del artículo 50 es el {{cl.gratificacion-porcentaje}} de tu remuneración mensual, con un tope anual de {{cl.gratificacion-tope}} (ingresos mínimos mensuales). Casi siempre se paga mes a mes.",
    "Es la parte de las utilidades de la empresa que la ley reparte entre quienes trabajan en ella. Desde mayo de 2026, el tope mensual es de $219.115.",
  ],
  comoSeCalcula: [
    "Se calcula {{cl.gratificacion-porcentaje}} de tu remuneración mensual.",
    "El tope anual es {{cl.gratificacion-tope}} por el ingreso mínimo ({{cl.imm}}). Dividido por 12 da el tope mensual.",
    "Tu gratificación mensual es el menor de los dos montos.",
    "Para el año se multiplica por los meses que trabajaste.",
  ],
  ejemplo: [
    "Con un sueldo de $1.000.000, el porcentaje legal da $250.000. Como pasa el tope mensual (unos $219.000 desde mayo de 2026), te corresponde el tope.",
    "Con el sueldo mínimo de 2026 ($553.553), el {{cl.gratificacion-porcentaje}} da $138.388 al mes, por debajo del tope.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el tope de la gratificación legal?",
      respuesta: "{{cl.gratificacion-tope}} al año, o sea un doceavo de eso al mes. Con el ingreso mínimo vigente desde mayo de 2026 son $219.115 mensuales.",
    },
    {
      pregunta: "¿Todas las empresas pagan gratificación?",
      respuesta: "La deben pagar las empresas que tienen utilidades y llevan contabilidad. Muchas la pagan igual con el sistema del artículo 50, que no depende de las utilidades.",
    },
    {
      pregunta: "¿La gratificación es imponible?",
      respuesta: "Sí. Se suma al sueldo imponible del mes y paga AFP, salud e impuesto.",
    },
    {
      pregunta: "¿Qué ingreso mínimo se usa para el tope?",
      respuesta: "Usamos el vigente a la fecha del cálculo: desde el {{cl.imm#desde}} es {{cl.imm}}. En 2026 el mínimo cambió en enero y en mayo, así que el tope de los primeros meses fue más bajo.",
    },
    {
      pregunta: "¿Es lo mismo que un aguinaldo?",
      respuesta: "No. En Chile la ley no obliga a pagar aguinaldo. El de Fiestas Patrias o Navidad depende de tu contrato o de lo que acuerde la empresa.",
    },
  ],
  glosario: [
    { termino: "Gratificación legal", definicion: "Participación de los trabajadores en las utilidades de la empresa, según los artículos 47 y 50 del Código del Trabajo." },
    { termino: "IMM", definicion: "Ingreso mínimo mensual. El sueldo más bajo que se puede pagar por una jornada completa." },
  ],
});
