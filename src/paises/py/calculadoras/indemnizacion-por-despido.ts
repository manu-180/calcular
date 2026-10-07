import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad } from "../lib/fechas";
import { aniosIndemnizables, diasPreaviso } from "../lib/laboral";

export default definirCalculadora({
  id: "py.indemnizacion-por-despido",
  mercado: "py",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion-por-despido",
  estado: "publicado",
  requiere: {
    "py.indemnizacion-dias-por-anio": "numero",
    "py.preaviso-dias": "mapa",
    "py.divisor-salario-diario": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual promedio de los últimos 6 meses",
      ayuda: "Sumá todo lo que cobraste en esos meses (salario, horas extra, comisiones) y dividilo por 6.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "egreso", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "preavisoTrabajado",
      tipo: "si-no",
      etiqueta: "Te avisaron con anticipación y trabajaste el preaviso",
      ayuda: "Si te despidieron de un día para el otro, dejalo en No.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.egreso < entrada.ingreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "egreso");
    const a = antiguedad(entrada.ingreso, entrada.egreso);
    const diario = entrada.salario / valores["py.divisor-salario-diario"];
    const anios = aniosIndemnizables(entrada.ingreso, entrada.egreso);
    const indemnizacion = redondear(diario * valores["py.indemnizacion-dias-por-anio"] * anios);
    const dias = diasPreaviso(valores["py.preaviso-dias"], a);
    const preaviso = entrada.preavisoTrabajado ? 0 : redondear(diario * dias);
    const estable = a.anios >= 10;
    const observaciones = ["Es un monto bruto. Aparte te corresponden el aguinaldo proporcional y las vacaciones que no tomaste."];
    if (estable) observaciones.push("Con diez años o más tenés estabilidad. Si el juez ordena reintegrarte y no es posible, la indemnización es el doble.");
    return {
      antiguedad: `${a.anios} ${a.anios === 1 ? "año" : "años"}, ${a.meses} ${a.meses === 1 ? "mes" : "meses"} y ${a.dias} ${a.dias === 1 ? "día" : "días"}`,
      anios,
      indemnizacion,
      diasPreaviso: dias,
      preaviso,
      total: redondear(indemnizacion + preaviso),
      indemnizacionDoble: estable ? redondear(indemnizacion * 2) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "texto" },
    { clave: "anios", etiqueta: "Años que se indemnizan", formato: "anios" },
    { clave: "indemnizacion", etiqueta: "Indemnización", formato: "moneda" },
    { clave: "diasPreaviso", etiqueta: "Días de preaviso que te corresponden", formato: "dias" },
    { clave: "preaviso", etiqueta: "Preaviso no otorgado", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total por el despido", formato: "moneda", destacada: true },
    { clave: "indemnizacionDoble", etiqueta: "Indemnización doble por estabilidad", formato: "moneda", ayuda: "Solo si el juez no puede reintegrarte o si cierra el lugar donde trabajás." },
  ],
});
