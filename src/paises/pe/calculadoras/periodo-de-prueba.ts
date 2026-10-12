import { definirCalculadora, enMapa } from "@/motor/calculo";
import { diasEntre, sumarDias, sumarMeses } from "../fechas";

export default definirCalculadora({
  id: "pe.periodo-de-prueba",
  mercado: "pe",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "pe.periodo-prueba": "mapa",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso", porDefecto: "hoy" },
    {
      id: "tipo",
      tipo: "opcion-dato",
      etiqueta: "Tu puesto",
      ayuda: "Para calificados, de confianza y dirección, el periodo más largo tiene que estar pactado por escrito. Si no, son 3 meses.",
      dato: "pe.periodo-prueba",
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores, { fecha }) {
    const meses = enMapa(valores["pe.periodo-prueba"], entrada.tipo);
    const fechaFin = sumarDias(sumarMeses(entrada.fechaIngreso, meses), -1);
    const faltan = diasEntre(fecha, fechaFin);
    const estado =
      fecha < entrada.fechaIngreso
        ? "Todavía no empezaste a trabajar"
        : faltan === 0
          ? "Hoy es el último día de tu periodo de prueba"
          : faltan > 0
            ? `Estás en periodo de prueba: ${faltan === 1 ? "falta 1 día" : `faltan ${faltan} días`} para que termine`
            : "Ya pasaste el periodo de prueba: tienes protección contra el despido arbitrario";
    return { meses, fechaFin, estado };
  },
  resultado: [
    { clave: "fechaFin", etiqueta: "Último día del periodo de prueba", formato: "fecha", destacada: true },
    { clave: "meses", etiqueta: "Duración", formato: "meses" },
    { clave: "estado", etiqueta: "Hoy", formato: "texto" },
  ],
});
