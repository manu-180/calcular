// Lo que las calculadoras de cy devuelven en griego (errores, observaciones, meses): se traduce acá
// una vez para todas las traducciones de la edición.

export const MENSAJES: Readonly<Record<string, string>> = {
  "Εισάγετε αξία μεγαλύτερη από το μηδέν.": "Enter a value above zero.",
  "Εισάγετε εισόδημα μεγαλύτερο από το μηδέν.": "Enter an income above zero.",
  "Εισάγετε καθαρό μισθό έως 100.000 € τον μήνα.": "Enter a net salary of up to €100,000 a month.",
  "Εισάγετε καθαρό μισθό μεγαλύτερο από το μηδέν.": "Enter a net salary above zero.",
  "Εισάγετε μέρισμα μεγαλύτερο από το μηδέν.": "Enter a dividend above zero.",
  "Εισάγετε μεικτό μισθό μεγαλύτερο από το μηδέν.": "Enter a gross salary above zero.",
  "Εισάγετε μισθό μεγαλύτερο από το μηδέν.": "Enter a salary above zero.",
  "Εισάγετε ποσό μεγαλύτερο από το μηδέν.": "Enter an amount above zero.",
  "Εισάγετε τιμή πώλησης μεγαλύτερη από το μηδέν.": "Enter a sale price above zero.",
  "Εισάγετε τουλάχιστον ένα εισόδημα.": "Enter at least one income.",
  "Η διάρκεια πρέπει να είναι τουλάχιστον ένας μήνας.": "The term must be at least one month.",
  "Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης.": "The end date must be after the start date.",
  "Ο αρχικός μήνας πρέπει να είναι πριν από τον τελικό.": "The starting month must be before the final month.",
  "Οι εβδομάδες πρέπει να είναι από 0 έως 53.": "Weeks must be between 0 and 53.",
  "Οι ώρες πρέπει να είναι περισσότερες από μηδέν.": "Hours must be more than zero.",
  "Τα εξαρτώμενα τέκνα πρέπει να είναι από 0 έως 15.": "Dependent children must be between 0 and 15.",
  "Το εισόδημα δεν μπορεί να είναι αρνητικό.": "Income can't be negative.",
  "Όταν η πώληση επιβαρύνεται με ΦΠΑ, δεν πληρώνονται τέλη μεταβίβασης στο Κτηματολόγιο.": "When the sale is subject to VAT, no transfer fees are paid to the Land Registry.",
  "Με λιγότερες από 26 εβδομάδες συνεχούς απασχόλησης ο νόμος δεν ορίζει ελάχιστη προειδοποίηση.": "With less than 26 weeks of continuous employment the law sets no minimum notice.",
  "Μετρούν μέχρι 25 έτη υπηρεσίας.": "Only up to 25 years of service count.",
  "Ο εβδομαδιαίος μισθός σας ξεπερνά το ανώτατο όριο. Η πληρωμή υπολογίζεται με το όριο.": "Your weekly wage is above the ceiling. The payment is worked out on the ceiling.",
  "Ο μισθός ξεπερνά το ανώτατο όριο ασφαλιστέων αποδοχών. Οι Κοινωνικές Ασφαλίσεις υπολογίζονται μόνο μέχρι το όριο.": "Your salary is above the maximum insurable earnings. Social Insurance is only charged up to the ceiling.",
  "Ο μισθός ξεπερνά το ανώτατο όριο ασφαλιστέων αποδοχών. Οι περισσότερες εισφορές υπολογίζονται μόνο μέχρι το όριο.": "The salary is above the maximum insurable earnings. Most contributions are only charged up to the ceiling.",
  "Οι εισφορές και τα ασφάλιστρα εκπίπτουν μόνο μέχρι το ένα πέμπτο του εισοδήματος.": "Contributions and premiums are only deductible up to one fifth of your income.",
  "Οι ώρες πάνω από το πλήρες ωράριο δεν αυξάνουν τον κατώτατο μισθό. Πληρώνονται με βάση τη σύμβασή σας.": "Hours above full time don't raise the minimum wage. They are paid under your contract.",
  "Τα εισοδήματά σας ξεπερνούν το ανώτατο όριο. Πάνω από αυτό δεν πληρώνεται εισφορά ΓεΣΥ.": "Your income is above the ceiling. No GeSY contribution is due on the part above it.",
  "Το εισόδημά σας είναι κάτω από το κατώτατο ποσό της κατηγορίας. Πληρώνετε εισφορές στο κατώτατο ποσό, εκτός αν πάρετε έγκριση για το πραγματικό.":
    "Your income is below the minimum for your category. You pay on the minimum unless you are approved to pay on your actual income.",
  "Το εισόδημά σας ξεπερνά το ανώτατο όριο ασφαλιστέων αποδοχών. Οι Κοινωνικές Ασφαλίσεις υπολογίζονται μέχρι το όριο.": "Your income is above the maximum insurable earnings. Social Insurance is charged up to the ceiling.",
  "Το τέλος χαρτοσήμου φτάνει το ανώτατο ποσό ανά σύμβαση.": "The stamp duty reaches the maximum per contract.",
  "Το υπόλοιπο της δαπάνης για ενεργειακή αναβάθμιση μπορεί να μεταφερθεί στα επόμενα τέσσερα έτη.": "The rest of your energy upgrade spending can be carried forward to the next four years.",
  "Το φορολογητέο εισόδημα είναι μέσα στο αφορολόγητο ποσό. Δεν πληρώνετε φόρο εισοδήματος.": "Your taxable income is within the tax-free band. You pay no income tax.",
  "Χρειάζονται τουλάχιστον 104 εβδομάδες συνεχούς απασχόλησης στον ίδιο εργοδότη για πληρωμή λόγω πλεονασμού.": "You need at least 104 weeks of continuous employment with the same employer for a redundancy payment.",
};

const MINES: Readonly<Record<string, string>> = {
  Ιανουάριος: "January",
  Φεβρουάριος: "February",
  Μάρτιος: "March",
  Απρίλιος: "April",
  Μάιος: "May",
  Ιούνιος: "June",
  Ιούλιος: "July",
  Αύγουστος: "August",
  Σεπτέμβριος: "September",
  Οκτώβριος: "October",
  Νοέμβριος: "November",
  Δεκέμβριος: "December",
};

const mina = (t: string) => t.replace(/(\p{L}+) (\d{4})/gu, (m, n: string, a: string) => (MINES[n] ? `${MINES[n]} ${a}` : m));

// Meses («Σεπτέμβριος 2026») y los mensajes del índice de precios que los llevan adentro.
export function traducirMines(t: string): string | undefined {
  let m = /^Τα στοιχεία ξεκινούν από: (.+)\.$/.exec(t);
  if (m) return `Data starts in ${mina(m[1])}.`;
  m = /^Η Στατιστική Υπηρεσία δεν έχει δημοσιεύσει ακόμη αυτόν τον μήνα\. Ο τελευταίος είναι: (.+)\.$/.exec(t);
  if (m) return `The Statistical Service has not published this month yet. The latest is ${mina(m[1])}.`;
  m = /^Ο τελευταίος μήνας που έχει δημοσιεύσει η Στατιστική Υπηρεσία είναι: (.+)\. Ο υπολογισμός φτάνει μέχρι εκεί\.$/.exec(t);
  if (m) return `The latest month published by the Statistical Service is ${mina(m[1])}. The calculation stops there.`;
  if (/^\p{L}+ \d{4}$/u.test(t)) {
    const r = mina(t);
    return r === t ? undefined : r;
  }
  return undefined;
}
