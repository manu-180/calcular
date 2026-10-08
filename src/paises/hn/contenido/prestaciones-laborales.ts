import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.prestaciones-laborales",
  h1: "Cálculo de prestaciones laborales en Honduras",
  title: "Cálculo de prestaciones laborales en Honduras 2026",
  description:
    "Calcule su preaviso y su auxilio de cesantía si lo despiden o si renuncia, con el tope de {{hn.cesantia-tope-meses[general]}} del Código del Trabajo. Vea cada monto y el total.",
  intro: [
    "Las prestaciones laborales en Honduras son el preaviso y el auxilio de cesantía: desde el primer año, un mes de salario de cesantía por cada año trabajado, con un tope de {{hn.cesantia-tope-meses[general]}}. Se pagan si lo despiden sin causa justificada.",
    "Si renuncia después de {{hn.cesantia-renuncia-anios}} o más, también cobra una parte de la cesantía. Aparte le corresponden los derechos adquiridos: vacaciones y décimos tercer y cuarto mes proporcionales.",
  ],
  comoSeCalcula: [
    "Se toma el promedio de lo que ganó en los últimos seis meses. El salario diario es ese promedio entre 30.",
    "Preaviso: menos de 3 meses, un día de salario; de 3 a 6 meses, una semana; de 6 meses a un año, dos semanas; de uno a dos años, un mes; más de dos años, dos meses.",
    "Cesantía: de 3 a 6 meses, {{hn.cesantia-dias-menos-de-un-anio[3-a-6-meses]}} de salario; de 6 meses a un año, {{hn.cesantia-dias-menos-de-un-anio[6-a-12-meses]}}; desde el año, un mes de salario por cada año y la fracción en proporción.",
    "La cesantía no pasa de {{hn.cesantia-tope-meses[general]}} de salario, o de {{hn.cesantia-tope-meses[microempresa]}} en una empresa con 10 empleados o menos.",
    "Si renuncia con {{hn.cesantia-renuncia-anios}} o más, cobra el {{hn.cesantia-renuncia-porcentaje}} de esa cesantía. No aplica en una microempresa.",
  ],
  ejemplo: [
    "Trabajó 3 años, 6 meses y 15 días, gana en promedio L24,000 y lo despiden sin preaviso. Preaviso: 60 días × L800 = L48,000. Cesantía: L24,000 × (3 + 195 / 360) = L85,000. Total: L133,000.",
  ],
  faq: [
    {
      pregunta: "¿Qué son las prestaciones laborales?",
      respuesta: "Son el preaviso y el auxilio de cesantía. Se pagan cuando el contrato termina por despido sin causa justificada o por otra causa ajena a usted.",
    },
    {
      pregunta: "¿Cuánto me toca de cesantía por año trabajado?",
      respuesta: "Un mes de salario por cada año y la parte proporcional de la fracción, hasta {{hn.cesantia-tope-meses[general]}}. Con menos de un año, {{hn.cesantia-dias-menos-de-un-anio[3-a-6-meses]}} o {{hn.cesantia-dias-menos-de-un-anio[6-a-12-meses]}} de salario.",
    },
    {
      pregunta: "¿Si renuncio me pagan cesantía?",
      respuesta: "Solo si trabajó {{hn.cesantia-renuncia-anios}} o más de forma continua y la empresa no es una microempresa. En ese caso cobra el {{hn.cesantia-renuncia-porcentaje}} de lo que le tocaría por despido.",
    },
    {
      pregunta: "¿Cuál es el tope de la cesantía?",
      respuesta: "{{hn.cesantia-tope-meses[general]}} de salario desde el Decreto 150-2008. En las microempresas (hasta 10 empleados) el tope sigue en {{hn.cesantia-tope-meses[microempresa]}}.",
    },
    {
      pregunta: "¿Me pagan el preaviso si me avisaron antes?",
      respuesta: "No. Si el patrono le dio el preaviso por escrito y usted lo trabajó, ya no se paga aparte. Durante ese tiempo tiene derecho a un día libre pagado por semana para buscar trabajo.",
    },
    {
      pregunta: "¿Qué salario se usa para el cálculo?",
      respuesta: "El promedio de lo que ganó en los últimos seis meses, o en el tiempo que trabajó si fue menos. Incluye horas extra y comisiones.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "Aviso por escrito de que el contrato termina. Si el patrono no lo da, paga el salario de ese tiempo." },
    { termino: "Auxilio de cesantía", definicion: "Pago por el tiempo trabajado cuando lo despiden sin causa justificada (artículo 120 del Código del Trabajo)." },
    { termino: "Derechos adquiridos", definicion: "Lo que se paga siempre al terminar el contrato: vacaciones y décimos tercer y cuarto mes proporcionales." },
    { termino: "Microempresa", definicion: "Empresa con un máximo de 10 empleados remunerados." },
  ],
});
