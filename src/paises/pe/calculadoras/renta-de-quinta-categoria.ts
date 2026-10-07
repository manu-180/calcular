import { aplicarEscalaMarginal, definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.renta-quinta",
  mercado: "pe",
  concepto: "impuesto-renta",
  slug: "renta-de-quinta-categoria",
  estado: "publicado",
  requiere: {
    "pe.uit": "numero",
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
    "pe.escala-renta-trabajo": "escala",
    "pe.deduccion-renta-trabajo": "numero",
    "pe.tope-gastos-deducibles": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual bruto", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "gratificaciones",
      tipo: "opcion",
      etiqueta: "Gratificaciones de julio y diciembre",
      opciones: [
        { valor: "completas", etiqueta: "Sí, un sueldo cada una" },
        { valor: "medias", etiqueta: "Sí, medio sueldo cada una (pequeña empresa)" },
        { valor: "ninguna", etiqueta: "No recibo gratificaciones" },
      ],
      porDefecto: "completas",
    },
    { id: "seguro", tipo: "opcion-dato", etiqueta: "Tu seguro de salud", dato: "pe.bonificacion-extraordinaria", porDefecto: "essalud" },
    {
      id: "otrosIngresos",
      tipo: "moneda",
      etiqueta: "Otros ingresos de planilla en el año",
      ayuda: "Bonos, utilidades u otros pagos que también son renta de quinta. Déjalo vacío si no tienes.",
      min: 0,
      requerido: false,
    },
    {
      id: "gastosDeducibles",
      tipo: "moneda",
      etiqueta: "Deducción adicional por gastos",
      ayuda: "El monto que puedes deducir por alquiler, honorarios y otros gastos con comprobante. Tiene un tope.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const uit = valores["pe.uit"];
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const mensual = entrada.sueldo + asignacion;
    const sueldosPorGrati = entrada.gratificaciones === "completas" ? 2 : entrada.gratificaciones === "medias" ? 1 : 0;
    const gratificaciones = redondear(mensual * sueldosPorGrati);
    const bonificacion = redondear(porcentaje(gratificaciones, enMapa(valores["pe.bonificacion-extraordinaria"], entrada.seguro)));
    const ingresoAnual = redondear(mensual * 12 + gratificaciones + bonificacion + (entrada.otrosIngresos ?? 0));
    const deduccion = redondear(valores["pe.deduccion-renta-trabajo"] * uit);
    const topeGastos = redondear(valores["pe.tope-gastos-deducibles"] * uit);
    const gastos = Math.min(entrada.gastosDeducibles ?? 0, topeGastos);
    const rentaNeta = Math.max(0, redondear(ingresoAnual - deduccion - gastos));
    const escala = valores["pe.escala-renta-trabajo"].map((f) => ({ ...f, desde: f.desde * uit, hasta: f.hasta === null ? null : f.hasta * uit }));
    const impuestoAnual = redondear(aplicarEscalaMarginal(escala, rentaNeta));
    const retencionMensual = redondear(impuestoAnual / 12);
    const observaciones: string[] = [];
    if ((entrada.gastosDeducibles ?? 0) > topeGastos) observaciones.push("La deducción adicional por gastos tiene un tope de 3 UIT: usamos ese tope.");
    if (impuestoAnual === 0) observaciones.push("Con estos ingresos no pagas impuesto a la renta de quinta categoría.");
    return {
      ingresoAnual,
      deduccion,
      gastos,
      rentaNeta,
      impuestoAnual,
      retencionMensual,
      tasaEfectiva: ingresoAnual > 0 ? redondear((impuestoAnual / ingresoAnual) * 100) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "ingresoAnual", etiqueta: "Ingreso anual proyectado", formato: "moneda" },
    { clave: "deduccion", etiqueta: "Deducción de 7 UIT", formato: "moneda" },
    { clave: "gastos", etiqueta: "Deducción adicional por gastos", formato: "moneda", ocultarSiCero: true },
    { clave: "rentaNeta", etiqueta: "Renta neta imponible", formato: "moneda" },
    { clave: "impuestoAnual", etiqueta: "Impuesto del año", formato: "moneda" },
    { clave: "retencionMensual", etiqueta: "Retención mensual aproximada", formato: "moneda", destacada: true, ayuda: "Si tu sueldo no cambia en el año, la empresa te retiene más o menos esto cada mes." },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre tu ingreso", formato: "porcentaje" },
  ],
});
