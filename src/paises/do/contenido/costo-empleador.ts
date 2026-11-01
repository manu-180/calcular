import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.costo-empleador",
  h1: "Calculadora del costo de un empleado en República Dominicana",
  title: "Costo de un empleado en RD {{anio}}: TSS y regalía",
  description: "Calcula cuánto le cuesta un empleado a la empresa: salario, aportes del empleador a la TSS (SFS {{do.sfs-empleador}}, AFP {{do.afp-empleador}}, riesgos laborales) y regalía.",
  intro: [
    "Un empleado le cuesta a la empresa más que su salario. Hay que sumar los aportes del empleador a la TSS y apartar la regalía pascual.",
    "Pon el salario y ves el costo mensual y anual.",
  ],
  comoSeCalcula: [
    "Seguro Familiar de Salud: {{do.sfs-empleador}} del salario, hasta un tope de {{do.tope-sfs}}.",
    "Pensiones (AFP): {{do.afp-empleador}}, hasta {{do.tope-afp}}.",
    "Riesgos laborales: {{do.srl-fijo}} más el porcentaje variable de la empresa, hasta {{do.tope-srl}}.",
    "Regalía: un salario al año, con tope de {{do.tope-regalia}} salarios mínimos.",
  ],
  ejemplo: [
    "Un empleado con RD$40,000 al mes le cuesta a una empresa grande RD$49,449.33 al mes: RD$6,116 de TSS y RD$3,333.33 de regalía repartida en el año.",
  ],
  faq: [
    { pregunta: "¿Cuánto paga el empleador a la TSS?", respuesta: "El {{do.sfs-empleador}} para salud, el {{do.afp-empleador}} para pensiones y entre 1.10 % y 1.30 % para riesgos laborales, cada uno hasta su tope." },
    { pregunta: "¿Se incluye el INFOTEP?", respuesta: "No. El aporte del empleador al INFOTEP no está en este cálculo." },
    { pregunta: "¿Por qué se suma la regalía?", respuesta: "Porque es un salario más que se paga en diciembre. Repartirla en el año te muestra el costo real de cada mes." },
  ],
  glosario: [
    { termino: "TSS", definicion: "Tesorería de la Seguridad Social. Cobra los aportes de salud, pensiones y riesgos laborales." },
    { termino: "Riesgos laborales", definicion: "Seguro de accidentes y enfermedades del trabajo. Lo paga solo el empleador." },
  ],
});
