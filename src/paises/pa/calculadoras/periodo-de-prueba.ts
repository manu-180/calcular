import { definirCalculadora } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../reglas";

const DIAS_SEMANA = 7;

export default definirCalculadora({
  id: "pa.periodo-de-prueba",
  mercado: "pa",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "pa.periodo-prueba-meses": "numero",
    "pa.periodo-prueba-domestico-semanas": "numero",
  },
  campos: [
    { id: "fechaInicio", tipo: "fecha", etiqueta: "Primer día de trabajo" },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tu trabajo",
      opciones: [
        { valor: "general", etiqueta: "Trabajador en general" },
        { valor: "domestico", etiqueta: "Trabajo doméstico" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores, { fecha }) {
    const general = entrada.tipo === "general";
    const meses = valores["pa.periodo-prueba-meses"];
    const semanas = valores["pa.periodo-prueba-domestico-semanas"];
    const fin = general ? sumarDias(sumarMeses(entrada.fechaInicio, meses), -1) : sumarDias(entrada.fechaInicio, semanas * DIAS_SEMANA - 1);
    const restantes = fecha < entrada.fechaInicio ? diasEntre(entrada.fechaInicio, fin) + 1 : Math.max(diasEntre(fecha, fin), 0);
    const observaciones = general
      ? [
          "El período de prueba vale solo si está escrito en el contrato y el puesto pide una habilidad especial. No vale si ya ocupaste ese puesto en la misma empresa.",
          "Durante la prueba, tú o el empleador pueden terminar la relación sin pagar indemnización.",
        ]
      : ["En la prueba del trabajo doméstico cualquiera de las partes puede terminar con un aviso de 24 horas."];
    return {
      duracion: general ? `${meses} meses como máximo` : `${semanas} semanas`,
      fin,
      restantes,
      observaciones,
    };
  },
  resultado: [
    { clave: "duracion", etiqueta: "Duración del período de prueba", formato: "texto" },
    { clave: "fin", etiqueta: "Último día del período de prueba", formato: "fecha", destacada: true },
    { clave: "restantes", etiqueta: "Días que faltan", formato: "dias" },
  ],
});
