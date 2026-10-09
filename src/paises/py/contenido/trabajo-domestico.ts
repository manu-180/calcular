import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.trabajo-domestico",
  h1: "Calculadora de trabajo doméstico: salario, IPS y costo",
  title: "Empleada doméstica en Paraguay: salario, IPS y aguinaldo",
  description:
    "Calculá el salario de una trabajadora doméstica con el mínimo de {{py.salario-minimo}}: descuento de IPS, aporte del empleador, aguinaldo y costo mensual.",
  intro: [
    "Si tenés una trabajadora doméstica, acá ves cuánto cobra en mano, cuánto pagás al IPS y cuánto te cuesta por mes con el aguinaldo.",
    "El IPS la asegura con las mismas tasas que al resto de los trabajadores y toma el salario mínimo como base mínima de sus aportes.",
  ],
  comoSeCalcula: [
    "Si no ponés un salario, usamos el mínimo vigente: {{py.salario-minimo}} desde el {{py.salario-minimo#desde}}.",
    "A la trabajadora se le descuenta el {{py.ips-trabajador}} para el IPS. El empleador aporta el {{py.ips-empleador}} encima del salario.",
    "Si el salario está debajo del mínimo, los aportes se calculan igual sobre el mínimo, que es la base mínima del IPS.",
    "El aguinaldo es la doceava parte de lo que cobró en el año. Lo mostramos por mes para que sepas cuánto apartar.",
  ],
  ejemplo: [
    "Con el mínimo de Gs. 3.044.000 cobra Gs. 2.770.040 en mano. Al IPS van Gs. 776.220 entre los dos, y con el aguinaldo te cuesta Gs. 3.799.927 por mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto tiene que cobrar una empleada doméstica?",
      respuesta: "Al menos el salario mínimo por jornada completa: {{py.salario-minimo}}. El IPS usa ese mismo monto como base mínima del seguro doméstico.",
    },
    {
      pregunta: "¿Cuánto se paga al IPS?",
      respuesta: "En total, el {{py.ips-trabajador}} que se descuenta del salario más el {{py.ips-empleador}} que pone el empleador. Lo pagás vos en la planilla del IPS.",
    },
    {
      pregunta: "¿Le corresponde aguinaldo y vacaciones?",
      respuesta: "Sí. Aguinaldo hasta el 31 de diciembre y vacaciones pagadas según su antigüedad, como cualquier trabajador.",
    },
    {
      pregunta: "¿Y si trabaja menos horas?",
      respuesta: "Existe la modalidad de empleo a tiempo parcial, con bases del IPS por hora. Esta calculadora es para jornada completa.",
    },
  ],
  glosario: [
    { termino: "IPS", definicion: "Instituto de Previsión Social: cubre salud y jubilación de los trabajadores." },
    { termino: "Base mínima imponible", definicion: "Monto mínimo sobre el que el IPS calcula los aportes, aunque el salario sea menor." },
    { termino: "Aguinaldo", definicion: "Un salario extra por año: la doceava parte de todo lo cobrado en el año." },
  ],
});
