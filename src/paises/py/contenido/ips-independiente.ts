import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.ips-independiente",
  h1: "Calculadora de aporte al IPS para independientes",
  title: "IPS para independientes en Paraguay: cuánto aportás",
  description: "Calculá tu aporte voluntario al IPS como trabajador independiente: el {{py.ips-independiente}} sobre una base de al menos un salario mínimo ({{py.salario-minimo}}).",
  intro: [
    "Si trabajás por tu cuenta, podés aportar al IPS para jubilarte. Lo permite la Ley 4933 a trabajadores independientes, empleadores, amas de casa y trabajadores domésticos.",
    "El aporte es del {{py.ips-independiente}} sobre la base que declares, que no puede ser menor al salario mínimo.",
  ],
  comoSeCalcula: [
    "Elegís una base mensual. Como mínimo, el salario mínimo vigente: {{py.salario-minimo}}.",
    "El aporte es el {{py.ips-independiente}} de esa base.",
    "Podés cambiar la base una vez por año. Una base más alta da una jubilación más alta.",
  ],
  ejemplo: ["Con la base mínima, aportás el {{py.ips-independiente}} de {{py.salario-minimo}}: Gs. 395.720 por mes."],
  faq: [
    {
      pregunta: "¿Cuánto paga de IPS un trabajador independiente?",
      respuesta: "El {{py.ips-independiente}} de la base que declares. La base mínima es el salario mínimo.",
    },
    {
      pregunta: "¿Este aporte me da atención médica?",
      respuesta: "No. Cubre solo jubilación y pensiones. La atención médica del IPS no está incluida.",
    },
    {
      pregunta: "¿Cuándo me puedo jubilar?",
      respuesta: "A los 60 años con 25 de aportes cobrás el 100 % del promedio de tus bases de los últimos 120 meses. Con 30 años de aporte, desde los 55 con un porcentaje menor.",
    },
  ],
  glosario: [
    { termino: "Trabajador independiente", definicion: "Quien trabaja por su cuenta, sin relación de dependencia." },
    { termino: "Base de aporte", definicion: "El monto sobre el que se calcula el aporte al IPS." },
  ],
});
