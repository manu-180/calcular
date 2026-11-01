import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { misthodosia, REQUIERE_MISTHOU } from "../lib/misthos";

export default definirCalculadora({
  id: "cy.katotatos-misthos",
  mercado: "cy",
  concepto: "salario-minimo",
  slug: "katotatos-misthos",
  estado: "publicado",
  requiere: { ...REQUIERE_MISTHOU, "cy.katotatos-misthos": "numero", "cy.katotatos-misthos-proslipsis": "numero" },
  campos: [
    {
      id: "exiMines",
      tipo: "si-no",
      etiqueta: "Έχετε συμπληρώσει έξι μήνες στον ίδιο εργοδότη",
      porDefecto: true,
    },
    { id: "ores", tipo: "numero", etiqueta: "Ώρες εργασίας την εβδομάδα", min: 1, max: 80, porDefecto: 40 },
    { id: "oresPlirous", tipo: "numero", etiqueta: "Ώρες πλήρους απασχόλησης στον κλάδο σας", min: 1, max: 80, porDefecto: 40, ayuda: "Συνήθως 40 ώρες την εβδομάδα." },
  ],
  calcular(e, v, { redondear }) {
    if (e.ores <= 0 || e.oresPlirous <= 0) throw new ErrorEntrada("Οι ώρες πρέπει να είναι περισσότερες από μηδέν.", "ores");
    const plires = e.exiMines ? v["cy.katotatos-misthos"] : v["cy.katotatos-misthos-proslipsis"];
    const analogia = Math.min(e.ores / e.oresPlirous, 1);
    const katotatos = redondear(plires * analogia);
    const m = misthodosia(katotatos, 12, 0, false, v, redondear);
    const observaciones: string[] = [];
    if (e.ores > e.oresPlirous) observaciones.push("Οι ώρες πάνω από το πλήρες ωράριο δεν αυξάνουν τον κατώτατο μισθό. Πληρώνονται με βάση τη σύμβασή σας.");
    return {
      katotatos,
      plires,
      oriaios: redondear(plires / ((e.oresPlirous * 52) / 12)),
      katharaMina: m.katharaMina,
      kaMina: m.kaMina,
      gesyMina: m.gesyMina,
      observaciones,
    };
  },
  resultado: [
    { clave: "katotatos", etiqueta: "Κατώτατος μηνιαίος μισθός για τις ώρες σας", formato: "moneda", destacada: true },
    { clave: "plires", etiqueta: "Κατώτατος μισθός πλήρους απασχόλησης", formato: "moneda" },
    { clave: "oriaios", etiqueta: "Αντιστοιχεί ανά ώρα περίπου σε", formato: "moneda" },
    { clave: "katharaMina", etiqueta: "Καθαρά τον μήνα", formato: "moneda" },
    { clave: "kaMina", etiqueta: "Κοινωνικές Ασφαλίσεις", formato: "moneda" },
    { clave: "gesyMina", etiqueta: "ΓεΣΥ", formato: "moneda" },
  ],
});
