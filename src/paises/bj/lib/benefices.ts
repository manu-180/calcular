import { ErrorEntrada, porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;

export interface ImpotBenefices {
  calcule: number;
  minimumProduits: number;
  impot: number;
  total: number;
  minimumApplique: string;
}

// Articles 46 et 47 (IS), 63 et 64 (IBA) du CGI : le montant de l'impôt ne peut être inférieur à un
// pourcentage des produits encaissables, ni à 250 000 F. Une redevance ORTB de 4 000 F s'y ajoute.
export function impotSurBenefices(
  benefice: number,
  produits: number,
  taux: number,
  tauxMinimum: number,
  plancher: number,
  redevance: number,
  r: (n: number) => number,
): ImpotBenefices {
  if (benefice < 0) throw new ErrorEntrada("Le bénéfice imposable ne peut pas être négatif. En cas de déficit, indiquez zéro.", "benefice");
  if (produits <= 0) throw new ErrorEntrada("Indiquez les produits encaissables de l'exercice.", "produits");
  const calcule = r(porcentaje(benefice, taux));
  const minimumProduits = r(porcentaje(produits, tauxMinimum));
  const impot = Math.max(calcule, minimumProduits, plancher);
  let minimumApplique = "Non, l'impôt sur le bénéfice est le plus élevé.";
  if (impot !== calcule) minimumApplique = impot === minimumProduits ? "Oui, le minimum sur les produits encaissables s'applique." : "Oui, le plancher de 250 000 F s'applique.";
  return { calcule, minimumProduits, impot, total: r(impot + redevance), minimumApplique };
}
