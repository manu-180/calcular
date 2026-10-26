import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.foros-kefalaiouchikon-kerdon",
  mercado: "cy",
  concepto: "propio",
  slug: "foros-kefalaiouchikon-kerdon",
  estado: "publicado",
  requiere: { "cy.foros-kefalaiouchikon-kerdon": "numero", "cy.exairesi-kefalaiouchikon-kerdon": "mapa" },
  campos: [
    { id: "timi", tipo: "moneda", etiqueta: "Τιμή πώλησης", min: 0, porDefecto: 300000 },
    { id: "kostos", tipo: "moneda", etiqueta: "Κόστος απόκτησης αναπροσαρμοσμένο για πληθωρισμό", min: 0, porDefecto: 200000, ayuda: "Το κόστος αγοράς και οι βελτιώσεις, αναπροσαρμοσμένα με τον Δείκτη Τιμών Καταναλωτή." },
    { id: "exoda", tipo: "moneda", etiqueta: "Έξοδα πώλησης (μεσιτικά, νομικά)", min: 0, porDefecto: 0 },
    {
      id: "exairesi",
      tipo: "opcion",
      etiqueta: "Εξαίρεση",
      opciones: [
        { valor: "geniki", etiqueta: "Γενική εξαίρεση" },
        { valor: "katoikia", etiqueta: "Κύρια κατοικία" },
        { valor: "georgiki", etiqueta: "Γεωργική γη από γεωργό" },
        { valor: "kamia", etiqueta: "Καμία" },
      ],
      porDefecto: "geniki",
    },
    { id: "xrisimopoiimeni", tipo: "moneda", etiqueta: "Μέρος της εξαίρεσης που χρησιμοποιήσατε παλαιότερα", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.timi <= 0) throw new ErrorEntrada("Εισάγετε τιμή πώλησης μεγαλύτερη από το μηδέν.", "timi");
    const kerdos = redondear(Math.max(0, e.timi - e.kostos - e.exoda));
    const oliki = e.exairesi === "kamia" ? 0 : enMapa(v["cy.exairesi-kefalaiouchikon-kerdon"], e.exairesi);
    const diathesimi = Math.max(0, oliki - e.xrisimopoiimeni);
    const exairesi = redondear(Math.min(kerdos, diathesimi));
    const forologiteo = redondear(kerdos - exairesi);
    const foros = redondear(porcentaje(forologiteo, v["cy.foros-kefalaiouchikon-kerdon"]));
    return { foros, kerdos, exairesi, forologiteo, ypoloipoExairesis: e.exairesi === "geniki" || e.exairesi === "georgiki" ? redondear(diathesimi - exairesi) : null };
  },
  resultado: [
    { clave: "foros", etiqueta: "Φόρος κεφαλαιουχικών κερδών", formato: "moneda", destacada: true },
    { clave: "kerdos", etiqueta: "Κέρδος", formato: "moneda" },
    { clave: "exairesi", etiqueta: "Εξαίρεση που χρησιμοποιείται", formato: "moneda" },
    { clave: "forologiteo", etiqueta: "Φορολογητέο κέρδος", formato: "moneda" },
    { clave: "ypoloipoExairesis", etiqueta: "Εξαίρεση που απομένει για το μέλλον", formato: "moneda" },
  ],
});
