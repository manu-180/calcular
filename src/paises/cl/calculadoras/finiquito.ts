import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, fechaChilena, feriadoEnCalendario } from "../lib/fechas";

// Contratos firmados antes de esta fecha y vigentes al 1/12/1990 no tienen el tope de 11 años
// (Código del Trabajo, artículo 7 transitorio).
const SIN_TOPE_ANTES_DE = "1981-08-14";

export default definirCalculadora({
  id: "cl.finiquito",
  mercado: "cl",
  concepto: "liquidacion-final",
  slug: "finiquito",
  estado: "publicado",
  requiere: {
    "cl.indemnizacion-dias-por-anio": "numero",
    "cl.indemnizacion-tope-dias": "numero",
    "cl.tope-indemnizacion": "numero",
    "cl.feriado-anual": "numero",
    "cl.feriado-anual-austral": "numero",
    "cl.uf": "serie",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "termino", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "remuneracion",
      tipo: "moneda",
      etiqueta: "Última remuneración mensual",
      ayuda: "Sueldo más lo fijo que recibes cada mes (colación, movilización, cotizaciones). Sin horas extra ni gratificación anual.",
      min: 0,
    },
    {
      id: "causal",
      tipo: "opcion",
      etiqueta: "Motivo del término",
      opciones: [
        { valor: "necesidades-empresa", etiqueta: "Necesidades de la empresa (despido, art. 161)" },
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "otra", etiqueta: "Mutuo acuerdo, fin del plazo u otra causal" },
      ],
      porDefecto: "necesidades-empresa",
    },
    { id: "avisoPrevio", tipo: "si-no", etiqueta: "Te avisaron con 30 días o más de anticipación", porDefecto: false },
    {
      id: "diasPendientes",
      tipo: "numero",
      etiqueta: "Días hábiles de vacaciones de años anteriores sin tomar",
      min: 0,
      max: 365,
      porDefecto: 0,
    },
    { id: "zonaAustral", tipo: "si-no", etiqueta: "Trabajas en Magallanes, Aysén o Palena", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.inicio) throw new ErrorEntrada("El último día tiene que ser posterior a la fecha en que empezaste.", "termino");
    const a = antiguedad(entrada.inicio, entrada.termino);
    const tope = redondear(valores["cl.tope-indemnizacion"] * valores["cl.uf"].valor);
    const base = Math.min(entrada.remuneracion, tope);
    const despido = entrada.causal === "necesidades-empresa";

    const masDeSeisMeses = a.meses > 6 || (a.meses === 6 && a.dias > 0);
    const aniosServicio = a.anios + (masDeSeisMeses ? 1 : 0);
    const sinTope = entrada.inicio < SIN_TOPE_ANTES_DE;
    const diasPorAnio = valores["cl.indemnizacion-dias-por-anio"];
    const diasIndemnizacion = despido && a.anios >= 1 ? (sinTope ? aniosServicio * diasPorAnio : Math.min(aniosServicio * diasPorAnio, valores["cl.indemnizacion-tope-dias"])) : 0;
    const indemnizacionAnios = redondear((base * diasIndemnizacion) / 30);
    const indemnizacionAviso = despido && !entrada.avisoPrevio ? base : 0;

    const feriadoAnual = entrada.zonaAustral ? valores["cl.feriado-anual-austral"] : valores["cl.feriado-anual"];
    const porMes = feriadoAnual / 12;
    const habilesProporcionales = porMes * a.meses + (porMes / 30) * a.dias;
    const habiles = habilesProporcionales + entrada.diasPendientes;
    const calendario = feriadoEnCalendario(entrada.termino, habiles);
    const diasFeriado = habiles + calendario.inhabiles;
    const feriado = redondear((entrada.remuneracion / 30) * diasFeriado);

    const observaciones: string[] = [];
    if (despido && a.anios < 1) observaciones.push("Con menos de un año de contrato no corresponde indemnización por años de servicio.");
    if (despido && sinTope && a.anios >= 1) observaciones.push("Como entraste antes del 14 de agosto de 1981, tu indemnización no tiene el tope de 11 años.");
    if (entrada.remuneracion > tope && (indemnizacionAnios > 0 || indemnizacionAviso > 0)) observaciones.push("Tu remuneración pasa el tope legal: las indemnizaciones se calculan con el tope.");
    if (diasFeriado > 0) observaciones.push(`Las vacaciones se cuentan hasta el ${fechaChilena(calendario.hasta)}, sumando sábados y domingos. Si en ese período cae un festivo en día hábil, se suma un día más por cada uno.`);

    return {
      antiguedad: `${a.anios} ${a.anios === 1 ? "año" : "años"}, ${a.meses} ${a.meses === 1 ? "mes" : "meses"} y ${a.dias} ${a.dias === 1 ? "día" : "días"}`,
      base,
      aniosServicio: despido ? aniosServicio : 0,
      indemnizacionAnios,
      indemnizacionAviso,
      diasFeriado,
      feriado,
      total: indemnizacionAnios + indemnizacionAviso + feriado,
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "texto" },
    { clave: "base", etiqueta: "Base para las indemnizaciones", formato: "moneda" },
    { clave: "aniosServicio", etiqueta: "Años que se indemnizan", formato: "anios", ocultarSiCero: true },
    { clave: "indemnizacionAnios", etiqueta: "Indemnización por años de servicio", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacionAviso", etiqueta: "Indemnización sustitutiva del aviso previo", formato: "moneda", ocultarSiCero: true },
    { clave: "diasFeriado", etiqueta: "Días de vacaciones a pagar (corridos)", formato: "dias", decimales: 2 },
    { clave: "feriado", etiqueta: "Vacaciones pendientes y proporcionales", formato: "moneda" },
    { clave: "total", etiqueta: "Total del finiquito", formato: "moneda", destacada: true },
  ],
});
