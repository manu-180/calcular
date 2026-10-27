import { definirCalculadora } from "@/motor/calculo";
import { apoKlimaka, evdomadesApasxolisis } from "../lib/termatismos";

export default definirCalculadora({
  id: "cy.proeidopoiisi-termatismou",
  mercado: "cy",
  concepto: "preaviso",
  slug: "proeidopoiisi-termatismou",
  estado: "publicado",
  requiere: { "cy.proeidopoiisi-ergodoti": "mapa", "cy.proeidopoiisi-ergazomenou": "mapa" },
  campos: [
    { id: "apo", tipo: "fecha", etiqueta: "Ημερομηνία πρόσληψης", porDefecto: "2022-01-03" },
    { id: "eos", tipo: "fecha", etiqueta: "Ημερομηνία προειδοποίησης", porDefecto: "hoy" },
    { id: "misthos", tipo: "moneda", etiqueta: "Μεικτός μηνιαίος μισθός (προαιρετικό)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    const evdomades = evdomadesApasxolisis(e.apo, e.eos, "eos");
    const ergodotis = apoKlimaka(v["cy.proeidopoiisi-ergodoti"], evdomades);
    const ergazomenos = apoKlimaka(v["cy.proeidopoiisi-ergazomenou"], evdomades);
    const observaciones: string[] = [];
    if (ergodotis === 0) observaciones.push("Με λιγότερες από 26 εβδομάδες συνεχούς απασχόλησης ο νόμος δεν ορίζει ελάχιστη προειδοποίηση.");
    return {
      ergodotis,
      ergazomenos,
      evdomades,
      antiProeidopoiisis: e.misthos ? redondear(((e.misthos * 12) / 52) * ergodotis) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "ergodotis", etiqueta: "Προειδοποίηση από τον εργοδότη", formato: "semanas", destacada: true },
    { clave: "ergazomenos", etiqueta: "Προειδοποίηση αν παραιτηθείτε εσείς", formato: "semanas" },
    { clave: "evdomades", etiqueta: "Εβδομάδες συνεχούς απασχόλησης", formato: "numero", decimales: 0 },
    { clave: "antiProeidopoiisis", etiqueta: "Μισθός για την περίοδο προειδοποίησης περίπου", formato: "moneda" },
  ],
});
