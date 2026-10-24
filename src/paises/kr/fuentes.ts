import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO = "20261024";
const ECOS = "https://ecos.bok.or.kr/api/StatisticSearch/sample/json/kr";
const DRF = "https://www.law.go.kr/DRF/lawSearch.do?OC=test&type=JSON";

const iso = (yyyymmdd: string): FechaISO | null => {
  const f = `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.length >= 8 ? yyyymmdd.slice(6, 8) : "01"}`;
  return esFechaISO(f) ? f : null;
};

interface FilaEcos {
  TIME?: unknown;
  DATA_VALUE?: unknown;
}

// La clave pública «sample» del ECOS devuelve como máximo 10 filas por pedido y siempre desde el
// principio del rango: primero se pide el total y después las últimas 10.
async function ecos(http: Http, ruta: (desde: number, hasta: number) => string): Promise<readonly PuntoSerie[] | null> {
  const cabeza = (await http.json(`${ECOS}/${ruta(1, 1)}`)) as { StatisticSearch?: { list_total_count?: unknown } };
  const total = Number(cabeza?.StatisticSearch?.list_total_count);
  if (!Number.isInteger(total) || total < 1) return null;
  const json = (await http.json(`${ECOS}/${ruta(Math.max(1, total - 9), total)}`)) as { StatisticSearch?: { row?: unknown } };
  const filas = json?.StatisticSearch?.row;
  if (!Array.isArray(filas)) return null;
  const puntos: PuntoSerie[] = [];
  for (const f of filas as FilaEcos[]) {
    const fecha = typeof f.TIME === "string" ? iso(f.TIME) : null;
    const valor = typeof f.DATA_VALUE === "string" ? Number(f.DATA_VALUE) : NaN;
    if (!fecha || !Number.isFinite(valor)) return null;
    puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos : null;
}

interface LeyBuscada {
  법령명한글?: unknown;
  공포일자?: unknown;
  시행일자?: unknown;
}

// El buscador del 국가법령정보센터 devuelve, para cada ley vigente, la fecha de la última reforma
// promulgada (공포일자). Una fecha posterior a la verificación es una reforma que hay que leer.
async function reforma(http: Http, url: string, nombre: string): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url)) as { LawSearch?: { law?: unknown } };
  const lista = json?.LawSearch?.law;
  const leyes = (Array.isArray(lista) ? lista : lista ? [lista] : []) as LeyBuscada[];
  const ley = leyes.find((l) => l.법령명한글 === nombre);
  if (!ley || typeof ley.공포일자 !== "string") return null;
  if (ley.공포일자 <= VERIFICADO) return [];
  const fecha = iso(ley.공포일자);
  if (!fecha) return null;
  return [{ titulo: `${nombre} 개정(공포 ${fecha}, 시행 ${String(ley.시행일자)})`, url: `https://www.law.go.kr/법령/${nombre.replace(/ /g, "")}`, fecha }];
}

interface ReglaBuscada {
  행정규칙명?: unknown;
  발령일자?: unknown;
  행정규칙일련번호?: unknown;
}

// Los 고시 (salario mínimo, límites del 국민연금) se buscan en los 행정규칙: un 고시 nuevo con el
// nombre esperado y fecha posterior a la verificación es un valor nuevo.
async function nuevoGosi(http: Http, url: string, patron: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url)) as { AdmRulSearch?: { admrul?: unknown } };
  const lista = json?.AdmRulSearch?.admrul;
  if (lista === undefined) return null;
  const reglas = (Array.isArray(lista) ? lista : [lista]) as ReglaBuscada[];
  const hallazgos: HallazgoNorma[] = [];
  for (const r of reglas) {
    if (typeof r.행정규칙명 !== "string" || !patron.test(r.행정규칙명) || typeof r.발령일자 !== "string") continue;
    if (r.발령일자 <= VERIFICADO) continue;
    const fecha = iso(r.발령일자);
    if (fecha) hallazgos.push({ titulo: r.행정규칙명, url: `https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=${String(r.행정규칙일련번호)}`, fecha });
  }
  return hallazgos;
}

const ley = (id: string, nombre: string, datos: readonly string[]): Detector => ({
  id,
  carril: "norma",
  datos,
  metodo: "api-json",
  url: `${DRF}&target=law&display=20&query=${encodeURIComponent(nombre)}` as `https://${string}`,
  traer(http) {
    return reforma(http, this.url, nombre);
  },
});

export const detectores: readonly Detector[] = [
  {
    id: "kr.cpi-ecos",
    carril: "serie",
    serie: "kr.cpi",
    metodo: "api-json",
    url: `${ECOS}/1/1/901Y009/M/202501/203512/0`,
    banda: { min: 100, max: 160, saltoRelativoMax: 0.03 },
    traer(http) {
      return ecos(http, (a, b) => `${a}/${b}/901Y009/M/202501/203512/0`);
    },
  },
  {
    id: "kr.usd-krw-ecos",
    carril: "serie",
    serie: "kr.usd-krw",
    metodo: "api-json",
    url: `${ECOS}/1/1/731Y001/D/20260901/20351231/0000001`,
    banda: { min: 900, max: 2000, saltoRelativoMax: 0.05 },
    traer(http) {
      return ecos(http, (a, b) => `${a}/${b}/731Y001/D/20260901/20351231/0000001`);
    },
  },
  {
    id: "kr.base-rate-ecos",
    carril: "serie",
    serie: "kr.base-rate",
    metodo: "api-json",
    url: `${ECOS}/1/1/722Y001/D/20260901/20351231/0101000`,
    // El 기준금리 se mueve de a 0,25 puntos, pero en 2020 bajó de 1,25 a 0,75 en una reunión
    // extraordinaria: el salto relativo admite medio punto sobre tasas bajas.
    banda: { min: 0, max: 8, saltoRelativoMax: 0.7 },
    traer(http) {
      return ecos(http, (a, b) => `${a}/${b}/722Y001/D/20260901/20351231/0101000`);
    },
  },
  ley("kr.law-income-tax", "소득세법", [
    "kr.income-tax-brackets",
    "kr.earned-income-deduction",
    "kr.earned-income-deduction-cap",
    "kr.basic-deduction",
    "kr.earned-income-tax-credit",
    "kr.earned-income-tax-credit-limits",
    "kr.standard-tax-credit",
    "kr.child-tax-credit",
    "kr.meal-allowance-exempt",
    "kr.interest-withholding-rate",
    "kr.retirement-years-deduction",
    "kr.retirement-converted-deduction",
    "kr.capital-gains-basic-deduction",
    "kr.capital-gains-short-rates",
    "kr.long-term-holding-general",
    "kr.long-term-holding-one-house",
    "kr.long-term-residence-one-house",
  ]),
  ley("kr.law-income-tax-decree", "소득세법 시행령", ["kr.luxury-house-threshold"]),
  ley("kr.law-local-tax", "지방세법", ["kr.local-income-tax-rate", "kr.housing-acquisition-tax", "kr.local-education-tax"]),
  ley("kr.law-rural-tax", "농어촌특별세법", ["kr.rural-special-tax"]),
  ley("kr.law-pension", "국민연금법", ["kr.national-pension-rate"]),
  ley("kr.law-health-decree", "국민건강보험법 시행령", ["kr.health-insurance-rate"]),
  ley("kr.law-ltc-decree", "노인장기요양보험법 시행령", ["kr.long-term-care-rate"]),
  ley("kr.law-insurance-collection-decree", "고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률 시행령", ["kr.employment-insurance-rate", "kr.employment-stability-rate"]),
  ley("kr.law-employment-insurance", "고용보험법", ["kr.unemployment-rate", "kr.unemployment-min-rate", "kr.unemployment-days"]),
  ley("kr.law-employment-insurance-decree", "고용보험법 시행령", ["kr.unemployment-base-cap", "kr.parental-leave-caps", "kr.parental-leave-late-rate"]),
  ley("kr.law-labor-standards", "근로기준법", ["kr.overtime-premiums", "kr.weekly-holiday-min-hours", "kr.annual-leave"]),
  ley("kr.law-retirement-benefit", "근로자퇴직급여 보장법", ["kr.severance-days"]),
  ley("kr.law-inheritance-gift", "상속세 및 증여세법", ["kr.gift-inheritance-tax-brackets", "kr.gift-deductions", "kr.filing-tax-credit", "kr.inheritance-deductions"]),
  ley("kr.law-brokerage-rule", "공인중개사법 시행규칙", ["kr.brokerage-sale", "kr.brokerage-lease", "kr.brokerage-caps", "kr.brokerage-rent-multipliers", "kr.officetel-brokerage"]),
  ley("kr.law-lease-decree", "주택임대차보호법 시행령", ["kr.rent-conversion"]),
  ley("kr.law-vat", "부가가치세법", ["kr.vat"]),
  {
    id: "kr.gosi-minimum-wage",
    carril: "norma",
    datos: ["kr.minimum-wage", "kr.minimum-wage-monthly-hours"],
    metodo: "api-json",
    url: `${DRF}&target=admrul&display=30&query=${encodeURIComponent("적용 최저임금 고시")}`,
    traer(http) {
      return nuevoGosi(http, this.url, /^\d{4}년 적용 최저임금 고시$/);
    },
  },
  {
    id: "kr.gosi-pension-limits",
    carril: "norma",
    datos: ["kr.pension-income-limits"],
    metodo: "api-json",
    url: `${DRF}&target=admrul&display=30&query=${encodeURIComponent("기준소득월액 하한액과 상한액")}`,
    traer(http) {
      return nuevoGosi(http, this.url, /^국민연금 기준소득월액 하한액과 상한액$/);
    },
  },
];
