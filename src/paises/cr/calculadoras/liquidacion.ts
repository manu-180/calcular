import { definirCalculadora } from "@/motor/calculo";
import { cesantia, cumpleUnMes, diasPreaviso, mesesEnPeriodo, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "cr.liquidacion",
  mercado: "cr",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.preaviso-dias": "mapa",
    "cr.cesantia-dias-menos-de-un-anio": "mapa",
    "cr.cesantia-dias-por-anio": "mapa",
    "cr.cesantia-tope-anios": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos seis meses",
      ayuda: "Bruto, con horas extra y comisiones incluidas.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó la relación laboral",
      opciones: [
        { valor: "despido", etiqueta: "Despido sin justa causa (con responsabilidad patronal)" },
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "justa-causa", etiqueta: "Despido con justa causa" },
      ],
      porDefecto: "despido",
    },
    {
      id: "preavisoDado",
      tipo: "si-no",
      etiqueta: "El patrono le avisó del despido con la anticipación de ley",
      ayuda: "Si lo despidieron de un día para otro, marque que no.",
      porDefecto: false,
    },
    {
      id: "vacaciones",
      tipo: "numero",
      etiqueta: "Días de vacaciones que no disfrutó",
      ayuda: "Si no lo sabe, cuente un día por cada mes trabajado desde sus últimas vacaciones.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "salariosAguinaldo",
      tipo: "moneda",
      etiqueta: "Salarios ganados desde el 1 de diciembre",
      ayuda: "Si lo deja vacío, lo estimamos con su salario promedio.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaSalida, motivo } = entrada;
    validarFechas(fechaIngreso, fechaSalida);
    const t = tiempoTrabajado(fechaIngreso, fechaSalida);
    const diario = salario / valores["cr.dias-mes-planilla"];

    const conResponsabilidad = motivo === "despido";
    const dPreaviso = conResponsabilidad && !entrada.preavisoDado ? diasPreaviso(t, valores["cr.preaviso-dias"]) : 0;
    const ces = conResponsabilidad
      ? cesantia(t, valores["cr.cesantia-dias-menos-de-un-anio"], valores["cr.cesantia-dias-por-anio"], valores["cr.cesantia-tope-anios"])
      : null;

    const preaviso = redondear(diario * dPreaviso);
    const diasCesantia = ces?.dias ?? 0;
    const montoCesantia = redondear(diario * diasCesantia);
    const vacaciones = redondear(diario * entrada.vacaciones);
    const baseAguinaldo = entrada.salariosAguinaldo ?? salario * mesesEnPeriodo(fechaIngreso, fechaSalida);
    const aguinaldo = cumpleUnMes(t) ? redondear(baseAguinaldo / 12) : 0;

    const observaciones: string[] = [];
    if (conResponsabilidad && diasCesantia === 0) observaciones.push("Con menos de tres meses de trabajo no corresponden ni preaviso ni cesantía.");
    if (ces && ces.aniosComputables > ces.aniosPagados) observaciones.push(`La cesantía se paga por ${ces.aniosPagados} años como máximo, aunque usted trabajó más.`);
    if (motivo === "renuncia") observaciones.push("Si renunció sin dar el preaviso, el patrono puede rebajar de la liquidación el monto de ese preaviso.");
    if (entrada.salariosAguinaldo === null) observaciones.push("El aguinaldo es una estimación con su salario promedio. Con la suma real de salarios desde el 1 de diciembre da exacto.");
    observaciones.push("Las vacaciones se calculan con su salario promedio dividido entre 30. Es una estimación: la ley usa el promedio de las últimas 50 semanas.");

    return {
      tiempo: textoTiempo(t),
      salarioDiario: redondear(diario),
      diasPreaviso: dPreaviso,
      preaviso,
      diasCesantia,
      cesantia: montoCesantia,
      vacaciones,
      aguinaldo,
      total: redondear(preaviso + montoCesantia + vacaciones + aguinaldo),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "salarioDiario", etiqueta: "Salario diario (promedio entre 30)", formato: "moneda" },
    { clave: "diasPreaviso", etiqueta: "Días de preaviso", formato: "dias", ocultarSiCero: true },
    { clave: "preaviso", etiqueta: "Preaviso", formato: "moneda", ocultarSiCero: true },
    { clave: "diasCesantia", etiqueta: "Días de cesantía", formato: "dias", ocultarSiCero: true },
    { clave: "cesantia", etiqueta: "Auxilio de cesantía", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Vacaciones no disfrutadas", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
