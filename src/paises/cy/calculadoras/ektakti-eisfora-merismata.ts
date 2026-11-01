import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.ektakti-eisfora-merismata",
  mercado: "cy",
  concepto: "propio",
  slug: "ektakti-eisfora-merismata",
  estado: "publicado",
  requiere: { "cy.ektakti-eisfora-amynas": "mapa", "cy.eisfores-gesy": "mapa" },
  campos: [
    { id: "merisma", tipo: "moneda", etiqueta: "Μέρισμα", min: 0, porDefecto: 10000 },
    {
      id: "kerdi",
      tipo: "opcion",
      etiqueta: "Από κέρδη ποιου έτους",
      opciones: [
        { valor: "merismata", etiqueta: "Κέρδη του 2026 και μετά" },
        { valor: "merismata-palaia", etiqueta: "Κέρδη μέχρι το 2025" },
      ],
      porDefecto: "merismata",
      ayuda: "Για μερίσματα από κέρδη μέχρι το 2025 ο παλιός συντελεστής ισχύει για όσα πληρωθούν μέσα σε έξι χρόνια από τη μεταρρύθμιση.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.merisma <= 0) throw new ErrorEntrada("Εισάγετε μέρισμα μεγαλύτερο από το μηδέν.", "merisma");
    const syntelestis = enMapa(v["cy.ektakti-eisfora-amynas"], e.kerdi);
    const amyna = redondear(porcentaje(e.merisma, syntelestis));
    const gesy = redondear(porcentaje(e.merisma, enMapa(v["cy.eisfores-gesy"], "eisodimatias")));
    return { kathara: redondear(e.merisma - amyna - gesy), amyna, gesy, syntelestis };
  },
  resultado: [
    { clave: "kathara", etiqueta: "Καθαρό μέρισμα", formato: "moneda", destacada: true },
    { clave: "amyna", etiqueta: "Έκτακτη εισφορά για την άμυνα", formato: "moneda" },
    { clave: "gesy", etiqueta: "Εισφορά ΓεΣΥ", formato: "moneda" },
    { clave: "syntelestis", etiqueta: "Συντελεστής εισφοράς άμυνας", formato: "porcentaje", decimales: 0 },
  ],
});
