import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mappa = Readonly<Record<string, number>>;

export function irpefLorda(scaglioni: readonly FilaEscala[], reddito: number): number {
  return aplicarEscalaMarginal(scaglioni, Math.max(0, reddito));
}

export function aliquotaMarginale(scaglioni: readonly FilaEscala[], reddito: number): number {
  let tasa = scaglioni[0]?.tasa ?? 0;
  for (const f of scaglioni) if (reddito > f.desde) tasa = f.tasa;
  return tasa;
}

// Art. 13, commi 1 e 1.1 TUIR. Il minimo di 690 (1.380 a tempo determinato) vale solo nella prima fascia.
export function detrazioneLavoro(d: Mappa, rc: number, tempoDeterminato: boolean): number {
  let det = 0;
  if (rc <= d.soglia1) det = Math.max(d.importo1, tempoDeterminato ? d["minimo-tempo-determinato"] : d.minimo);
  else if (rc <= d.soglia2) det = d.importo2 + (d.aggiuntivo2 * (d.soglia2 - rc)) / (d.soglia2 - d.soglia1);
  else if (rc <= d.soglia3) det = (d.importo2 * (d.soglia3 - rc)) / (d.soglia3 - d.soglia2);
  if (rc > d["maggiorazione-da"] && rc <= d["maggiorazione-a"]) det += d.maggiorazione;
  return det;
}

// Art. 13, commi 3 e 3-bis TUIR.
export function detrazionePensione(d: Mappa, rc: number): number {
  let det = 0;
  if (rc <= d.soglia1) det = Math.max(d.importo1, d.minimo);
  else if (rc <= d.soglia2) det = d.base2 + (d.aggiuntivo2 * (d.soglia2 - rc)) / (d.soglia2 - d.soglia1);
  else if (rc <= d.soglia3) det = (d.base2 * (d.soglia3 - rc)) / (d.soglia3 - d.soglia2);
  if (rc > d["maggiorazione-da"] && rc <= d["maggiorazione-a"]) det += d.maggiorazione;
  return det;
}

// Legge 207/2024, art. 1, comma 4: somma esente per chi ha reddito complessivo fino a 20.000 euro.
export function sommaCuneo(c: Mappa, rc: number, redditoLavoro: number): number {
  if (rc > c["soglia-somma"] || redditoLavoro <= 0) return 0;
  const perc = redditoLavoro <= c.soglia1 ? c.percentuale1 : redditoLavoro <= c.soglia2 ? c.percentuale2 : c.percentuale3;
  return (redditoLavoro * perc) / 100;
}

// Legge 207/2024, art. 1, comma 6: ulteriore detrazione tra 20.000 e 40.000 euro.
export function detrazioneCuneo(c: Mappa, rc: number): number {
  if (rc <= c["soglia-somma"] || rc > c["soglia-massima"]) return 0;
  if (rc <= c["soglia-piena"]) return c.detrazione;
  return (c.detrazione * (c["soglia-massima"] - rc)) / (c["soglia-massima"] - c["soglia-piena"]);
}

// DL 3/2020, art. 1, comma 1. Considera solo la detrazione da lavoro: altre detrazioni (familiari,
// spese) possono far scattare il trattamento anche tra 15.000 e 28.000 euro.
export function trattamentoIntegrativo(ti: Mappa, rc: number, lorda: number, detrazione: number): number {
  if (rc <= ti.soglia) return lorda > detrazione - ti.riduzione ? ti.importo : 0;
  if (rc <= ti["soglia-massima"]) return Math.min(ti.importo, Math.max(0, detrazione - lorda));
  return 0;
}
