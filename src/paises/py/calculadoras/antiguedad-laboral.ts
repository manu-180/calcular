import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, sumarMeses } from "../lib/fechas";
import { aniosIndemnizables, claveVacaciones, diasPreaviso } from "../lib/laboral";

export default definirCalculadora({
  id: "py.antiguedad-laboral",
  mercado: "py",
  concepto: "propio",
  slug: "antiguedad-laboral",
  estado: "publicado",
  requiere: {
    "py.preaviso-dias": "mapa",
    "py.vacaciones-dias": "mapa",
    "py.indemnizacion-dias-por-anio": "numero",
    "py.estabilidad-anios": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fecha", tipo: "fecha", etiqueta: "Fecha para calcular", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    if (entrada.fecha < entrada.ingreso) throw new ErrorEntrada("La fecha tiene que ser posterior a la fecha de ingreso.", "fecha");
    const a = antiguedad(entrada.ingreso, entrada.fecha);
    const anios = aniosIndemnizables(entrada.ingreso, entrada.fecha);
    const aniosEstabilidad = valores["py.estabilidad-anios"];
    return {
      antiguedad: `${a.anios} ${a.anios === 1 ? "año" : "años"}, ${a.meses} ${a.meses === 1 ? "mes" : "meses"} y ${a.dias} ${a.dias === 1 ? "día" : "días"}`,
      diasPreaviso: diasPreaviso(valores["py.preaviso-dias"], a),
      diasVacaciones: a.anios === 0 ? 0 : enMapa(valores["py.vacaciones-dias"], claveVacaciones(a.anios)),
      diasIndemnizacion: anios * valores["py.indemnizacion-dias-por-anio"],
      estable: a.anios >= aniosEstabilidad ? "Sí" : "Todavía no",
      fechaEstabilidad: sumarMeses(entrada.ingreso, aniosEstabilidad * 12),
      observaciones: [
        "La indemnización está en días de salario y solo se paga en un despido sin causa.",
        "Las vacaciones son las que ganaste al cumplir tu último año en la empresa.",
      ],
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tu antigüedad", formato: "texto", destacada: true },
    { clave: "diasPreaviso", etiqueta: "Días de preaviso", formato: "dias" },
    { clave: "diasVacaciones", etiqueta: "Días de vacaciones por año", formato: "dias" },
    { clave: "diasIndemnizacion", etiqueta: "Indemnización por despido sin causa (días de salario)", formato: "dias" },
    { clave: "estable", etiqueta: "Estabilidad laboral", formato: "texto" },
    { clave: "fechaEstabilidad", etiqueta: "Fecha en que se cumplen los diez años", formato: "fecha" },
  ],
});
