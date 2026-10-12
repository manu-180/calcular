import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.canasta-basica",
  h1: "Canasta básica de Nicaragua: cuánto cubre tu salario",
  title: "Canasta básica en Nicaragua: cuánto cuesta y cuánto cubrís",
  description: "La canasta básica de Nicaragua cuesta {{ni.canasta-basica}} según el INIDE. Compará tu ingreso o el salario mínimo de tu sector y mirá cuánto cubre.",
  intro: [
    "La canasta básica del INIDE cuesta {{ni.canasta-basica}} al mes. Es el último dato publicado, del mes que empieza el {{ni.canasta-basica#desde}}.",
    "Poné el ingreso de tu hogar o elegí un sector para compararla con el salario mínimo.",
  ],
  comoSeCalcula: [
    "Se toma el costo de la canasta básica del último mes que publicó el INIDE.",
    "Se divide tu ingreso entre ese costo: el porcentaje es la parte de la canasta que cubrís.",
    "También te mostramos cuántos salarios mínimos de tu sector cuesta la canasta.",
  ],
  ejemplo: ["En julio de 2026 la canasta costó C$21,474.94. El salario mínimo de la industria (C$8,320.48) cubre el 38.75 %."],
  faq: [
    {
      pregunta: "¿Cuánto cuesta la canasta básica en Nicaragua?",
      respuesta: "{{ni.canasta-basica}} al mes, según el último dato del INIDE, del mes que empieza el {{ni.canasta-basica#desde}}.",
    },
    {
      pregunta: "¿Qué incluye la canasta básica?",
      respuesta: "53 productos: alimentos, artículos de uso del hogar y vestuario, en cantidades pensadas para una familia.",
    },
    {
      pregunta: "¿Cada cuánto se actualiza?",
      respuesta: "El INIDE la publica todos los meses, con unas seis a ocho semanas de atraso.",
    },
    {
      pregunta: "¿El salario mínimo alcanza para la canasta básica?",
      respuesta: "Depende del sector. Elegí el tuyo en la calculadora y te mostramos qué parte de la canasta cubre un salario mínimo.",
    },
  ],
  glosario: [
    { termino: "INIDE", definicion: "Instituto Nacional de Información de Desarrollo: publica la canasta básica y la inflación." },
    { termino: "Canasta básica", definicion: "El conjunto de productos que necesita una familia por mes, con su costo." },
  ],
});
