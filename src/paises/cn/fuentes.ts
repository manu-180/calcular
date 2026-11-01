import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-29";

// El 中国外汇交易中心 publica el 中间价 en este JSON; sin fechas devuelve las últimas jornadas, con
// los valores en el mismo orden que la lista «currency» del pedido.
const CCPR = "https://www.chinamoney.com.cn/ags/ms/cm-u-bk-ccpr/CcprHisNew?currency=USD/CNY,EUR/CNY,100JPY/CNY,HKD/CNY&pageNum=1&pageSize=10";

async function zhongjianjia(http: Http, url: string, columna: number): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url, { userAgentNavegador: true })) as { records?: { date?: string; values?: string[] }[] } | null;
  if (!json || !Array.isArray(json.records)) return null;
  const puntos: PuntoSerie[] = [];
  for (const r of json.records) {
    const valor = Number(r.values?.[columna]);
    if (!r.date || !esFechaISO(r.date) || !Number.isFinite(valor) || valor <= 0) return null;
    puntos.push({ fecha: r.date, valor });
  }
  return puntos.length ? puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1)) : null;
}

function detectorCcpr(serie: string, columna: number, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `${serie}-cfets`,
    carril: "serie",
    serie,
    metodo: "api-json",
    url: CCPR,
    banda,
    traer(http) {
      return zhongjianjia(http, this.url, columna);
    },
  };
}

// El 国家法律法规数据库 solo responde a la búsqueda con un POST en JSON. Una versión publicada después
// de la que leímos (gbrq) es una reforma de la norma.
const FLK = "https://flk.npc.gov.cn/law-search/search/list";

async function versionNueva(http: Http, titulo: string, leida: FechaISO): Promise<readonly HallazgoNorma[] | null> {
  if (!http.postJson) return null;
  const cuerpo = { searchRange: 1, sxrq: [], gbrq: [], sxx: [], searchType: 1, xgzlSearch: false, searchContent: titulo, pageNum: 1, pageSize: 10 };
  const json = (await http.postJson(FLK, cuerpo, { userAgentNavegador: true })) as { rows?: { bbbs?: string; title?: string; gbrq?: string }[] } | null;
  if (!json || !Array.isArray(json.rows)) return null;
  return json.rows
    .filter((r) => r.title?.replace(/<[^>]+>/g, "") === titulo && r.gbrq && esFechaISO(r.gbrq) && r.gbrq > leida)
    .map((r) => ({ titulo: `${titulo}（${r.gbrq}）`, url: `https://flk.npc.gov.cn/detail?id=${r.bbbs}`, fecha: r.gbrq as FechaISO }));
}

const ley = (id: string, titulo: string, leida: FechaISO, datos: readonly string[]): Detector => ({
  id,
  carril: "norma",
  datos,
  metodo: "api-json",
  url: FLK,
  traer(http) {
    return versionNueva(http, titulo, leida);
  },
});

// La sección de avisos del portal de Guangzhou lista las notificaciones con su fecha; una nueva sobre el
// 最低工资标准 posterior a la que leímos anuncia un ajuste.
async function avisoGuangzhou(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!html.includes("广州")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/href="([^"]+)"[^>]*>([^<]*最低工资[^<]*)<[\s\S]{0,300}?(20\d\d-\d\d-\d\d)/g)) {
    const fecha = m[3];
    if (esFechaISO(fecha) && fecha > "2026-08-31") {
      hallazgos.push({ titulo: m[2].trim(), url: new URL(m[1], url).href as `https://${string}`, fecha: fecha > VERIFICADO ? fecha : VERIFICADO });
    }
  }
  return hallazgos.filter((h) => !h.url.endsWith("post_10981840.html"));
}

export const detectores: readonly Detector[] = [
  detectorCcpr("cn.usd", 0, { min: 5.5, max: 8.5, saltoRelativoMax: 0.03 }),
  detectorCcpr("cn.eur", 1, { min: 6, max: 10, saltoRelativoMax: 0.05 }),
  detectorCcpr("cn.jpy100", 2, { min: 3, max: 6.5, saltoRelativoMax: 0.05 }),
  detectorCcpr("cn.hkd", 3, { min: 0.7, max: 1.1, saltoRelativoMax: 0.03 }),
  ley("cn.flk-geshuifa", "中华人民共和国个人所得税法", "2018-08-31", ["cn.zonghe-suode-shuilv", "cn.jianchu-feiyong-nian", "cn.laowu-feiyong-bili", "cn.gaochou-jianan-bili", "cn.jingying-suode-shuilv"]),
  ley("cn.flk-laodong-hetong", "中华人民共和国劳动合同法", "2012-12-28", ["cn.jingji-buchang", "cn.peichangjin-beishu", "cn.shuangbei-gongzi", "cn.shiyongqi", "cn.shiyongqi-gongzi"]),
  ley("cn.flk-laodongfa", "中华人民共和国劳动法", "2018-12-29", ["cn.jiaban-beilv"]),
  ley("cn.flk-nianxiujia", "职工带薪年休假条例", "2007-12-14", ["cn.nianxiujia", "cn.nianxiujia-beilv"]),
  ley("cn.flk-nvzhigong", "女职工劳动保护特别规定", "2012-04-28", ["cn.chanjia"]),
  ley("cn.flk-zengzhishui", "中华人民共和国增值税法", "2024-12-25", ["cn.zengzhishui"]),
  ley("cn.flk-yinhuashui", "中华人民共和国印花税法", "2021-06-10", ["cn.yinhuashui"]),
  ley("cn.flk-gongjijin", "住房公积金管理条例", "2026-08-10", ["cn.gongjijin-xiaxian"]),
  {
    id: "cn.guangzhou-zuidi-gongzi",
    carril: "norma",
    datos: ["cn.guangzhou-zuidi-yue", "cn.guangzhou-zuidi-xiaoshi"],
    metodo: "html",
    url: "https://www.gz.gov.cn/xw/tzgg/",
    traer(http) {
      return avisoGuangzhou(http, this.url);
    },
  },
];
