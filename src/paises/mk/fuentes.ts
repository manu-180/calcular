import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const INDIKATORI = "https://www.stat.mk/mk/site-indikatori/";
const OSLOBODUVANJE = "https://www.ujp.gov.mk/mk/plakjanje/licno_osloboduvanje";
const STAPKI = "https://www.ujp.gov.mk/mk/vodic/category/641";

const MESECI: Readonly<Record<string, number>> = {
  јануари: 1, февруари: 2, март: 3, април: 4, мај: 5, јуни: 6,
  јули: 7, август: 8, септември: 9, октомври: 10, ноември: 11, декември: 12,
};

// Страницата со индикатори ги кодира буквите со нумерички ентитети и пишува „48 733 денари - август 2026“.
function plataOdIndikatori(html: string, naslov: RegExp): PuntoSerie | null {
  const tekst = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
  const poz = tekst.search(naslov);
  if (poz < 0) return null;
  const m = /(\d{2,3}[ .]\d{3})\s*денари\s*-?\s*(\p{L}+)\s*(\d{4})/u.exec(tekst.slice(poz, poz + 300));
  if (!m) return null;
  const mesec = MESECI[m[2].toLowerCase()];
  const fecha = `${m[3]}-${String(mesec ?? 0).padStart(2, "0")}-01`;
  if (!mesec || !esFechaISO(fecha)) return null;
  return { fecha, valor: Number(m[1].replace(/[ .]/g, "")) };
}

function detectorPlata(id: string, serie: string, naslov: RegExp, banda: { min: number; max: number; saltoRelativoMax: number }): Detector {
  return {
    id,
    carril: "serie",
    serie,
    metodo: "html",
    url: INDIKATORI,
    banda,
    async traer(http: Http) {
      const p = plataOdIndikatori(await http.texto(INDIKATORI), naslov);
      return p ? [p] : null;
    },
  };
}

async function novaGodina(http: Http, url: string, re: RegExp, ispraten: number, naslov: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const godini = [...html.matchAll(re)].map((m) => Number(m[1]));
  if (godini.length === 0) return null;
  const najnova = Math.max(...godini);
  if (najnova <= ispraten) return [];
  const fecha = `${najnova}-01-01` as FechaISO;
  return [{ titulo: `${naslov}: нов податок за ${najnova}`, url, fecha }];
}

export const detectores: readonly Detector[] = [
  detectorPlata("mk.neto-plata-dzs", "mk.neto-plata", /нето[- ]плата/iu, { min: 30000, max: 90000, saltoRelativoMax: 0.15 }),
  detectorPlata("mk.bruto-plata-dzs", "mk.bruto-plata", /бруто[- ]плата/iu, { min: 45000, max: 130000, saltoRelativoMax: 0.15 }),
  {
    id: "mk.ujp-licno-osloboduvanje",
    carril: "norma",
    datos: ["mk.licno-osloboduvanje"],
    metodo: "html",
    url: OSLOBODUVANJE,
    traer(http) {
      return novaGodina(http, OSLOBODUVANJE, />\s*(20\d{2})\s*</g, 2026, "Лично ослободување");
    },
  },
  {
    id: "mk.ujp-prosechna-plata",
    carril: "norma",
    datos: ["mk.prosechna-plata-osnovica", "mk.pridonesi"],
    metodo: "html",
    url: STAPKI,
    async traer(http) {
      const html = await http.texto(STAPKI);
      if (!/69[. ,]?141/.test(html)) return null;
      const m = /(20\d{2})[^0-9]{1,40}(\d{2}[. ,]?\d{3})/g;
      const godini = [...html.matchAll(m)].filter((x) => Number(x[1]) > 2026);
      return godini.length ? [{ titulo: `Просечна плата за основицата: нов податок за ${godini[0][1]}`, url: STAPKI, fecha: `${godini[0][1]}-01-01` as FechaISO }] : [];
    },
  },
];
