// Mensajes que devuelve o lanza calcular() en las calculadoras de ch (alemán) y su traducción al
// italiano. Los textos fijos van por texto exacto; los armados con números, por traducir().

const MESI: Readonly<Record<string, string>> = {
  Januar: "gennaio",
  Februar: "febbraio",
  März: "marzo",
  April: "aprile",
  Mai: "maggio",
  Juni: "giugno",
  Juli: "luglio",
  August: "agosto",
  September: "settembre",
  Oktober: "ottobre",
  November: "novembre",
  Dezember: "dicembre",
};

function mese(texto: string): string {
  const m = /^(\p{L}+) (\d{4})$/u.exec(texto);
  return m && MESI[m[1]] ? `${MESI[m[1]]} ${m[2]}` : texto;
}

export const MENSAJES: Readonly<Record<string, string>> = {
  "Bitte ein Alter zwischen 15 und 70 Jahren eingeben.": "Inserisci un'età tra 15 e 70 anni.",
  "Bitte ein Alter zwischen 18 und 64 Jahren eingeben.": "Inserisci un'età tra 18 e 64 anni.",
  "Bitte eine Zahl von 0 bis 15 eingeben.": "Inserisci un numero da 0 a 15.",
  "Bitte eine Zahl von 0 bis 24 eingeben.": "Inserisci un numero da 0 a 24.",
  "Bitte einen Nettolohn über null eingeben.": "Inserisci un salario netto superiore a zero.",
  "Bitte das Einkommen des Ehegatten eingeben.": "Inserisci il reddito del coniuge.",
  "Bitte die Wochenarbeitszeit eingeben.": "Inserisci l'orario di lavoro settimanale.",
  "Das Enddatum muss nach dem Beginn des Verzugs liegen.": "La data finale deve essere successiva all'inizio della mora.",
  "Der Anfangsmonat muss vor dem Endmonat liegen.": "Il mese iniziale deve precedere il mese finale.",
  "Die Kündigung kann nicht vor Beginn des Arbeitsverhältnisses eintreffen.": "La disdetta non può giungere prima dell'inizio del rapporto di lavoro.",
  "Die Marge kann nicht negativ sein.": "Il margine non può essere negativo.",
  "Die Probezeit dauert höchstens drei Monate.": "Il periodo di prova dura al massimo tre mesi.",
  "Ein Dienstjahr hat höchstens 12 Monate.": "Un anno di servizio ha al massimo 12 mesi.",
  "Ein Jahr hat höchstens 12 Monate.": "Un anno ha al massimo 12 mesi.",
  "Der Referenzzinssatz ändert in Schritten von 0.25 Prozentpunkten.": "Il tasso di riferimento cambia a passi di 0.25 punti percentuali.",
  "Der Jahreslohn liegt nicht über der BVG-Eintrittsschwelle. Ein BVG-Abzug ist gesetzlich nicht vorgeschrieben.":
    "Il salario annuo non supera la soglia d'entrata LPP. La legge non prevede una deduzione LPP.",
  "Vor dem 25. Altersjahr gibt es noch keine Altersgutschriften. Die Risikoprämie Ihrer Pensionskasse ist nicht eingerechnet.":
    "Prima dei 25 anni non ci sono ancora accrediti di vecchiaia. Il premio di rischio della tua cassa pensioni non è compreso.",
  "Nach dem 65. Altersjahr gibt es keine gesetzlichen Altersgutschriften mehr.": "Dopo i 65 anni non ci sono più accrediti di vecchiaia legali.",
  "Der BVG-Abzug ist geschätzt: die Hälfte der gesetzlichen Altersgutschrift, ohne Risikoprämie. Ihr Lohnausweis oder das Reglement Ihrer Pensionskasse zeigt den genauen Betrag.":
    "La deduzione LPP è stimata: metà dell'accredito di vecchiaia legale, senza premio di rischio. Il certificato di salario o il regolamento della tua cassa pensioni indica l'importo esatto.",
  "Quellensteuer sowie Kantons-, Gemeinde- und Bundessteuern sind nicht abgezogen. Wer Quellensteuer zahlt, hat netto entsprechend weniger.":
    "L'imposta alla fonte e le imposte cantonali, comunali e federali non sono dedotte. Se paghi l'imposta alla fonte, il netto si riduce di conseguenza.",
  "Ohne Steuern und ohne Quellensteuer gerechnet.": "Calcolo senza imposte e senza imposta alla fonte.",
  "Der Beitrag an die Familienausgleichskasse ist nicht eingerechnet. Geben Sie den Satz Ihrer Kasse ein.":
    "Il contributo alla cassa di compensazione per assegni familiari non è compreso. Inserisci l'aliquota della tua cassa.",
  "Die Berufsunfallprämie ist nicht eingerechnet. Sie trägt immer der Arbeitgeber.":
    "Il premio per gli infortuni professionali non è compreso. È sempre a carico del datore di lavoro.",
  "Verwaltungskosten der AHV-Ausgleichskasse sind nicht enthalten.": "Le spese di amministrazione della cassa di compensazione AVS non sono comprese.",
  "Tarif für Verheiratete": "Tariffa per persone coniugate",
  "Elterntarif (Tarif für Verheiratete)": "Tariffa per genitori (tariffa per persone coniugate)",
  "Tarif für Alleinstehende": "Tariffa per persone sole",
  "Der Tarif rechnet mit vollen 100 Franken. Der Rest darunter bleibt unberücksichtigt.":
    "La tariffa si calcola per scaglioni interi di 100 franchi. Il resto non è considerato.",
  "Die geplante Einzahlung liegt über dem Maximum. Abziehen können Sie nur den Höchstbetrag.":
    "Il versamento previsto supera il massimo. Puoi dedurre solo l'importo massimo.",
  "Kanton und Gemeinde lassen den Abzug ebenfalls zu. Diese Ersparnis kommt dazu und ist hier nicht berechnet.":
    "Anche cantone e comune ammettono la deduzione. Questo risparmio si aggiunge e non è calcolato qui.",
  "Gerechnet mit gleichbleibendem Lohn und dem gesetzlichen Minimum. Ihre Pensionskasse kann mehr versichern und andere Sätze anwenden.":
    "Calcolo con salario costante e minimo legale. La tua cassa pensioni può assicurare di più e applicare altre aliquote.",
  "Der Jahreslohn liegt nicht über der Eintrittsschwelle. Es gibt keine obligatorischen Altersgutschriften.":
    "Il salario annuo non supera la soglia d'entrata. Non ci sono accrediti di vecchiaia obbligatori.",
  Alter: "Età",
  Altersgutschrift: "Accredito di vecchiaia",
  Zins: "Interesse",
  "Guthaben Ende Jahr": "Avere a fine anno",
  "Gerechnet ist die Vollrente bei vollständiger Beitragsdauer (Skala 44). Fehlen Beitragsjahre, wird die Rente gekürzt.":
    "Il calcolo riguarda la rendita completa con durata di contribuzione completa (scala 44). Se mancano anni di contribuzione, la rendita è ridotta.",
  "Die Ausgleichskasse zieht vorher einen Zins auf dem im Betrieb investierten Eigenkapital ab und erhebt zusätzlich Verwaltungskosten. Beides ist hier nicht enthalten.":
    "La cassa di compensazione deduce prima un interesse sul capitale proprio investito nell'azienda e riscuote inoltre spese di amministrazione. Né l'uno né l'altro sono compresi qui.",
  "Kanton und Gemeinde besteuern den Kapitalbezug zusätzlich nach eigenen Regeln. Diese Steuer ist hier nicht enthalten.":
    "Anche cantone e comune tassano il prelievo del capitale secondo regole proprie. Questa imposta non è compresa qui.",
  "Vom Taggeld gehen AHV/IV/EO-Beiträge, ein BVG-Risikobeitrag und ein Teil der NBU-Prämie ab. Für Kinder kommt ein Zuschlag in der Höhe der Familienzulagen dazu, wenn diese nicht anderweitig ausbezahlt werden.":
    "Dall'indennità giornaliera si deducono i contributi AVS/AI/IPG, un contributo di rischio LPP e una parte del premio per gli infortuni non professionali. Per i figli si aggiunge un supplemento pari agli assegni familiari, se questi non sono versati altrimenti.",
  "Mit weniger als 12 Beitragsmonaten in den letzten zwei Jahren besteht in der Regel kein Anspruch.":
    "Con meno di 12 mesi di contribuzione negli ultimi due anni, di norma non c'è diritto.",
  "Der 13. Monatslohn ist nur geschuldet, wenn er vereinbart ist, etwa im Arbeitsvertrag oder in einem Gesamtarbeitsvertrag. Dort steht auch, wie er bei einem Ein- oder Austritt während des Jahres berechnet wird.":
    "La tredicesima è dovuta solo se è pattuita, per esempio nel contratto di lavoro o in un contratto collettivo. Il contratto indica anche come si calcola in caso di entrata o uscita durante l'anno.",
  "Der Vertrag darf nicht weniger Ferien vorsehen als das Gesetz. Gerechnet wird mit dem gesetzlichen Minimum.":
    "Il contratto non può prevedere meno vacanze della legge. Il calcolo usa il minimo legale.",
  "Ein tieferer Zuschlag oder keiner gilt nur, wenn er schriftlich vereinbart oder in einem Normal- oder Gesamtarbeitsvertrag geregelt ist.":
    "Un supplemento inferiore o nessun supplemento vale solo se pattuito per scritto o previsto da un contratto normale o collettivo di lavoro.",
  "Mit Ihrem Einverständnis kann der Arbeitgeber Überstunden auch mit Freizeit von mindestens gleicher Dauer ausgleichen. Dann gibt es keinen Zuschlag.":
    "Con il tuo consenso, il datore di lavoro può compensare il lavoro straordinario con un congedo di durata almeno uguale. In tal caso non c'è supplemento.",
  "In der Probezeit kann jederzeit gekündigt werden, nicht nur auf ein Monatsende.": "Durante il periodo di prova la disdetta è possibile in ogni momento, non solo per la fine di un mese.",
  "Kündigt der Arbeitgeber, gelten nach der Probezeit Sperrfristen, etwa bei Krankheit, Unfall, Schwangerschaft oder Militärdienst. Sie können die Kündigung ungültig machen oder das Ende hinausschieben.":
    "Se disdice il datore di lavoro, dopo il periodo di prova valgono periodi di protezione, per esempio in caso di malattia, infortunio, gravidanza o servizio militare. Possono rendere nulla la disdetta o posticiparne la fine.",
  "Abweichende Fristen gelten nur, wenn sie schriftlich, im Normal- oder im Gesamtarbeitsvertrag vereinbart sind. Unter einen Monat geht es nur per Gesamtarbeitsvertrag im ersten Dienstjahr.":
    "Termini diversi valgono solo se pattuiti per scritto, in un contratto normale o in un contratto collettivo di lavoro. Meno di un mese è possibile solo con un contratto collettivo e nel primo anno di servizio.",
  "Kein Kanton darf weniger als das gesetzliche Minimum auszahlen. Der Rechner nimmt das Minimum.": "Nessun cantone può versare meno del minimo legale. Il calcolatore usa il minimo.",
  "Von der Entschädigung gehen AHV/IV/EO-Beiträge ab, bei Arbeitnehmerinnen auch der ALV-Beitrag.":
    "Dall'indennità si deducono i contributi AVS/AI/IPG e, per le lavoratrici dipendenti, anche il contributo AD.",
  "Der Rechner zählt die drei Anteile zusammen. Ob und wie viel Sie verlangen oder geltend machen können, hängt auch von früheren Anpassungen und vom Vertrag ab.":
    "Il calcolatore somma le tre parti. Quanto puoi chiedere o far valere dipende anche dagli adeguamenti precedenti e dal contratto.",
  "Im Verzug gilt mindestens der gesetzliche Verzugszins, auch wenn der vertragliche Zins tiefer ist.": "In caso di mora vale almeno l'interesse di mora legale, anche se l'interesse contrattuale è più basso.",
  "Der SARON wird täglich neu festgelegt. Wie die Bank ihn über die Zinsperiode abrechnet, steht in Ihrem Vertrag. Der Betrag hier gilt für den letzten publizierten Wert.":
    "Il SARON è fissato ogni giorno. Come la banca lo conteggia sul periodo d'interesse è indicato nel tuo contratto. L'importo qui vale per l'ultimo valore pubblicato.",
};

const MODELLI: readonly [RegExp, (m: RegExpExecArray) => string][] = [
  [/^Steuerbeträge unter (\S+) Franken werden nicht erhoben\.$/, (m) => `Gli importi d'imposta inferiori a ${m[1]} franchi non sono riscossi.`],
  [
    /^Ohne Angabe des Erwerbseinkommens zeigt der Rechner den Höchstbetrag\. Abziehbar sind höchstens (\S+) % des Erwerbseinkommens\.$/,
    (m) => `Senza il reddito da attività lucrativa il calcolatore mostra l'importo massimo. La deduzione è limitata al ${m[1]} % del reddito da attività lucrativa.`,
  ],
  [/^Die beiden Renten zusammen dürfen höchstens (\S+) Franken im Monat betragen\. Sie werden im Verhältnis gekürzt\.$/, (m) => `Le due rendite insieme non possono superare ${m[1]} franchi al mese. Sono ridotte proporzionalmente.`],
  [/^Unter (\S+) Franken Einkommen gilt der Mindestbeitrag\.$/, (m) => `Con un reddito inferiore a ${m[1]} franchi si applica il contributo minimo.`],
  [/^Ein Verdienst unter (\S+) Franken im Monat ist nicht versichert\.$/, (m) => `Un guadagno inferiore a ${m[1]} franchi al mese non è assicurato.`],
  [/^Versichert ist der Lohn nur bis (\S+) Franken im Jahr\.$/, (m) => `Il salario è assicurato solo fino a ${m[1]} franchi all'anno.`],
  [/^Das Taggeld ist auf den Höchstbetrag von (\S+) Franken gekürzt\.$/, (m) => `L'indennità giornaliera è ridotta all'importo massimo di ${m[1]} franchi.`],
  [/^(\d+) Tage \(Probezeit\)$/, (m) => `${m[1]} giorni (periodo di prova)`],
  [/^1 Monat auf ein Monatsende$/, () => "1 mese per la fine di un mese"],
  [/^(\d+) Monate auf ein Monatsende$/, (m) => `${m[1]} mesi per la fine di un mese`],
  [/^Die Indexreihe beginnt im (.+)\.$/, (m) => `La serie dell'indice inizia a ${mese(m[1])}.`],
  [/^Für (.+) gibt es noch keinen Indexwert\. Der letzte ist von (.+)\.$/, (m) => `Per ${mese(m[1])} non c'è ancora un valore dell'indice. L'ultimo è di ${mese(m[2])}.`],
  [/^Der letzte veröffentlichte Indexstand ist von (.+)\. Bis dahin wird gerechnet\.$/, (m) => `L'ultimo indice pubblicato è di ${mese(m[1])}. Il calcolo arriva fino a quel mese.`],
];

export function traducir(texto: string): string | undefined {
  for (const [re, f] of MODELLI) {
    const m = re.exec(texto);
    if (m) return f(m);
  }
  const conMese = mese(texto);
  return conMese === texto ? undefined : conMese;
}

export const ZIVILSTAND = { alleinstehend: "Persona sola", verheiratet: "Coniugato o in unione domestica registrata" } as const;
export const ANZAHL = { "12": "12 mensilità", "13": "13 mensilità" } as const;
export const ERWERBSART = { angestellt: "Dipendente (salario mensile)", selbststaendig: "Indipendente (reddito annuo)" } as const;
export const COMUN = { mensajes: MENSAJES, traducir } as const;
