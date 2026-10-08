import { definirCalculadora, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";
import { enMeses, maxFecha, periodoQueContiene, textoTiempo, tiempoTrabajado } from "../lib/fechas";
import { diasProporcionales } from "../lib/vacaciones";

// Un día de vacaciones vale la treintava parte del sueldo (art. 71: 1/24 del año por quince días).
const DIAS_DEL_MES = 30;
// Acuerdo MDT-2015-0087, art. 5: el décimo tercero va del 1 de diciembre al 30 de noviembre.
const MES_INICIO_DECIMO_TERCERO = 12;

export default definirCalculadora({
  id: "ec.liquidacion",
  mercado: "ec",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.desahucio": "numero",
    "ec.despido-anios-base": "numero",
    "ec.despido-meses-minimo": "numero",
    "ec.despido-meses-maximo": "numero",
    "ec.decimo-cuarto-mes-inicio": "numero-por-region",
    "ec.vacaciones-dias": "numero",
    "ec.vacaciones-anios-sin-adicional": "numero",
    "ec.vacaciones-adicionales-max": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "salida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "remuneracion",
      tipo: "moneda",
      etiqueta: "Última remuneración mensual",
      ayuda: "Sueldo más horas extra y comisiones habituales. Sin décimos, utilidades ni fondo de reserva.",
      min: 0,
    },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó la relación laboral",
      opciones: [
        { valor: "despido", etiqueta: "Me despidieron sin causa (despido intempestivo)" },
        { valor: "renuncia", etiqueta: "Renuncié con aviso escrito (desahucio)" },
        { valor: "acuerdo", etiqueta: "Por acuerdo entre las partes" },
        { valor: "visto-bueno", etiqueta: "Visto bueno pedido por el empleador" },
      ],
      porDefecto: "despido",
    },
    { id: "region", tipo: "region", etiqueta: "Región donde trabajabas", porDefecto: "sierra" },
    { id: "decimos", tipo: "si-no", etiqueta: "Cobrabas los décimos cada mes", porDefecto: true },
    {
      id: "pendientes",
      tipo: "numero",
      etiqueta: "Días de vacaciones de años anteriores sin tomar",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salida < entrada.inicio) throw new ErrorEntrada("El último día tiene que ser posterior a la fecha en que empezaste.", "salida");
    const rem = entrada.remuneracion;
    const t = tiempoTrabajado(entrada.inicio, entrada.salida);
    const conFraccion = t.meses > 0 || t.dias > 0;

    const conBonificacion = entrada.motivo !== "visto-bueno";
    const desahucio = conBonificacion ? redondear(porcentaje(rem, valores["ec.desahucio"]) * t.anios) : 0;

    let mesesDespido = 0;
    if (entrada.motivo === "despido") {
      const base = valores["ec.despido-anios-base"];
      const hastaBase = t.anios < base || (t.anios === base && !conFraccion);
      mesesDespido = hastaBase ? valores["ec.despido-meses-minimo"] : Math.min(t.anios + (conFraccion ? 1 : 0), valores["ec.despido-meses-maximo"]);
    }
    const despido = redondear(rem * mesesDespido);

    const proporcional = (mesInicio: number) => {
      const periodo = periodoQueContiene(entrada.salida, mesInicio);
      return Math.min(12, enMeses(tiempoTrabajado(maxFecha(entrada.inicio, periodo.inicio), entrada.salida)));
    };
    const decimoTercero = entrada.decimos ? 0 : redondear((rem * proporcional(MES_INICIO_DECIMO_TERCERO)) / 12);
    const mesCuarto = porRegion(valores["ec.decimo-cuarto-mes-inicio"], entrada.region);
    const decimoCuarto = entrada.decimos ? 0 : redondear((valores["ec.sbu"] * proporcional(mesCuarto)) / 12);

    const reglas = {
      dias: valores["ec.vacaciones-dias"],
      aniosSinAdicional: valores["ec.vacaciones-anios-sin-adicional"],
      adicionalesMax: valores["ec.vacaciones-adicionales-max"],
    };
    const valorDia = rem / DIAS_DEL_MES;
    const vacaciones = redondear(diasProporcionales(t, reglas) * valorDia + entrada.pendientes * valorDia);

    const observaciones: string[] = [];
    if (conBonificacion && t.anios === 0) observaciones.push("Con menos de un año no hay años completos para la bonificación por desahucio.");
    if (entrada.motivo === "despido") observaciones.push("Para el despido se usa la última remuneración o la mejor entre el mes del despido y el anterior.");
    if (entrada.decimos) observaciones.push("Como cobrabas los décimos cada mes, no quedan décimos pendientes.");
    observaciones.push("El fondo de reserva no entra: si lo cobrabas cada mes ya lo recibiste, y si estaba en el IESS lo retiras allí.");

    return {
      antiguedad: textoTiempo(t),
      desahucio,
      mesesDespido,
      despido,
      decimoTercero,
      decimoCuarto,
      vacaciones,
      total: redondear(desahucio + despido + decimoTercero + decimoCuarto + vacaciones),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "desahucio", etiqueta: "Bonificación por desahucio", formato: "moneda", ocultarSiCero: true },
    { clave: "mesesDespido", etiqueta: "Meses de indemnización por despido", formato: "meses", ocultarSiCero: true },
    { clave: "despido", etiqueta: "Indemnización por despido intempestivo", formato: "moneda", ocultarSiCero: true },
    { clave: "decimoTercero", etiqueta: "Décimo tercero proporcional", formato: "moneda", ocultarSiCero: true },
    { clave: "decimoCuarto", etiqueta: "Décimo cuarto proporcional", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Vacaciones proporcionales y pendientes", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
