export const REQ_EO = {
  "ch.eo-taggeld-satz": "numero",
  "ch.eo-hoechstbetrag-taggeld": "numero",
} as const;

export const ERWERBSART = [
  { valor: "angestellt", etiqueta: "Angestellt (Monatslohn)" },
  { valor: "selbststaendig", etiqueta: "Selbstständig (Jahreseinkommen)" },
] as const;
export type Erwerbsart = (typeof ERWERBSART)[number]["valor"];

export interface EoTaggeld {
  tagesverdienst: number;
  ungekuerzt: number;
  taggeld: number;
  gekuerzt: boolean;
}

// Merkblatt 6.02: Monatslohn geteilt durch 30, Jahreseinkommen Selbstständiger geteilt durch 360.
export function eoTaggeld(einkommen: number, art: Erwerbsart, satz: number, hoechst: number, redondear: (n: number) => number): EoTaggeld {
  const tagesverdienst = redondear(art === "angestellt" ? einkommen / 30 : einkommen / 360);
  const ungekuerzt = redondear((tagesverdienst * satz) / 100);
  return { tagesverdienst, ungekuerzt, taggeld: Math.min(ungekuerzt, hoechst), gekuerzt: ungekuerzt > hoechst };
}
