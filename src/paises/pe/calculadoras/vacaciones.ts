import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.vacaciones",
  mercado: "pe",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.vacaciones-por-regimen": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "variable",
      tipo: "moneda",
      etiqueta: "Promedio mensual de pagos variables",
      ayuda: "Comisiones, horas extras u otros pagos regulares. Déjalo vacío si no tienes.",
      min: 0,
      requerido: false,
    },
    {
      id: "regimen",
      tipo: "opcion",
      etiqueta: "Régimen laboral de tu empleador",
      opciones: [
        { valor: "general", etiqueta: "Régimen general" },
        { valor: "pequena", etiqueta: "Pequeña empresa (REMYPE)" },
        { valor: "micro", etiqueta: "Microempresa (REMYPE)" },
      ],
      porDefecto: "general",
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses trabajados desde tu último aniversario", ayuda: "Para las vacaciones truncas, si dejas el trabajo antes de cumplir otro año.", min: 0, max: 11, porDefecto: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Días sueltos (además de los meses)", min: 0, max: 29, porDefecto: 0 },
    {
      id: "periodosVencidos",
      tipo: "entero",
      etiqueta: "Años de vacaciones vencidas",
      ayuda: "Vacaciones que ganaste y no tomaste dentro del año siguiente.",
      min: 0,
      max: 10,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses < 0 || entrada.meses > 11) throw new ErrorEntrada("Si ya cumpliste 12 meses, es un año completo de vacaciones: pon 0 meses y cuenta ese año aparte.", "meses");
    if (entrada.dias < 0 || entrada.dias > 29) throw new ErrorEntrada("Los días sueltos van de 0 a 29.", "dias");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = redondear(entrada.sueldo + asignacion + (entrada.variable ?? 0));
    const diasPorAnio = enMapa(valores["pe.vacaciones-por-regimen"], entrada.regimen);
    const remuneracionVacacional = redondear((remuneracion * diasPorAnio) / 30);
    const truncas = redondear((remuneracionVacacional / 12) * entrada.meses + (remuneracionVacacional / 360) * entrada.dias);
    const esGeneral = entrada.regimen === "general";
    const vencidas = redondear(remuneracionVacacional * entrada.periodosVencidos);
    const indemnizacion = esGeneral ? redondear(remuneracion * entrada.periodosVencidos) : null;
    const observaciones: string[] = [];
    if (!esGeneral && entrada.periodosVencidos > 0) {
      observaciones.push("En la micro y pequeña empresa no calculamos la indemnización por vacaciones vencidas: la norma no la precisa para 15 días.");
    }
    return {
      diasPorAnio,
      remuneracionVacacional,
      truncas,
      vencidas,
      indemnizacion,
      total: redondear(truncas + vencidas + (indemnizacion ?? 0)),
      observaciones,
    };
  },
  resultado: [
    { clave: "diasPorAnio", etiqueta: "Días de vacaciones por año", formato: "dias" },
    { clave: "remuneracionVacacional", etiqueta: "Pago por un año completo de vacaciones", formato: "moneda" },
    { clave: "truncas", etiqueta: "Vacaciones truncas", formato: "moneda", ocultarSiCero: true },
    { clave: "vencidas", etiqueta: "Pago de las vacaciones vencidas", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Indemnización por no tomarlas", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total", formato: "moneda", destacada: true },
  ],
});
