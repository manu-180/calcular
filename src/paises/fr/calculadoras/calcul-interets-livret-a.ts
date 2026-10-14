import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import datos from "../datos.json";

interface TrancheTaux {
  desde: string;
  hasta?: string;
  valor: number;
}

const TAUX: readonly TrancheTaux[] = (datos.datos.find((d) => d.id === "fr.livret-a-taux")?.tramos ?? [])
  .filter((t) => t.estado === "verificado")
  .map((t) => ({ desde: t.desde, hasta: (t as { hasta?: string }).hasta, valor: t.valor as number }));

// Una quincena se numera año × 24 + mes × 2 (+1 si empieza el 16): así se cuentan quincenas
// enteras sin fechas reales, que calcular() no puede usar.
function quinzaine(annee: number, mois: number, seize: boolean): number {
  return annee * 24 + (mois - 1) * 2 + (seize ? 1 : 0);
}

function debutQuinzaine(q: number): string {
  const annee = Math.floor(q / 24);
  const mois = Math.floor((q % 24) / 2) + 1;
  return `${annee}-${String(mois).padStart(2, "0")}-${q % 2 ? "16" : "01"}`;
}

function parties(date: FechaISO): [number, number, number] {
  const [a, m, j] = date.split("-").map(Number);
  return [a, m, j];
}

export default definirCalculadora({
  id: "fr.interets-livret-a",
  mercado: "fr",
  concepto: "plazo-fijo",
  slug: "calcul-interets-livret-a",
  estado: "publicado",
  requiere: {
    "fr.livret-a-taux": "numero",
    "fr.livret-a-plafond": "numero",
  },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Somme déposée", min: 0, porDefecto: 10000 },
    { id: "depot", tipo: "fecha", etiqueta: "Date du dépôt", min: "2026-02-01", porDefecto: "hoy" },
    { id: "fin", tipo: "fecha", etiqueta: "Date de retrait ou de fin du calcul", min: "2026-02-01", porDefecto: "2026-12-31" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez une somme supérieure à zéro.", "montant");
    if (entrada.montant > valores["fr.livret-a-plafond"]) throw new ErrorEntrada("Le dépôt dépasse le plafond du livret A.", "montant");
    const [ad, md, jd] = parties(entrada.depot);
    const [af, mf, jf] = parties(entrada.fin);
    const debut = jd <= 15 ? quinzaine(ad, md, true) : quinzaine(ad, md, false) + 2;
    const finExclue = jf === 31 && mf === 12 ? quinzaine(af + 1, 1, false) : jf <= 15 ? quinzaine(af, mf, false) : quinzaine(af, mf, true);
    if (finExclue <= debut) throw new ErrorEntrada("La date de fin doit laisser au moins une quinzaine entière après le dépôt.", "fin");

    let capital = entrada.montant;
    let interetsAnnee = 0;
    let total = 0;
    for (let q = debut; q < finExclue; q++) {
      const date = debutQuinzaine(q);
      const tranche = TAUX.find((t) => t.desde <= date && (!t.hasta || date <= t.hasta));
      const taux = tranche ? tranche.valor : valores["fr.livret-a-taux"];
      if (!tranche && date < (TAUX[0]?.desde ?? date)) throw new ErrorEntrada("Le taux du livret A n'est connu ici qu'à partir du 1er février 2026.", "depot");
      interetsAnnee += (capital * taux) / 100 / 24;
      if (q % 24 === 23) {
        const arrondis = redondear(interetsAnnee);
        capital += arrondis;
        total += arrondis;
        interetsAnnee = 0;
      }
    }
    const restant = redondear(interetsAnnee);
    total = redondear(total + restant);
    return {
      taux: valores["fr.livret-a-taux"],
      quinzaines: finExclue - debut,
      interets: total,
      solde: redondear(entrada.montant + total),
      observaciones: ["Les intérêts sont versés sur le livret au 31 décembre, puis rapportent à leur tour des intérêts l'année suivante."],
    };
  },
  resultado: [
    { clave: "taux", etiqueta: "Taux actuel du livret A", formato: "porcentaje", decimales: 2 },
    { clave: "quinzaines", etiqueta: "Quinzaines entières rémunérées", formato: "numero", decimales: 0 },
    { clave: "interets", etiqueta: "Intérêts gagnés", formato: "moneda", destacada: true },
    { clave: "solde", etiqueta: "Solde avec les intérêts", formato: "moneda" },
  ],
});
