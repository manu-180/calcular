import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { antiguedad, sumarMeses } from "../lib/fechas";
import { aniosIndemnizables } from "../lib/laboral";

export default definirCalculadora({
  id: "py.estabilidad-laboral",
  mercado: "py",
  concepto: "propio",
  slug: "estabilidad-laboral",
  estado: "publicado",
  requiere: {
    "py.estabilidad-anios": "numero",
    "py.estabilidad-factor": "numero",
    "py.indemnizacion-dias-por-anio": "numero",
    "py.divisor-salario-diario": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual promedio de los últimos 6 meses",
      ayuda: "Con horas extra y comisiones.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fecha", tipo: "fecha", etiqueta: "Fecha para calcular", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fecha < entrada.ingreso) throw new ErrorEntrada("La fecha tiene que ser posterior a la fecha de ingreso.", "fecha");
    const a = antiguedad(entrada.ingreso, entrada.fecha);
    const aniosEstabilidad = valores["py.estabilidad-anios"];
    const fechaEstabilidad = sumarMeses(entrada.ingreso, aniosEstabilidad * 12);
    const estable = a.anios >= aniosEstabilidad;
    const diario = entrada.salario / valores["py.divisor-salario-diario"];
    const indemnizacion = redondear(diario * valores["py.indemnizacion-dias-por-anio"] * aniosIndemnizables(entrada.ingreso, entrada.fecha));
    const observaciones: string[] = [];
    if (estable) {
      observaciones.push("Solo te pueden despedir por una causa justa probada antes ante el juez.");
      observaciones.push("La indemnización doble corresponde si el juez ordena reintegrarte y no es posible, o si cierra la empresa o el local donde trabajás.");
    } else {
      observaciones.push("Los diez años tienen que ser seguidos con el mismo empleador. Vacaciones, licencias y reposos no cortan la continuidad.");
      // Art. 102: el despido dentro de los seis meses previos a la estabilidad se presume abusivo.
      if (sumarMeses(entrada.fecha, 6) >= fechaEstabilidad) observaciones.push("Estás a menos de seis meses de la estabilidad. Un despido ahora para evitarla es abuso de derecho y el juez puede ordenar tu reposición.");
    }
    return {
      antiguedad: `${a.anios} ${a.anios === 1 ? "año" : "años"}, ${a.meses} ${a.meses === 1 ? "mes" : "meses"} y ${a.dias} ${a.dias === 1 ? "día" : "días"}`,
      estable: estable ? "Sí" : "Todavía no",
      fechaEstabilidad,
      diasFaltan: estable ? null : diasEntre(entrada.fecha, fechaEstabilidad),
      indemnizacion,
      indemnizacionDoble: estable ? redondear(indemnizacion * valores["py.estabilidad-factor"]) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "texto" },
    { clave: "estable", etiqueta: "¿Tenés estabilidad?", formato: "texto", destacada: true },
    { clave: "fechaEstabilidad", etiqueta: "Fecha en que se cumplen los diez años", formato: "fecha" },
    { clave: "diasFaltan", etiqueta: "Días que faltan", formato: "dias" },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido sin causa", formato: "moneda" },
    { clave: "indemnizacionDoble", etiqueta: "Indemnización doble del trabajador estable", formato: "moneda", destacada: true },
  ],
});
