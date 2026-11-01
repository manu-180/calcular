import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { amoivi, OPCIONES_AMOIVIS } from "../lib/dora";

export default definirCalculadora({
  id: "gr.epidoma-adeias",
  mercado: "gr",
  concepto: "propio",
  slug: "epidoma-adeias",
  estado: "publicado",
  requiere: { "gr.epidoma-adeias": "mapa" },
  campos: [
    { id: "typos", tipo: "opcion", etiqueta: "Πώς αμείβεστε", opciones: OPCIONES_AMOIVIS, porDefecto: "misthos" },
    { id: "misthos", tipo: "moneda", etiqueta: "Μικτός μηνιαίος μισθός", min: 0, porDefecto: 1200, visibleSi: { typos: ["misthos"] } },
    { id: "imeromisthio", tipo: "moneda", etiqueta: "Μικτό ημερομίσθιο", min: 0, porDefecto: 50, visibleSi: { typos: ["imeromisthio"] } },
    {
      id: "mines",
      tipo: "entero",
      etiqueta: "Μήνες απασχόλησης στον εργοδότη μέσα στο έτος",
      ayuda: "12 αν εργάζεστε όλο το έτος. Λιγότεροι αν προσληφθήκατε ή αποχωρήσατε μέσα στο έτος.",
      min: 1,
      max: 12,
      porDefecto: 12,
    },
  ],
  calcular(e, v, { redondear }) {
    const poso = amoivi(e.typos, e.misthos, e.imeromisthio);
    if (!Number.isInteger(e.mines) || e.mines < 1 || e.mines > 12) throw new ErrorEntrada("Οι μήνες είναι από 1 έως 12.", "mines");
    const plires = redondear(poso * enMapa(v["gr.epidoma-adeias"], e.typos === "misthos" ? "mines" : "imeromisthia"));
    return { epidoma: redondear((plires * e.mines) / 12), plires };
  },
  resultado: [
    { clave: "epidoma", etiqueta: "Επίδομα αδείας (μικτό)", formato: "moneda", destacada: true },
    { clave: "plires", etiqueta: "Επίδομα για ολόκληρο έτος", formato: "moneda" },
  ],
});
