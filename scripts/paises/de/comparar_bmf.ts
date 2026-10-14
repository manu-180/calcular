// Compara la Lohnsteuer de src/paises/de/lib/steuer.ts con la interfaz externa del BMF (PAP 2026).
// Uso: npx tsx scripts/paises/de/comparar_bmf.ts. Necesita red; no corre en CI.
import datos from "../../../src/paises/de/datos.json";
import { lohnsteuerMonat, type LohnsteuerWerte, type Steuerklasse } from "../../../src/paises/de/lib/steuer";

function valor(id: string): unknown {
  const d = datos.datos.find((x) => x.id === id);
  if (!d) throw new Error(id);
  return (d.tramos[d.tramos.length - 1] as { valor: unknown }).valor;
}
const n = (id: string) => valor(id) as number;
const m = (id: string) => valor(id) as Record<string, number>;

const werte: LohnsteuerWerte = {
  tarif: m("de.est-tarif"),
  soli: { satz: n("de.soli-satz"), milderung: n("de.soli-milderung"), freigrenze: n("de.soli-freigrenze") },
  arbeitnehmerPauschbetrag: n("de.arbeitnehmer-pauschbetrag"),
  sonderausgabenPauschbetrag: n("de.sonderausgaben-pauschbetrag"),
  entlastungsbetrag: n("de.entlastungsbetrag-alleinerziehende"),
  grenzen: m("de.lohnsteuer-grenzen"),
  kinderfreibetrag: m("de.kinderfreibetrag"),
  sv: {
    kvAllgemein: n("de.kv-allgemein"),
    kvErmaessigt: n("de.kv-ermaessigt"),
    kvZusatz: n("de.kv-zusatzbeitrag"),
    kvZusatzDurchschnitt: n("de.kv-zusatzbeitrag"),
    rv: n("de.rv-beitragssatz"),
    av: n("de.av-beitragssatz"),
    pv: n("de.pv-beitragssatz"),
    pvKinderlos: m("de.pv-zuschlaege").kinderlos,
    pvAbschlagJeKind: m("de.pv-zuschlaege")["abschlag-je-kind"],
    pvSachsen: n("de.pv-sachsen"),
    bbgKvMonat: n("de.bbg-kv"),
    bbgRvMonat: n("de.bbg-rv"),
  },
};

interface Fall {
  brutto: number;
  stkl: Steuerklasse;
  zkf: number;
  kinderlos: boolean;
  kinder: number;
  sachsen: boolean;
}

const faelle: Fall[] = [];
for (const brutto of [1500, 2800, 4000, 5500, 7200, 9800, 15000, 30000]) {
  for (const stkl of ["1", "2", "3", "4", "5", "6"] as Steuerklasse[]) faelle.push({ brutto, stkl, zkf: 0, kinderlos: true, kinder: 0, sachsen: false });
}
faelle.push({ brutto: 4000, stkl: "1", zkf: 1, kinderlos: false, kinder: 1, sachsen: false });
faelle.push({ brutto: 6500, stkl: "3", zkf: 2, kinderlos: false, kinder: 3, sachsen: true });
faelle.push({ brutto: 12000, stkl: "4", zkf: 1.5, kinderlos: false, kinder: 2, sachsen: false });
faelle.push({ brutto: 3200, stkl: "2", zkf: 1, kinderlos: false, kinder: 1, sachsen: true });

async function bmf(f: Fall): Promise<Record<string, number>> {
  const q = new URLSearchParams({
    code: "LSt2026ext",
    LZZ: "2",
    RE4: String(Math.round(f.brutto * 100)),
    STKL: f.stkl,
    ZKF: String(f.zkf),
    KVZ: werte.sv.kvZusatz.toFixed(2),
    PVZ: f.kinderlos ? "1" : "0",
    PVS: f.sachsen ? "1" : "0",
    PVA: String(f.kinderlos ? 0 : Math.min(Math.max(f.kinder - 1, 0), 4)),
    R: "1",
    PKV: "0",
    KRV: "0",
    ALV: "0",
    af: "0",
  });
  const xml = await (await fetch(`https://www.bmf-steuerrechner.de/interface/2026Version1.xhtml?${q}`)).text();
  const out: Record<string, number> = {};
  for (const [, k, v] of xml.matchAll(/ausgabe name="(\w+)" value="(-?\d+)"/g)) out[k] = Number(v) / 100;
  return out;
}

async function main() {
  let fallos = 0;
  for (const f of faelle) {
    const r = lohnsteuerMonat(
      { monatsbrutto: f.brutto, steuerklasse: f.stkl, kinderfreibetraege: f.zkf, kirchensteuersatz: 100, rvPflicht: true, avPflicht: true, person: { kinderlos: f.kinderlos, kinderUnter25: f.kinder, sachsen: f.sachsen } },
      werte,
    );
    const b = await bmf(f);
    const ok = Math.abs(r.lohnsteuer - b.LSTLZZ) < 0.005 && Math.abs(r.soli - b.SOLZLZZ) < 0.005 && Math.abs(r.kirchensteuer - b.BK) < 0.005;
    if (!ok) fallos++;
    console.log(`${ok ? "OK " : "MAL"} ${f.brutto} StKl ${f.stkl} ZKF ${f.zkf}${f.sachsen ? " SN" : ""}: LSt ${r.lohnsteuer} / ${b.LSTLZZ}  Soli ${r.soli} / ${b.SOLZLZZ}  BK ${r.kirchensteuer} / ${b.BK}`);
  }
  console.log(fallos ? `${fallos} diferencias` : "todo igual al BMF");
  process.exit(fallos ? 1 : 0);
}

main();
