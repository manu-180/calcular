import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-microintreprindere",
  h1: "Calculator impozit micro 2026",
  title: "Calculator impozit micro 2026: {{ro.cota-micro}} și dividende",
  description:
    "Calculați impozitul pe veniturile firmei micro ({{ro.cota-micro}}), profitul rămas și impozitul pe dividende de {{ro.impozit-dividende}}, cu plafonul de {{ro.plafon-micro}}.",
  intro: [
    "Firmele mici pot plăti impozit pe venituri în loc de impozit pe profit. Din 2026 există o singură cotă, {{ro.cota-micro}} din venituri.",
    "Calculatorul arată impozitul firmei și, dacă distribuiți profitul, impozitul pe dividende reținut asociaților.",
  ],
  comoSeCalcula: [
    "Impozitul micro este {{ro.cota-micro}} din veniturile impozabile, rotunjit la leu.",
    "Profitul este venitul minus cheltuielile și impozitul micro.",
    "La dividende se reține impozit de {{ro.impozit-dividende}}.",
    "Plafonul de {{ro.plafon-micro}} se compară cu veniturile la cursul BNR. Calculatorul folosește cursul de azi: {{ro.eur}} pentru 1 euro.",
  ],
  ejemplo: [
    "La 300.000 de lei venituri și 180.000 de lei cheltuieli, impozitul micro este 3.000 de lei. Din profitul de 117.000 de lei, impozitul pe dividende este 18.720 de lei.",
  ],
  faq: [
    {
      pregunta: "Ce cotă are impozitul micro în 2026?",
      respuesta: "O singură cotă, {{ro.cota-micro}} din venituri, pentru toate activitățile.",
    },
    {
      pregunta: "Care este plafonul pentru impozitul micro?",
      respuesta: "Veniturile din anul precedent nu trebuie să treacă de echivalentul în lei a {{ro.plafon-micro}}, la cursul de la închiderea exercițiului financiar. La plafon se adună și veniturile firmelor legate.",
    },
    {
      pregunta: "Firma micro trebuie să aibă angajați?",
      respuesta: "Da, cel puțin un salariat cu normă întreagă (sau mai multe contracte cu timp parțial care însumează o normă întreagă), cu excepțiile din Codul fiscal.",
    },
    {
      pregunta: "Cât este impozitul pe dividende?",
      respuesta: "{{ro.impozit-dividende}} pentru dividendele distribuite din 2026. Asociatul mai poate datora CASS, după totalul veniturilor din alte surse.",
    },
  ],
  glosario: [
    { termino: "Impozit micro", definicion: "Impozitul pe veniturile întreprinderilor mici, calculat ca procent din venituri, nu din profit." },
    { termino: "Dividende", definicion: "Partea din profit pe care firma o plătește asociaților." },
  ],
});
