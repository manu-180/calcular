import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

// MONSTAT od avgusta 2026. objavljuje saopštenje o zaradama i kao HTML, sa podacima u objektu `DATA`:
// `series` (neto) i `seriesB` (bruto), po ključu «2026-09». Adresa nosi skraćeni naziv mjeseca.
const MJESEC = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"];
const zaradeUrl = (d: Date) => `https://monstat.org/DS/ZARADE/Zarade_CG_${MJESEC[d.getUTCMonth()]}_${d.getUTCFullYear()}.html`;

async function zarade(http: Http, kljuc: "series" | "seriesB"): Promise<readonly PuntoSerie[] | null> {
  const sada = new Date();
  for (let i = 1; i <= 3; i++) {
    const d = new Date(Date.UTC(sada.getUTCFullYear(), sada.getUTCMonth() - i, 1));
    let html: string;
    try {
      html = await http.texto(zaradeUrl(d));
    } catch {
      continue;
    }
    const m = new RegExp(`\\x22${kljuc}\\x22:(\\{[^}]*\\})`).exec(html);
    if (!m) return null;
    const objekat = JSON.parse(m[1]) as Record<string, unknown>;
    const puntos: PuntoSerie[] = [];
    for (const [k, v] of Object.entries(objekat)) {
      const fecha = `${k}-01`;
      if (!esFechaISO(fecha) || typeof v !== "number") return null;
      puntos.push({ fecha, valor: v });
    }
    puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
    return puntos.length ? puntos : null;
  }
  return null;
}

// Baza CPI je xls, pa je detektor ne čita: stranica MONSTAT-a pokazuje putanju poslednjeg izdanja
// (`/cijene/CPI/2026/9/`), a veći mjesec od poznatog znači da treba ručno dopuniti seriju me.ipc.
const CPI_STRANICA = "https://www.monstat.org/cg/page.php?id=26&pageid=26";
async function novoCpi(http: Http, poznato: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(CPI_STRANICA);
  const nadjeno = [...html.matchAll(/cijene\/CPI\/(\d{4})\/(\d{1,2})\//g)].map((m) => `${m[1]}-${m[2].padStart(2, "0")}`);
  if (!nadjeno.length) return null;
  const najnovije = nadjeno.sort().at(-1) as string;
  if (najnovije <= poznato) return [];
  const fecha = new Date().toISOString().slice(0, 10) as FechaISO;
  return [{ titulo: `MONSTAT: nova baza CPI za ${najnovije}`, url: CPI_STRANICA, fecha }];
}

// Poreska uprava sa Upravom prihoda i carina objavljuje izmjene propisa na gov.me: promjena na stranici o
// novim poreskim zakonima traži čitanje. Veći broj „Službenog lista“ od poznatog je hallazgo.
const NOVI_ZAKONI = "https://www.gov.me/clanak/novi-poreski-zakoni";
async function noviPoreskiZakoni(http: Http, poznatBroj: number): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(NOVI_ZAKONI);
  const brojevi = [...html.matchAll(/br\.\s*(\d{1,3})\/(\d{2})/g)].map((m) => Number(m[2]) * 1000 + Number(m[1]));
  if (!brojevi.length) return null;
  const najveci = Math.max(...brojevi);
  if (najveci <= poznatBroj) return [];
  const fecha = new Date().toISOString().slice(0, 10) as FechaISO;
  return [{ titulo: `Uprava prihoda i carina: novi poreski propisi, „Sl. list CG“ ${najveci % 1000}/${Math.floor(najveci / 1000)}`, url: NOVI_ZAKONI, fecha }];
}

export const detectores: readonly Detector[] = [
  {
    id: "me.zarada-neto-monstat",
    carril: "serie",
    serie: "me.prosjecna-neto",
    metodo: "html",
    url: "https://monstat.org/DS/ZARADE/",
    banda: { min: 800, max: 1600, saltoRelativoMax: 0.1 },
    traer(http) {
      return zarade(http, "series");
    },
  },
  {
    id: "me.zarada-bruto-monstat",
    carril: "serie",
    serie: "me.prosjecna-bruto",
    metodo: "html",
    url: "https://monstat.org/DS/ZARADE/",
    banda: { min: 950, max: 1900, saltoRelativoMax: 0.1 },
    traer(http) {
      return zarade(http, "seriesB");
    },
  },
  {
    id: "me.cpi-monstat",
    carril: "norma",
    // Sin dato propio: la serie me.ipc no es un dato, y este es el dato anual del mismo organismo.
    datos: ["me.prosjecna-bruto-2025"],
    metodo: "html",
    url: CPI_STRANICA,
    traer(http) {
      return novoCpi(http, "2026-09");
    },
  },
  {
    id: "me.poreski-propisi",
    carril: "norma",
    datos: ["me.porez-zarada", "me.porez-samostalna", "me.pio-zaposleni", "me.nezaposlenost-zaposleni", "me.pdv-opsta", "me.porez-promet"],
    metodo: "html",
    url: NOVI_ZAKONI,
    traer(http) {
      return noviPoreskiZakoni(http, 26104);
    },
  },
];
