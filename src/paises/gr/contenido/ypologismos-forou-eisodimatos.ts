import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gr.ypologismos-forou-eisodimatos",
  h1: "Υπολογισμός φόρου εισοδήματος {{anio}}",
  title: "Υπολογισμός φόρου εισοδήματος {{anio}}: νέα κλίμακα και παιδιά",
  description:
    "Υπολογίστε τον φόρο εισοδήματος {{anio}} με τη νέα κλίμακα ({{gr.klimaka-forou[0].tasa}} έως {{gr.klimaka-forou[-1].tasa}}), τους συντελεστές για παιδιά και νέους και τη μείωση φόρου μισθωτών.",
  intro: [
    "Εισάγετε το ετήσιο φορολογητέο εισόδημά σας από μισθούς ή συντάξεις και δείτε τον φόρο του 2026.",
    "Ο υπολογισμός εφαρμόζει τους χαμηλότερους συντελεστές για όσους έχουν παιδιά, για νέους έως 30 ετών και τη μείωση φόρου του άρθρου 16 του ΚΦΕ.",
  ],
  comoSeCalcula: [
    "Η κλίμακα του 2026: {{gr.klimaka-forou[0].tasa}} έως {{gr.klimaka-forou[0].hasta}}, {{gr.klimaka-forou[1].tasa}} έως {{gr.klimaka-forou[1].hasta}}, {{gr.klimaka-forou[2].tasa}} έως {{gr.klimaka-forou[2].hasta}}, {{gr.klimaka-forou[3].tasa}} έως {{gr.klimaka-forou[3].hasta}}, {{gr.klimaka-forou[4].tasa}} έως {{gr.klimaka-forou[4].hasta}} και {{gr.klimaka-forou[5].tasa}} πάνω από εκεί.",
    "Με παιδιά, το δεύτερο κλιμάκιο γίνεται {{gr.syntelestis-b-klimakiou[1]}}, {{gr.syntelestis-b-klimakiou[2]}} ή {{gr.syntelestis-b-klimakiou[3]}} (ένα, δύο ή τρία παιδιά) και το τρίτο {{gr.syntelestis-g-klimakiou[1]}}, {{gr.syntelestis-g-klimakiou[2]}}, {{gr.syntelestis-g-klimakiou[3]}} ή {{gr.syntelestis-g-klimakiou[4]}}. Με τέσσερα παιδιά ή περισσότερα τα δύο πρώτα κλιμάκια έχουν {{gr.syntelestis-a-klimakiou[4]}}.",
    "Για κάθε παιδί πάνω από τα τέσσερα, ο συντελεστής του τρίτου κλιμακίου μειώνεται κατά {{gr.meiosi-g-klimakiou-ana-paidi}} ακόμη.",
    "Οι νέοι έως 25 ετών έχουν {{gr.syntelestis-neon[ews-25]}} και οι 26 έως 30 ετών {{gr.syntelestis-neon[26-30]}} στα πρώτα {{gr.klimaka-forou[1].hasta}}.",
    "Από τον φόρο αφαιρείται η μείωση: {{gr.meiosi-forou[0]}} χωρίς παιδιά, έως {{gr.meiosi-forou[5]}} με πέντε. Πάνω από {{gr.meiosi-forou-orio}} μικραίνει κατά {{gr.meiosi-forou-ana-1000}} για κάθε 1.000 €, εκτός αν έχετε {{gr.meiosi-forou-paidia-xoris-periorismo}} παιδιά ή περισσότερα.",
  ],
  ejemplo: ["Με φορολογητέο εισόδημα 20.000 € και χωρίς παιδιά, ο φόρος της κλίμακας είναι 2.900 €. Η μείωση είναι 777 € μείον 160 €, δηλαδή 617 €. Ο φόρος βγαίνει 2.283 €."],
  faq: [
    {
      pregunta: "Ποια είναι η κλίμακα φόρου εισοδήματος για το 2026;",
      respuesta: "{{gr.klimaka-forou[0].tasa}} έως {{gr.klimaka-forou[0].hasta}}, {{gr.klimaka-forou[1].tasa}} έως {{gr.klimaka-forou[1].hasta}}, {{gr.klimaka-forou[2].tasa}} έως {{gr.klimaka-forou[2].hasta}}, {{gr.klimaka-forou[3].tasa}} έως {{gr.klimaka-forou[3].hasta}}, {{gr.klimaka-forou[4].tasa}} έως {{gr.klimaka-forou[4].hasta}} και {{gr.klimaka-forou[5].tasa}} για το υπόλοιπο. Ισχύει για τα εισοδήματα από το φορολογικό έτος 2026.",
    },
    {
      pregunta: "Πόσος είναι ο φόρος για 20.000 € εισόδημα;",
      respuesta: "Χωρίς παιδιά και άνω των 30 ετών, 2.283 € τον χρόνο. Με ένα παιδί ο φόρος της κλίμακας πέφτει στα 2.700 € και η μείωση ανεβαίνει στα 740 €, άρα πληρώνετε 1.960 €.",
    },
    {
      pregunta: "Ισχύει ο υπολογισμός για ελεύθερους επαγγελματίες;",
      respuesta: "Όχι ακριβώς. Στα κέρδη από επιχειρηματική δραστηριότητα εφαρμόζεται η ίδια κλίμακα, αλλά χωρίς τη μείωση φόρου των μισθωτών. Για αυτή την περίπτωση χρησιμοποιήστε τον υπολογισμό φόρου ελεύθερων επαγγελματιών.",
    },
  ],
  glosario: [
    { termino: "Κλιμάκιο", definicion: "Τμήμα του εισοδήματος που φορολογείται με τον ίδιο συντελεστή." },
    { termino: "Μέσος συντελεστής", definicion: "Ο φόρος διά το εισόδημα: πόσο πληρώνετε στο σύνολο." },
    { termino: "Εξαρτώμενα τέκνα", definicion: "Τα παιδιά που ο νόμος θεωρεί ότι συντηρείτε για φορολογικούς σκοπούς." },
  ],
});
