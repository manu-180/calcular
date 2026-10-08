import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.salario-minimo",
  h1: "Salario mínimo 2026 en El Salvador por sector",
  title: "Salario mínimo El Salvador 2026: por sector, día y hora",
  description:
    "Salario mínimo vigente en El Salvador: {{sv.salario-minimo@comercio-servicios}} en comercio y servicios. Vea el de su sector por mes, quincena, día y hora, con el decreto vigente.",
  intro: [
    "El salario mínimo en El Salvador es de {{sv.salario-minimo@comercio-servicios}} al mes en comercio, servicios e industria. En la maquila textil es {{sv.salario-minimo@maquila}} y en el sector agropecuario, {{sv.salario-minimo@agropecuario}}.",
    "Elija su sector y vea el mínimo por mes, por quincena, por día y por hora. Los valores salen del decreto vigente desde el {{sv.salario-minimo@comercio-servicios#desde}}.",
  ],
  comoSeCalcula: [
    "El mensual y el diario son los que publica el decreto. El mensual se paga igual sin importar cuántos días tenga el mes.",
    "La quincena es la mitad del mensual.",
    "La hora es el diario dividido por la jornada diurna de {{sv.jornada-diurna}}.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el salario mínimo en El Salvador?",
      respuesta: "En comercio, servicios e industria es {{sv.salario-minimo@comercio-servicios}} al mes. En la maquila textil, {{sv.salario-minimo@maquila}}. En el sector agropecuario, {{sv.salario-minimo@agropecuario}}.",
    },
    {
      pregunta: "¿Desde cuándo rige?",
      respuesta: "Desde el {{sv.salario-minimo@comercio-servicios#desde}}, con un aumento del 12 % sobre el anterior.",
    },
    {
      pregunta: "¿Cuánto es el salario mínimo diario?",
      respuesta: "En comercio y servicios, {{sv.salario-minimo-diario@comercio-servicios}}. En el sector agropecuario, {{sv.salario-minimo-diario@agropecuario}}. Elija su sector para ver el suyo.",
    },
    {
      pregunta: "¿Por qué el diario no es el mensual dividido por 30?",
      respuesta: "Porque el decreto calcula el diario sobre el año: el mensual por 12, dividido por 365. Por eso en comercio el diario es {{sv.salario-minimo-diario@comercio-servicios}}.",
    },
    {
      pregunta: "¿El salario mínimo sirve para otros cálculos?",
      respuesta: "Sí. Las vacaciones, el aguinaldo y la indemnización se pagan por lo menos sobre el mínimo diario. Y los topes de la indemnización y de la renuncia voluntaria salen de él.",
    },
  ],
  glosario: [
    { termino: "Salario mínimo", definicion: "Lo menos que se le puede pagar a una persona por su jornada, según el sector." },
    { termino: "Sector", definicion: "La actividad económica de la empresa: comercio, industria, maquila o agropecuario." },
  ],
});
