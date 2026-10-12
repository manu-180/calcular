import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.licencias-laborales",
  h1: "Licencias pagadas por matrimonio, fallecimiento y paternidad",
  title: "Licencia de paternidad y otras licencias pagadas en RD",
  description: "Mira cuántos días de licencia con salario te tocan por matrimonio, fallecimiento de un familiar o nacimiento de un hijo, y cuánto vale ese tiempo.",
  intro: [
    "El Código de Trabajo te da días libres con salario completo por tu matrimonio, por la muerte de un familiar cercano y por el nacimiento de tu hijo.",
    "Elige el motivo y pon tu salario: ves los días y cuánto vale ese tiempo.",
  ],
  comoSeCalcula: [
    "Matrimonio: {{do.licencias-dias[matrimonio]}}.",
    "Fallecimiento de abuelos, padres, hijos o pareja: {{do.licencias-dias[fallecimiento]}}.",
    "Nacimiento de un hijo: {{do.licencias-dias[nacimiento]}}.",
    "El valor de cada día es tu salario mensual entre {{do.divisor-salario-diario}}.",
  ],
  ejemplo: [
    "Con RD$30,000 al mes, la licencia por matrimonio son 5 días pagados que valen RD$6,294.60.",
  ],
  faq: [
    { pregunta: "¿Cuántos días de licencia de paternidad hay en RD?", respuesta: "{{do.licencias-dias[nacimiento]}} con salario, según el artículo 54 del Código de Trabajo." },
    { pregunta: "¿Cuántos días me dan por matrimonio?", respuesta: "{{do.licencias-dias[matrimonio]}} con salario completo." },
    { pregunta: "¿Me pueden descontar los días de licencia?", respuesta: "No. Son licencias con disfrute de salario." },
  ],
  glosario: [
    { termino: "Licencia", definicion: "Días en que no trabajas y conservas el salario." },
    { termino: "Licencia de paternidad", definicion: "Los días que te tocan por el nacimiento de tu hijo." },
  ],
});
