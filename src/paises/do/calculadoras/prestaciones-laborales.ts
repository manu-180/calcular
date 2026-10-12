import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, mesesEnElAnio, textoAntiguedad } from "../lib/fechas";
import { clavePreaviso, CODIGO_VIGENTE_DESDE, diasCesantia } from "../lib/terminacion";
import { diasVacacionesProporcionales } from "../lib/vacaciones";

export default definirCalculadora({
  id: "do.prestaciones-laborales",
  mercado: "do",
  concepto: "liquidacion-final",
  slug: "prestaciones-laborales",
  estado: "publicado",
  requiere: {
    "do.preaviso-dias": "mapa",
    "do.cesantia-dias": "mapa",
    "do.vacaciones-proporcionales": "mapa",
    "do.divisor-salario-diario": "numero",
    "do.salario-minimo": "mapa",
    "do.tope-regalia": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "termino", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual del último año",
      ayuda: "Suma lo que ganaste en los últimos 12 meses (sin horas extra ni regalía) y divídelo entre los meses trabajados. Si siempre ganaste lo mismo, pon tu salario.",
      min: 0,
    },
    {
      id: "causa",
      tipo: "opcion",
      etiqueta: "Cómo terminó el contrato",
      opciones: [
        { valor: "desahucio", etiqueta: "Me desahuciaron (despido sin alegar causa)" },
        { valor: "despido-injustificado", etiqueta: "Despido injustificado o dimisión justificada" },
        { valor: "renuncia", etiqueta: "Renuncié" },
        { valor: "despido-justificado", etiqueta: "Despido justificado" },
      ],
      porDefecto: "desahucio",
    },
    {
      id: "preavisado",
      tipo: "si-no",
      etiqueta: "Te dieron el preaviso a tiempo",
      ayuda: "Solo cuenta en el desahucio. Si te avisaron con los días que manda la ley, el preaviso no se paga.",
      porDefecto: false,
    },
    {
      id: "vacacionesPendientes",
      tipo: "numero",
      etiqueta: "Días de vacaciones de años anteriores que no tomaste",
      min: 0,
      porDefecto: 0,
    },
    { id: "tamano", tipo: "opcion-dato", etiqueta: "Tamaño de la empresa", dato: "do.salario-minimo", porDefecto: "grande" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.inicio) throw new ErrorEntrada("El último día tiene que ser posterior a la fecha en que empezaste.", "termino");
    const a = antiguedad(entrada.inicio, entrada.termino);
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const conPrestaciones = entrada.causa === "desahucio" || entrada.causa === "despido-injustificado";

    const clave = clavePreaviso(a);
    const debePreaviso = entrada.causa === "despido-injustificado" || (entrada.causa === "desahucio" && !entrada.preavisado);
    const diasPreaviso = conPrestaciones && debePreaviso && clave ? enMapa(valores["do.preaviso-dias"], clave) : 0;
    const diasCes = conPrestaciones ? diasCesantia(a, valores["do.cesantia-dias"]) : 0;

    const diasVacaciones = diasVacacionesProporcionales(a, valores["do.vacaciones-proporcionales"]) + entrada.vacacionesPendientes;
    const mesesRegalia = mesesEnElAnio(entrada.termino, entrada.inicio, entrada.termino);
    const topeRegalia = redondear(enMapa(valores["do.salario-minimo"], entrada.tamano) * valores["do.tope-regalia"]);
    const regalia = Math.min(redondear((entrada.salario * mesesRegalia) / 12), topeRegalia);

    const preaviso = redondear(diario * diasPreaviso);
    const cesantia = redondear(diario * diasCes);
    const vacaciones = redondear(diario * diasVacaciones);

    const observaciones: string[] = [];
    if (conPrestaciones && a.anios === 0 && a.meses < 3) observaciones.push("Con menos de 3 meses de trabajo no corresponden preaviso ni cesantía.");
    if (entrada.causa === "despido-injustificado") observaciones.push("Si un tribunal declara injustificado el despido, puede sumar hasta 6 meses de salario por el tiempo del juicio (art. 95). Ese monto no está en este cálculo.");
    if (entrada.causa === "renuncia") observaciones.push("Al renunciar no cobras preaviso ni cesantía. Tú debías avisar con el mismo plazo de preaviso.");
    if (conPrestaciones && entrada.inicio < CODIGO_VIGENTE_DESDE) observaciones.push("Los años trabajados antes del 29 de mayo de 1992 se pagan con 15 días de cesantía por año. Revisa ese tramo con el Ministerio de Trabajo.");
    if (a.anios >= 1 && diasVacaciones > entrada.vacacionesPendientes) observaciones.push("Las vacaciones del último año incompleto se calculan con la escala del artículo 180.");
    if (preaviso + cesantia > 0) observaciones.push("Preaviso y cesantía no pagan ISR. El empleador tiene 10 días para pagarlos; si se atrasa, debe un día de salario por cada día de retraso (art. 86).");

    return {
      antiguedad: textoAntiguedad(a),
      diario,
      diasPreaviso,
      preaviso,
      diasCesantia: diasCes,
      cesantia,
      diasVacaciones,
      vacaciones,
      regalia,
      total: redondear(preaviso + cesantia + vacaciones + regalia),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "diasPreaviso", etiqueta: "Días de preaviso", formato: "dias", ocultarSiCero: true },
    { clave: "preaviso", etiqueta: "Preaviso", formato: "moneda", ocultarSiCero: true },
    { clave: "diasCesantia", etiqueta: "Días de cesantía", formato: "dias", ocultarSiCero: true },
    { clave: "cesantia", etiqueta: "Auxilio de cesantía", formato: "moneda", ocultarSiCero: true },
    { clave: "diasVacaciones", etiqueta: "Días de vacaciones a pagar", formato: "dias", decimales: 2 },
    { clave: "vacaciones", etiqueta: "Vacaciones no disfrutadas", formato: "moneda" },
    { clave: "regalia", etiqueta: "Salario de Navidad proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total de prestaciones", formato: "moneda", destacada: true },
  ],
});
