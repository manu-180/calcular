import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { tempoDeServico } from "../lib/datas";

export default definirCalculadora({
  id: "mz.dias-de-ferias",
  mercado: "mz",
  concepto: "vacaciones",
  slug: "dias-de-ferias",
  estado: "publicado",
  requiere: {
    "mz.ferias-primeiro-ano": "numero",
    "mz.ferias-anos-seguintes": "numero",
    "mz.ferias-prazo-mes": "numero",
    "mz.ferias-gozo-minimo": "numero",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "normal", etiqueta: "Por tempo indeterminado ou a prazo de um ano ou mais" },
        { valor: "curto", etiqueta: "A prazo certo de mais de três meses e menos de um ano" },
      ],
      porDefecto: "normal",
    },
    { id: "admissao", tipo: "fecha", etiqueta: "Data de admissão", min: "1980-01-01", porDefecto: "2025-01-06" },
    { id: "referencia", tipo: "fecha", etiqueta: "Data a que se refere o cálculo", min: "1980-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    const t = tempoDeServico(entrada.admissao, entrada.referencia, "referencia");
    const mesesTotais = t.anos * 12 + t.meses;
    const observaciones = [
      "As férias contam em dias de calendário. Os feriados que caem nas férias não contam como dias de férias.",
      `Por acordo, parte das férias pode ser paga em vez de gozada, mas o trabalhador tem de gozar pelo menos ${valores["mz.ferias-gozo-minimo"]} dias.`,
    ];
    if (entrada.contrato === "curto") {
      if (mesesTotais >= 12) throw new ErrorEntrada("Com um ano ou mais de serviço escolha o outro tipo de contrato.", "contrato");
      return {
        dias: mesesTotais * valores["mz.ferias-prazo-mes"],
        anos: t.anos,
        meses: mesesTotais,
        observaciones: ["Nos contratos a prazo certo de mais de três meses e menos de um ano conta-se um dia de férias por cada mês completo de serviço efectivo.", ...observaciones],
      };
    }
    const primeiroAno = t.anos < 1;
    return {
      dias: primeiroAno ? valores["mz.ferias-primeiro-ano"] : valores["mz.ferias-anos-seguintes"],
      anos: t.anos,
      meses: mesesTotais,
      observaciones: primeiroAno ? ["Ainda está no primeiro ano de trabalho efectivo.", ...observaciones] : observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Dias de férias por ano", formato: "dias", destacada: true },
    { clave: "anos", etiqueta: "Anos completos de serviço", formato: "anios" },
    { clave: "meses", etiqueta: "Meses completos de serviço", formato: "meses" },
  ],
});
