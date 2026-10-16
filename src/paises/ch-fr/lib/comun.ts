// Mensajes que devuelve o lanza calcular() en las calculadoras de ch (alemán) y su traducción al
// francés. Los textos fijos van por texto exacto; los armados con números, por traducir().

const MOIS: Readonly<Record<string, string>> = {
  Januar: "janvier",
  Februar: "février",
  März: "mars",
  April: "avril",
  Mai: "mai",
  Juni: "juin",
  Juli: "juillet",
  August: "août",
  September: "septembre",
  Oktober: "octobre",
  November: "novembre",
  Dezember: "décembre",
};

function mois(texto: string): string {
  const m = /^(\p{L}+) (\d{4})$/u.exec(texto);
  return m && MOIS[m[1]] ? `${MOIS[m[1]]} ${m[2]}` : texto;
}

export const MENSAJES: Readonly<Record<string, string>> = {
  "Bitte ein Alter zwischen 15 und 70 Jahren eingeben.": "Indiquez un âge entre 15 et 70 ans.",
  "Bitte ein Alter zwischen 18 und 64 Jahren eingeben.": "Indiquez un âge entre 18 et 64 ans.",
  "Bitte eine Zahl von 0 bis 15 eingeben.": "Indiquez un nombre entre 0 et 15.",
  "Bitte eine Zahl von 0 bis 24 eingeben.": "Indiquez un nombre entre 0 et 24.",
  "Bitte einen Nettolohn über null eingeben.": "Indiquez un salaire net supérieur à zéro.",
  "Bitte das Einkommen des Ehegatten eingeben.": "Indiquez le revenu du conjoint.",
  "Bitte die Wochenarbeitszeit eingeben.": "Indiquez la durée de travail hebdomadaire.",
  "Das Enddatum muss nach dem Beginn des Verzugs liegen.": "La date de fin doit suivre le début de la demeure.",
  "Der Anfangsmonat muss vor dem Endmonat liegen.": "Le mois de départ doit précéder le mois de fin.",
  "Die Kündigung kann nicht vor Beginn des Arbeitsverhältnisses eintreffen.": "Le congé ne peut pas parvenir avant le début des rapports de travail.",
  "Die Marge kann nicht negativ sein.": "La marge ne peut pas être négative.",
  "Die Probezeit dauert höchstens drei Monate.": "Le temps d'essai dure au plus trois mois.",
  "Ein Dienstjahr hat höchstens 12 Monate.": "Une année de service compte au plus 12 mois.",
  "Ein Jahr hat höchstens 12 Monate.": "Une année compte au plus 12 mois.",
  "Der Referenzzinssatz ändert in Schritten von 0.25 Prozentpunkten.": "Le taux de référence varie par paliers de 0,25 point de pourcentage.",
  "Der Jahreslohn liegt nicht über der BVG-Eintrittsschwelle. Ein BVG-Abzug ist gesetzlich nicht vorgeschrieben.":
    "Le salaire annuel ne dépasse pas le seuil d'accès LPP. La loi ne prévoit pas de déduction LPP.",
  "Vor dem 25. Altersjahr gibt es noch keine Altersgutschriften. Die Risikoprämie Ihrer Pensionskasse ist nicht eingerechnet.":
    "Avant 25 ans, il n'y a pas encore de bonifications de vieillesse. La prime de risque de votre caisse de pension n'est pas comprise.",
  "Nach dem 65. Altersjahr gibt es keine gesetzlichen Altersgutschriften mehr.": "Après 65 ans, il n'y a plus de bonifications de vieillesse légales.",
  "Der BVG-Abzug ist geschätzt: die Hälfte der gesetzlichen Altersgutschrift, ohne Risikoprämie. Ihr Lohnausweis oder das Reglement Ihrer Pensionskasse zeigt den genauen Betrag.":
    "La déduction LPP est estimée : la moitié de la bonification de vieillesse légale, sans prime de risque. Votre certificat de salaire ou le règlement de votre caisse de pension indique le montant exact.",
  "Quellensteuer sowie Kantons-, Gemeinde- und Bundessteuern sind nicht abgezogen. Wer Quellensteuer zahlt, hat netto entsprechend weniger.":
    "L'impôt à la source et les impôts cantonaux, communaux et fédéraux ne sont pas déduits. Si vous payez l'impôt à la source, votre salaire net est réduit d'autant.",
  "Ohne Steuern und ohne Quellensteuer gerechnet.": "Calcul sans impôts ni impôt à la source.",
  "Der Beitrag an die Familienausgleichskasse ist nicht eingerechnet. Geben Sie den Satz Ihrer Kasse ein.":
    "La cotisation à la caisse d'allocations familiales n'est pas comprise. Indiquez le taux de votre caisse.",
  "Die Berufsunfallprämie ist nicht eingerechnet. Sie trägt immer der Arbeitgeber.":
    "La prime d'assurance contre les accidents professionnels n'est pas comprise. Elle est toujours à la charge de l'employeur.",
  "Verwaltungskosten der AHV-Ausgleichskasse sind nicht enthalten.": "Les frais d'administration de la caisse de compensation AVS ne sont pas compris.",
  "Tarif für Verheiratete": "Barème pour personnes mariées",
  "Elterntarif (Tarif für Verheiratete)": "Barème parental (barème pour personnes mariées)",
  "Tarif für Alleinstehende": "Barème pour personnes seules",
  "Der Tarif rechnet mit vollen 100 Franken. Der Rest darunter bleibt unberücksichtigt.":
    "Le barème se calcule par tranches entières de 100 francs. Le reste n'est pas pris en compte.",
  "Die geplante Einzahlung liegt über dem Maximum. Abziehen können Sie nur den Höchstbetrag.":
    "Le versement prévu dépasse le maximum. Vous ne pouvez déduire que le montant maximal.",
  "Kanton und Gemeinde lassen den Abzug ebenfalls zu. Diese Ersparnis kommt dazu und ist hier nicht berechnet.":
    "Le canton et la commune admettent aussi la déduction. Cette économie s'ajoute et n'est pas calculée ici.",
  "Gerechnet mit gleichbleibendem Lohn und dem gesetzlichen Minimum. Ihre Pensionskasse kann mehr versichern und andere Sätze anwenden.":
    "Calcul avec un salaire constant et le minimum légal. Votre caisse de pension peut assurer davantage et appliquer d'autres taux.",
  "Der Jahreslohn liegt nicht über der Eintrittsschwelle. Es gibt keine obligatorischen Altersgutschriften.":
    "Le salaire annuel ne dépasse pas le seuil d'accès. Il n'y a pas de bonifications de vieillesse obligatoires.",
  Alter: "Âge",
  Altersgutschrift: "Bonification de vieillesse",
  Zins: "Intérêt",
  "Guthaben Ende Jahr": "Avoir en fin d'année",
  "Gerechnet ist die Vollrente bei vollständiger Beitragsdauer (Skala 44). Fehlen Beitragsjahre, wird die Rente gekürzt.":
    "Le calcul porte sur la rente complète pour une durée de cotisation complète (échelle 44). S'il manque des années de cotisation, la rente est réduite.",
  "Die Ausgleichskasse zieht vorher einen Zins auf dem im Betrieb investierten Eigenkapital ab und erhebt zusätzlich Verwaltungskosten. Beides ist hier nicht enthalten.":
    "La caisse de compensation déduit d'abord un intérêt sur le capital propre engagé dans l'entreprise et perçoit en plus des frais d'administration. Ni l'un ni l'autre ne sont compris ici.",
  "Kanton und Gemeinde besteuern den Kapitalbezug zusätzlich nach eigenen Regeln. Diese Steuer ist hier nicht enthalten.":
    "Le canton et la commune imposent aussi le retrait en capital selon leurs propres règles. Cet impôt n'est pas compris ici.",
  "Vom Taggeld gehen AHV/IV/EO-Beiträge, ein BVG-Risikobeitrag und ein Teil der NBU-Prämie ab. Für Kinder kommt ein Zuschlag in der Höhe der Familienzulagen dazu, wenn diese nicht anderweitig ausbezahlt werden.":
    "Les cotisations AVS/AI/APG, une cotisation de risque LPP et une partie de la prime ANP sont déduites de l'indemnité journalière. Pour les enfants s'ajoute un supplément égal aux allocations familiales, si celles-ci ne sont pas versées par ailleurs.",
  "Mit weniger als 12 Beitragsmonaten in den letzten zwei Jahren besteht in der Regel kein Anspruch.":
    "Avec moins de 12 mois de cotisation au cours des deux dernières années, il n'y a en principe pas de droit.",
  "Der 13. Monatslohn ist nur geschuldet, wenn er vereinbart ist, etwa im Arbeitsvertrag oder in einem Gesamtarbeitsvertrag. Dort steht auch, wie er bei einem Ein- oder Austritt während des Jahres berechnet wird.":
    "Le 13e salaire n'est dû que s'il est convenu, par exemple dans le contrat de travail ou dans une convention collective. Le contrat précise aussi comment il se calcule en cas d'entrée ou de départ en cours d'année.",
  "Der Vertrag darf nicht weniger Ferien vorsehen als das Gesetz. Gerechnet wird mit dem gesetzlichen Minimum.":
    "Le contrat ne peut pas prévoir moins de vacances que la loi. Le calcul retient le minimum légal.",
  "Ein tieferer Zuschlag oder keiner gilt nur, wenn er schriftlich vereinbart oder in einem Normal- oder Gesamtarbeitsvertrag geregelt ist.":
    "Un supplément inférieur ou nul ne vaut que s'il est convenu par écrit ou prévu par un contrat-type ou une convention collective.",
  "Mit Ihrem Einverständnis kann der Arbeitgeber Überstunden auch mit Freizeit von mindestens gleicher Dauer ausgleichen. Dann gibt es keinen Zuschlag.":
    "Avec votre accord, l'employeur peut compenser les heures supplémentaires par un congé d'une durée au moins égale. Il n'y a alors pas de supplément.",
  "In der Probezeit kann jederzeit gekündigt werden, nicht nur auf ein Monatsende.": "Pendant le temps d'essai, le congé peut être donné à tout moment, pas seulement pour une fin de mois.",
  "Kündigt der Arbeitgeber, gelten nach der Probezeit Sperrfristen, etwa bei Krankheit, Unfall, Schwangerschaft oder Militärdienst. Sie können die Kündigung ungültig machen oder das Ende hinausschieben.":
    "Si l'employeur résilie, des périodes de protection s'appliquent après le temps d'essai, par exemple en cas de maladie, d'accident, de grossesse ou de service militaire. Elles peuvent rendre le congé nul ou reporter la fin.",
  "Abweichende Fristen gelten nur, wenn sie schriftlich, im Normal- oder im Gesamtarbeitsvertrag vereinbart sind. Unter einen Monat geht es nur per Gesamtarbeitsvertrag im ersten Dienstjahr.":
    "Des délais différents ne valent que s'ils sont convenus par écrit, dans un contrat-type ou une convention collective. Moins d'un mois n'est possible que par convention collective et pendant la première année de service.",
  "Kein Kanton darf weniger als das gesetzliche Minimum auszahlen. Der Rechner nimmt das Minimum.": "Aucun canton ne peut verser moins que le minimum légal. Le calculateur retient le minimum.",
  "Von der Entschädigung gehen AHV/IV/EO-Beiträge ab, bei Arbeitnehmerinnen auch der ALV-Beitrag.":
    "Les cotisations AVS/AI/APG sont déduites de l'allocation et, pour les salariées, aussi la cotisation AC.",
  "Der Rechner zählt die drei Anteile zusammen. Ob und wie viel Sie verlangen oder geltend machen können, hängt auch von früheren Anpassungen und vom Vertrag ab.":
    "Le calculateur additionne les trois parts. Ce que vous pouvez demander ou faire valoir dépend aussi des adaptations précédentes et du contrat.",
  "Im Verzug gilt mindestens der gesetzliche Verzugszins, auch wenn der vertragliche Zins tiefer ist.": "En cas de demeure, l'intérêt moratoire légal s'applique au minimum, même si l'intérêt contractuel est plus bas.",
  "Der SARON wird täglich neu festgelegt. Wie die Bank ihn über die Zinsperiode abrechnet, steht in Ihrem Vertrag. Der Betrag hier gilt für den letzten publizierten Wert.":
    "Le SARON est fixé chaque jour. Votre contrat précise comment la banque le décompte sur la période d'intérêts. Le montant indiqué ici vaut pour la dernière valeur publiée.",
};

const MUSTER: readonly [RegExp, (m: RegExpExecArray) => string][] = [
  [/^Steuerbeträge unter (\S+) Franken werden nicht erhoben\.$/, (m) => `Les montants d'impôt inférieurs à ${m[1]} francs ne sont pas perçus.`],
  [
    /^Ohne Angabe des Erwerbseinkommens zeigt der Rechner den Höchstbetrag\. Abziehbar sind höchstens (\S+) % des Erwerbseinkommens\.$/,
    (m) => `Sans revenu de l'activité lucrative, le calculateur affiche le montant maximal. La déduction est limitée à ${m[1].replace(".", ",")} % du revenu de l'activité lucrative.`,
  ],
  [/^Die beiden Renten zusammen dürfen höchstens (\S+) Franken im Monat betragen\. Sie werden im Verhältnis gekürzt\.$/, (m) => `Les deux rentes ensemble ne peuvent pas dépasser ${m[1]} francs par mois. Elles sont réduites proportionnellement.`],
  [/^Unter (\S+) Franken Einkommen gilt der Mindestbeitrag\.$/, (m) => `Pour un revenu inférieur à ${m[1]} francs, la cotisation minimale s'applique.`],
  [/^Ein Verdienst unter (\S+) Franken im Monat ist nicht versichert\.$/, (m) => `Un gain inférieur à ${m[1]} francs par mois n'est pas assuré.`],
  [/^Versichert ist der Lohn nur bis (\S+) Franken im Jahr\.$/, (m) => `Le salaire n'est assuré que jusqu'à ${m[1]} francs par an.`],
  [/^Das Taggeld ist auf den Höchstbetrag von (\S+) Franken gekürzt\.$/, (m) => `L'indemnité journalière est réduite au montant maximal de ${m[1]} francs.`],
  [/^(\d+) Tage \(Probezeit\)$/, (m) => `${m[1]} jours (temps d'essai)`],
  [/^(\d+) Monate? auf ein Monatsende$/, (m) => `${m[1]} mois pour la fin d'un mois`],
  [/^Die Indexreihe beginnt im (.+)\.$/, (m) => `La série de l'indice commence en ${mois(m[1])}.`],
  [/^Für (.+) gibt es noch keinen Indexwert\. Der letzte ist von (.+)\.$/, (m) => `Il n'y a pas encore de valeur de l'indice pour ${mois(m[1])}. La dernière date de ${mois(m[2])}.`],
  [/^Der letzte veröffentlichte Indexstand ist von (.+)\. Bis dahin wird gerechnet\.$/, (m) => `Le dernier indice publié date de ${mois(m[1])}. Le calcul s'arrête à ce mois.`],
];

export function traducir(texto: string): string | undefined {
  for (const [re, f] of MUSTER) {
    const m = re.exec(texto);
    if (m) return f(m);
  }
  const conMes = mois(texto);
  return conMes === texto ? undefined : conMes;
}

export const ZIVILSTAND = { alleinstehend: "Personne seule", verheiratet: "Marié ou en partenariat enregistré" } as const;
export const ANZAHL = { "12": "12 salaires mensuels", "13": "13 salaires mensuels" } as const;
export const ERWERBSART = { angestellt: "Salarié (salaire mensuel)", selbststaendig: "Indépendant (revenu annuel)" } as const;
export const COMUN = { mensajes: MENSAJES, traducir } as const;
