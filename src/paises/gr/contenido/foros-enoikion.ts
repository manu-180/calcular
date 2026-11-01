import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gr.foros-enoikion",
  h1: "Υπολογισμός φόρου ενοικίων {{anio}}",
  title: "Φόρος ενοικίων {{anio}}: υπολογισμός με τη νέα κλίμακα",
  description:
    "Υπολογίστε τον φόρο εισοδήματος από ενοίκια με την κλίμακα {{anio}}: {{gr.klimaka-enoikion[0].tasa}}, {{gr.klimaka-enoikion[1].tasa}}, {{gr.klimaka-enoikion[2].tasa}} και {{gr.klimaka-enoikion[3].tasa}}, μετά την έκπτωση {{gr.ekptosi-enoikion}}.",
  intro: [
    "Το εισόδημα από ενοίκια φορολογείται χωριστά από τον μισθό, με δική του κλίμακα.",
    "Εισάγετε τα ενοίκια του έτους για να δείτε τον φόρο και τι μένει καθαρά.",
  ],
  comoSeCalcula: [
    "Τα φυσικά πρόσωπα αφαιρούν {{gr.ekptosi-enoikion}} από τα ακαθάριστα ενοίκια για επισκευές, συντήρηση και άλλες δαπάνες του ακινήτου.",
    "Στο καθαρό εισόδημα εφαρμόζεται η κλίμακα: {{gr.klimaka-enoikion[0].tasa}} έως {{gr.klimaka-enoikion[0].hasta}}, {{gr.klimaka-enoikion[1].tasa}} έως {{gr.klimaka-enoikion[1].hasta}}, {{gr.klimaka-enoikion[2].tasa}} έως {{gr.klimaka-enoikion[2].hasta}} και {{gr.klimaka-enoikion[3].tasa}} πάνω από εκεί.",
    "Η κλίμακα αυτή ισχύει για τα εισοδήματα από το 2026. Το κλιμάκιο {{gr.klimaka-enoikion[1].tasa}} είναι νέο.",
  ],
  ejemplo: ["Με ενοίκιο 800 € τον μήνα (9.600 € τον χρόνο), η έκπτωση είναι 480 € και το καθαρό εισόδημα 9.120 €. Ο φόρος είναι 1.368 €."],
  faq: [
    {
      pregunta: "Πόσος είναι ο φόρος για 15.000 € ενοίκια;",
      respuesta: "Το καθαρό εισόδημα είναι 14.250 €. Τα πρώτα {{gr.klimaka-enoikion[0].hasta}} φορολογούνται με {{gr.klimaka-enoikion[0].tasa}} και τα υπόλοιπα 2.250 € με {{gr.klimaka-enoikion[1].tasa}}: συνολικά 2.362,50 €.",
    },
    {
      pregunta: "Προστίθενται τα ενοίκια στον μισθό;",
      respuesta: "Όχι. Το εισόδημα από ακίνητη περιουσία φορολογείται με τη δική του κλίμακα, ανεξάρτητα από τον μισθό ή τη σύνταξη.",
    },
    {
      pregunta: "Τι άλλαξε το 2026;",
      respuesta: "Μπήκε νέο κλιμάκιο {{gr.klimaka-enoikion[1].tasa}} για το εισόδημα από {{gr.klimaka-enoikion[1].desde}} έως {{gr.klimaka-enoikion[1].hasta}}. Πριν, το ποσό αυτό φορολογούνταν με 35%.",
    },
  ],
  glosario: [
    { termino: "Ακαθάριστα ενοίκια", definicion: "Τα ενοίκια που εισπράττετε, πριν από κάθε έκπτωση." },
    { termino: "Καθαρό εισόδημα από ακίνητα", definicion: "Τα ενοίκια μείον την έκπτωση για δαπάνες του ακινήτου." },
  ],
});
