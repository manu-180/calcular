import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.licencias-laborales",
  h1: "Calculadora de licencias laborales con goce de haber",
  title: "Licencias laborales en Bolivia: días y requisitos",
  description: "Vea cuántos días le corresponden por matrimonio ({{bo.licencias-dias[matrimonio]}}), luto, paternidad, cumpleaños y exámenes médicos, y cuánto valen.",
  intro: [
    "La ley le da días libres pagados por algunos hechos de su vida: casarse, el fallecimiento de un familiar, el nacimiento de un hijo, su cumpleaños o ciertos exámenes médicos.",
    "Elija la licencia y, si quiere, escriba su sueldo para ver cuánto valen esos días.",
  ],
  comoSeCalcula: [
    "Matrimonio: {{bo.licencias-dias[matrimonio]}}. Fallecimiento de padres, cónyuge, hermanos o hijos: {{bo.licencias-dias[luto]}}. Paternidad: {{bo.licencias-dias[paternidad]}}.",
    "Cumpleaños: {{bo.licencias-dias[cumpleanios]}}, es decir media jornada.",
    "Exámenes de Papanicolaou o mamografía, próstata y colon: {{bo.licencias-dias[papanicolaou]}} por año cada uno.",
    "Todas se pagan al 100 % y no se descuentan de sus vacaciones. El valor es el sueldo dividido 30 por los días.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de licencia dan por matrimonio en Bolivia?",
      respuesta: "{{bo.licencias-dias[matrimonio]}} laborales con goce de haber (D.S. N° 4708), sin cargo a vacaciones. Se pide con el certificado del Oficial de Registro Civil.",
    },
    {
      pregunta: "¿Cuántos días dan por el fallecimiento de un familiar?",
      respuesta: "{{bo.licencias-dias[luto]}} laborales por padres, cónyuge, hermanos o hijos. Debe presentar el certificado de defunción dentro de los 5 días.",
    },
    {
      pregunta: "¿Me dan el día de mi cumpleaños?",
      respuesta: "Le corresponde media jornada libre pagada, si su jornada es de 8 horas. Se pide presentando su cédula de identidad.",
    },
  ],
  glosario: [
    { termino: "Licencia con goce de haber", definicion: "Permiso para no trabajar sin que le descuenten el sueldo." },
    { termino: "Jornada laboral", definicion: "Un día de trabajo." },
  ],
});
