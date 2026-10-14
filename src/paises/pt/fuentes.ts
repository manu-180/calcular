import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const BPSTAT = "https://bpstat.bportugal.pt/data/v1/domains";
const EURIBOR = `${BPSTAT}/22/datasets/2829cb9155cb4f6ba6906db6b204c4bc/?lang=PT&series_ids=`;
const IPC = `${BPSTAT}/12/datasets/fd8f42946d3f4c45c144e9d62065dc72/?lang=PT&series_ids=12559545`;

// O BPstat responde em JSON-stat: as datas vêm no índice da dimensão reference_date e os valores na
// mesma ordem. Com uma só série pedida os dois vetores têm de ter o mesmo tamanho; se não, o formato mudou.
function pontosBpstat(json: unknown): PuntoSerie[] | null {
  if (typeof json !== "object" || json === null) return null;
  const j = json as { value?: unknown; dimension?: { reference_date?: { category?: { index?: unknown } } } };
  const datas = j.dimension?.reference_date?.category?.index;
  if (!Array.isArray(datas) || !Array.isArray(j.value) || datas.length !== j.value.length) return null;
  const puntos: PuntoSerie[] = [];
  for (let i = 0; i < datas.length; i++) {
    const d = datas[i];
    const v = j.value[i];
    if (v === null) continue;
    if (typeof d !== "string" || typeof v !== "number") return null;
    const fecha = `${d.slice(0, 7)}-01`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: v });
  }
  return puntos.length ? puntos : null;
}

function desdeHaUmAno(): string {
  const d = new Date();
  d.setUTCFullYear(d.getUTCFullYear() - 1);
  return d.toISOString().slice(0, 10);
}

// O BPstat devolve 403 a clientes sem User-Agent de navegador.
function detectorEuribor(prazo: "3m" | "6m" | "12m", serie: number): Detector {
  return {
    id: `pt.euribor-${prazo}-bpstat`,
    carril: "serie",
    serie: `pt.euribor-${prazo}`,
    metodo: "api-json",
    url: `${EURIBOR}${serie}` as `https://${string}`,
    userAgentNavegador: true,
    // A Euribor mexe-se em pontos base de um mês para o outro, mas já esteve abaixo de zero (2016 a
    // 2022): a banda desce de zero e o salto relativo é largo.
    banda: { min: -1, max: 8, saltoRelativoMax: 0.6 },
    async traer(http) {
      return pontosBpstat(await http.json(`${this.url}&obs_since=${desdeHaUmAno()}`, { userAgentNavegador: true }));
    },
  };
}

const RSS_SERIE_I = "https://files.diariodarepublica.pt/rss/serie1-html.xml";
const RSS_SERIE_II = "https://files.diariodarepublica.pt/rss/serie2-html.xml";

// O RSS do Diário da República traz só o diário do dia. A data sai do título («Série I de 2026-10-14»)
// e o texto a filtrar é o sumário. Sem nenhum <item> o formato mudou: null, não uma lista vazia.
async function achadosDr(http: Http, rss: string, padrao: RegExp): Promise<HallazgoNorma[] | null> {
  const xml = await http.texto(rss);
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  if (items.length === 0) return null;
  const achados: HallazgoNorma[] = [];
  for (const [, item] of items) {
    const titulo = /<title>([\s\S]*?)<\/title>/.exec(item)?.[1]?.trim() ?? "";
    const descricao = /<!\[CDATA\[([\s\S]*?)\]\]><\/description>/.exec(item)?.[1] ?? "";
    const url = /<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/.exec(item)?.[1]?.trim() ?? "";
    const fecha = /de (\d{4}-\d{2}-\d{2})\s*$/.exec(titulo)?.[1] ?? "";
    if (!esFechaISO(fecha) || !url.startsWith("https://") || !padrao.test(`${titulo} ${descricao}`)) continue;
    achados.push({ titulo: `${titulo}: ${descricao.trim()}`.slice(0, 300), url, fecha });
  }
  return achados;
}

function detectorDr(id: string, datos: readonly string[], rss: string, padrao: RegExp): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: rss as `https://${string}`,
    async traer(http) {
      return achadosDr(http, rss, padrao);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorEuribor("3m", 13168436),
  detectorEuribor("6m", 13168438),
  detectorEuribor("12m", 13168437),
  {
    id: "pt.ipc-bpstat",
    carril: "serie",
    serie: "pt.ipc",
    metodo: "api-json",
    url: IPC as `https://${string}`,
    userAgentNavegador: true,
    banda: { min: 90, max: 140, saltoRelativoMax: 0.03 },
    async traer(http) {
      return pontosBpstat(await http.json(`${this.url}&obs_since=${desdeHaUmAno()}`, { userAgentNavegador: true }));
    },
  },
  detectorDr("pt.dr-rmmg", ["pt.rmmg"], RSS_SERIE_I, /retribui[cç][aã]o m[ií]nima mensal garantida/i),
  detectorDr("pt.dr-ias", ["pt.ias"], RSS_SERIE_I, /indexante dos apoios sociais/i),
  detectorDr(
    "pt.dr-orcamento-irs",
    ["pt.irs-escaloes", "pt.irs-minimo-existencia", "pt.irs-deducao-especifica-ias", "pt.irs-deducao-dependentes", "pt.imt-hpp", "pt.imt-hpp-jovem", "pt.imt-hpp-taxa-unica", "pt.imt-secundaria", "pt.imt-secundaria-taxa-unica", "pt.iva-taxas"],
    RSS_SERIE_I,
    /Or[cç]amento do Estado|C[oó]digo do IRS|C[oó]digo do IMT|C[oó]digo do IVA|Imposto Municipal sobre as Transmiss/i,
  ),
  detectorDr(
    "pt.dr-retencao",
    ["pt.retencao-tabela-i", "pt.retencao-tabela-ii", "pt.retencao-tabela-iii", "pt.retencao-formulas", "pt.retencao-parcela-dependente"],
    RSS_SERIE_II,
    /tabelas de reten[cç][aã]o na fonte/i,
  ),
  detectorDr(
    "pt.dr-trabalho",
    ["pt.ct-compensacao", "pt.ct-trabalho-suplementar", "pt.ct-ferias-dias", "pt.ss-trabalhador", "pt.ss-empregador", "pt.ss-independente-taxa", "pt.desemprego-percentagens"],
    RSS_SERIE_I,
    /C[oó]digo do Trabalho|C[oó]digo dos Regimes Contributivos|prote[cç][aã]o social na eventualidade de desemprego/i,
  ),
];
