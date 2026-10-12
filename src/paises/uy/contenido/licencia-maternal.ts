import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.licencia-maternal",
  h1: "Calculadora de licencia maternal y paternal",
  title: "Licencia maternal y paternal 2026: cuánto paga el BPS",
  description:
    "Calculá el subsidio por maternidad ({{uy.maternidad-semanas}} semanas), por paternidad y el medio horario para cuidados. Con el mínimo de {{uy.maternidad-minimo}} y los días de 2026.",
  intro: [
    "Durante la licencia maternal y la paternal no te paga la empresa: te paga el BPS. Cobrás tu promedio de los últimos seis meses, más la parte de aguinaldo, licencia y salario vacacional.",
    "Elegí qué querés calcular y poné tu promedio mensual. Te mostramos los días y el monto.",
  ],
  comoSeCalcula: [
    "Licencia maternal: al menos {{uy.maternidad-semanas}} semanas (6 antes del parto y 8 después), pagas al promedio diario de los últimos seis meses.",
    "Licencia paternal: en 2026, {{uy.paternidad-dias[dependiente]}} corridos si tenés los 3 días pagos por la empresa, o {{uy.paternidad-dias[no-dependiente]}} si trabajás por tu cuenta.",
    "Nadie cobra menos de {{uy.maternidad-minimo}} por mes, o la parte que corresponda a los días.",
    "Medio horario para cuidados: después de la licencia maternal, la madre o el padre trabajan la mitad del horario hasta los 6 meses del bebé y el BPS paga la mitad del subsidio.",
  ],
  ejemplo: ["Con un promedio de $ 60.000, la licencia maternal de 14 semanas son 98 días a $ 2.000: $ 196.000, más $ 16.333,33 de aguinaldo."],
  faq: [
    {
      pregunta: "¿Cuánto dura la licencia maternal en Uruguay?",
      respuesta: "{{uy.maternidad-semanas}} semanas como mínimo. Puede llegar a 18 con parto múltiple, un bebé de 1,5 kg o menos o un parto muy prematuro.",
    },
    {
      pregunta: "¿Cuántos días de licencia por paternidad me corresponden en 2026?",
      respuesta: "Si sos dependiente, 3 días pagos por la empresa y después {{uy.paternidad-dias[dependiente]}} días pagos por el BPS. Si trabajás por tu cuenta, {{uy.paternidad-dias[no-dependiente]}} días del BPS.",
    },
    {
      pregunta: "¿Quién paga la licencia maternal?",
      respuesta: "El BPS. La empresa no puede descontarte esos días ni despedirte por estar embarazada.",
    },
    {
      pregunta: "¿Qué es el medio horario por lactancia?",
      respuesta: "Es el subsidio para cuidados: hasta que el bebé cumple 6 meses, uno de los padres trabaja la mitad de su horario (hasta 4 horas) y el BPS paga la mitad del subsidio.",
    },
    {
      pregunta: "¿Me pueden despedir después de la licencia paternal?",
      respuesta: "No durante los 30 días después del reintegro. Si lo hacen, deben pagarte tres meses de sueldo además de la indemnización común.",
    },
  ],
  glosario: [
    { termino: "Subsidio por maternidad", definicion: "Lo que paga el BPS durante la licencia maternal." },
    { termino: "Subsidio para cuidados", definicion: "El medio horario pago por el BPS hasta los 6 meses del bebé." },
  ],
});
