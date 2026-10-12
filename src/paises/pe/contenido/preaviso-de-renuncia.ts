import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.preaviso-de-renuncia",
  h1: "Calculadora del preaviso de renuncia",
  title: "Renuncia con {{pe.preaviso-renuncia}} de anticipación: tu último día",
  description:
    "Si renuncias, tienes que avisar con {{pe.preaviso-renuncia}} de anticipación. Calcula tu último día de trabajo y hasta cuándo pueden rechazar tu exoneración.",
  intro: [
    "Para renunciar a un trabajo en planilla tienes que avisar por escrito con {{pe.preaviso-renuncia}} de anticipación. Durante ese tiempo sigues trabajando y cobrando.",
    "Pon el día en que entregas tu carta y te decimos tu último día. Si pides que te exoneren del plazo, también te mostramos hasta cuándo te pueden decir que no.",
  ],
  comoSeCalcula: [
    "Al día en que entregas la carta de renuncia se le suman {{pe.preaviso-renuncia}} calendario: ese es tu último día de trabajo.",
    "Puedes pedir en la misma carta que te exoneren del plazo. Si tu empleador no lo rechaza por escrito dentro del tercer día, se entiende aceptado.",
    "Tu empleador también puede exonerarte por su cuenta y dejarte ir antes.",
  ],
  ejemplo: ["Entregas tu carta el 12 de octubre de 2026. Si cumples el plazo, tu último día de trabajo es el 11 de noviembre de 2026."],
  faq: [
    {
      pregunta: "¿Con cuánta anticipación tengo que renunciar?",
      respuesta: "Con {{pe.preaviso-renuncia}}, avisando por escrito. Es lo que manda el artículo 18 de la Ley de Productividad y Competitividad Laboral.",
    },
    {
      pregunta: "¿Puedo irme antes de que se cumpla el plazo?",
      respuesta: "Sí, si tu empleador te exonera del plazo. Pídelo en tu carta: si no te responden por escrito en tres días, queda aceptado.",
    },
    {
      pregunta: "¿Me pagan mis beneficios si renuncio?",
      respuesta: "Sí. Te corresponde tu liquidación de beneficios sociales (CTS trunca, gratificación trunca y vacaciones) dentro de las 48 horas de tu cese. No hay indemnización por despido.",
    },
    {
      pregunta: "¿Qué tiene que decir la carta de renuncia?",
      respuesta: "Tu nombre, la fecha, que renuncias de forma voluntaria y tu último día de trabajo. Si quieres irte antes, agrega el pedido de exoneración del plazo. Quédate con una copia firmada como recibida.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso de renuncia que das con anticipación para que la empresa se organice." },
    { termino: "Exoneración del plazo", definicion: "Permiso del empleador para que dejes de trabajar antes de que se cumplan los días del preaviso." },
  ],
});
