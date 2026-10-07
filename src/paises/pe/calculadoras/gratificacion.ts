import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.gratificacion",
  mercado: "pe",
  concepto: "bono-semestral",
  slug: "gratificacion",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
    "pe.gratificacion-por-regimen": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", ayuda: "Tu remuneración básica, sin descuentos.", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "variable",
      tipo: "moneda",
      etiqueta: "Promedio mensual de pagos variables",
      ayuda: "Comisiones, horas extras u otros pagos que recibiste al menos 3 meses del semestre. Déjalo vacío si no tienes.",
      min: 0,
      requerido: false,
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses completos trabajados en el semestre", min: 0, max: 6, porDefecto: 6 },
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
    { id: "seguro", tipo: "opcion-dato", etiqueta: "Tu seguro de salud", dato: "pe.bonificacion-extraordinaria", porDefecto: "essalud" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses < 0 || entrada.meses > 6) throw new ErrorEntrada("Un semestre tiene 6 meses como máximo.", "meses");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = redondear(entrada.sueldo + asignacion + (entrada.variable ?? 0));
    if (entrada.regimen === "micro") {
      return {
        remuneracion,
        asignacion,
        gratificacion: 0,
        bonificacion: 0,
        total: 0,
        observaciones: ["En la microempresa del régimen especial no se paga gratificación."],
      };
    }
    const factor = enMapa(valores["pe.gratificacion-por-regimen"], entrada.regimen);
    const gratificacion = redondear((remuneracion * factor * entrada.meses) / 6);
    const bonificacion = redondear(porcentaje(gratificacion, enMapa(valores["pe.bonificacion-extraordinaria"], entrada.seguro)));
    const observaciones: string[] = [];
    if (entrada.meses === 0) observaciones.push("Necesitas al menos un mes completo en el semestre para cobrar gratificación.");
    if (entrada.regimen === "pequena") observaciones.push("En la pequeña empresa la gratificación es media remuneración.");
    return { remuneracion, asignacion, gratificacion, bonificacion, total: redondear(gratificacion + bonificacion), observaciones };
  },
  resultado: [
    { clave: "remuneracion", etiqueta: "Remuneración que se usa para el cálculo", formato: "moneda" },
    { clave: "asignacion", etiqueta: "Asignación familiar incluida", formato: "moneda", ocultarSiCero: true },
    { clave: "gratificacion", etiqueta: "Gratificación", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación extraordinaria", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
