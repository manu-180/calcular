import { definirCalculadora, enMapa } from "@/motor/calculo";
import { sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "ni.prescripcion-laboral",
  mercado: "ni",
  concepto: "propio",
  slug: "prescripcion-laboral",
  estado: "publicado",
  requiere: {
    "ni.prescripcion-meses": "mapa",
  },
  campos: [
    { id: "reclamo", tipo: "opcion-dato", dato: "ni.prescripcion-meses", etiqueta: "Qué querés reclamar", porDefecto: "general" },
    {
      id: "desde",
      tipo: "fecha",
      etiqueta: "Desde cuándo corre el plazo",
      porDefecto: "hoy",
      ayuda: "Por lo general, el día en que se pudo reclamar: el fin del contrato o el día en que no te pagaron. En un riesgo profesional, la muerte o el día en que se determinó la incapacidad.",
    },
  ],
  calcular(entrada, valores) {
    const meses = enMapa(valores["ni.prescripcion-meses"], entrada.reclamo);
    return {
      meses,
      vence: sumarMeses(entrada.desde, meses),
      observaciones: [
        "El plazo se corta si presentás un reclamo o una demanda ante el Ministerio del Trabajo o un juzgado, o si el empleador reconoce la deuda. Ahí vuelve a empezar.",
        "No corre mientras estás de vacaciones, de reposo por enfermedad o accidente, o de descanso por maternidad.",
      ],
    };
  },
  resultado: [
    { clave: "meses", etiqueta: "Plazo", formato: "meses" },
    { clave: "vence", etiqueta: "Último día para reclamar", formato: "fecha", destacada: true },
  ],
});
