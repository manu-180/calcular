import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.uf-por-fecha",
  h1: "Valor de la UF por fecha",
  title: "Valor UF por fecha: la UF de cualquier día de 2026",
  description: "Busca el valor de la UF de un día de 2026 y pasa un monto en UF a pesos de esa fecha. Valores oficiales del SII.",
  intro: [
    "¿Necesitas la UF de un día pasado, por ejemplo la fecha de una escritura, un pago o un contrato? Elige el día y te damos el valor oficial.",
    "Si escribes un monto en UF, también lo pasamos a pesos con el valor de ese día.",
  ],
  comoSeCalcula: [
    "Buscamos el valor de la UF del día que elegiste en la tabla que publica el SII.",
    "Multiplicamos tu monto en UF por ese valor y redondeamos al peso.",
  ],
  ejemplo: ["El 1 de octubre de 2026 la UF valía $41.065,38. Entonces 100 UF ese día eran $4.106.538."],
  faq: [
    {
      pregunta: "¿Por qué la UF cambia todos los días?",
      respuesta: "Porque se ajusta día a día según la inflación del mes anterior. Entre el 10 de un mes y el 9 del siguiente sube (o baja) de a poco.",
    },
    {
      pregunta: "¿Qué UF se usa en un contrato?",
      respuesta: "La que diga el contrato. Lo común es la UF del día del pago o la del último día del mes anterior.",
    },
    {
      pregunta: "¿Puedo ver la UF de mañana?",
      respuesta: "El SII publica la UF con anticipación, hasta el día 9 del mes siguiente. Acá mostramos hasta el día de hoy.",
    },
  ],
  glosario: [{ termino: "UF", definicion: "Unidad de Fomento. Unidad de cuenta que se reajusta con la inflación y se usa en arriendos, créditos y topes legales." }],
});
