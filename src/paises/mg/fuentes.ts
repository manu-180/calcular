import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const BFM = "https://www.banky-foibe.mg/admin/wp-json/bfm/cours_devises" as const;
const DGI_CODES = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels" as const;
const CNAPS_SME = "https://www.cnaps.mg/api/public/sme" as const;

const DATOS_FISCAUX = [
  "mg.irsa-bareme",
  "mg.irsa-minimum",
  "mg.irsa-reduction-charge",
  "mg.irsa-deductions",
  "mg.irsa-heures-sup",
  "mg.tva",
  "mg.tva-seuil",
  "mg.is-taux",
  "mg.is-reduction",
  "mg.is-plancher",
  "mg.is-seuil",
  "mg.is-abattement-cga",
  "mg.is-abattement-cga-plafond",
  "mg.ir-taux",
  "mg.ir-minimum-fixe",
  "mg.ir-minimum-ca",
  "mg.ircm-taux",
  "mg.ircm-abattement-dividendes",
  "mg.ipvi-taux",
  "mg.ipvi-prix-revient",
  "mg.droit-mutation-immeuble",
  "mg.droit-bail",
  "mg.droit-cession",
  "mg.droit-donation",
  "mg.droit-donation-ligne-directe",
  "mg.taxe-vehicules",
  "mg.ifpb",
  "mg.ifpb-minimum",
  "mg.avantages-nature",
  "mg.taxe-assurance",
] as const;

function aujourdhui(): FechaISO | null {
  const d = new Date().toISOString().slice(0, 10);
  return esFechaISO(d) ? d : null;
}

// L'API du site de la BFM renvoie { data: { data: { datagraph: { dataUsd: { "AAAA-MM-JJ": cours }, dataEuro } } } }
// avec le cours moyen (MID) des derniers jours ouvrés. Toute autre forme veut dire que l'API a changé.
function pointsBfm(json: unknown, cle: "dataUsd" | "dataEuro"): PuntoSerie[] | null {
  const graphe = (json as { data?: { data?: { datagraph?: Record<string, unknown> } } } | null)?.data?.data?.datagraph;
  const serie = graphe?.[cle];
  if (typeof serie !== "object" || serie === null) return null;
  const puntos: PuntoSerie[] = [];
  for (const [fecha, valor] of Object.entries(serie)) {
    if (!esFechaISO(fecha) || typeof valor !== "number" || !Number.isFinite(valor)) return null;
    puntos.push({ fecha, valor });
  }
  if (puntos.length === 0) return null;
  return puntos.sort((a, b) => a.fecha.localeCompare(b.fecha));
}

function detecteurBfm(devise: "usd" | "eur", cle: "dataUsd" | "dataEuro", min: number, max: number): Detector {
  return {
    id: `mg.${devise}-bfm`,
    carril: "serie",
    serie: `mg.${devise}`,
    metodo: "api-json",
    url: BFM,
    // L'ariary flotte : quelques dixièmes de pour cent par jour en temps normal. Au-delà de 5 %, revue manuelle.
    banda: { min, max, saltoRelativoMax: 0.05 },
    async traer(http) {
      return pointsBfm(await http.json(this.url), cle);
    },
  };
}

// La rubrique « Codes et Manuels » de la DGI liste les codes à jour sous la forme « CDI-LFI 2026.pdf »
// ou « CDI _ LFR 2024.pdf ». Une loi de finances plus récente que la LFI 2026 est un signal.
async function nouveauCode(http: Http): Promise<HallazgoNorma[] | null> {
  const page = await http.texto(DGI_CODES, { userAgentNavegador: true });
  const liens = [...page.matchAll(/href="(\/explorer\?path=\/legislation\/Codes%20et%20Manuels\/CDI[^"]*?(LFI|LFR)%20(\d{4})[^"]*\.pdf)"/gi)];
  if (liens.length === 0) return null;
  const fecha = aujourdhui();
  if (!fecha) return null;
  const vus = new Set<string>();
  const hallazgos: HallazgoNorma[] = [];
  for (const m of liens) {
    const annee = Number(m[3]);
    const loi = m[2].toUpperCase();
    if (annee < 2026 || (annee === 2026 && loi === "LFI")) continue;
    if (vus.has(m[1])) continue;
    vus.add(m[1]);
    hallazgos.push({ titulo: `Code des impôts mis à jour suivant la ${loi} ${annee}`, url: `https://www.impots.mg${m[1]}`, fecha });
  }
  return hallazgos;
}

// L'API publique de la CNaPS renvoie l'historique du SME : [{ regime: "RG" | "AG", dateEffet, salaireMensuel }].
// Une date d'effet postérieure à la dernière chargée (1er mars 2026) annonce un nouveau SME.
async function nouveauSme(http: Http): Promise<HallazgoNorma[] | null> {
  const json = await http.json(CNAPS_SME);
  if (!Array.isArray(json) || json.length === 0) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const l of json) {
    const { regime, dateEffet, salaireMensuel } = (l ?? {}) as { regime?: unknown; dateEffet?: unknown; salaireMensuel?: unknown };
    if (typeof regime !== "string" || typeof dateEffet !== "string" || !esFechaISO(dateEffet) || typeof salaireMensuel !== "number") return null;
    if (dateEffet <= "2026-03-01") continue;
    const nom = regime === "AG" ? "régime agricole" : "régime général";
    hallazgos.push({ titulo: `SME du ${nom} à ${salaireMensuel} Ar à partir du ${dateEffet}`, url: "https://www.cnaps.mg/historique-sme", fecha: dateEffet });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  detecteurBfm("usd", "dataUsd", 3000, 7000),
  detecteurBfm("eur", "dataEuro", 3500, 8000),
  {
    id: "mg.dgi-code-des-impots",
    carril: "norma",
    datos: DATOS_FISCAUX,
    metodo: "html",
    url: DGI_CODES,
    userAgentNavegador: true,
    traer(http) {
      return nouveauCode(http);
    },
  },
  {
    id: "mg.cnaps-sme",
    carril: "norma",
    datos: ["mg.sme-general", "mg.sme-agricole"],
    metodo: "api-json",
    url: CNAPS_SME,
    traer(http) {
      return nouveauSme(http);
    },
  },
];
