import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.etisia-adeia",
  mercado: "cy",
  concepto: "vacaciones",
  slug: "etisia-adeia",
  estado: "publicado",
  requiere: { "cy.imeres-adeias": "mapa", "cy.evdomades-adeias": "numero", "cy.eisfores-tameion-ergodoti": "mapa" },
  campos: [
    { id: "evdomada", tipo: "opcion-dato", dato: "cy.imeres-adeias", etiqueta: "Εβδομάδα εργασίας", porDefecto: "5" },
    { id: "evdomades", tipo: "entero", etiqueta: "Εβδομάδες που εργαστήκατε στο έτος αδείας", min: 0, max: 53, porDefecto: 52, ayuda: "Η απουσία λόγω ασθένειας, ατυχήματος, μητρότητας ή γονικής άδειας μετρά ως εργασία." },
    { id: "misthos", tipo: "moneda", etiqueta: "Μεικτός μηνιαίος μισθός (προαιρετικό)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.evdomades < 0 || e.evdomades > 53) throw new ErrorEntrada("Οι εβδομάδες πρέπει να είναι από 0 έως 53.", "evdomades");
    const plires = enMapa(v["cy.imeres-adeias"], e.evdomada);
    const orio = v["cy.evdomades-adeias"];
    const imeres = e.evdomades >= orio ? plires : redondear((plires * e.evdomades) / orio);
    const imeresEvdomadas = Number(e.evdomada);
    const imerisios = e.misthos ? (e.misthos * 12) / (52 * imeresEvdomadas) : null;
    return {
      imeres,
      plires,
      evdomadesAdeias: redondear(imeres / imeresEvdomadas),
      axia: imerisios === null ? null : redondear(imerisios * imeres),
    };
  },
  resultado: [
    { clave: "imeres", etiqueta: "Εργάσιμες ημέρες ετήσιας άδειας", formato: "dias", decimales: 2, destacada: true },
    { clave: "plires", etiqueta: "Πλήρης άδεια για 48 εβδομάδες και πάνω", formato: "dias" },
    { clave: "evdomadesAdeias", etiqueta: "Σε εβδομάδες εργασίας", formato: "semanas", decimales: 2 },
    { clave: "axia", etiqueta: "Αξία της άδειας περίπου", formato: "moneda" },
  ],
});
