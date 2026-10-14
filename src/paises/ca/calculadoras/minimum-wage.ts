import { definirCalculadora, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "ca.minimum-wage",
  mercado: "ca",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "ca.minimum-wage": "numero-por-region",
    "ca.federal-minimum-wage": "numero",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Province or territory where you work", porDefecto: "on" },
    { id: "federal", tipo: "si-no", etiqueta: "Your job is federally regulated (banking, telecom, interprovincial or international transport)", porDefecto: false },
    { id: "horas", tipo: "numero", etiqueta: "Hours a week", min: 1, max: 80, porDefecto: 40 },
  ],
  calcular(entrada, v, { redondear }) {
    const provincial = porRegion(v["ca.minimum-wage"], entrada.region);
    const federal = v["ca.federal-minimum-wage"];
    const hora = entrada.federal ? Math.max(provincial, federal) : provincial;
    const semanal = redondear(hora * entrada.horas);
    const observaciones: string[] = [];
    if (entrada.federal && provincial > federal) observaciones.push("The provincial minimum is higher than the federal one, so your employer has to pay the provincial rate.");
    return {
      hora,
      semanal,
      mensual: redondear((hora * entrada.horas * 52) / 12),
      anual: redondear(hora * entrada.horas * 52),
      provincial,
      federal,
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Minimum wage per hour", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "A week at those hours", formato: "moneda" },
    { clave: "mensual", etiqueta: "A month (average)", formato: "moneda" },
    { clave: "anual", etiqueta: "A year (52 weeks)", formato: "moneda" },
    { clave: "provincial", etiqueta: "Provincial or territorial minimum", formato: "moneda" },
    { clave: "federal", etiqueta: "Federal minimum", formato: "moneda" },
  ],
});
