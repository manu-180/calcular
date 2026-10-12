import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { despidoMensual } from "../lib/despido";

export default definirCalculadora({
  id: "uy.despido-especial",
  mercado: "uy",
  concepto: "propio",
  slug: "despido-especial",
  estado: "publicado",
  requiere: {
    "uy.despido-tope-meses": "numero",
    "uy.licencia-dias": "numero",
    "uy.despido-embarazo-meses": "numero",
    "uy.despido-enfermedad-factor": "numero",
    "uy.despido-accidente-factor": "numero",
    "uy.despido-acoso-meses": "numero",
    "uy.despido-paternidad-meses": "numero",
  },
  campos: [
    {
      id: "causa",
      tipo: "opcion",
      etiqueta: "Situación del despido",
      opciones: [
        { valor: "embarazo", etiqueta: "Trabajadora embarazada" },
        { valor: "enfermedad", etiqueta: "Durante una enfermedad o en los 30 días después del alta" },
        { valor: "accidente", etiqueta: "Después de un accidente de trabajo (no te reintegran o te despiden antes de 180 días)" },
        { valor: "acoso", etiqueta: "Acoso sexual (te considerás despedida o despedido)" },
        { valor: "paternidad", etiqueta: "En los 30 días después de la licencia por paternidad o adopción" },
      ],
      porDefecto: "embarazo",
    },
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo nominal mensual", ayuda: "Sumá el promedio mensual de horas extra y comisiones del último año.", min: 0 },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "egreso", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
    { id: "incidencias", tipo: "si-no", etiqueta: "Sumar aguinaldo y licencia a la base del despido común", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.egreso < entrada.ingreso) throw new ErrorEntrada("La fecha del despido tiene que ser posterior a la de ingreso.", "egreso");
    const comun = despidoMensual(
      { sueldo: entrada.sueldo, ingreso: entrada.ingreso, egreso: entrada.egreso, incidencias: entrada.incidencias },
      { topeMeses: valores["uy.despido-tope-meses"], diasLicencia: valores["uy.licencia-dias"] },
      redondear,
    ).indemnizacion;
    const porCausa: Record<typeof entrada.causa, number> = {
      embarazo: entrada.sueldo * valores["uy.despido-embarazo-meses"],
      enfermedad: comun * (valores["uy.despido-enfermedad-factor"] - 1),
      accidente: comun * (valores["uy.despido-accidente-factor"] - 1),
      acoso: entrada.sueldo * valores["uy.despido-acoso-meses"],
      paternidad: entrada.sueldo * valores["uy.despido-paternidad-meses"],
    };
    const especial = redondear(porCausa[entrada.causa]);
    const observaciones: string[] = [];
    if (entrada.causa === "enfermedad" || entrada.causa === "paternidad") observaciones.push("El empleador puede evitar la parte especial si prueba notoria mala conducta o que el despido no tuvo que ver con la enfermedad o la licencia.");
    observaciones.push("Si hay discusión sobre la causa del despido, la decide un juez.");
    if (entrada.causa === "acoso") observaciones.push("En lugar de considerarte despedida o despedido, podés reclamar al responsable una indemnización por daño moral de al menos seis sueldos.");
    return { comun, especial, total: redondear(comun + especial), observaciones };
  },
  resultado: [
    { clave: "comun", etiqueta: "Indemnización por despido común", formato: "moneda" },
    { clave: "especial", etiqueta: "Indemnización especial", formato: "moneda" },
    { clave: "total", etiqueta: "Total", formato: "moneda", destacada: true },
  ],
});
