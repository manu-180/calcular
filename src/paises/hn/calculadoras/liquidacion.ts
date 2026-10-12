import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import {
  cesantia,
  decimoProporcional,
  MES_INICIO_DECIMO_CUARTO,
  MES_INICIO_DECIMO_TERCERO,
  salarioDiario,
  textoTiempo,
  tiempoTrabajado,
  tramoPreaviso,
  vacacionesProporcionales,
  validarFechas,
} from "../reglas";

export default definirCalculadora({
  id: "hn.liquidacion",
  mercado: "hn",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "hn.preaviso-dias": "mapa",
    "hn.cesantia-dias-menos-de-un-anio": "mapa",
    "hn.cesantia-tope-meses": "mapa",
    "hn.cesantia-renuncia-porcentaje": "numero",
    "hn.cesantia-renuncia-anios": "numero",
    "hn.vacaciones-dias": "mapa",
    "hn.decimo-tercero": "numero",
    "hn.decimo-cuarto": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos seis meses",
      ayuda: "Todo lo que ganó: salario, horas extra y comisiones.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el trabajo",
      opciones: [
        { valor: "despido", etiqueta: "Despido sin causa justificada" },
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "despido-justificado", etiqueta: "Despido con causa justificada" },
      ],
      porDefecto: "despido",
    },
    { id: "preavisoDado", tipo: "si-no", etiqueta: "El patrono le dio el preaviso por escrito y lo trabajó", porDefecto: false },
    { id: "microempresa", tipo: "si-no", etiqueta: "La empresa tiene 10 empleados o menos", porDefecto: false },
    {
      id: "diasPendientes",
      tipo: "numero",
      etiqueta: "Días de vacaciones ganadas que no tomó",
      min: 0,
      porDefecto: 0,
      ayuda: "Solo los de años ya cumplidos. La parte del año en curso la calculamos nosotros.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const diario = salarioDiario(entrada.salario);
    const despido = entrada.motivo === "despido";
    const observaciones: string[] = [];

    const diasPreaviso = despido && !entrada.preavisoDado ? enMapa(valores["hn.preaviso-dias"], tramoPreaviso(t)) : 0;
    const preaviso = redondear(diario * diasPreaviso);

    const tope = enMapa(valores["hn.cesantia-tope-meses"], entrada.microempresa ? "microempresa" : "general");
    const c = cesantia(t, valores["hn.cesantia-dias-menos-de-un-anio"], tope);
    let cesantiaMonto = 0;
    if (despido) cesantiaMonto = redondear(entrada.salario * c.meses);
    else if (entrada.motivo === "renuncia") {
      const anios = valores["hn.cesantia-renuncia-anios"];
      if (!entrada.microempresa && t.anios >= anios) {
        cesantiaMonto = redondear(porcentaje(entrada.salario * c.meses, valores["hn.cesantia-renuncia-porcentaje"]));
        observaciones.push(`Con ${anios} años o más, al renunciar cobra el ${valores["hn.cesantia-renuncia-porcentaje"]} % de la cesantía.`);
      }
      observaciones.push("Al renunciar, usted es quien debe dar el preaviso. No se le paga preaviso.");
    } else observaciones.push("Con un despido justificado no se pagan preaviso ni cesantía, pero sí lo ya ganado.");
    if (despido && c.topada) observaciones.push(`La cesantía llega a su tope de ${tope} meses de salario.`);

    const vacacionesPendientes = redondear(diario * entrada.diasPendientes);
    const vp = despido ? vacacionesProporcionales(valores["hn.vacaciones-dias"], entrada.fechaIngreso, entrada.fechaSalida) : { dias: 0 };
    const diasVacacionesProporcionales = redondear(vp.dias);
    const vacacionesProp = redondear(diario * diasVacacionesProporcionales);
    if (!despido) observaciones.push("Las vacaciones del año en curso se pagan en proporción solo cuando el contrato termina por causa del patrono.");

    const d13 = decimoProporcional(entrada.salario, valores["hn.decimo-tercero"], entrada.fechaIngreso, entrada.fechaSalida, MES_INICIO_DECIMO_TERCERO);
    const d14 = decimoProporcional(entrada.salario, valores["hn.decimo-cuarto"], entrada.fechaIngreso, entrada.fechaSalida, MES_INICIO_DECIMO_CUARTO);
    const decimoTercero = redondear(d13.monto);
    const decimoCuarto = redondear(d14.monto);
    observaciones.push("Los décimos se calculan desde el último pago (1 de enero y 1 de julio). Si le deben alguno anterior, súmelo.");

    return {
      tiempo: textoTiempo(t),
      preaviso,
      cesantia: cesantiaMonto,
      vacacionesPendientes,
      diasVacacionesProporcionales,
      vacacionesProporcionales: vacacionesProp,
      decimoTercero,
      decimoCuarto,
      total: redondear(preaviso + cesantiaMonto + vacacionesPendientes + vacacionesProp + decimoTercero + decimoCuarto),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "preaviso", etiqueta: "Preaviso", formato: "moneda", ocultarSiCero: true },
    { clave: "cesantia", etiqueta: "Auxilio de cesantía", formato: "moneda", ocultarSiCero: true },
    { clave: "vacacionesPendientes", etiqueta: "Vacaciones ganadas sin tomar", formato: "moneda", ocultarSiCero: true },
    { clave: "diasVacacionesProporcionales", etiqueta: "Días de vacaciones proporcionales", formato: "dias", decimales: 2, ocultarSiCero: true },
    { clave: "vacacionesProporcionales", etiqueta: "Vacaciones proporcionales", formato: "moneda", ocultarSiCero: true },
    { clave: "decimoTercero", etiqueta: "Décimo tercer mes proporcional", formato: "moneda" },
    { clave: "decimoCuarto", etiqueta: "Décimo cuarto mes proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
