import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aniosMesesDias } from "../fechas";

// DS 003-97-TR, art. 10: el periodo de prueba es de tres meses y la indemnización recién procede
// superado ese plazo (art. 38).
const MESES_PERIODO_PRUEBA = 3;

export default definirCalculadora({
  id: "pe.despido-arbitrario",
  mercado: "pe",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion-por-despido-arbitrario",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.despido-por-anio": "mapa",
    "pe.despido-tope": "mapa",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "indeterminado", etiqueta: "A plazo indeterminado" },
        { valor: "plazo-fijo", etiqueta: "A plazo fijo (con fecha de fin)" },
      ],
      porDefecto: "indeterminado",
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaCese", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "variable",
      tipo: "moneda",
      etiqueta: "Promedio mensual de pagos variables",
      ayuda: "Comisiones u otros pagos regulares. Déjalo vacío si no tienes.",
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
    { id: "mesesFaltantes", tipo: "entero", etiqueta: "Meses que faltaban para terminar el contrato", ayuda: "Solo si tu contrato era a plazo fijo.", min: 0, max: 120, porDefecto: 0 },
    { id: "diasFaltantes", tipo: "entero", etiqueta: "Días sueltos que faltaban", ayuda: "Solo si tu contrato era a plazo fijo.", min: 0, max: 29, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaCese < entrada.fechaIngreso) throw new ErrorEntrada("La fecha del despido tiene que ser posterior a la de ingreso.", "fechaCese");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = redondear(entrada.sueldo + asignacion + (entrada.variable ?? 0));
    const remuneracionDiaria = remuneracion / 30;
    const servicio = aniosMesesDias(entrada.fechaIngreso, entrada.fechaCese);
    const tope = enMapa(valores["pe.despido-tope"], entrada.regimen);
    const porAnio = enMapa(valores["pe.despido-por-anio"], entrada.regimen);
    const observaciones: string[] = [];

    if (servicio.anios === 0 && servicio.meses < MESES_PERIODO_PRUEBA) {
      return {
        remuneracion,
        anios: servicio.anios,
        meses: servicio.meses,
        dias: servicio.dias,
        remuneracionesDiarias: 0,
        indemnizacion: 0,
        observaciones: ["Si te despiden durante los tres primeros meses (periodo de prueba), no corresponde indemnización."],
      };
    }

    let diarias: number;
    if (entrada.contrato === "plazo-fijo") {
      if (entrada.regimen !== "general") {
        throw new ErrorEntrada("Para contratos a plazo fijo en la micro o pequeña empresa no tenemos una regla confirmada en la norma.", "contrato");
      }
      // Art. 76: la misma remuneración y media (45 diarias) pero por cada mes que faltaba, no por año.
      diarias = porAnio * entrada.mesesFaltantes + (porAnio / 30) * entrada.diasFaltantes;
      if (entrada.mesesFaltantes === 0 && entrada.diasFaltantes === 0) observaciones.push("Indica cuántos meses faltaban para que terminara tu contrato.");
    } else if (entrada.regimen === "general") {
      diarias = porAnio * (servicio.anios + servicio.meses / 12 + servicio.dias / 360);
    } else {
      diarias = porAnio * (servicio.anios + servicio.meses / 12);
    }
    if (diarias > tope) {
      diarias = tope;
      observaciones.push("Llegaste al tope de la indemnización.");
    }
    return {
      remuneracion,
      anios: servicio.anios,
      meses: servicio.meses,
      dias: servicio.dias,
      remuneracionesDiarias: redondear(diarias),
      indemnizacion: redondear(diarias * remuneracionDiaria),
      observaciones,
    };
  },
  resultado: [
    { clave: "remuneracion", etiqueta: "Remuneración mensual que se usa", formato: "moneda" },
    { clave: "anios", etiqueta: "Años completos trabajados", formato: "anios" },
    { clave: "meses", etiqueta: "Meses adicionales", formato: "meses", ocultarSiCero: true },
    { clave: "dias", etiqueta: "Días adicionales", formato: "dias", ocultarSiCero: true },
    { clave: "remuneracionesDiarias", etiqueta: "Remuneraciones diarias que te corresponden", formato: "numero", decimales: 2 },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido arbitrario", formato: "moneda", destacada: true },
  ],
});
