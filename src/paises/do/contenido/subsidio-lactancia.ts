import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.subsidio-lactancia",
  h1: "Calculadora del subsidio por lactancia en República Dominicana",
  title: "Subsidio por lactancia 2026: calcula cuánto te pagan",
  description: "Calcula el subsidio por lactancia de la SISALRIL: {{do.lactancia-porcentaje[hasta-1]}}, {{do.lactancia-porcentaje[hasta-2]}} o {{do.lactancia-porcentaje[hasta-3]}} de tu salario cotizable, durante {{do.lactancia-meses}} meses.",
  intro: [
    "El subsidio por lactancia es un pago mensual de la Seguridad Social para las madres afiliadas que ganan hasta 3 salarios mínimos nacionales.",
    "Se paga durante {{do.lactancia-meses}} meses por cada niño nacido vivo. Cuánto cobras depende de tu salario.",
  ],
  comoSeCalcula: [
    "Se toma el promedio de tu salario cotizable de los últimos 6 meses.",
    "Hasta 1 salario mínimo nacional ({{do.salario-minimo-nacional}}): {{do.lactancia-porcentaje[hasta-1]}} de ese promedio por mes.",
    "Hasta 2 salarios mínimos: {{do.lactancia-porcentaje[hasta-2]}}. Hasta 3 salarios mínimos: {{do.lactancia-porcentaje[hasta-3]}}.",
    "Si el parto es múltiple, se paga un subsidio por cada niño.",
  ],
  ejemplo: [
    "Con un salario cotizable de RD$20,000 te tocan RD$6,600 por mes, RD$79,200 en los 12 meses.",
  ],
  faq: [
    { pregunta: "¿Quién tiene derecho al subsidio por lactancia?", respuesta: "Las trabajadoras afiliadas al régimen contributivo con salario cotizable de hasta 3 salarios mínimos nacionales que cotizaron al menos 8 meses en los 12 anteriores al parto." },
    { pregunta: "¿Cuánto tiempo se paga?", respuesta: "{{do.lactancia-meses}} meses, una vez por mes." },
    { pregunta: "¿Cómo lo pido?", respuesta: "Lo registra tu empleador ante la SISALRIL. Tienes hasta 12 meses después del nacimiento para reclamarlo." },
    { pregunta: "¿Qué es el salario mínimo nacional?", respuesta: "El que usa la TSS para los topes: {{do.salario-minimo-nacional}} desde el {{do.salario-minimo-nacional#desde}}." },
  ],
  glosario: [
    { termino: "SISALRIL", definicion: "Superintendencia de Salud y Riesgos Laborales. Administra los subsidios." },
    { termino: "Salario cotizable", definicion: "El salario que tu empleador reporta a la TSS." },
  ],
});
