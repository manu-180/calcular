import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gr.imeres-adeias",
  mercado: "gr",
  concepto: "vacaciones",
  slug: "imeres-adeias",
  estado: "publicado",
  requiere: { "gr.imeres-adeias": "mapa", "gr.eti-afximenis-adeias": "mapa" },
  campos: [
    {
      id: "evdomada",
      tipo: "opcion",
      etiqueta: "Εβδομάδα εργασίας",
      opciones: [
        { valor: "5", etiqueta: "Πενθήμερη (5 ημέρες)" },
        { valor: "6", etiqueta: "Εξαήμερη (6 ημέρες)" },
      ],
      porDefecto: "5",
    },
    {
      id: "etos",
      tipo: "opcion",
      etiqueta: "Ημερολογιακό έτος στον ίδιο εργοδότη",
      opciones: [
        { valor: "1", etiqueta: "Πρώτο έτος" },
        { valor: "2", etiqueta: "Δεύτερο έτος" },
        { valor: "3", etiqueta: "Τρίτο έτος ή επόμενο" },
      ],
      porDefecto: "3",
    },
    { id: "mines", tipo: "entero", etiqueta: "Μήνες απασχόλησης στο πρώτο έτος", min: 1, max: 12, porDefecto: 6, visibleSi: { etos: ["1"] } },
    { id: "etiIdiou", tipo: "entero", etiqueta: "Συμπληρωμένα έτη στον ίδιο εργοδότη", min: 0, max: 60, porDefecto: 3 },
    {
      id: "etiSynolika",
      tipo: "entero",
      etiqueta: "Συνολικά έτη εργασίας σε όλους τους εργοδότες",
      ayuda: "Μαζί με τα έτη στον τωρινό εργοδότη.",
      min: 0,
      max: 60,
      porDefecto: 3,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.etiSynolika < e.etiIdiou) throw new ErrorEntrada("Τα συνολικά έτη δεν μπορεί να είναι λιγότερα από τα έτη στον ίδιο εργοδότη.", "etiSynolika");
    const ia = v["gr.imeres-adeias"];
    const eti = v["gr.eti-afximenis-adeias"];
    const w = e.evdomada;
    if (e.etos === "1") {
      const mines = e.mines ?? 12;
      const etisies = enMapa(ia, `${w}-1`);
      return {
        imeres: redondear((etisies * mines) / 12),
        etisies,
        kanonas: "Αναλογικά με τους μήνες του πρώτου έτους",
      };
    }
    let kleidi = `${w}-${e.etos}`;
    let kanonas = e.etos === "2" ? "Δεύτερο έτος: μία ημέρα παραπάνω" : "Τρίτο έτος και μετά";
    if (e.etiIdiou >= enMapa(eti, "idios-ergodotis") || e.etiSynolika >= enMapa(eti, "synolika")) {
      kleidi = `${w}-10`;
      kanonas = "Αυξημένη άδεια λόγω προϋπηρεσίας";
    }
    if (e.etiSynolika >= enMapa(eti, "megisti")) {
      kleidi = `${w}-25`;
      kanonas = "Ανώτατη άδεια λόγω προϋπηρεσίας";
    }
    const imeres = enMapa(ia, kleidi);
    return { imeres, etisies: imeres, kanonas };
  },
  resultado: [
    { clave: "imeres", etiqueta: "Ημέρες άδειας που δικαιούστε", formato: "dias", destacada: true, decimales: 1 },
    { clave: "etisies", etiqueta: "Ετήσια άδεια για ολόκληρο έτος", formato: "dias" },
    { clave: "kanonas", etiqueta: "Κανόνας που εφαρμόστηκε", formato: "texto" },
  ],
});
