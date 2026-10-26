// Indemnizațiile CNAS pornesc de la venitul mediu lunar asigurat din ultimele 12 luni. Venitul luat în
// calcul nu poate trece de un număr de salarii medii lunare pe economie, prognozate pentru anul
// respectiv. Calculatorul folosește salariul mediu în vigoare la data calculului.
export const REQ_PLAFON = { "md.salariu-mediu": "numero", "md.plafon-salarii-medii": "numero" } as const;

export function bazaPlafonata(venit: number, v: { readonly "md.salariu-mediu": number; readonly "md.plafon-salarii-medii": number }): { baza: number; plafon: number; plafonat: boolean } {
  const plafon = v["md.salariu-mediu"] * v["md.plafon-salarii-medii"];
  return { baza: Math.min(venit, plafon), plafon, plafonat: venit > plafon };
}

export const NOTA_PLAFON = "Venitul trece de plafon, așa că indemnizația se calculează din plafon.";
