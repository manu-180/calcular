import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.finiquito-atrasado",
  h1: "Calculadora de multa por finiquito atrasado",
  title: "Finiquito atrasado en Bolivia: calcule la multa",
  description: "Si no le pagaron el finiquito en {{bo.finiquito-plazo-dias}}, el empleador le debe una multa del {{bo.finiquito-multa}} más el mantenimiento de valor en UFV. Calcúlelo.",
  intro: [
    "El empleador tiene {{bo.finiquito-plazo-dias}} calendario desde su último día de trabajo para pagarle el finiquito. Si se atrasa, le debe una multa del {{bo.finiquito-multa}} del total, a su favor.",
    "Escriba cuánto le deben y su último día trabajado. Con el valor de la UFV del vencimiento, sumamos el mantenimiento de valor.",
  ],
  comoSeCalcula: [
    "La fecha límite es el último día trabajado más {{bo.finiquito-plazo-dias}}.",
    "Si hoy ya pasó esa fecha, la multa es el {{bo.finiquito-multa}} del finiquito.",
    "El mantenimiento de valor actualiza el finiquito con la UFV: monto por la UFV de hoy dividida la UFV del vencimiento, menos el monto.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto tiempo tiene el empleador para pagar el finiquito?",
      respuesta: "{{bo.finiquito-plazo-dias}} calendario desde el último día trabajado (D.S. N° 28699, artículo 9).",
    },
    {
      pregunta: "¿Qué pasa si no me pagan el finiquito a tiempo?",
      respuesta: "El empleador debe pagarle una multa del {{bo.finiquito-multa}} del total, más el mantenimiento de valor según la UFV. Puede reclamar en la Jefatura de Trabajo de su departamento.",
    },
    {
      pregunta: "¿Dónde encuentro el valor de la UFV de un día?",
      respuesta: "Lo publica el Banco Central de Bolivia para cada día. También puede verlo en nuestra calculadora de UFV.",
    },
  ],
  glosario: [
    { termino: "Finiquito", definicion: "El documento y el pago de todos sus beneficios sociales al terminar el trabajo." },
    { termino: "UFV", definicion: "Unidad de Fomento de Vivienda: índice diario del Banco Central que sigue a la inflación." },
    { termino: "Mantenimiento de valor", definicion: "Actualización de una deuda para que no pierda valor con la inflación." },
  ],
});
