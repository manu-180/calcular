import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cv.dias-de-ferias",
  mercado: "cv",
  concepto: "vacaciones",
  slug: "dias-de-ferias",
  estado: "publicado",
  requiere: {
    "cv.ferias-dias": "numero",
    "cv.ferias-primeiro-ano": "numero",
    "cv.ferias-primeiro-vencimento": "numero",
    "cv.ferias-acumulacao": "numero",
    "cv.ferias-prazo-gozo": "numero",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      porDefecto: "indeterminado",
      opciones: [
        { valor: "indeterminado", etiqueta: "Sem prazo (tempo indeterminado)" },
        { valor: "prazo-longo", etiqueta: "A prazo, com um ano ou mais de duração" },
        { valor: "prazo-curto", etiqueta: "A prazo, com menos de um ano" },
      ],
    },
    {
      id: "admissao",
      tipo: "opcion",
      etiqueta: "Quando foi admitido",
      porDefecto: "anterior",
      visibleSi: { contrato: ["indeterminado"] },
      opciones: [
        { valor: "anterior", etiqueta: "Em anos anteriores" },
        { valor: "primeiro-semestre", etiqueta: "Este ano, no primeiro semestre" },
        { valor: "segundo-semestre", etiqueta: "Este ano, no segundo semestre" },
      ],
    },
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Duração do contrato em meses",
      min: 1,
      max: 11,
      porDefecto: 6,
      visibleSi: { contrato: ["prazo-curto"] },
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const anual = valores["cv.ferias-dias"];
    let dias = anual;
    let vencimento = "As férias vencem-se a 1 de janeiro de cada ano.";
    if (entrada.contrato === "indeterminado") {
      if (entrada.admissao === "primeiro-semestre") {
        dias = valores["cv.ferias-primeiro-ano"];
        vencimento = "Neste ano tem estes dias, a gozar em data a acordar com o empregador. Nos anos seguintes são os dias do ano completo.";
      } else if (entrada.admissao === "segundo-semestre") {
        dias = 0;
        vencimento = `O primeiro período de férias vence-se ao fim de ${valores["cv.ferias-primeiro-vencimento"]} meses de serviço efetivo.`;
      }
    } else if (entrada.contrato === "prazo-curto") {
      dias = redondear((anual * (entrada.meses ?? 0)) / 12);
      vencimento = "O direito vence-se depois de decorrida metade do prazo do contrato.";
    } else {
      vencimento = "Em contratos a prazo com mais de um ano as férias vencem-se a 1 de janeiro de cada ano.";
    }
    return {
      dias,
      anual,
      acumulacao: valores["cv.ferias-acumulacao"],
      prazo: valores["cv.ferias-prazo-gozo"],
      vencimento,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Dias úteis de férias a que tem direito", formato: "dias", destacada: true },
    { clave: "anual", etiqueta: "Dias de um ano completo de serviço", formato: "dias" },
    { clave: "vencimento", etiqueta: "Quando se vencem", formato: "texto" },
    { clave: "prazo", etiqueta: "Prazo para gozar as férias vencidas", formato: "anios" },
    { clave: "acumulacao", etiqueta: "Máximo de dias que se podem acumular", formato: "dias" },
  ],
});
