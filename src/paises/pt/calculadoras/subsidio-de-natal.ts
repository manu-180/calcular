import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.subsidio-de-natal",
  mercado: "pt",
  concepto: "bono-semestral",
  slug: "subsidio-de-natal",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "retribuicao", tipo: "moneda", etiqueta: "Retribuição mensal", min: 0, porDefecto: 1200 },
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Meses de serviço no ano",
      min: 1,
      max: 12,
      porDefecto: 12,
      ayuda: "Menos de 12 só no ano em que entrou, no ano em que o contrato termina ou com o contrato suspenso.",
    },
  ],
  calcular(entrada, _valores, { redondear }) {
    const subsidio = redondear((entrada.retribuicao * entrada.meses) / 12);
    return {
      subsidio,
      duodecimo: redondear(subsidio / entrada.meses),
      proporcional: entrada.meses < 12 ? "Sim, proporcional ao tempo de serviço" : "Não, subsídio por inteiro",
    };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "Subsídio de Natal (bruto)", formato: "moneda", destacada: true },
    { clave: "duodecimo", etiqueta: "Valor por mês de serviço", formato: "moneda" },
    { clave: "proporcional", etiqueta: "Proporcional", formato: "texto" },
  ],
});
