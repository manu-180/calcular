import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.teli-metavivasis",
  mercado: "cy",
  concepto: "propio",
  slug: "teli-metavivasis",
  estado: "publicado",
  requiere: { "cy.teli-metavivasis": "escala", "cy.meiosi-telon-metavivasis": "numero" },
  campos: [
    { id: "axia", tipo: "moneda", etiqueta: "Αξία του ακινήτου", min: 0, porDefecto: 200000 },
    {
      id: "fpa",
      tipo: "si-no",
      etiqueta: "Η αγορά επιβαρύνθηκε με ΦΠΑ",
      porDefecto: false,
      ayuda: "Συνήθως ισχύει για καινούργια ακίνητα που αγοράζονται από κατασκευαστή.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.axia <= 0) throw new ErrorEntrada("Εισάγετε αξία μεγαλύτερη από το μηδέν.", "axia");
    const plira = redondear(aplicarEscalaMarginal(v["cy.teli-metavivasis"], e.axia));
    const meiosi = e.fpa ? plira : redondear(porcentaje(plira, v["cy.meiosi-telon-metavivasis"]));
    const observaciones: string[] = [];
    if (e.fpa) observaciones.push("Όταν η πώληση επιβαρύνεται με ΦΠΑ, δεν πληρώνονται τέλη μεταβίβασης στο Κτηματολόγιο.");
    return { plirotea: redondear(plira - meiosi), plira, meiosi, observaciones };
  },
  resultado: [
    { clave: "plirotea", etiqueta: "Τέλη μεταβίβασης που πληρώνετε", formato: "moneda", destacada: true },
    { clave: "plira", etiqueta: "Τέλη με την πλήρη κλίμακα", formato: "moneda" },
    { clave: "meiosi", etiqueta: "Μείωση ή απαλλαγή", formato: "moneda" },
  ],
});
