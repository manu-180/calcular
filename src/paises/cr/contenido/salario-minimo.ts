import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.salario-minimo",
  h1: "Salario mínimo {{anio}} en Costa Rica por categoría",
  title: "Salarios mínimos {{anio}} en Costa Rica: busque su categoría",
  description:
    "Salario mínimo {{anio}} por categoría del Decreto 45303-MTSS: no calificado {{cr.salario-minimo-mes[no-calificado]}}, más licenciado y doméstico. Mensual, quincenal y por hora.",
  intro: [
    "El salario mínimo 2026 en Costa Rica para una ocupación no calificada es {{cr.salario-minimo-mes[no-calificado]}} al mes. Cada perfil de puesto tiene su propio mínimo, fijado por el Consejo Nacional de Salarios desde el 1 de enero.",
    "Elija la categoría de su puesto y le mostramos el mínimo mensual, quincenal, diario y por hora.",
  ],
  comoSeCalcula: [
    "El mínimo mensual sale del Decreto Ejecutivo 45303-MTSS.",
    "Si le pagan por quincena, es la mitad del mensual. Por día, el mensual entre {{cr.dias-mes-planilla}}.",
    "La hora ordinaria diurna es el salario diario entre {{cr.jornada-diaria[diurna]}}.",
    "Las ocupaciones genéricas también tienen un mínimo por jornada diaria: no calificado {{cr.salario-minimo-jornada[no-calificado]}}, semicalificado {{cr.salario-minimo-jornada[semicalificado]}}, calificado {{cr.salario-minimo-jornada[calificado]}} y especializado {{cr.salario-minimo-jornada[especializado]}}.",
  ],
  ejemplo: [
    "Un trabajador en ocupación no calificada gana al menos {{cr.salario-minimo-mes[no-calificado]}} al mes. Por quincena, la mitad.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el salario mínimo en Costa Rica en 2026?",
      respuesta: "Depende del puesto. Para una ocupación no calificada es {{cr.salario-minimo-mes[no-calificado]}} al mes; semicalificada, {{cr.salario-minimo-mes[semicalificado]}}; calificada, {{cr.salario-minimo-mes[calificado]}}; especializada, {{cr.salario-minimo-mes[especializado]}}.",
    },
    {
      pregunta: "¿Cuál es el salario mínimo de una trabajadora doméstica en 2026?",
      respuesta: "{{cr.salario-minimo-mes[trabajo-domestico]}} al mes. Esta categoría sube un poco más que las demás cada año por un acuerdo del Consejo Nacional de Salarios.",
    },
    {
      pregunta: "¿Cuánto gana como mínimo un licenciado universitario?",
      respuesta: "{{cr.salario-minimo-mes[licenciado]}} al mes, si el puesto pide el título. Un bachiller universitario, {{cr.salario-minimo-mes[bachiller]}}.",
    },
    {
      pregunta: "¿Cuándo cambia el salario mínimo?",
      respuesta: "Cada 1 de enero. El Consejo Nacional de Salarios lo define antes de noviembre y el Ministerio de Trabajo lo publica por decreto.",
    },
    {
      pregunta: "¿Cómo sé en qué categoría está mi puesto?",
      respuesta: "Por los perfiles ocupacionales del Consejo Nacional de Salarios. El Ministerio de Trabajo tiene un buscador por ocupación en su sitio.",
    },
  ],
  glosario: [
    { termino: "Ocupación genérica", definicion: "Categoría por nivel de calificación: no calificada, semicalificada, calificada o especializada." },
    { termino: "Consejo Nacional de Salarios", definicion: "El órgano de patronos, trabajadores y Gobierno que fija los salarios mínimos." },
  ],
});
