import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.seguranca-social-independentes",
  mercado: "pt",
  concepto: "propio",
  slug: "seguranca-social-independentes",
  estado: "publicado",
  requiere: {
    "pt.ss-independente-taxa": "numero",
    "pt.ss-independente-rendimento-relevante": "mapa",
    "pt.ss-independente-teto-ias": "numero",
    "pt.ias": "numero",
  },
  campos: [
    { id: "faturado", tipo: "moneda", etiqueta: "Total faturado nos 3 meses do trimestre", min: 0, porDefecto: 3500, ayuda: "Sem IVA. É o valor que entra na declaração trimestral." },
    {
      id: "atividade",
      tipo: "opcion",
      etiqueta: "Tipo de rendimento",
      opciones: [
        { valor: "servicos", etiqueta: "Prestação de serviços (recibos verdes)" },
        { valor: "bens", etiqueta: "Produção e venda de bens, hotelaria e restauração" },
      ],
      porDefecto: "servicos",
    },
    {
      id: "ajuste",
      tipo: "opcion",
      etiqueta: "Ajuste escolhido na declaração",
      opciones: [
        { valor: "-25", etiqueta: "Menos 25 %" },
        { valor: "-20", etiqueta: "Menos 20 %" },
        { valor: "-15", etiqueta: "Menos 15 %" },
        { valor: "-10", etiqueta: "Menos 10 %" },
        { valor: "-5", etiqueta: "Menos 5 %" },
        { valor: "0", etiqueta: "Sem ajuste" },
        { valor: "5", etiqueta: "Mais 5 %" },
        { valor: "10", etiqueta: "Mais 10 %" },
        { valor: "15", etiqueta: "Mais 15 %" },
        { valor: "20", etiqueta: "Mais 20 %" },
        { valor: "25", etiqueta: "Mais 25 %" },
      ],
      porDefecto: "0",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const parte = enMapa(valores["pt.ss-independente-rendimento-relevante"], entrada.atividade);
    const relevante = porcentaje(entrada.faturado, parte);
    const baseSemTeto = (relevante / 3) * (1 + Number(entrada.ajuste) / 100);
    const teto = valores["pt.ss-independente-teto-ias"] * valores["pt.ias"];
    const base = Math.min(baseSemTeto, teto);
    const mensal = porcentaje(base, valores["pt.ss-independente-taxa"]);
    const observaciones: string[] = [];
    if (baseSemTeto > teto) observaciones.push(`A base mensal ficou no limite de ${valores["pt.ss-independente-teto-ias"]} vezes o IAS.`);
    observaciones.push("A lei fixa uma contribuição mínima mensal, atualizada com o IAS, que se paga mesmo sem rendimentos.");
    return {
      mensal: redondear(mensal),
      trimestre: redondear(mensal * 3),
      relevante: redondear(relevante),
      base: redondear(base),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensal", etiqueta: "Contribuição mensal", formato: "moneda", destacada: true },
    { clave: "trimestre", etiqueta: "Nos 3 meses seguintes", formato: "moneda" },
    { clave: "relevante", etiqueta: "Rendimento relevante do trimestre", formato: "moneda" },
    { clave: "base", etiqueta: "Base de incidência mensal", formato: "moneda" },
  ],
});
