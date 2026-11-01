import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const PX = "https://pxweb.stat.si/SiStatData/api/v1/sl/Data/";
const BSI = "https://www.bsi.si/_data/tecajnice/dtecbs.xml";

// PXWeb de SURS solo devuelve datos con POST; la clave trae el mes como 2026M09.
async function pxSerie(http: Http, tabla: string, seleccion: Record<string, string[]>, mesCod: string, mesPos: number): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const query = [
    ...Object.entries(seleccion).map(([code, values]) => ({ code, selection: { filter: "item", values } })),
    { code: mesCod, selection: { filter: "top", values: ["13"] } },
  ];
  const r = (await http.postJson(PX + tabla, { query, response: { format: "json" } })) as { data?: { key: string[]; values: string[] }[] };
  if (!Array.isArray(r.data)) return null;
  const puntos: PuntoSerie[] = [];
  for (const f of r.data) {
    const m = /^(\d{4})M(\d{2})$/.exec(f.key[mesPos] ?? "");
    const valor = Number(f.values[0]);
    if (!m || !Number.isFinite(valor)) continue;
    const fecha = `${m[1]}-${m[2]}-01`;
    if (esFechaISO(fecha)) puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos : null;
}

async function tecajBsi(http: Http, oznaka: string): Promise<readonly PuntoSerie[] | null> {
  const xml = await http.texto(BSI);
  const fecha = /<tecajnica datum="(\d{4}-\d{2}-\d{2})"/.exec(xml)?.[1];
  const valor = new RegExp(`oznaka=\\x22${oznaka}\\x22[^>]*>([\\d.]+)<`).exec(xml)?.[1];
  if (!fecha || !valor || !esFechaISO(fecha)) return null;
  return [{ fecha, valor: Number(valor) }];
}

// La API de PISRS da las versiones consolidadas (NPB) de una ley: una versión nueva es la señal de un
// cambio. El cron abre un PR borrador; nunca se publica solo.
async function novoNpb(http: Http, sifra: string, ime: string, znanih: number): Promise<readonly HallazgoNorma[] | null> {
  const url = `https://pisrs.si/api/rezultat/zbirka/id/${sifra}`;
  const r = (await http.json(url)) as { data?: { besedilo?: { npbVerzije?: { naziv?: string }[] } } };
  const v = r.data?.besedilo?.npbVerzije;
  if (!Array.isArray(v)) return null;
  const najvecja = Math.max(0, ...v.map((x) => Number((x.naziv ?? "").replace(/\D/g, "")) || 0));
  if (najvecja <= znanih) return [];
  return [{ titulo: `${ime}: nova prečiščena različica NPB ${najvecja}`, url: `https://pisrs.si/pregledPredpisa?id=${sifra}`, fecha: new Date().toISOString().slice(0, 10) as FechaISO }];
}

function pisrs(id: string, sifra: string, ime: string, znanih: number, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "api-json",
    url: `https://pisrs.si/api/rezultat/zbirka/id/${sifra}`,
    traer(http) {
      return novoNpb(http, sifra, ime, znanih);
    },
  };
}

function tecaj(oznaka: string, banda: { min: number; max: number }): Detector {
  const k = oznaka.toLowerCase();
  return {
    id: `si.tecaj-${k}-bsi`,
    carril: "serie",
    serie: `si.tecaj-${k}`,
    metodo: "html",
    url: BSI,
    banda: { ...banda, saltoRelativoMax: 0.05 },
    traer(http) {
      return tecajBsi(http, oznaka);
    },
  };
}

export const detectores: readonly Detector[] = [
  tecaj("USD", { min: 0.8, max: 1.6 }),
  tecaj("GBP", { min: 0.65, max: 1.1 }),
  tecaj("CHF", { min: 0.7, max: 1.2 }),
  {
    id: "si.ipc-surs",
    carril: "serie",
    serie: "si.ipc",
    metodo: "api-json",
    url: `${PX}0400608S.px`,
    banda: { min: 60, max: 170, saltoRelativoMax: 0.03 },
    traer(http) {
      return pxSerie(http, "0400608S.px", { "ŽIVLJENJSKA POTREBŠČINA": ["TOT"], MERITVE: ["33"] }, "MESEC", 1);
    },
  },
  {
    id: "si.povprecna-placa-surs",
    carril: "serie",
    serie: "si.povprecna-placa",
    metodo: "api-json",
    url: `${PX}H285S.px`,
    banda: { min: 2000, max: 4500, saltoRelativoMax: 0.12 },
    traer(http) {
      return pxSerie(http, "H285S.px", { "PLAČE": ["1"] }, "MESEC", 0);
    },
  },
  pisrs("si.pisrs-zdoh", "ZAKO4697", "Zakon o dohodnini", 36, ["si.dohodnina", "si.splosna-olajsava", "si.normirani-odhodki-polni", "si.normirani-odhodki-popoldan"]),
  pisrs("si.pisrs-zdr", "ZAKO5944", "Zakon o delovnih razmerjih", 14, ["si.regres-najmanj", "si.dopust", "si.odpravnina", "si.odpovedni-rok", "si.nadure-meje", "si.dnevi-bolniska"]),
  pisrs("si.pisrs-zpiz", "ZAKO6280", "Zakon o pokojninskem in invalidskem zavarovanju", 27, ["si.pokojnina-odstotek", "si.pokojnina-doba", "si.pokojnina-starost", "si.znizanje-osnove-sp"]),
  pisrs("si.pisrs-zpzr", "ZAKO9359", "Zakon o pravici do zimskega regresa", 1, ["si.zimski-regres-delez", "si.dohodnina-normiranci-polni", "si.dohodnina-normiranci-popoldan", "si.normiranci-limiti"]),
  pisrs("si.pisrs-zsdp", "ZAKO6688", "Zakon o starševskem varstvu in družinskih prejemkih", 9, ["si.starsevski-dopust", "si.starsevsko-nadomestilo"]),
];
