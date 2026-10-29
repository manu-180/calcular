import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.salario-minimo-profesional",
  h1: "Salarios mínimos profesionales {{anio}}",
  title: "Salarios mínimos profesionales {{anio}} por oficio",
  description:
    "Consulta el salario mínimo profesional {{anio}} de los 61 oficios de la CONASAMI (albañil, chofer, cocinero, carpintero y más), por día, semana, quincena y mes.",
  intro: [
    "Además del salario mínimo general, la CONASAMI fija un mínimo más alto para 61 oficios y profesiones. Si trabajas en uno de ellos, tu empresa no te puede pagar menos de ese monto por una jornada completa.",
    "Elige tu oficio y tu zona. En la Zona Libre de la Frontera Norte casi todos los oficios tienen el mismo mínimo que el general de la zona, {{mx.salario-minimo@frontera-norte}}.",
  ],
  comoSeCalcula: [
    "El valor diario sale de la resolución de la CONASAMI publicada en el DOF para 2026.",
    "Por semana se multiplica por 7, por quincena por 15 y por mes por 30.4.",
    "También te mostramos cuánto pasa del salario mínimo general de tu zona: {{mx.salario-minimo@general}} en el resto del país.",
  ],
  ejemplo: ["Un oficial de albañilería en la zona general gana como mínimo 363.44 pesos al día: unos 11,049 al mes."],
  faq: [
    {
      pregunta: "¿Qué oficios tienen salario mínimo profesional?",
      respuesta: "Son 61, entre ellos albañiles, carpinteros, choferes, cocineros, electricistas, mecánicos, plomeros, cajeros, secretarias auxiliares, veladores, jornaleros agrícolas y trabajadoras del hogar.",
    },
    {
      pregunta: "¿Desde cuándo rigen estos salarios?",
      respuesta: "Desde el 1 de enero de 2026 hasta que la CONASAMI publique los de 2027, normalmente en diciembre.",
    },
    {
      pregunta: "¿Mi empresa me puede pagar el mínimo general si hago uno de estos oficios?",
      respuesta: "No. Si tu trabajo está en la lista, el mínimo que te tienen que pagar es el profesional de tu oficio.",
    },
  ],
  glosario: [{ termino: "CONASAMI", definicion: "Comisión Nacional de los Salarios Mínimos: fija cada año el mínimo general y los profesionales." }],
});
