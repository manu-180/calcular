import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const HONAPOK: Readonly<Record<string, number>> = {
  január: 1,
  február: 2,
  március: 3,
  április: 4,
  május: 5,
  június: 6,
  július: 7,
  augusztus: 8,
  szeptember: 9,
  október: 10,
  november: 11,
  december: 12,
};

function ketJegy(n: number): string {
  return String(n).padStart(2, "0");
}

// Az MNB árfolyam-lekérdezése egy HTML-táblázat, dátumtartománnyal a címben (a SOAP-szolgáltatás
// csak POST-tal válaszol). Az utolsó negyven napot kérjük le, sorai „2026. október 22., csütörtök”
// alakú dátumot és vesszős tizedest tartalmaznak.
function mnbUrl(deviza: string, ma: Date): `https://${string}` {
  const tol = new Date(ma.getTime() - 40 * 86400000);
  const d = (x: Date) => `${ketJegy(x.getUTCDate())}%2F${ketJegy(x.getUTCMonth() + 1)}%2F${x.getUTCFullYear()}`;
  return `https://www.mnb.hu/arfolyam-tablazat?deviza=rbCurrencySelect&devizaSelected=${deviza}&datefrom=${d(tol)}&datetill=${d(ma)}&order=1`;
}

async function mnbArfolyam(http: Http, deviza: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(mnbUrl(deviza, new Date()));
  if (!html.includes(deviza)) return null;
  const puntos: PuntoSerie[] = [];
  const re = /<td class="rotate">(\d{4})\. (\p{L}+) (\d{1,2})\.,[^<]*<\/td>\s*<td class="rotate">(\d+),(\d+)<\/td>/gu;
  for (const m of html.matchAll(re)) {
    const ho = HONAPOK[m[2]];
    const fecha = `${m[1]}-${ketJegy(ho ?? 0)}-${m[3].padStart(2, "0")}`;
    if (!ho || !esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Number(`${m[4]}.${m[5]}`) });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

function detectorArfolyam(deviza: string, banda: DetectorSerie["banda"]): Detector {
  const k = deviza.toLowerCase();
  return {
    id: `hu.${k}-mnb`,
    carril: "serie",
    serie: `hu.${k}`,
    metodo: "html",
    url: `https://www.mnb.hu/arfolyam-tablazat?deviza=rbCurrencySelect&devizaSelected=${deviza}`,
    banda,
    traer(http) {
      return mnbArfolyam(http, deviza);
    },
  };
}

const KSH_CSV = "https://www.ksh.hu/stadat_files/ara/hu/ara0040.csv";

// A KSH STADAT 1.2.1.2 táblájának „Előző év december = 100,0” blokkjából láncoljuk az indexet,
// ugyanúgy, mint a series.json-ban (2016. december = 100). A CSV windows-1250 kódolású, ezért a
// hónapnevet csak a kezdőbetűi alapján azonosítjuk, ékezet nélkül. Az „Összesen” oszlop a nyolcadik
// szám a sorban.
const HONAP_ELEJE: readonly [RegExp, number][] = [
  [/^jan/, 1], [/^feb/, 2], [/^m.rc/, 3], [/^.pr/, 4], [/^m.j/, 5], [/^j.n/, 6],
  [/^j.l/, 7], [/^aug/, 8], [/^szep/, 9], [/^okt/, 10], [/^nov/, 11], [/^dec/, 12],
];

async function kshCpi(http: Http): Promise<readonly PuntoSerie[] | null> {
  const csv = await http.texto(KSH_CSV);
  const sorok = csv.split(/\r?\n/);
  const kezdet = sorok.findIndex((s) => /december = 100/.test(s));
  if (kezdet < 0) return null;
  const indexek = new Map<string, number>();
  let ev = 0;
  for (const sor of sorok.slice(kezdet + 1)) {
    if (/= 100/.test(sor)) break;
    const c = sor.split(";");
    if (/^\d{4}\.$/.test(c[0] ?? "")) ev = Number(c[0].slice(0, 4));
    const ho = HONAP_ELEJE.find(([re]) => re.test(c[1] ?? ""))?.[1];
    const ertek = c[9];
    if (!ev || !ho || !ertek || !/^\d+,\d$/.test(ertek)) continue;
    indexek.set(`${ev}-${ketJegy(ho)}`, Number(ertek.replace(",", ".")));
  }
  if (!indexek.has("2017-01")) return null;
  const puntos: PuntoSerie[] = [{ fecha: "2016-12-01", valor: 100 }];
  let alap = 100;
  for (let e = 2017; ; e++) {
    let dec: number | null = null;
    for (let h = 1; h <= 12; h++) {
      const w = indexek.get(`${e}-${ketJegy(h)}`);
      if (w === undefined) continue;
      const fecha = `${e}-${ketJegy(h)}-01`;
      if (!esFechaISO(fecha)) return null;
      const valor = (alap * w) / 100;
      puntos.push({ fecha, valor: Math.round(valor * 10000) / 10000 });
      if (h === 12) dec = valor;
    }
    if (dec === null) break;
    alap = dec;
  }
  return puntos;
}

// A Nemzeti Jogszabálytár a törvény hatályos szövegének kezdőnapját a <div class="hataly"> elemben
// mutatja. Ha ez későbbi, mint az ellenőrzéskor látott nap, módosult a szöveg.
async function ujHatalyos(http: Http, url: string, cim: string, ismert: FechaISO): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const m = /class="hataly">(\d{4})\.(\d{2})\.(\d{2})\./.exec(html);
  if (!m) return null;
  const fecha = `${m[1]}-${m[2]}-${m[3]}`;
  if (!esFechaISO(fecha)) return null;
  if (fecha <= ismert) return [];
  return [{ titulo: `${cim}: új hatályos szöveg ettől a naptól: ${fecha}`, url, fecha }];
}

function njt(id: string, azonosito: string, cim: string, ismert: FechaISO, datos: readonly string[]): Detector {
  const url = `https://njt.jog.gov.hu/jogszabaly/${azonosito}` as const;
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    traer(http) {
      return ujHatalyos(http, url, cim, ismert);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorArfolyam("EUR", { min: 330, max: 450, saltoRelativoMax: 0.05 }),
  detectorArfolyam("USD", { min: 260, max: 450, saltoRelativoMax: 0.06 }),
  detectorArfolyam("CHF", { min: 300, max: 500, saltoRelativoMax: 0.06 }),
  detectorArfolyam("GBP", { min: 360, max: 520, saltoRelativoMax: 0.06 }),
  {
    id: "hu.cpi-ksh",
    carril: "serie",
    serie: "hu.cpi",
    metodo: "html",
    url: KSH_CSV,
    banda: { min: 150, max: 260, saltoRelativoMax: 0.03 },
    traer(http) {
      return kshCpi(http);
    },
  },
  njt("hu.njt-minimalber", "2025-426-20-22", "426/2025. (XII. 23.) Korm. rendelet (minimálbér)", "2026-01-02", ["hu.minimalber", "hu.garantalt-berminimum"]),
  njt("hu.njt-szja", "1995-117-00-00", "Szja tv.", "2026-10-01", [
    "hu.szja",
    "hu.csaladi-kedvezmeny",
    "hu.csaladi-kedvezmeny-beteg",
    "hu.elso-hazasok-kedvezmenye",
    "hu.atalanyado-koltseghanyad",
    "hu.atalanyado-beveteli-hatar",
    "hu.atalanyado-adomentes-resz",
    "hu.fiatalok-kedvezmenye-hatar",
  ]),
  njt("hu.njt-tbj", "2019-122-00-00", "Tbj.", "2026-10-01", ["hu.tb-jarulek", "hu.nyugdijjarulek"]),
  njt("hu.njt-szocho", "2018-52-00-00", "Szocho tv.", "2026-10-01", ["hu.szocho"]),
  njt("hu.njt-afa", "2007-127-00-00", "Áfa tv.", "2026-09-15", ["hu.afa"]),
  njt("hu.njt-mt", "2012-1-00-00", "Munka Törvénykönyve", "2026-10-01", [
    "hu.alapszabadsag",
    "hu.potszabadsag-eletkor",
    "hu.potszabadsag-gyermek",
    "hu.potszabadsag-egyeb",
    "hu.felmondasi-ido-alap",
    "hu.felmondasi-ido-hosszabbitas",
    "hu.vegkielegites",
    "hu.vegkielegites-emeles",
    "hu.rendkivuli-munkaido-potlek",
    "hu.oraber-oszto",
    "hu.betegszabadsag",
  ]),
  njt("hu.njt-ebtv", "1997-83-00-00", "Ebtv.", "2026-10-01", ["hu.tappenz", "hu.csed", "hu.csed-napok", "hu.gyed"]),
  njt("hu.njt-cst", "1998-84-00-00", "Cst. (családi pótlék)", "2026-10-01", ["hu.csaladi-potlek"]),
  njt("hu.njt-itv", "1990-93-00-00", "Illetéktörvény", "2026-10-01", ["hu.illetek-kulcs", "hu.illetek-hatarok", "hu.illetek-fiatal-kedvezmeny"]),
  njt("hu.njt-kata", "2022-13-00-00", "Katv.", "2023-08-01", ["hu.kata-teteles-ado", "hu.kata-keretosszeg", "hu.kata-kulonado"]),
];
