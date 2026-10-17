import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "us.minimum-wage",
  mercado: "us",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "us.min-wage-federal": "numero",
    "us.min-wage-state": "mapa",
  },
  campos: [
    { id: "estado", tipo: "opcion-dato", etiqueta: "State", dato: "us.min-wage-state", porDefecto: "california" },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work per week", min: 0, max: 168, porDefecto: 40 },
  ],
  calcular(entrada, valores, { redondear }) {
    const federal = valores["us.min-wage-federal"];
    const estatal = enMapa(valores["us.min-wage-state"], entrada.estado);
    const aplicable = Math.max(federal, estatal);
    const semanal = redondear(aplicable * entrada.horas);
    const observaciones: string[] = [];
    if (estatal === 0) observaciones.push("This state has no minimum wage law. Jobs covered by federal law must pay at least the federal minimum.");
    else if (estatal < federal) observaciones.push("The state rate is below the federal one. Most jobs are covered by federal law and must pay the federal minimum.");
    observaciones.push("Some cities and counties set a higher minimum wage. Tipped, youth and training wages can be lower.");
    return {
      federal,
      estatal: estatal === 0 ? null : estatal,
      aplicable,
      semanal,
      mensual: redondear((aplicable * entrada.horas * 52) / 12),
      anual: redondear(aplicable * entrada.horas * 52),
      observaciones,
    };
  },
  resultado: [
    { clave: "federal", etiqueta: "Federal minimum wage per hour", formato: "moneda" },
    { clave: "estatal", etiqueta: "State minimum wage per hour", formato: "moneda" },
    { clave: "aplicable", etiqueta: "Minimum you must be paid per hour", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Minimum pay per week", formato: "moneda" },
    { clave: "mensual", etiqueta: "Minimum pay per month", formato: "moneda" },
    { clave: "anual", etiqueta: "Minimum pay per year (52 weeks)", formato: "moneda" },
  ],
});
