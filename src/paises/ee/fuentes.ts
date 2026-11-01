import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const STAT_IA002 = "https://andmed.stat.ee/api/v1/et/stat/IA002";

function paringThi(aastad: readonly string[]) {
  return {
    query: [
      { code: "Kaubagrupp", selection: { filter: "item", values: ["1"] } },
      { code: "Aasta", selection: { filter: "item", values: aastad } },
    ],
    response: { format: "json-stat2" },
  };
}

// Statistikaameti PxWeb vastab andmetega ainult POST-päringule. Väärtused tulevad järjekorras
// aasta × kuu; avaldamata kuud on null.
async function thi(http: Http): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const aasta = new Date().getUTCFullYear();
  const aastad = [String(aasta - 1), String(aasta)];
  const j = (await http.postJson(STAT_IA002, paringThi(aastad))) as { value?: unknown };
  if (!Array.isArray(j?.value) || j.value.length !== aastad.length * 12) return null;
  const puntos: PuntoSerie[] = [];
  j.value.forEach((v: unknown, i: number) => {
    if (typeof v !== "number") return;
    const fecha = `${aastad[Math.floor(i / 12)]}-${String((i % 12) + 1).padStart(2, "0")}-01`;
    if (esFechaISO(fecha)) puntos.push({ fecha, valor: v });
  });
  return puntos.length ? puntos : null;
}

interface Redaktsioon {
  id?: number;
  kehtivuseAlgus?: string;
}

// Riigi Teataja avalik API annab seaduse kõik redaktsioonid, ka veel kehtima hakkamata. Uus
// redaktsioon, mida kontrollimise päeval ei olnud, võib muuta meie määrasid.
async function uuedRedaktsioonid(http: Http, grupp: number, nimi: string, teada: number): Promise<readonly HallazgoNorma[] | null> {
  const j = (await http.json(`https://www.riigiteataja.ee/public-api/api/v1/akt/${grupp}/redaktsioonid`)) as { redaktsioonid?: Redaktsioon[] };
  if (!Array.isArray(j?.redaktsioonid)) return null;
  const leitud: HallazgoNorma[] = [];
  for (const r of j.redaktsioonid) {
    if (typeof r.id !== "number" || !r.kehtivuseAlgus) return null;
    if (r.id <= teada) continue;
    const fecha = r.kehtivuseAlgus.slice(0, 10);
    if (!esFechaISO(fecha)) return null;
    leitud.push({ titulo: `${nimi}: uus redaktsioon (${r.id})`, url: `https://www.riigiteataja.ee/akt/${r.id}`, fecha });
  }
  return leitud;
}

function seadus(lyhend: string, grupp: number, nimi: string, teada: number, datos: readonly string[]): Detector {
  return {
    id: `ee.riigiteataja-${lyhend.toLowerCase()}`,
    carril: "norma",
    datos,
    metodo: "api-json",
    url: `https://www.riigiteataja.ee/public-api/api/v1/akt/${grupp}/redaktsioonid`,
    traer(http) {
      return uuedRedaktsioonid(http, grupp, nimi, teada);
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "ee.thi-stat",
    carril: "serie",
    serie: "ee.thi",
    metodo: "api-json",
    url: STAT_IA002,
    banda: { min: 200, max: 500, saltoRelativoMax: 0.05 },
    traer: thi,
  },
  seadus("TuMS", 161969, "Tulumaksuseadus", 109072026067, ["ee.tulumaks", "ee.maksuvaba-aasta", "ee.mahaarvamiste-piir", "ee.iii-sammas-maar", "ee.iii-sammas-piir"]),
  seadus("SMS", 161985, "Sotsiaalmaksuseadus", 116102026016, ["ee.sotsiaalmaks", "ee.fie-sotsiaalmaksu-lagi"]),
  seadus("KMS", 163383, "Käibemaksuseadus", 130062026130, ["ee.kaibemaks", "ee.kaibemaksu-piir"]),
  seadus("TLS", 331584, "Töölepingu seadus", 103072026036, ["ee.pohipuhkus", "ee.uletunni-kordaja", "ee.etteteatamine", "ee.koondamine-tooandja"]),
  seadus("TKindlS", 162491, "Töötuskindlustuse seadus", 130062026041, ["ee.tkh-maar-algus", "ee.tkh-paevad", "ee.koondamine-tootukassa"]),
  seadus("RaKS", 162949, "Ravikindlustuse seadus", 130062026029, ["ee.haigus-maar", "ee.hooldus-maar"]),
  seadus("PHS", 1035395, "Perehüvitiste seadus", 111072026059, ["ee.lapsetoetus-esimesed", "ee.lasterikas-kuni6", "ee.vanemahuvitis-paevad"]),
  seadus("RPKS", 153716, "Riikliku pensionikindlustuse seadus", 111072026064, ["ee.pension-staaz"]),
  seadus("MaaMS", 161873, "Maamaksuseadus", 130062024005, ["ee.maamaks-alam", "ee.maamaks-ulem", "ee.maamaks-soodustus"]),
];
