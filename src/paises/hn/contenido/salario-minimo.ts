import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.salario-minimo",
  h1: "Salario mínimo en Honduras por rama y tamaño de empresa",
  title: "Salario mínimo 2026 en Honduras: por rama y tamaño",
  description:
    "Consulte el salario mínimo mensual, por jornada y por hora según la rama de actividad y la cantidad de trabajadores de la empresa. Acuerdo SETRASS-233-2026.",
  intro: [
    "En Honduras no hay un solo salario mínimo. Cambia según la rama de actividad de la empresa y cuántos trabajadores tiene.",
    "La tabla de 2026 rige desde el 1 de enero de 2026 y la de 2027 desde el 1 de enero de 2027. Las dos salen del mismo acuerdo.",
  ],
  comoSeCalcula: [
    "Elija la rama de actividad de la empresa y la cantidad de trabajadores.",
    "Verá el mínimo mensual, el de una jornada ordinaria de 8 horas y el de una hora, tal como los publica el acuerdo.",
    "Si escribe su salario, le mostramos la diferencia con el mínimo.",
  ],
  ejemplo: [
    "Un comercio con 1 a 10 trabajadores paga como mínimo {{hn.salario-minimo-mensual[comercio-1-10]}} al mes y {{hn.salario-minimo-hora[comercio-1-10]}} por hora.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo más bajo?",
      respuesta: "El de agricultura en empresas de 1 a 10 trabajadores: {{hn.salario-minimo-mensual[agricultura-1-10]}} al mes.",
    },
    {
      pregunta: "¿Cuánto subió el salario mínimo en 2026?",
      respuesta: "Un 6 % en empresas de 1 a 50 trabajadores y un 7 % en las de 51 o más. Para 2027 el ajuste es igual, salvo en las de 151 o más, que suben un 7.5 %.",
    },
    {
      pregunta: "El acuerdo salió en abril. ¿Qué pasa con enero a abril?",
      respuesta: "El aumento rige desde el 1 de enero de 2026. La diferencia de enero a abril se tenía que pagar a más tardar el 31 de julio de 2026.",
    },
    {
      pregunta: "¿El salario mínimo de 2027 puede cambiar?",
      respuesta: "Sí. Si la inflación de diciembre de 2026 que publica el Banco Central supera el ajuste fijado para 2027, se aplica la inflación.",
    },
    {
      pregunta: "¿Vale para la maquila?",
      respuesta: "No. La maquila textil y las empresas de zona libre tienen su propio acuerdo, vigente hasta el 31 de diciembre de 2026.",
    },
  ],
  glosario: [
    { termino: "STSS", definicion: "Secretaría de Trabajo y Seguridad Social, que fija el salario mínimo por acuerdo ejecutivo." },
    { termino: "Jornada ordinaria", definicion: "La jornada diurna normal de 8 horas." },
  ],
});
