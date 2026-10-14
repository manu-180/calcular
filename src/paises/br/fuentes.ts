import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";

const SGS = "https://api.bcb.gov.br/dados/serie/bcdata.sgs";

function hojeBrasil(): FechaISO {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()) as FechaISO;
}

// O SGS devolve datas DD/MM/AAAA e valores como texto com ponto decimal.
function deSgs(f: unknown): FechaISO | null {
  if (typeof f !== "string") return null;
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(f);
  if (!m) return null;
  const iso = `${m[3]}-${m[2]}-${m[1]}`;
  return esFechaISO(iso) ? iso : null;
}

async function sgs(http: Http, codigo: number, ultimos: number): Promise<PuntoSerie[] | null> {
  const json = await http.json(`${SGS}.${codigo}/dados/ultimos/${ultimos}?formato=json`);
  if (!Array.isArray(json)) return null;
  const hoje = hojeBrasil();
  const pontos: PuntoSerie[] = [];
  for (const fila of json as { data?: unknown; valor?: unknown }[]) {
    const fecha = deSgs(fila.data);
    const valor = typeof fila.valor === "string" ? Number(fila.valor) : NaN;
    if (!fecha || !Number.isFinite(valor)) return null;
    // A série da meta Selic já traz os dias até a próxima reunião do Copom: o futuro fica de fora.
    if (fecha > hoje) continue;
    pontos.push({ fecha, valor });
  }
  return pontos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

async function ipca(http: Http): Promise<PuntoSerie[] | null> {
  const json = await http.json("https://apisidra.ibge.gov.br/values/t/1737/n1/all/v/2266/p/last%206");
  if (!Array.isArray(json) || json.length < 2) return null;
  const pontos: PuntoSerie[] = [];
  for (const fila of json.slice(1) as { V?: unknown; D3C?: unknown }[]) {
    const periodo = typeof fila.D3C === "string" && /^\d{6}$/.test(fila.D3C) ? fila.D3C : null;
    const valor = typeof fila.V === "string" ? Number(fila.V) : NaN;
    if (!periodo || !Number.isFinite(valor) || valor <= 0) return null;
    pontos.push({ fecha: `${periodo.slice(0, 4)}-${periodo.slice(4)}-01` as FechaISO, valor: Math.round(valor * 100) / 100 });
  }
  return pontos;
}

// A página do INSS diz em texto a partir de qual competência valem as faixas. Se o ano mudar ou a
// primeira faixa deixar de ser o salário mínimo carregado, saiu tabela nova.
function detectorInss(): Detector {
  const url = "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal";
  return {
    id: "br.inss-tabela-mensal",
    carril: "norma",
    datos: ["br.inss-empregado", "br.teto-inss", "br.salario-minimo", "br.inss-mei"],
    metodo: "html",
    url,
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(url, { userAgentNavegador: true });
      const competencia = /COMPET[ÊE]NCIA\s+([A-ZÇÃÉÍÓÚ]+)\s+DE\s+(\d{4})/i.exec(html);
      if (!competencia) return null;
      const teto = /R\$\s*8\.475,55/.test(html);
      if (competencia[2] === "2026" && teto) return [];
      const hallazgos: HallazgoNorma[] = [
        { titulo: `Tabela de contribuição do INSS válida a partir de ${competencia[1].toLowerCase()} de ${competencia[2]}`, url, fecha: hojeBrasil() },
      ];
      return hallazgos;
    },
  };
}

// A Receita publica uma página por ano em /tabelas/<ano>. Quando aparece a do ano seguinte, há
// tabela nova do IRRF para conferir.
function detectorReceita(): Detector {
  const url = "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas";
  return {
    id: "br.receita-tabelas-irpf",
    carril: "norma",
    datos: ["br.irrf-mensal", "br.irrf-dependente", "br.irrf-desconto-simplificado", "br.irpf-anual", "br.reducao-mensal-isencao"],
    metodo: "html",
    url,
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(url, { userAgentNavegador: true });
      if (!/tabelas\/2026/.test(html)) return null;
      const anos = [...html.matchAll(/meu-imposto-de-renda\/tabelas\/(20\d{2})/g)].map((m) => Number(m[1]));
      const novos = [...new Set(anos.filter((a) => a > 2026))];
      return novos.map((ano) => ({ titulo: `Tabelas do IRPF de ${ano} publicadas pela Receita Federal`, url: `${url}/${ano}`, fecha: hojeBrasil() }));
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "br.ptax-sgs",
    carril: "serie",
    serie: "br.dolar-ptax",
    metodo: "api-json",
    url: `${SGS}.1/dados/ultimos/10?formato=json`,
    banda: { min: 3, max: 9, saltoRelativoMax: 0.06 },
    traer: (http) => sgs(http, 1, 10),
  },
  {
    id: "br.selic-sgs",
    carril: "serie",
    serie: "br.selic-meta",
    metodo: "api-json",
    url: `${SGS}.432/dados/ultimos/40?formato=json`,
    banda: { min: 2, max: 25, saltoRelativoMax: 0.15 },
    traer: (http) => sgs(http, 432, 40),
  },
  {
    id: "br.tr-sgs",
    carril: "serie",
    serie: "br.tr",
    metodo: "api-json",
    url: `${SGS}.7811/dados/ultimos/3?formato=json`,
    banda: { min: 0, max: 1.5, saltoRelativoMax: 2 },
    traer: (http) => sgs(http, 7811, 3),
  },
  {
    id: "br.ipca-sidra",
    carril: "serie",
    serie: "br.ipca",
    metodo: "api-json",
    url: "https://apisidra.ibge.gov.br/values/t/1737/n1/all/v/2266/p/last%206",
    banda: { min: 7000, max: 10000, saltoRelativoMax: 0.03 },
    traer: ipca,
  },
  detectorInss(),
  detectorReceita(),
];
