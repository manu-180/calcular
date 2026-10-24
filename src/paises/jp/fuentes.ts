import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-17";
const REIWA = 2018;
const NTA = "https://www.nta.go.jp/taxes/shiraberu/taxanswer";

const anchoNormal = (s: string) => s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
const fecha = (anio: number, mes: number, dia: number) => `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;

// Cada página de la タックスアンサー declara la fecha de la ley que refleja («[令和8年4月1日現在法令等]»).
// Si cambia, el 国税庁 la reescribió y hay que volver a leer los valores.
async function fechaNta(http: Http, url: string, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const m = anchoNormal(await http.texto(url)).match(/\[令和(\d+)年(\d+)月(\d+)日現在法令等\]/);
  if (!m) return null;
  const f = fecha(REIWA + Number(m[1]), Number(m[2]), Number(m[3]));
  return f > "2026-04-01" ? [{ titulo, url, fecha: f }] : [];
}

// Páginas que anuncian el año fiscal (令和N年度) en un título: un año mayor que el cargado es un cambio.
async function anioReiwa(http: Http, url: string, patron: RegExp, cargado: number, titulo: string, mes: number): Promise<readonly HallazgoNorma[] | null> {
  const texto = anchoNormal(await http.texto(url));
  const anios = [...texto.matchAll(new RegExp(patron, "g"))].map((m) => Number(m[1]));
  if (!anios.length) return null;
  const max = Math.max(...anios);
  if (max <= cargado) return [];
  const f = fecha(REIWA + max, mes, 1);
  return [{ titulo: `${titulo}（令和${max}年度）`, url, fecha: f > VERIFICADO ? f : VERIFICADO }];
}

const nta = (id: string, ruta: string, titulo: string, datos: readonly string[]): Detector => ({
  id,
  carril: "norma",
  datos,
  metodo: "html",
  url: `${NTA}/${ruta}` as `https://${string}`,
  traer(http) {
    return fechaNta(http, this.url, titulo);
  },
});

export const detectores: readonly Detector[] = [
  nta("jp.nta-income-tax-rates", "shotoku/2260.htm", "No.2260 所得税の税率", ["jp.income-tax-brackets", "jp.income-surtax-rate"]),
  nta("jp.nta-basic-deduction", "shotoku/1199.htm", "No.1199 基礎控除", ["jp.basic-deduction"]),
  nta("jp.nta-employment-income-deduction", "shotoku/1410.htm", "No.1410 給与所得控除", ["jp.employment-income-deduction"]),
  nta("jp.nta-consumption-tax", "shohi/6303.htm", "No.6303 消費税および地方消費税の税率", [
    "jp.consumption-tax-standard",
    "jp.consumption-tax-reduced",
    "jp.consumption-tax-national-standard",
    "jp.consumption-tax-national-reduced",
  ]),
  nta("jp.nta-retirement-income", "shotoku/1420.htm", "No.1420 退職所得", ["jp.retirement-deduction"]),
  nta("jp.nta-gift-tax", "zoyo/4408.htm", "No.4408 贈与税の計算と税率", ["jp.gift-tax-basic-exemption", "jp.gift-tax-general", "jp.gift-tax-special"]),
  nta("jp.nta-inheritance-tax", "sozoku/4155.htm", "No.4155 相続税の税率", ["jp.inheritance-tax", "jp.inheritance-basic-exemption", "jp.spouse-tax-relief"]),
  nta("jp.nta-withholding-fee", "gensen/2795.htm", "No.2795 原稿料や講演料を支払ったとき", ["jp.withholding-fee"]),
  nta("jp.nta-medical-deduction", "shotoku/1120.htm", "No.1120 医療費控除", ["jp.medical-deduction"]),
  nta("jp.nta-housing-loan", "shotoku/1211-1.htm", "No.1211-1 住宅借入金等特別控除", ["jp.housing-loan-limit", "jp.housing-loan-rate", "jp.housing-loan-years"]),
  {
    id: "jp.kyoukaikenpo-rates",
    carril: "norma",
    datos: ["jp.health-insurance-rate", "jp.long-term-care-rate", "jp.child-support-rate", "jp.standard-monthly-remuneration"],
    metodo: "html",
    url: "https://www.kyoukaikenpo.or.jp/about/business/insurance_rate/rate_prefectures/",
    traer(http) {
      return anioReiwa(http, this.url, /令和(\d+)年度保険料率/, 8, "協会けんぽの都道府県単位保険料率", 3);
    },
  },
  {
    id: "jp.mhlw-minimum-wage",
    carril: "norma",
    datos: ["jp.minimum-wage"],
    metodo: "html",
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/minimumichiran/",
    traer(http) {
      return anioReiwa(http, this.url, /令和(\d+)年度地域別最低賃金の全国一覧/, 8, "地域別最低賃金の全国一覧", 10);
    },
  },
  {
    id: "jp.nenkin-basic-pension",
    carril: "norma",
    datos: ["jp.basic-pension-full"],
    metodo: "html",
    url: "https://www.nenkin.go.jp/service/jukyu/seido/roureinenkin/jukyu-yoken/20150401-02.html",
    traer(http) {
      return anioReiwa(http, this.url, /年金額（令和(\d+)年4月分から）/, 8, "老齢基礎年金の年金額", 4);
    },
  },
];
