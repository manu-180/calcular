import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { antiguedad, diasInclusive, fecha, finDeServicio, mayor, sumarMeses } from "../lib/fechas";
import { aniosIndemnizables, claveVacaciones, diasPreaviso } from "../lib/laboral";

export default definirCalculadora({
  id: "py.liquidacion",
  mercado: "py",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "py.indemnizacion-dias-por-anio": "numero",
    "py.preaviso-dias": "mapa",
    "py.vacaciones-dias": "mapa",
    "py.divisor-salario-diario": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo termina el trabajo",
      opciones: [
        { valor: "despido", etiqueta: "Me despidieron sin causa" },
        { valor: "renuncia", etiqueta: "Renuncié" },
        { valor: "despido-con-causa", etiqueta: "Me despidieron con causa justificada" },
      ],
      porDefecto: "despido",
    },
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
      id: "preavisoCumplido",
      tipo: "si-no",
      etiqueta: "Se dio el preaviso y se trabajó",
      ayuda: "En un despido sin causa, si no te avisaron con anticipación, dejalo en No. Si renunciaste sin avisar, también.",
      porDefecto: false,
    },
    {
      id: "cobradoEnElAnio",
      tipo: "moneda",
      etiqueta: "Total cobrado este año, desde enero",
      ayuda: "Salario, horas extra y comisiones. Si lo dejás vacío, lo estimamos con tu salario promedio.",
      min: 0,
      requerido: false,
    },
    {
      id: "vacacionesPendientes",
      tipo: "entero",
      etiqueta: "Días de vacaciones ya ganadas que no tomaste",
      ayuda: "Las de años de servicio ya cumplidos. Si no te quedan, dejá 0.",
      min: 0,
      max: 120,
      porDefecto: 0,
    },
    {
      id: "vacacionesVencidas",
      tipo: "si-no",
      etiqueta: "Pasaron más de 6 meses desde que ganaste esas vacaciones",
      ayuda: "Si te despiden después de ese plazo, se pagan el doble.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.egreso < entrada.ingreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "egreso");
    const a = antiguedad(entrada.ingreso, entrada.egreso);
    const diario = entrada.salario / valores["py.divisor-salario-diario"];
    const sinCausa = entrada.motivo === "despido";
    const esDespido = entrada.motivo !== "renuncia";

    const diasDePreaviso = diasPreaviso(valores["py.preaviso-dias"], a);
    // Art. 90: el empleador que omite el preaviso paga el salario del período; el trabajador que lo
    // omite debe la mitad. En el despido con causa no hay preaviso (art. 87, salvo arts. 81 y 84).
    const preaviso = sinCausa && !entrada.preavisoCumplido ? redondear(diario * diasDePreaviso) : 0;
    const descuentoPreaviso = entrada.motivo === "renuncia" && !entrada.preavisoCumplido ? redondear((diario * diasDePreaviso) / 2) : 0;

    const indemnizacion = sinCausa ? redondear(diario * valores["py.indemnizacion-dias-por-anio"] * aniosIndemnizables(entrada.ingreso, entrada.egreso)) : 0;

    // Art. 221: las vacaciones causadas se pagan siempre; son dobles si el despido llega después del
    // período de goce (seis meses, art. 222).
    const factorVacaciones = esDespido && entrada.vacacionesVencidas ? 2 : 1;
    const vacacionesCausadas = redondear(diario * entrada.vacacionesPendientes * factorVacaciones);

    let diasProporcionales = 0;
    if (sinCausa) {
      const aniversario = sumarMeses(entrada.ingreso, a.anios * 12);
      const siguiente = sumarMeses(entrada.ingreso, (a.anios + 1) * 12);
      const fraccion = diasEntre(aniversario, finDeServicio(entrada.egreso)) / diasEntre(aniversario, siguiente);
      diasProporcionales = enMapa(valores["py.vacaciones-dias"], claveVacaciones(a.anios + 1)) * fraccion;
    }
    const vacacionesProporcionales = redondear(diario * diasProporcionales);

    const anio = Number(entrada.egreso.slice(0, 4));
    const inicioAnio = mayor(fecha(anio, 1, 1), entrada.ingreso);
    const estimado = entrada.cobradoEnElAnio === null;
    const cobrado = estimado ? (entrada.salario * diasInclusive(inicioAnio, entrada.egreso)) / valores["py.divisor-salario-diario"] : entrada.cobradoEnElAnio;
    const aguinaldo = redondear(cobrado / 12);

    const observaciones: string[] = ["Son montos brutos, antes de descuentos. El aguinaldo no paga aporte al IPS."];
    if (estimado) observaciones.push("Estimamos lo cobrado en el año con tu salario promedio y los días trabajados desde enero.");
    if (descuentoPreaviso > 0) observaciones.push("Si renunciás sin dar preaviso, el empleador puede descontarte la mitad del salario de ese período.");
    if (entrada.motivo === "despido-con-causa") observaciones.push("Con causa justificada no hay indemnización ni preaviso. Si la causa no se prueba, el despido pasa a ser sin causa.");
    if (sinCausa && a.anios >= 10) observaciones.push("Con diez años o más tenés estabilidad, y en algunos casos la indemnización es el doble.");

    return {
      antiguedad: `${a.anios} ${a.anios === 1 ? "año" : "años"}, ${a.meses} ${a.meses === 1 ? "mes" : "meses"} y ${a.dias} ${a.dias === 1 ? "día" : "días"}`,
      preaviso,
      indemnizacion,
      vacacionesCausadas,
      diasProporcionales,
      vacacionesProporcionales,
      aguinaldo,
      descuentoPreaviso: descuentoPreaviso === 0 ? 0 : -descuentoPreaviso,
      total: redondear(preaviso + indemnizacion + vacacionesCausadas + vacacionesProporcionales + aguinaldo - descuentoPreaviso),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "texto" },
    { clave: "preaviso", etiqueta: "Preaviso no otorgado", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido", formato: "moneda", ocultarSiCero: true },
    { clave: "vacacionesCausadas", etiqueta: "Vacaciones ganadas no tomadas", formato: "moneda", ocultarSiCero: true },
    { clave: "diasProporcionales", etiqueta: "Días de vacaciones proporcionales", formato: "dias", decimales: 2, ocultarSiCero: true },
    { clave: "vacacionesProporcionales", etiqueta: "Vacaciones proporcionales", formato: "moneda", ocultarSiCero: true },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "descuentoPreaviso", etiqueta: "Descuento por no dar preaviso", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
