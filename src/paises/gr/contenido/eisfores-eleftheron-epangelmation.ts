import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gr.eisfores-eleftheron-epangelmation",
  h1: "Εισφορές ελεύθερων επαγγελματιών {{anio}}",
  title: "Εισφορές ελεύθερων επαγγελματιών {{anio}} ανά κατηγορία ΕΦΚΑ",
  description:
    "Δείτε τη μηνιαία και ετήσια εισφορά ΕΦΚΑ για ελεύθερους επαγγελματίες το {{anio}}: από {{gr.eisfores-eleftheron[1]}} (1η κατηγορία) έως {{gr.eisfores-eleftheron[6]}} (6η), με ανεργία και επικουρική.",
  intro: [
    "Οι ελεύθεροι επαγγελματίες και οι αυτοαπασχολούμενοι πληρώνουν σταθερή μηνιαία εισφορά στον ΕΦΚΑ, ανάλογα με την ασφαλιστική κατηγορία που επιλέγουν.",
    "Επιλέξτε κατηγορία και, αν σας αφορούν, επικουρική ασφάλιση και εφάπαξ.",
  ],
  comoSeCalcula: [
    "Η εισφορά για κύρια σύνταξη και υγεία είναι {{gr.eisfores-eleftheron[1]}} στην 1η κατηγορία, {{gr.eisfores-eleftheron[2]}} στη 2η, {{gr.eisfores-eleftheron[3]}} στην 3η, {{gr.eisfores-eleftheron[4]}} στην 4η, {{gr.eisfores-eleftheron[5]}} στην 5η και {{gr.eisfores-eleftheron[6]}} στην 6η.",
    "Μαζί εισπράττονται {{gr.eisfora-anergias-eleftheron}} τον μήνα για τον κλάδο ανεργίας.",
    "Όσοι ασφαλίζονται για επικουρική πληρώνουν {{gr.eisfores-epikourikis-eleftheron[1]}}, {{gr.eisfores-epikourikis-eleftheron[2]}} ή {{gr.eisfores-epikourikis-eleftheron[3]}}, και για εφάπαξ {{gr.eisfores-efapax-eleftheron[1]}}, {{gr.eisfores-efapax-eleftheron[2]}} ή {{gr.eisfores-efapax-eleftheron[3]}}.",
    "Τα ποσά αυξήθηκαν κατά 2,5% από τον Ιανουάριο του 2026, όσο ο μέσος πληθωρισμός του 2025.",
  ],
  ejemplo: ["Στην 1η κατηγορία με την εισφορά ανεργίας πληρώνετε 260,77 € τον μήνα και 3.129,24 € τον χρόνο."],
  faq: [
    {
      pregunta: "Πόση είναι η εισφορά της 1ης κατηγορίας το 2026;",
      respuesta: "{{gr.eisfores-eleftheron[1]}} τον μήνα για κύρια σύνταξη και υγεία, και {{gr.eisfora-anergias-eleftheron}} για την ανεργία.",
    },
    {
      pregunta: "Τι περιλαμβάνει η μηνιαία εισφορά;",
      respuesta: "Το μεγαλύτερο μέρος πηγαίνει στην κύρια σύνταξη: {{gr.eisfores-eleftheron-syntaxi[1]}} στην 1η κατηγορία. Το υπόλοιπο είναι για υγειονομική περίθαλψη σε χρήμα και σε είδος. Η εισφορά ανεργίας, η επικουρική και το εφάπαξ προστίθενται χωριστά.",
    },
    {
      pregunta: "Οι εισφορές αφαιρούνται από τον φόρο;",
      respuesta: "Αφαιρούνται από τα έσοδα ως επαγγελματικό έξοδο, άρα μειώνουν το κέρδος που φορολογείται.",
    },
  ],
  glosario: [
    { termino: "Μη μισθωτοί", definicion: "Οι ασφαλισμένοι που δεν εργάζονται με σύμβαση εξαρτημένης εργασίας." },
    { termino: "Εφάπαξ", definicion: "Το ποσό που καταβάλλεται μία φορά με τη συνταξιοδότηση." },
  ],
});
