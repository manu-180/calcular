import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.dias-de-ferias",
  mercado: "ao",
  concepto: "vacaciones",
  slug: "dias-de-ferias",
  estado: "publicado",
  requiere: {
    "ao.ferias-dias": "numero",
    "ao.ferias-dias-por-mes": "numero",
    "ao.ferias-minimo-admissao": "numero",
  },
  campos: [
    {
      id: "situacao",
      tipo: "opcion",
      etiqueta: "Situação",
      opciones: [
        { valor: "ano", etiqueta: "Ano completo de trabalho" },
        { valor: "admissao", etiqueta: "Ano de admissão ou contrato suspenso no ano" },
        { valor: "termo", etiqueta: "Contrato a termo de um ano ou menos" },
      ],
      porDefecto: "ano",
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses completos de trabalho", min: 0, max: 12, porDefecto: 6, visibleSi: { situacao: ["admissao", "termo"] } },
  ],
  calcular(entrada, valores) {
    const anual = valores["ao.ferias-dias"];
    const porMes = valores["ao.ferias-dias-por-mes"];
    const observaciones: string[] = [];
    let dias = anual;
    if (entrada.situacao === "admissao") {
      const meses = entrada.meses ?? 0;
      if (meses >= 12) throw new ErrorEntrada("Com 12 meses completos escolha ano completo de trabalho.", "meses");
      const minimo = valores["ao.ferias-minimo-admissao"];
      dias = Math.max(minimo, meses * porMes);
      if (meses * porMes < minimo) observaciones.push(`A lei garante pelo menos ${minimo} dias úteis no ano de admissão.`);
    } else if (entrada.situacao === "termo") {
      const meses = entrada.meses ?? 0;
      dias = Math.min(anual, meses * porMes);
      observaciones.push("Nos contratos a termo até um ano, as férias podem ser pagas no fim do contrato em vez de gozadas.");
    }
    return { dias, semanas: dias / 5, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Dias úteis de férias", formato: "dias", destacada: true },
    { clave: "semanas", etiqueta: "Equivalente em semanas de cinco dias", formato: "numero", decimales: 1 },
  ],
});
