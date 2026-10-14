import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

interface Voce {
  titolo: string;
  testo: string;
  url: string;
  data: string;
}

function voci(xml: string): Voce[] | null {
  if (!xml.includes("<rss")) return null;
  const out: Voce[] = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const pezzo = (tag: string) => new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i").exec(m[1])?.[1]?.trim() ?? "";
    out.push({
      titolo: pezzo("title"),
      testo: (pezzo("content:encoded") || pezzo("description")).replace(/\s+/g, " "),
      url: pezzo("link"),
      data: pezzo("pubDate") || pezzo("pubdate"),
    });
  }
  return out;
}

const MESI: Record<string, string> = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

// La Gazzetta pubblica pubDate in formato RFC 822 («Tue, 13 Oct 2026 ...»), l'INPS in «29/09/2026».
function dataIso(s: string): FechaISO | null {
  const rfc = /(\d{1,2}) (\w{3}) (\d{4})/.exec(s);
  const it = /(\d{2})\/(\d{2})\/(\d{4})/.exec(s);
  const iso = rfc && MESI[rfc[2]] ? `${rfc[3]}-${MESI[rfc[2]]}-${rfc[1].padStart(2, "0")}` : it ? `${it[3]}-${it[2]}-${it[1]}` : null;
  return iso && esFechaISO(iso) ? iso : null;
}

function filtra(lista: Voce[], re: RegExp): HallazgoNorma[] {
  const out: HallazgoNorma[] = [];
  for (const v of lista) {
    const fecha = dataIso(v.data);
    if (!fecha || !v.url.startsWith("http")) continue;
    if (re.test(`${v.titolo} ${v.testo}`)) out.push({ titulo: `${v.titolo}: ${v.testo}`.slice(0, 300), url: v.url.replace(/^http:/, "https:"), fecha });
  }
  return out;
}

export const detectores: readonly Detector[] = [
  {
    id: "it.gazzetta-serie-generale",
    carril: "norma",
    datos: [
      "it.irpef-scaglioni",
      "it.detrazione-lavoro",
      "it.detrazione-pensione",
      "it.cuneo-fiscale",
      "it.trattamento-integrativo",
      "it.aliquote-iva",
      "it.interesse-legale",
      "it.cedolare-secca",
      "it.forfettario-coefficienti",
      "it.forfettario-aliquote",
      "it.forfettario-soglie",
      "it.ritenuta-acconto",
    ],
    metodo: "api-xml",
    url: "https://www.gazzettaufficiale.it/rss/SG",
    async traer(http) {
      const lista = voci(await http.texto(this.url));
      if (!lista) return null;
      return filtra(lista, /interessi legali|imposta sul reddito delle persone fisiche|IRPEF|imposta sul valore aggiunto|testo unico|bilancio di previsione|cedolare|forfetari|cuneo fiscale/i);
    },
  },
  {
    id: "it.inps-circolari",
    carril: "norma",
    datos: [
      "it.fascia-pensionabile",
      "it.massimale-contributivo",
      "it.massimale-ante-1996",
      "it.minimale-autonomi",
      "it.aliquote-artigiani-commercianti",
      "it.maternita-autonomi",
      "it.aliquote-gestione-separata",
      "it.naspi-importi",
      "it.contributi-dipendente",
    ],
    metodo: "api-xml",
    url: "https://www.inps.it/it/it.rss.circolari.xml",
    async traer(http) {
      const lista = voci(await http.texto(this.url));
      if (!lista) return null;
      return filtra(lista, /Gestione separata|artigiani|commercianti|minimal[ei]|massimal[ei]|NASpI|aliquote contributive|importi .* prestazioni/i);
    },
  },
];
