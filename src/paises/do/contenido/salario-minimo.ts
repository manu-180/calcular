import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.salario-minimo",
  h1: "Salario mínimo en República Dominicana",
  title: "Salario mínimo 2026 en RD por tamaño de empresa",
  description:
    "Salario mínimo vigente desde el {{do.salario-minimo#desde}}: {{do.salario-minimo[grande]}} en empresas grandes. Míralo por mes, quincena, día y hora, y el del trabajo del hogar.",
  intro: [
    "En República Dominicana el salario mínimo del sector privado depende del tamaño de la empresa. Lo fija el Comité Nacional de Salarios.",
    "Elige dónde trabajas y ves el mínimo por mes, por quincena, por día y por hora.",
  ],
  comoSeCalcula: [
    "Empresa grande: {{do.salario-minimo[grande]}} al mes.",
    "Empresa mediana: {{do.salario-minimo[mediana]}}. Pequeña: {{do.salario-minimo[pequena]}}. Microempresa: {{do.salario-minimo[micro]}}.",
    "Trabajo del hogar: {{do.salario-minimo-hogar}} al mes.",
    "El valor por día es el mensual dividido entre {{do.divisor-salario-diario}}, como manda el Reglamento del Código de Trabajo. El valor por hora divide el diario entre {{do.jornada-diaria}}.",
  ],
  ejemplo: [
    "En una empresa grande, el mínimo de {{do.salario-minimo[grande]}} equivale a RD$14,994 por quincena, RD$1,258.41 por día y RD$157.30 por hora.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuándo rige este salario mínimo?",
      respuesta: "Desde el {{do.salario-minimo#desde}}. Es el segundo tramo de la Resolución CNS-01-2025, que subió el mínimo 20 % en total.",
    },
    {
      pregunta: "¿Cómo sé si mi empresa es grande, mediana, pequeña o micro?",
      respuesta: "Lo define la ley de mipymes según la cantidad de empleados y las ventas. Pregunta en Recursos Humanos o mira tu contrato.",
    },
    {
      pregunta: "¿Cuánto es el salario mínimo de una trabajadora del hogar?",
      respuesta: "{{do.salario-minimo-hogar}} al mes, sin importar el tamaño del hogar.",
    },
    {
      pregunta: "¿Zonas francas y hoteles tienen otro mínimo?",
      respuesta: "Sí. Zonas francas, hoteles y restaurantes, construcción y algunas tareas agrícolas tienen tarifas propias del Comité Nacional de Salarios.",
    },
  ],
  glosario: [
    { termino: "Sector privado no sectorizado", definicion: "Las empresas privadas que no tienen una tarifa de salario mínimo propia." },
    { termino: "Comité Nacional de Salarios", definicion: "Organismo del Ministerio de Trabajo que fija los salarios mínimos." },
  ],
});
