import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { cesantia, DIAS_MES, textoTiempo, tiempoTrabajado, tramoPreaviso, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "hn.prestaciones-laborales",
  mercado: "hn",
  concepto: "indemnizacion-despido",
  slug: "prestaciones-laborales",
  estado: "publicado",
  requiere: {
    "hn.preaviso-dias": "mapa",
    "hn.cesantia-dias-menos-de-un-anio": "mapa",
    "hn.cesantia-tope-meses": "mapa",
    "hn.cesantia-renuncia-porcentaje": "numero",
    "hn.cesantia-renuncia-anios": "numero",
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
        { valor: "despido", etiqueta: "Me despidieron sin causa justificada" },
        { valor: "renuncia", etiqueta: "Renuncié" },
      ],
      porDefecto: "despido",
    },
    { id: "preavisoDado", tipo: "si-no", etiqueta: "El patrono le dio el preaviso por escrito y lo trabajó", porDefecto: false },
    { id: "microempresa", tipo: "si-no", etiqueta: "La empresa tiene 10 empleados o menos", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const diario = entrada.salario / DIAS_MES;
    const tope = enMapa(valores["hn.cesantia-tope-meses"], entrada.microempresa ? "microempresa" : "general");
    const c = cesantia(t, valores["hn.cesantia-dias-menos-de-un-anio"], tope);
    const observaciones: string[] = [];

    let diasPreaviso = 0;
    let cesantiaMonto = 0;
    if (entrada.motivo === "despido") {
      if (!entrada.preavisoDado) diasPreaviso = enMapa(valores["hn.preaviso-dias"], tramoPreaviso(t));
      else observaciones.push("Si le dieron el preaviso y lo trabajó, no se paga aparte.");
      cesantiaMonto = redondear(entrada.salario * c.meses);
      if (c.meses === 0) observaciones.push("Con menos de tres meses de trabajo no corresponde auxilio de cesantía.");
      if (c.topada) observaciones.push(`La cesantía tiene un tope de ${tope} meses de salario, aunque usted trabajó más.`);
    } else {
      observaciones.push("Si renuncia, usted es quien debe dar el preaviso al patrono. No se le paga preaviso.");
      const anios = valores["hn.cesantia-renuncia-anios"];
      if (entrada.microempresa) observaciones.push("En una microempresa la renuncia no da derecho a cesantía.");
      else if (t.anios < anios) observaciones.push(`Al renunciar, la cesantía solo corresponde con ${anios} años o más de trabajo continuo.`);
      else {
        cesantiaMonto = redondear(porcentaje(entrada.salario * c.meses, valores["hn.cesantia-renuncia-porcentaje"]));
        observaciones.push(`Con ${anios} años o más, al renunciar cobra el ${valores["hn.cesantia-renuncia-porcentaje"]} % de la cesantía que le tocaría por despido.`);
        if (c.topada) observaciones.push(`La cuenta usa el tope de ${tope} meses de salario.`);
      }
    }
    observaciones.push("Aparte de esto le corresponden las vacaciones y los décimos tercer y cuarto mes proporcionales.");

    const preaviso = redondear(diario * diasPreaviso);
    return {
      tiempo: textoTiempo(t),
      salarioDiario: redondear(diario),
      diasPreaviso,
      preaviso,
      mesesCesantia: cesantiaMonto > 0 ? c.meses : null,
      cesantia: cesantiaMonto,
      total: redondear(preaviso + cesantiaMonto),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "salarioDiario", etiqueta: "Salario diario (promedio entre 30)", formato: "moneda" },
    { clave: "diasPreaviso", etiqueta: "Días de preaviso", formato: "dias", ocultarSiCero: true },
    { clave: "preaviso", etiqueta: "Preaviso", formato: "moneda" },
    { clave: "mesesCesantia", etiqueta: "Meses de salario de cesantía", formato: "numero", decimales: 2 },
    { clave: "cesantia", etiqueta: "Auxilio de cesantía", formato: "moneda" },
    { clave: "total", etiqueta: "Total de prestaciones", formato: "moneda", destacada: true },
  ],
});
