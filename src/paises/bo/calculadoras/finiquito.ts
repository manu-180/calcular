import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasCorridosInclusive, textoTiempo, tiempoEntre } from "../lib/fechas";
import { diasDeVacacion, diasProporcionales, duodecimasDeGestion, montoDuodecimas, montoPorTiempo } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.finiquito",
  mercado: "bo",
  concepto: "liquidacion-final",
  slug: "finiquito",
  estado: "publicado",
  requiere: {
    "bo.indemnizacion-dias-minimos": "numero",
    "bo.desahucio-sueldos": "numero",
    "bo.quinquenio-anios": "numero",
    "bo.vacaciones-dias": "mapa",
    "bo.aguinaldo-meses-minimos": "mapa",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el trabajo",
      opciones: [
        { valor: "despido", etiqueta: "Me despidieron sin causa justificada" },
        { valor: "renuncia", etiqueta: "Renuncié (retiro voluntario)" },
        { valor: "fin-contrato", etiqueta: "Terminó mi contrato a plazo fijo" },
        { valor: "despido-justificado", etiqueta: "Me despidieron por una causa del artículo 16 de la Ley General del Trabajo" },
      ],
      porDefecto: "despido",
    },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Promedio del total ganado de los últimos 3 meses",
      ayuda: "Es el salario promedio indemnizable: sume el total ganado de los 3 meses anteriores al retiro y divida por 3.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "retiro", tipo: "fecha", etiqueta: "Fecha de retiro", porDefecto: "hoy" },
    {
      id: "vacacionesPendientes",
      tipo: "numero",
      etiqueta: "Días de vacación de gestiones anteriores que no tomó",
      ayuda: "Días hábiles de años ya cumplidos. Si no le quedan, deje 0.",
      min: 0,
      max: 300,
      porDefecto: 0,
    },
    {
      id: "quinquenios",
      tipo: "entero",
      etiqueta: "Quinquenios que ya cobró",
      ayuda: "Cada quinquenio cobrado ya pagó la indemnización de 5 años, que se descuentan.",
      min: 0,
      max: 10,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.retiro < entrada.ingreso) throw new ErrorEntrada("La fecha de retiro tiene que ser posterior a la de ingreso.", "retiro");
    const t = tiempoEntre(entrada.ingreso, entrada.retiro);
    const aniosQuinquenio = valores["bo.quinquenio-anios"];
    const aniosCobrados = entrada.quinquenios * aniosQuinquenio;
    if (aniosCobrados > t.anios) throw new ErrorEntrada("Cobró más quinquenios que los años que trabajó. Revise el dato.", "quinquenios");

    const superaMinimo = diasCorridosInclusive(entrada.ingreso, entrada.retiro) > valores["bo.indemnizacion-dias-minimos"];
    const conCausa = entrada.motivo === "despido-justificado";
    const indemnizacion = superaMinimo && !conCausa ? montoPorTiempo(entrada.sueldo, { ...t, anios: t.anios - aniosCobrados }, redondear) : 0;
    const desahucio = superaMinimo && entrada.motivo === "despido" ? redondear(entrada.sueldo * valores["bo.desahucio-sueldos"]) : 0;

    const minimoAguinaldo = enMapa(valores["bo.aguinaldo-meses-minimos"], "empleado");
    const d = duodecimasDeGestion(entrada.ingreso, entrada.retiro, minimoAguinaldo);
    const aguinaldo = d.alcanzaMinimo ? montoDuodecimas(entrada.sueldo, d, redondear) : 0;

    const sueldoDiario = entrada.sueldo / 30;
    const vacacionesGestiones = redondear(sueldoDiario * entrada.vacacionesPendientes);
    const diasFraccion = t.anios >= 1 ? diasProporcionales(diasDeVacacion(valores["bo.vacaciones-dias"], t.anios + 1), t) : 0;
    const vacacionFraccion = redondear(sueldoDiario * diasFraccion);

    const observaciones: string[] = [
      "Son montos brutos. El empleador tiene 15 días calendario desde el retiro para pagar; si se atrasa, paga un 30 % más.",
    ];
    if (!superaMinimo) observaciones.push(`Con ${valores["bo.indemnizacion-dias-minimos"]} días de trabajo o menos no hay indemnización ni desahucio.`);
    if (conCausa) observaciones.push("Con una causa del artículo 16 no hay indemnización ni desahucio. El aguinaldo y las vacaciones se pagan igual.");
    if (entrada.motivo !== "despido" && !conCausa) observaciones.push("El desahucio solo se paga en un despido sin causa justificada.");
    if (!d.alcanzaMinimo) observaciones.push(`No hay aguinaldo porque en esta gestión trabajó menos de ${minimoAguinaldo} meses seguidos.`);
    if (t.anios < 1) observaciones.push("La vacación proporcional se paga después del primer año cumplido.");
    if (aniosCobrados > 0) observaciones.push(`Descontamos ${aniosCobrados} años ya pagados con quinquenios.`);

    return {
      antiguedad: textoTiempo(t),
      indemnizacion,
      desahucio,
      aguinaldo,
      vacacionesGestiones,
      diasFraccion: redondear(diasFraccion),
      vacacionFraccion,
      total: redondear(indemnizacion + desahucio + aguinaldo + vacacionesGestiones + vacacionFraccion),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "indemnizacion", etiqueta: "Indemnización por tiempo de servicios", formato: "moneda", ocultarSiCero: true },
    { clave: "desahucio", etiqueta: "Desahucio", formato: "moneda", ocultarSiCero: true },
    { clave: "aguinaldo", etiqueta: "Aguinaldo por duodécimas", formato: "moneda", ocultarSiCero: true },
    { clave: "vacacionesGestiones", etiqueta: "Vacaciones de gestiones anteriores", formato: "moneda", ocultarSiCero: true },
    { clave: "diasFraccion", etiqueta: "Días de vacación por fracción", formato: "dias", decimales: 2, ocultarSiCero: true },
    { clave: "vacacionFraccion", etiqueta: "Vacación por fracción", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total del finiquito", formato: "moneda", destacada: true },
  ],
});
