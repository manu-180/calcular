import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { servicio, textoServicio } from "../lib/fechas";

const DIAS_DEL_MES = 30;
const DIAS_DEL_ANIO = 365;

export default definirCalculadora({
  id: "sv.indemnizacion",
  mercado: "sv",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion",
  estado: "publicado",
  requiere: {
    "sv.salario-minimo-diario": "numero-por-region",
    "sv.indemnizacion-dias-por-anio": "numero",
    "sv.indemnizacion-dias-minimo": "numero",
    "sv.indemnizacion-tope": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Su salario básico, sin horas extra.", min: 0 },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    { id: "fin", tipo: "fecha", etiqueta: "Último día trabajado", porDefecto: "hoy" },
    { id: "region", tipo: "region", etiqueta: "Sector de la empresa", porDefecto: "comercio-servicios" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fin < entrada.inicio) throw new ErrorEntrada("El último día trabajado tiene que ser posterior a la fecha de inicio.", "fin");
    const s = servicio(entrada.inicio, entrada.fin);
    const diario = entrada.salario / DIAS_DEL_MES;
    const tope = valores["sv.indemnizacion-tope"] * porRegion(valores["sv.salario-minimo-diario"], entrada.region);
    const diarioUsado = Math.min(diario, tope);
    const porAnio = valores["sv.indemnizacion-dias-por-anio"];
    const diasPorServicio = porAnio * s.anios + (porAnio * s.diasRestantes) / DIAS_DEL_ANIO;
    const diasIndemnizacion = Math.max(diasPorServicio, valores["sv.indemnizacion-dias-minimo"]);
    const observaciones: string[] = [];
    if (diario > tope) observaciones.push("Su salario diario pasa el tope de la ley, así que se calcula con el tope.");
    if (diasPorServicio < valores["sv.indemnizacion-dias-minimo"]) observaciones.push(`La indemnización nunca puede ser menor a ${valores["sv.indemnizacion-dias-minimo"]} días de salario.`);
    observaciones.push("Aparte de la indemnización, le deben las vacaciones y el aguinaldo proporcionales.");
    return {
      tiempo: textoServicio(s),
      diarioUsado: redondear(diarioUsado),
      diasIndemnizacion: redondear(diasIndemnizacion),
      indemnizacion: redondear(diarioUsado * diasIndemnizacion),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "diarioUsado", etiqueta: "Salario diario para el cálculo", formato: "moneda" },
    { clave: "diasIndemnizacion", etiqueta: "Días de salario", formato: "dias" },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido", formato: "moneda", destacada: true },
  ],
});
