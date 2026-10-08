import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.salario-minimo",
  h1: "Salario mínimo en Nicaragua 2026 por sector",
  title: "Salario mínimo en Nicaragua 2026: tabla por sector",
  description: "Salario mínimo en Nicaragua 2026 por sector: de {{ni.salario-minimo[agropecuario]}} a {{ni.salario-minimo[construccion-financiero]}} al mes. Consultá el tuyo por mes, por día y por hora.",
  intro: [
    "El salario mínimo en Nicaragua va de {{ni.salario-minimo[agropecuario]}} al mes en el sector agropecuario a {{ni.salario-minimo[construccion-financiero]}} en construcción, finanzas y seguros. Los montos rigen desde el {{ni.salario-minimo#desde}}.",
    "Cambia según el sector donde trabajás. Lo aprueba cada año la Comisión Nacional de Salario Mínimo y lo publica el Ministerio del Trabajo (MITRAB). Elegí tu sector y te mostramos el mínimo mensual, por día y por hora.",
  ],
  comoSeCalcula: [
    "El monto mensual sale del acuerdo ministerial vigente, publicado en La Gaceta.",
    "El salario por día es el mensual dividido entre 30.",
    "El salario por hora es el diario dividido entre las {{ni.jornada-diaria[diurna]}} de la jornada diurna.",
  ],
  ejemplo: ["En la industria manufacturera el mínimo es {{ni.salario-minimo[industria-manufacturera]}} al mes."],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo en Nicaragua en 2026?",
      respuesta: "Depende del sector: va de {{ni.salario-minimo[agropecuario]}} en el agropecuario a {{ni.salario-minimo[construccion-financiero]}} en construcción, finanzas y seguros. En la industria manufacturera es {{ni.salario-minimo[industria-manufacturera]}}.",
    },
    {
      pregunta: "¿Cómo saco el salario mínimo por día y por hora?",
      respuesta: "Por día, dividí el mensual entre 30. Por hora, dividí el diario entre las {{ni.jornada-diaria[diurna]}} de la jornada diurna.",
    },
    {
      pregunta: "¿Hasta cuándo rige este salario mínimo?",
      respuesta: "Hasta el 28 de febrero de 2027. El MITRAB convoca a la comisión en febrero para fijar el siguiente.",
    },
    {
      pregunta: "¿Por qué el agropecuario es el más bajo?",
      respuesta: "Porque su monto incluye la alimentación. El más alto es el de construcción, finanzas y seguros.",
    },
    {
      pregunta: "¿Y las zonas francas?",
      respuesta: "Las empresas en régimen de zona franca tienen un acuerdo aparte, que cambia cada 1 de enero. Por eso no están en esta lista.",
    },
    {
      pregunta: "¿Me pueden bajar el salario si gano más que el mínimo?",
      respuesta: "No. El acuerdo prohíbe bajar los salarios que ya están por encima del mínimo.",
    },
  ],
  glosario: [
    { termino: "MITRAB", definicion: "Ministerio del Trabajo de Nicaragua." },
    { termino: "Comisión Nacional de Salario Mínimo", definicion: "La mesa del gobierno, los empleadores y los sindicatos que fija los mínimos (Ley 625)." },
  ],
});
