import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { anosDeAntiguidade, tempoDeServico } from "../lib/folha";

export default definirCalculadora({
  id: "ao.compensacao-por-despedimento",
  mercado: "ao",
  concepto: "indemnizacion-despido",
  slug: "compensacao-por-despedimento",
  estado: "publicado",
  requiere: {
    "ao.compensacao-anos-inteiros": "numero",
    "ao.compensacao-acima": "numero",
    "ao.compensacao-caducidade": "numero",
    "ao.indemnizacao-nao-reintegracao": "numero",
    "ao.indemnizacao-ilicito-minimo": "numero",
    "ao.antiguidade-fraccao": "numero",
    "ao.aviso-previo-empregador": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Motivo da cessação",
      opciones: [
        { valor: "objectivo", etiqueta: "Despedimento individual ou colectivo por causas objectivas" },
        { valor: "caducidade", etiqueta: "Caducidade, insolvência ou extinção do empregador" },
        { valor: "ilicito", etiqueta: "Despedimento disciplinar declarado ilícito, sem reintegração" },
        { valor: "nao-reintegracao", etiqueta: "Indemnização por não reintegração" },
      ],
      porDefecto: "objectivo",
    },
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal à data da cessação", min: 0, porDefecto: 350000 },
    { id: "admissao", tipo: "fecha", etiqueta: "Data de admissão", min: "1960-01-01", porDefecto: "2018-03-01" },
    { id: "cessacao", tipo: "fecha", etiqueta: "Data da cessação do contrato", min: "1960-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const fraccao = valores["ao.antiguidade-fraccao"];
    const anos = anosDeAntiguidade(entrada.admissao, entrada.cessacao, fraccao);
    const tempo = tempoDeServico(entrada.admissao, entrada.cessacao);
    const base = entrada.salarioBase;
    const observaciones: string[] = [];
    let valor = 0;
    if (entrada.motivo === "objectivo") {
      const limite = valores["ao.compensacao-anos-inteiros"];
      const inteiros = Math.min(anos, limite);
      valor = base * inteiros + porcentaje(base, valores["ao.compensacao-acima"]) * Math.max(0, anos - limite);
      observaciones.push(`Além da compensação, o empregador deve avisar com ${valores["ao.aviso-previo-empregador"]} dias de antecedência e pagar os créditos vencidos, como férias e subsídios proporcionais.`);
    } else if (entrada.motivo === "caducidade") {
      valor = porcentaje(base, valores["ao.compensacao-caducidade"]) * anos;
    } else if (entrada.motivo === "nao-reintegracao") {
      valor = porcentaje(base, valores["ao.indemnizacao-nao-reintegracao"]) * anos;
    } else {
      const minimo = base * valores["ao.indemnizacao-ilicito-minimo"];
      valor = Math.max(base * anos, minimo);
      if (base * anos < minimo) observaciones.push(`Aplica-se o valor mínimo da lei: ${valores["ao.indemnizacao-ilicito-minimo"]} meses de salário base.`);
    }
    if (tempo.meses > 0 && tempo.meses < fraccao) {
      observaciones.push(`A fracção de ${tempo.meses} ${tempo.meses === 1 ? "mês" : "meses"} além dos anos completos fica abaixo de ${fraccao} meses e não conta.`);
    }
    return {
      valor: redondear(valor),
      anos,
      tempo: `${tempo.anos} ${tempo.anos === 1 ? "ano" : "anos"} e ${tempo.meses} ${tempo.meses === 1 ? "mês" : "meses"}`,
      observaciones,
    };
  },
  resultado: [
    { clave: "valor", etiqueta: "Compensação ou indemnização", formato: "moneda", destacada: true },
    { clave: "anos", etiqueta: "Anos de antiguidade que contam", formato: "anios" },
    { clave: "tempo", etiqueta: "Tempo de serviço", formato: "texto" },
  ],
});
