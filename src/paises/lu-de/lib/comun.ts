// Mensajes que devuelve o lanza calcular() en las calculadoras de lu (francés) y su traducción al
// alemán. Los textos fijos van por texto exacto; los armados con meses, por traducir().

const MONATE: Readonly<Record<string, string>> = {
  janvier: "Januar",
  février: "Februar",
  mars: "März",
  avril: "April",
  mai: "Mai",
  juin: "Juni",
  juillet: "Juli",
  août: "August",
  septembre: "September",
  octobre: "Oktober",
  novembre: "November",
  décembre: "Dezember",
};

function monat(texto: string): string {
  const m = /^(\p{L}+) (\d{4})$/u.exec(texto);
  return m && MONATE[m[1]] ? `${MONATE[m[1]]} ${m[2]}` : texto;
}

export const MENSAJES: Readonly<Record<string, string>> = {
  "Indiquez un salaire brut supérieur à zéro.": "Bitte einen Bruttolohn über null eingeben.",
  "Le revenu ne peut pas être négatif.": "Das Einkommen kann nicht negativ sein.",
  "Indiquez un nombre d'heures supérieur à zéro.": "Bitte eine Stundenzahl über null eingeben.",
  "Indiquez un nombre de mois entre 0 et 12.": "Bitte eine Zahl von 0 bis 12 Monaten eingeben.",
  "Indiquez un nombre entre 0 et 15.": "Bitte eine Zahl von 0 bis 15 eingeben.",
  "Indiquez entre 1 et 4 acquéreurs.": "Bitte 1 bis 4 Käufer eingeben.",
  "Le nombre d'heures ne peut pas être négatif.": "Die Stundenzahl kann nicht negativ sein.",
  "L'ancienneté ne peut pas être négative.": "Die Betriebszugehörigkeit kann nicht negativ sein.",
  "La notification ne peut pas précéder l'entrée dans l'entreprise.": "Die Zustellung der Kündigung kann nicht vor dem Eintritt ins Unternehmen liegen.",
  "Le mois de départ doit précéder le mois de fin.": "Der Ausgangsmonat muss vor dem Endmonat liegen.",
  "Estimation selon les formules de l'Administration des contributions directes, sans frais de déplacement ni autres déductions inscrits sur la fiche de retenue d'impôt. La fiche de retenue fait foi.":
    "Schätzung nach den Formeln der Steuerverwaltung (ACD), ohne Fahrtkosten und andere Abzüge auf der Lohnsteuerkarte. Maßgebend ist die Lohnsteuerkarte.",
  "Maladie et pension ne sont dues que jusqu'au maximum cotisable. La dépendance s'applique sur tout le salaire.":
    "Kranken- und Rentenversicherung sind nur bis zur Beitragsbemessungsgrenze geschuldet. Die Pflegeversicherung gilt für den ganzen Lohn.",
  "Le taux d'assurance accident est multiplié par un facteur bonus-malus propre à l'entreprise. Le calcul utilise le taux unique.":
    "Der Satz der Unfallversicherung wird mit einem Bonus-Malus-Faktor des Unternehmens multipliziert. Die Berechnung verwendet den Einheitssatz.",
  "Le contrat ne peut pas prévoir moins que le minimum légal. Le calcul retient le minimum légal.":
    "Der Vertrag kann nicht weniger als das gesetzliche Minimum vorsehen. Die Berechnung verwendet das gesetzliche Minimum.",
  "En principe, chaque heure supplémentaire est compensée par une heure et demie de repos rémunéré. Le paiement majoré ne s'applique que si la récupération est impossible ou si le salarié quitte l'entreprise avant de récupérer.":
    "Grundsätzlich wird jede Überstunde durch anderthalb Stunden bezahlte Freizeit ausgeglichen. Die Bezahlung mit Zuschlag gilt nur, wenn der Ausgleich unmöglich ist oder der Arbeitnehmer das Unternehmen vorher verlässt.",
  "Ces 140 % sont exempts d'impôts et de cotisations sociales, sauf les cotisations pour prestations en nature sur l'heure non majorée.":
    "Diese 140 % sind steuer- und beitragsfrei, außer den Beiträgen für Sachleistungen auf die Stunde ohne Zuschlag.",
  "L'indemnité de départ est due à partir de cinq années d'ancienneté.": "Die Abfindung ist ab fünf Jahren Betriebszugehörigkeit geschuldet.",
  "Un employeur de moins de vingt salariés peut opter dans la lettre de licenciement pour un préavis prolongé au lieu de l'indemnité.":
    "Ein Arbeitgeber mit weniger als zwanzig Arbeitnehmern kann im Kündigungsschreiben statt der Abfindung eine verlängerte Kündigungsfrist wählen.",
  "Montants du nouveau système (enfants ouvrant droit depuis le 1er août 2016). Le droit et sa durée sont vérifiés par la Caisse pour l'avenir des enfants.":
    "Beträge des neuen Systems (Kinder mit Anspruch seit dem 1. August 2016). Anspruch und Dauer prüft die Zukunftskeess (CAE).",
  "Le crédit d'impôt suppose d'occuper personnellement le bien pendant au moins deux ans. L'administration perçoit dans tous les cas au moins 100 euros.":
    "Der Steuerkredit setzt voraus, dass Sie die Immobilie mindestens zwei Jahre selbst bewohnen. Die Verwaltung erhebt in jedem Fall mindestens 100 Euro.",
  "La tranche indiciaire tombe lorsque la moyenne semestrielle de l'IPCN atteint la cote d'échéance suivante. STATEC publie chaque mois l'indice et les échéances de l'échelle mobile.":
    "Die Indextranche fällt, wenn der Halbjahresdurchschnitt des IPCN die nächste Auslöseschwelle erreicht. STATEC veröffentlicht jeden Monat den Index und die Schwellen der gleitenden Lohnskala.",
};

const MUSTER: readonly [RegExp, (m: RegExpExecArray) => string][] = [
  [/^La série commence en (.+)\.$/, (m) => `Die Reihe beginnt im ${monat(m[1])}.`],
  [/^L'indice de (.+) n'est pas encore publié\. Le dernier date de (.+)\.$/, (m) => `Der Index für ${monat(m[1])} ist noch nicht veröffentlicht. Der letzte ist von ${monat(m[2])}.`],
  [/^Le dernier indice publié date de (.+)\. Le calcul s'arrête à ce mois\.$/, (m) => `Der letzte veröffentlichte Index ist von ${monat(m[1])}. Bis dahin wird gerechnet.`],
];

export function traducir(texto: string): string | undefined {
  for (const [re, f] of MUSTER) {
    const m = re.exec(texto);
    if (m) return f(m);
  }
  const conMes = monat(texto);
  return conMes === texto ? undefined : conMes;
}

export const STEUERKLASSE = {
  "1": "Steuerklasse 1 (alleinstehend)",
  "1a": "Steuerklasse 1a (alleinerziehend, verwitwet, 65 Jahre und älter)",
  "2": "Steuerklasse 2 (verheiratet oder Partner)",
} as const;

export const COMUN = { mensajes: MENSAJES, traducir } as const;
