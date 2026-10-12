import { definirCalculadora, enMapa, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";
import { diasPeriodoAguinaldo, servicio, textoServicio, tramoAguinaldo } from "../lib/fechas";

const DIAS_DEL_MES = 30;
const DIAS_DEL_ANIO = 365;

// Despido sin causa justificada: indemnización (art. 58), vacaciones proporcionales (art. 187) y
// aguinaldo proporcional (art. 202). Con renuncia rige otra ley y tiene su propia calculadora.
export default definirCalculadora({
  id: "sv.liquidacion",
  mercado: "sv",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "sv.salario-minimo-diario": "numero-por-region",
    "sv.indemnizacion-dias-por-anio": "numero",
    "sv.indemnizacion-dias-minimo": "numero",
    "sv.indemnizacion-tope": "numero",
    "sv.vacaciones-dias": "numero",
    "sv.vacaciones-recargo": "numero",
    "sv.aguinaldo-dias": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Su salario básico, sin horas extra.", min: 0 },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    { id: "fin", tipo: "fecha", etiqueta: "Último día trabajado", porDefecto: "hoy" },
    { id: "region", tipo: "region", etiqueta: "Sector de la empresa", porDefecto: "comercio-servicios" },
    {
      id: "vacacionesPendientes",
      tipo: "si-no",
      etiqueta: "Tiene vacaciones de un año completo sin gozar",
      ayuda: "Marque sí si ya cumplió un año desde sus últimas vacaciones y no se las dieron.",
      porDefecto: false,
    },
    {
      id: "diasPendientes",
      tipo: "entero",
      etiqueta: "Días de salario que le deben del último período",
      min: 0,
      max: 31,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fin < entrada.inicio) throw new ErrorEntrada("El último día trabajado tiene que ser posterior a la fecha de inicio.", "fin");
    const s = servicio(entrada.inicio, entrada.fin);
    const diario = entrada.salario / DIAS_DEL_MES;

    const tope = valores["sv.indemnizacion-tope"] * porRegion(valores["sv.salario-minimo-diario"], entrada.region);
    const diarioIndemnizacion = Math.min(diario, tope);
    const porAnio = valores["sv.indemnizacion-dias-por-anio"];
    const diasIndemnizacion = Math.max(porAnio * s.anios + (porAnio * s.diasRestantes) / DIAS_DEL_ANIO, valores["sv.indemnizacion-dias-minimo"]);
    const indemnizacion = redondear(diarioIndemnizacion * diasIndemnizacion);

    const diasVacaciones = (valores["sv.vacaciones-dias"] * s.diasRestantes) / DIAS_DEL_ANIO + (entrada.vacacionesPendientes ? valores["sv.vacaciones-dias"] : 0);
    const salarioVacaciones = diario * diasVacaciones;
    const vacaciones = redondear(salarioVacaciones + porcentaje(salarioVacaciones, valores["sv.vacaciones-recargo"]));

    const diasDelPeriodo = diasPeriodoAguinaldo(entrada.inicio, entrada.fin);
    const diasAguinaldo = (enMapa(valores["sv.aguinaldo-dias"], tramoAguinaldo(s.anios)) * diasDelPeriodo) / DIAS_DEL_ANIO;
    const aguinaldo = redondear(diario * diasAguinaldo);

    const salarioPendiente = redondear(diario * entrada.diasPendientes);
    const observaciones: string[] = [];
    if (diario > tope) observaciones.push("Para la indemnización su salario diario pasa el tope de la ley, así que se usa el tope.");
    observaciones.push("La indemnización no paga renta, ISSS ni AFP. El salario pendiente sí lleva descuentos.");
    observaciones.push("Si ya le pagaron el aguinaldo de este año, el proporcional se cuenta desde el 13 de diciembre.");
    return {
      tiempo: textoServicio(s),
      indemnizacion,
      vacaciones,
      aguinaldo,
      salarioPendiente,
      total: redondear(indemnizacion + vacaciones + aguinaldo + salarioPendiente),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones con recargo", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "salarioPendiente", etiqueta: "Salario pendiente", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
