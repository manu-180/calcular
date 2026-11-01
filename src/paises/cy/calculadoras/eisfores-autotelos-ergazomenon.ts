import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.eisfores-autotelos-ergazomenon",
  mercado: "cy",
  concepto: "propio",
  slug: "eisfores-autotelos-ergazomenon",
  estado: "publicado",
  requiere: {
    "cy.eisfora-ka-autotelos": "numero",
    "cy.syntelestes-ae": "mapa",
    "cy.vasikes-asfalistees-evdomada": "numero",
    "cy.anotato-orio-ka-evdomada": "numero",
    "cy.eisfores-gesy": "mapa",
    "cy.anotato-orio-gesy": "numero",
  },
  campos: [
    { id: "katigoria", tipo: "opcion-dato", dato: "cy.syntelestes-ae", etiqueta: "Επαγγελματική κατηγορία", porDefecto: "16" },
    { id: "eisodima", tipo: "moneda", etiqueta: "Καθαρό εισόδημα από την εργασία σας τον χρόνο", min: 0, porDefecto: 30000 },
    {
      id: "pragmatiko",
      tipo: "si-no",
      etiqueta: "Έχετε έγκριση να πληρώνετε στο πραγματικό εισόδημα",
      porDefecto: false,
      ayuda: "Αν το εισόδημά σας είναι κάτω από το κατώτατο ποσό της κατηγορίας, μπορείτε να κάνετε αίτηση με αποδεικτικά.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.eisodima < 0) throw new ErrorEntrada("Το εισόδημα δεν μπορεί να είναι αρνητικό.", "eisodima");
    const katotato = v["cy.vasikes-asfalistees-evdomada"] * enMapa(v["cy.syntelestes-ae"], e.katigoria);
    const anotato = v["cy.anotato-orio-ka-evdomada"];
    const pragmatiko = e.eisodima / 52;
    const evdomadiaio = Math.min(e.pragmatiko ? pragmatiko : Math.max(pragmatiko, katotato), anotato);
    const ka = redondear(porcentaje(evdomadiaio * 52, v["cy.eisfora-ka-autotelos"]));
    const gesy = redondear(porcentaje(Math.min(e.eisodima, v["cy.anotato-orio-gesy"]), enMapa(v["cy.eisfores-gesy"], "autotelos")));
    const observaciones: string[] = [];
    if (!e.pragmatiko && pragmatiko < katotato) observaciones.push("Το εισόδημά σας είναι κάτω από το κατώτατο ποσό της κατηγορίας. Πληρώνετε εισφορές στο κατώτατο ποσό, εκτός αν πάρετε έγκριση για το πραγματικό.");
    if (pragmatiko > anotato) observaciones.push("Το εισόδημά σας ξεπερνά το ανώτατο όριο ασφαλιστέων αποδοχών. Οι Κοινωνικές Ασφαλίσεις υπολογίζονται μέχρι το όριο.");
    return {
      synolo: redondear(ka + gesy),
      ka,
      kaMina: redondear(ka / 12),
      gesy,
      katotatoEvdomada: redondear(katotato),
      asfalistees: redondear(evdomadiaio * 52),
      observaciones,
    };
  },
  resultado: [
    { clave: "synolo", etiqueta: "Εισφορές του έτους", formato: "moneda", destacada: true },
    { clave: "ka", etiqueta: "Κοινωνικές Ασφαλίσεις του έτους", formato: "moneda" },
    { clave: "kaMina", etiqueta: "Κοινωνικές Ασφαλίσεις ανά μήνα περίπου", formato: "moneda" },
    { clave: "gesy", etiqueta: "ΓεΣΥ του έτους", formato: "moneda" },
    { clave: "katotatoEvdomada", etiqueta: "Κατώτατο εβδομαδιαίο ποσό της κατηγορίας", formato: "moneda" },
    { clave: "asfalistees", etiqueta: "Ασφαλιστέες αποδοχές του έτους", formato: "moneda" },
  ],
});
