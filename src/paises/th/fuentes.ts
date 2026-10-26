import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const VERIFICADO = "2026-10-26";
const INDICE_OCS = "https://www.ocs.go.th/searchlaw/law-index/";
// Último ítem del índice de la คณะกรรมการกฤษฎีกา que se revisó al verificar: los ítems nuevos tienen
// número mayor.
const ULTIMO_ITEM_OCS = 18512;

// Las páginas de กรมสรรพากร muestran «ปรับปรุงล่าสุด: DD-MM-AAAA» (año gregoriano). Una fecha posterior
// a la verificación es un cambio que hay que leer.
async function paginaRd(http: Http, url: string, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const m = /ปรับปรุงล่าสุด:(?:&nbsp;|\s)*(\d{2})-(\d{2})-(\d{4})/.exec(html);
  if (!m) return null;
  const fecha = `${m[3]}-${m[2]}-${m[1]}`;
  if (!esFechaISO(fecha)) return null;
  return fecha > VERIFICADO ? [{ titulo: [titulo, "ปรับปรุง", fecha].join(" "), url, fecha: fecha as FechaISO }] : [];
}

// El índice de la คณะกรรมการกฤษฎีกา lista las últimas normas publicadas con su número de ítem. Una
// norma nueva cuyo título calza con el patrón es un hallazgo; la fecha sale del año พ.ศ. del título.
async function indiceOcs(http: Http, patron: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(INDICE_OCS, { userAgentNavegador: true });
  const filas = [...html.matchAll(/>([^<>]{10,400})<\/[a-z]+>(?:\s|<[^>]+>)*?<a[^>]*law-index\/item\/(\d+)/g)];
  if (filas.length === 0) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [, crudo, item] of filas) {
    const titulo = crudo.trim();
    if (Number(item) <= ULTIMO_ITEM_OCS || !patron.test(titulo)) continue;
    const anio = /พ\.ศ\.\s*(\d{4})/.exec(titulo);
    const fecha = anio ? `${Number(anio[1]) - 543}-01-01` : VERIFICADO;
    if (esFechaISO(fecha)) hallazgos.push({ titulo, url: `${INDICE_OCS}item/${item}`, fecha });
  }
  return hallazgos;
}

const rd = (id: string, url: `https://${string}`, titulo: string, datos: readonly string[]): Detector => ({
  id,
  carril: "norma",
  datos,
  metodo: "html",
  url,
  userAgentNavegador: true,
  traer(http) {
    return paginaRd(http, this.url, titulo);
  },
});

const ocs = (id: string, patron: RegExp, datos: readonly string[]): Detector => ({
  id,
  carril: "norma",
  datos,
  metodo: "html",
  url: INDICE_OCS,
  userAgentNavegador: true,
  traer(http) {
    return indiceOcs(http, patron);
  },
});

export const detectores: readonly Detector[] = [
  rd("th.rd-pit-rates", "https://www.rd.go.th/59670.html", "อัตราภาษีเงินได้บุคคลธรรมดา", ["th.pit-brackets"]),
  rd("th.rd-pit-structure", "https://www.rd.go.th/59668.html", "การปรับปรุงโครงสร้างภาษีเงินได้", [
    "th.employment-expense-rate",
    "th.employment-expense-cap",
    "th.personal-allowance",
    "th.spouse-allowance",
    "th.child-allowance",
  ]),
  rd("th.rd-withholding", "https://www.rd.go.th/3479.html", "คำสั่งกรมสรรพากรที่ ท.ป.4/2528", ["th.wht-rates"]),
  rd("th.rd-inheritance", "https://www.rd.go.th/56662.html", "อัตราภาษีการรับมรดก", ["th.inheritance-exempt", "th.inheritance-rate", "th.inheritance-rate-family"]),
  ocs("th.ocs-social-security", /ประกันสังคม|เงินสมทบ/, [
    "th.sso-rate-employee",
    "th.sso-rate-employer",
    "th.sso-rate-government",
    "th.sso-wage-floor",
    "th.sso-wage-ceiling",
  ]),
  ocs("th.ocs-revenue-code", /ประมวลรัษฎากร|เงินได้บุคคลธรรมดา/, [
    "th.pit-brackets",
    "th.child-allowance-second",
    "th.parent-allowance",
    "th.sso-deduction-cap",
    "th.interest-wht",
    "th.savings-interest-exempt",
  ]),
];
