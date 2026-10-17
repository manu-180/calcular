// Lo que las calculadoras de ca devuelven armado en inglés (validaciones compartidas, meses, tasas):
// se traduce acá una vez para todas las traducciones de la edición.

export const MENSAJES_COMUNES: Readonly<Record<string, string>> = {
  "Enter an amount of zero or more.": "Inscrivez un montant de zéro ou plus.",
  "Enter an amount above zero.": "Inscrivez un montant supérieur à zéro.",
};

const MOIS: Readonly<Record<string, string>> = {
  January: "janvier",
  February: "février",
  March: "mars",
  April: "avril",
  May: "mai",
  June: "juin",
  July: "juillet",
  August: "août",
  September: "septembre",
  October: "octobre",
  November: "novembre",
  December: "décembre",
};

export function moisEnFrancais(texto: string): string {
  return texto.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})\b/g, (_, m: string, a: string) => `${MOIS[m]} ${a}`);
}

// «9.975%» en inglés pasa a «9,975 %» con espacio insécable, como lo escribe Intl en fr-CA.
export function tauxEnFrancais(texto: string): string {
  return texto.replace(/(\d+(?:\.\d+)?)%/g, (_, n: string) => `${n.replace(".", ",")} %`);
}
