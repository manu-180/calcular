import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { compensacao, REQUISITOS_COMPENSACAO } from "../lib/compensacao";
import { ano, diasEntre } from "../lib/datas";

export default definirCalculadora({
  id: "pt.acerto-de-contas",
  mercado: "pt",
  concepto: "liquidacion-final",
  slug: "acerto-de-contas",
  estado: "publicado",
  requiere: {
    ...REQUISITOS_COMPENSACAO,
    "pt.ct-ferias-dias": "numero",
  },
  campos: [
    { id: "retribuicao", tipo: "moneda", etiqueta: "Retribuição base mensal", min: 0, porDefecto: 1200 },
    { id: "inicio", tipo: "fecha", etiqueta: "Data de início do contrato" },
    { id: "fim", tipo: "fecha", etiqueta: "Data de cessação", porDefecto: "hoy" },
    { id: "feriasPorGozar", tipo: "entero", etiqueta: "Dias úteis de férias vencidas ainda por gozar", min: 0, max: 60, porDefecto: 0, ayuda: "As férias que venceram a 1 de janeiro e não foram gozadas." },
    { id: "subsidioPorPagar", tipo: "si-no", etiqueta: "O subsídio de férias vencido a 1 de janeiro ainda não foi pago", porDefecto: false },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Compensação",
      opciones: [
        { valor: "nenhuma", etiqueta: "Sem compensação (demissão, acordo sem compensação...)" },
        { valor: "despedimento", etiqueta: "Despedimento coletivo, extinção do posto ou inadaptação" },
        { valor: "termo", etiqueta: "Fim de contrato a termo certo por iniciativa do empregador" },
      ],
      porDefecto: "nenhuma",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fim < entrada.inicio) throw new ErrorEntrada("A data de cessação tem de ser posterior ao início do contrato.", "fim");
    const r = entrada.retribuicao;
    const anoFim = ano(entrada.fim);
    const inicioAno = entrada.inicio > `${anoFim}-01-01` ? entrada.inicio : `${anoFim}-01-01`;
    const diasServico = diasEntre(inicioAno, entrada.fim) + 1;
    const diasDoAno = diasEntre(`${anoFim}-01-01`, `${anoFim + 1}-01-01`);
    const fracao = diasServico / diasDoAno;
    const proporcional = redondear(r * fracao);
    const feriasVencidas = redondear((r * entrada.feriasPorGozar) / valores["pt.ct-ferias-dias"]);
    const subsidioVencido = entrada.subsidioPorPagar ? redondear(r) : 0;
    const comp = entrada.motivo === "nenhuma" ? 0 : compensacao(entrada.motivo, r, entrada.inicio, entrada.fim, valores, redondear).compensacao;
    const total = redondear(proporcional * 3 + feriasVencidas + subsidioVencido + comp);
    return {
      total,
      feriasProporcionais: proporcional,
      subsidioFeriasProporcional: proporcional,
      natalProporcional: proporcional,
      feriasVencidas,
      subsidioVencido,
      compensacao: comp,
      diasServico,
      observaciones: [
        "Valores brutos, antes de Segurança Social e IRS. Some o salário dos dias trabalhados no último mês, se ainda não foi pago.",
        "Em contratos que acabam no ano seguinte ao da admissão ou que duraram até 12 meses, o total das férias não pode passar o proporcional à duração do contrato (artigo 245.º, n.º 3).",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total do acerto de contas (bruto)", formato: "moneda", destacada: true },
    { clave: "feriasProporcionais", etiqueta: "Férias proporcionais do ano da cessação", formato: "moneda" },
    { clave: "subsidioFeriasProporcional", etiqueta: "Subsídio de férias proporcional", formato: "moneda" },
    { clave: "natalProporcional", etiqueta: "Subsídio de Natal proporcional", formato: "moneda" },
    { clave: "feriasVencidas", etiqueta: "Férias vencidas não gozadas", formato: "moneda", ocultarSiCero: true },
    { clave: "subsidioVencido", etiqueta: "Subsídio de férias vencido por pagar", formato: "moneda", ocultarSiCero: true },
    { clave: "compensacao", etiqueta: "Compensação", formato: "moneda", ocultarSiCero: true },
    { clave: "diasServico", etiqueta: "Dias de serviço no ano da cessação", formato: "dias" },
  ],
});
