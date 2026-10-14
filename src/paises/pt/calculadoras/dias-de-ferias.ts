import { definirCalculadora } from "@/motor/calculo";
import { ano, formatarData, mesesCompletos, somarMeses } from "../lib/datas";

export default definirCalculadora({
  id: "pt.dias-de-ferias",
  mercado: "pt",
  concepto: "vacaciones",
  slug: "dias-de-ferias",
  estado: "publicado",
  requiere: {
    "pt.ct-ferias-dias": "numero",
    "pt.ct-ferias-admissao": "mapa",
  },
  campos: [
    { id: "admissao", tipo: "fecha", etiqueta: "Data de início do contrato", porDefecto: "hoy" },
    { id: "retribuicao", tipo: "moneda", etiqueta: "Retribuição base mensal", min: 0, porDefecto: 1200, ayuda: "Para calcular o subsídio de férias do ano de admissão." },
  ],
  calcular(entrada, valores, { redondear }) {
    const anual = valores["pt.ct-ferias-dias"];
    const adm = valores["pt.ct-ferias-admissao"];
    const fimDoAno = `${ano(entrada.admissao)}-12-31`;
    const meses = mesesCompletos(entrada.admissao, fimDoAno);
    const diasAdmissao = Math.min(adm["maximo"], adm["por-mes"] * meses);
    const gozoDesde = somarMeses(entrada.admissao, 6);
    const observaciones: string[] = [];
    if (gozoDesde > fimDoAno) {
      observaciones.push(`Como os seis meses de contrato só se completam em ${formatarData(gozoDesde)}, as férias do ano de admissão podem ser gozadas até 30 de junho do ano seguinte.`);
    }
    observaciones.push("No mesmo ano civil não se podem gozar mais de 30 dias úteis de férias, salvo o que diga a convenção coletiva.");
    return {
      diasAdmissao,
      meses,
      gozoDesde: formatarData(gozoDesde),
      diasAnuais: anual,
      subsidioAdmissao: redondear((entrada.retribuicao * diasAdmissao) / anual),
      observaciones,
    };
  },
  resultado: [
    { clave: "diasAdmissao", etiqueta: "Dias úteis de férias no ano de admissão", formato: "dias", destacada: true },
    { clave: "meses", etiqueta: "Meses completos de contrato nesse ano", formato: "meses" },
    { clave: "gozoDesde", etiqueta: "Pode gozar estas férias a partir de", formato: "texto" },
    { clave: "subsidioAdmissao", etiqueta: "Subsídio de férias desse ano (bruto)", formato: "moneda" },
    { clave: "diasAnuais", etiqueta: "Dias úteis por ano nos anos seguintes", formato: "dias" },
  ],
});
