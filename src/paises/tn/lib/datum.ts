function delen(iso: string): [number, number, number] {
  return [Number(iso.slice(0, 4)), Number(iso.slice(5, 7)), Number(iso.slice(8, 10))];
}

// Mois complets entre deux dates : du 15 mars au 14 avril, il n'y a pas encore de mois complet.
export function moisComplets(debut: string, fin: string): number {
  const [aj, am, ad] = delen(debut);
  const [bj, bm, bd] = delen(fin);
  let mois = (bj - aj) * 12 + (bm - am);
  if (bd < ad) mois -= 1;
  return Math.max(0, mois);
}

export function dureeTexte(mois: number): string {
  const ans = Math.floor(mois / 12);
  const reste = mois % 12;
  return `${ans} ${ans < 2 ? "an" : "ans"} et ${reste} mois`;
}

// Ajoute des mois à une date ; le 31 janvier plus un mois donne le dernier jour de février.
export function ajouterMois(iso: string, n: number): `${number}-${number}-${number}` {
  const [a, m, j] = delen(iso);
  const total = a * 12 + (m - 1) + n;
  const an = Math.floor(total / 12);
  const mois = (total % 12) + 1;
  const dernier = new Date(Date.UTC(an, mois, 0)).getUTCDate();
  const jour = Math.min(j, dernier);
  return `${an}-${String(mois).padStart(2, "0")}-${String(jour).padStart(2, "0")}` as `${number}-${number}-${number}`;
}
