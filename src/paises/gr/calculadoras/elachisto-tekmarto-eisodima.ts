import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Art. 28Α y 28Γ ΚΦΕ (ν. 5162/2024 y ν. 5246/2025): no rige en los tres primeros años, baja 2/3 en el
// cuarto y 1/3 en el quinto; sube 10% por trienio a partir del séptimo año. Borrador: falta verificar
// cuántos sueldos forman el «ετήσιο ποσό του μικτού κατώτατου μισθού» (gr.tekmarto-pollaplasiastis).
function syntelestisEton(etos: number, prosafxisi: number): number {
  if (etos <= 3) return 0;
  if (etos === 4) return 1 / 3;
  if (etos === 5) return 2 / 3;
  if (etos <= 6) return 1;
  const trietiesMeta = Math.min(3, Math.floor((etos - 7) / 3) + 1);
  return (1 + prosafxisi / 100) ** trietiesMeta;
}

export default definirCalculadora({
  id: "gr.elachisto-tekmarto-eisodima",
  mercado: "gr",
  concepto: "propio",
  slug: "elachisto-tekmarto-eisodima",
  estado: "borrador",
  requiere: {
    "gr.katotatos-misthos": "numero",
    "gr.tekmarto-pollaplasiastis": "numero",
    "gr.tekmarto-prosafxisi": "numero",
  },
  campos: [
    { id: "etos", tipo: "entero", etiqueta: "Έτος δραστηριότητας (1 για το πρώτο έτος)", min: 1, max: 60, porDefecto: 8 },
    { id: "misthodosia", tipo: "moneda", etiqueta: "Ετήσιο κόστος μισθοδοσίας προσωπικού", min: 0, porDefecto: 0 },
    { id: "pragmatiko", tipo: "moneda", etiqueta: "Πραγματικό καθαρό κέρδος του έτους", min: 0, porDefecto: 10000 },
  ],
  calcular(e, v, { redondear }) {
    if (!Number.isInteger(e.etos) || e.etos < 1) throw new ErrorEntrada("Εισάγετε το έτος δραστηριότητας (1 ή μεγαλύτερο).", "etos");
    const katotatos = redondear(v["gr.katotatos-misthos"] * v["gr.tekmarto-pollaplasiastis"]);
    const vasi = katotatos * syntelestisEton(e.etos, v["gr.tekmarto-prosafxisi"]);
    const prosopiko = e.etos <= 3 ? 0 : Math.min(15000, porcentaje(e.misthodosia, 10));
    const elachisto = redondear(Math.min(50000, vasi + prosopiko));
    return { elachisto, diafora: redondear(Math.max(0, elachisto - e.pragmatiko)), katotatos };
  },
  resultado: [
    { clave: "elachisto", etiqueta: "Ελάχιστο τεκμαρτό εισόδημα", formato: "moneda", destacada: true },
    { clave: "diafora", etiqueta: "Διαφορά που προστίθεται στο κέρδος σας", formato: "moneda" },
    { clave: "katotatos", etiqueta: "Ετήσιο ποσό του κατώτατου μισθού", formato: "moneda" },
  ],
});
