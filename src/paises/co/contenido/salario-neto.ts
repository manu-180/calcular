import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.salario-neto",
  h1: "Calculadora de salario neto",
  title: "Salario neto 2026 en Colombia: cuánto te queda",
  description:
    "Calcula cuánto te consignan cada mes: salud {{co.salud-trabajador}}, pensión, Fondo de Solidaridad y retención en la fuente con la UVT de {{co.uvt}}.",
  intro: [
    "Tu salario neto es lo que te llega a la cuenta después de los descuentos de ley.",
    "Te descuentan salud y pensión. Si ganas más, también el Fondo de Solidaridad Pensional y la retención en la fuente. Si te corresponde, te suman el auxilio de transporte.",
  ],
  comoSeCalcula: [
    "Salud: el {{co.salud-trabajador}} de tu salario.",
    "Pensión: la cotización es del {{co.pension-cotizacion}} y a ti te toca el {{co.pension-parte-trabajador}} de ese total.",
    "Fondo de Solidaridad Pensional: si ganas varios salarios mínimos, se suma un aporte que sube con tu salario (Ley 797 de 2003).",
    "Los aportes se calculan sobre tu salario, con un piso de un salario mínimo ({{co.smmlv}}) y un tope de {{co.tope-ibc}}.",
    "Retención en la fuente: a tu salario se le restan los aportes, las deducciones y la renta exenta de trabajo del {{co.renta-exenta-trabajo}}. Lo que queda se pasa a UVT y se aplica la tabla del artículo 383 del Estatuto Tributario.",
    "Auxilio de transporte: si ganas hasta {{co.auxilio-tope}}, se suman {{co.auxilio-transporte}}.",
  ],
  ejemplo: [
    "Con un salario de $3.000.000 y los porcentajes de hoy, te descuentan $120.000 de salud y $120.000 de pensión. No tienes retención en la fuente y te suman el auxilio de transporte.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me descuentan de salud y pensión?",
      respuesta:
        "Para salud, el {{co.salud-trabajador}} de tu salario. Para pensión, el {{co.pension-parte-trabajador}} de una cotización del {{co.pension-cotizacion}}. El resto lo paga la empresa.",
    },
    {
      pregunta: "¿Desde qué salario me hacen retención en la fuente?",
      respuesta:
        "Depende de tus deducciones. La retención empieza cuando la base que queda, después de restar aportes, deducciones y la renta exenta, pasa del primer tramo de la tabla, que no paga nada.",
    },
    {
      pregunta: "¿Qué es el Fondo de Solidaridad Pensional?",
      respuesta: "Es un aporte extra que pagan quienes ganan varios salarios mínimos. Ayuda a financiar la pensión de personas con menos recursos.",
    },
    {
      pregunta: "¿Cambia algo con la reforma pensional?",
      respuesta: "Sí. La Corte Constitucional fijó su entrada en vigor para el 1 de abril de 2027 y ahí cambian los porcentajes del Fondo de Solidaridad. Hasta entonces rige la regla actual.",
    },
  ],
  glosario: [
    { termino: "IBC", definicion: "Ingreso base de cotización: el valor sobre el que se calculan los aportes a salud y pensión." },
    { termino: "UVT", definicion: "Unidad de Valor Tributario. Hoy vale {{co.uvt}} y la DIAN la actualiza cada año." },
    { termino: "Retención en la fuente", definicion: "Un anticipo del impuesto de renta que la empresa descuenta de tu salario y le paga a la DIAN." },
  ],
});
