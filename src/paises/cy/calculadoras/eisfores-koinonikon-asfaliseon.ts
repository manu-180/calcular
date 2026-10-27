import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { eisforesMina, REQUIERE_EISFORON } from "../lib/ergodotis";

export default definirCalculadora({
  id: "cy.eisfores-koinonikon-asfaliseon",
  mercado: "cy",
  concepto: "aportes-seguridad-social",
  slug: "eisfores-koinonikon-asfaliseon",
  estado: "publicado",
  requiere: REQUIERE_EISFORON,
  campos: [
    { id: "misthos", tipo: "moneda", etiqueta: "Μεικτός μηνιαίος μισθός", min: 0, porDefecto: 1500 },
    {
      id: "tameioAdeion",
      tipo: "si-no",
      etiqueta: "Ο εργοδότης πληρώνει στο Κεντρικό Ταμείο Αδειών",
      porDefecto: false,
      ayuda: "Ισχύει όταν ο εργοδότης δεν έχει εξαίρεση. Τότε η άδειά σας πληρώνεται από το Ταμείο.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.misthos <= 0) throw new ErrorEntrada("Εισάγετε μισθό μεγαλύτερο από το μηδέν.", "misthos");
    const x = eisforesMina(e.misthos, e.tameioAdeion, v, redondear);
    const observaciones: string[] = [];
    if (e.misthos > v["cy.anotato-orio-ka"]) observaciones.push("Ο μισθός ξεπερνά το ανώτατο όριο ασφαλιστέων αποδοχών. Οι περισσότερες εισφορές υπολογίζονται μόνο μέχρι το όριο.");
    return { ...x, observaciones };
  },
  resultado: [
    { clave: "misthotou", etiqueta: "Κρατήσεις από τον μισθό σας", formato: "moneda", destacada: true },
    { clave: "kaMisthotou", etiqueta: "Κοινωνικές Ασφαλίσεις (μισθωτός)", formato: "moneda" },
    { clave: "gesyMisthotou", etiqueta: "ΓεΣΥ (μισθωτός)", formato: "moneda" },
    { clave: "ergodoti", etiqueta: "Εισφορές του εργοδότη", formato: "moneda" },
    { clave: "kaErgodoti", etiqueta: "Κοινωνικές Ασφαλίσεις (εργοδότης)", formato: "moneda" },
    { clave: "gesyErgodoti", etiqueta: "ΓεΣΥ (εργοδότης)", formato: "moneda" },
    { clave: "adeies", etiqueta: "Κεντρικό Ταμείο Αδειών", formato: "moneda", ocultarSiCero: true },
    { clave: "pleonasmos", etiqueta: "Ταμείο για Πλεονάζον Προσωπικό", formato: "moneda" },
    { clave: "anaptyxi", etiqueta: "Ταμείο Ανάπτυξης Ανθρώπινου Δυναμικού", formato: "moneda" },
    { clave: "synochi", etiqueta: "Ταμείο Κοινωνικής Συνοχής", formato: "moneda" },
    { clave: "synolo", etiqueta: "Σύνολο εισφορών τον μήνα", formato: "moneda" },
  ],
});
