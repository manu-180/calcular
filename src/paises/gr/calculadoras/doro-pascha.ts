import { definirCalculadora } from "@/motor/calculo";
import { amoivi, doro, OPCIONES_AMOIVIS } from "../lib/dora";

export default definirCalculadora({
  id: "gr.doro-pascha",
  mercado: "gr",
  concepto: "propio",
  slug: "doro-pascha",
  estado: "publicado",
  requiere: { "gr.doro-pascha": "mapa", "gr.epidoma-adeias": "mapa" },
  campos: [
    { id: "typos", tipo: "opcion", etiqueta: "Πώς αμείβεστε", opciones: OPCIONES_AMOIVIS, porDefecto: "misthos" },
    { id: "misthos", tipo: "moneda", etiqueta: "Μικτός μηνιαίος μισθός", min: 0, porDefecto: 1200, visibleSi: { typos: ["misthos"] } },
    { id: "imeromisthio", tipo: "moneda", etiqueta: "Μικτό ημερομίσθιο", min: 0, porDefecto: 50, visibleSi: { typos: ["imeromisthio"] } },
    {
      id: "imeres",
      tipo: "entero",
      etiqueta: "Ημέρες απασχόλησης από 1 Ιανουαρίου έως 30 Απριλίου",
      ayuda: "Ημερολογιακές ημέρες με σύμβαση στον εργοδότη. Όλο το διάστημα είναι 120 ημέρες.",
      min: 0,
      max: 120,
      porDefecto: 120,
    },
    { id: "analogiaAdeias", tipo: "si-no", etiqueta: "Με την αναλογία του επιδόματος αδείας (1/24)", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    const poso = amoivi(e.typos, e.misthos, e.imeromisthio);
    const d = doro(v["gr.doro-pascha"], v["gr.epidoma-adeias"], e.typos, poso, e.imeres, e.analogiaAdeias, redondear);
    return { doro: d.doro, plires: d.plires, analogia: d.analogia, prosafxisi: d.prosafxisi };
  },
  resultado: [
    { clave: "doro", etiqueta: "Δώρο Πάσχα (μικτό)", formato: "moneda", destacada: true },
    { clave: "plires", etiqueta: "Ολόκληρο δώρο για όλο το διάστημα", formato: "moneda" },
    { clave: "analogia", etiqueta: "Μέρος του ολόκληρου δώρου", formato: "porcentaje", decimales: 2 },
    { clave: "prosafxisi", etiqueta: "Από αυτό: αναλογία επιδόματος αδείας", formato: "moneda", ocultarSiCero: true },
  ],
});
