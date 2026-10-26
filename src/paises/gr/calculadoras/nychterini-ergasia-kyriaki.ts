import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gr.nychterini-ergasia-kyriaki",
  mercado: "gr",
  concepto: "propio",
  slug: "nychterini-ergasia-kyriaki",
  estado: "publicado",
  requiere: { "gr.prosafxisi-nychtas": "numero", "gr.prosafxisi-kyriakis": "numero" },
  campos: [
    { id: "oromisthio", tipo: "moneda", etiqueta: "Νόμιμο ωρομίσθιο (μικτό)", min: 0, porDefecto: 8 },
    { id: "oresNychtas", tipo: "numero", etiqueta: "Ώρες νυχτερινής εργασίας (22:00 έως 06:00)", min: 0, porDefecto: 16 },
    { id: "oresKyriakis", tipo: "numero", etiqueta: "Ώρες εργασίας Κυριακή ή αργία", min: 0, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    if (e.oromisthio <= 0) throw new ErrorEntrada("Εισάγετε ωρομίσθιο μεγαλύτερο από το μηδέν.", "oromisthio");
    if (e.oresNychtas < 0) throw new ErrorEntrada("Οι ώρες δεν μπορεί να είναι αρνητικές.", "oresNychtas");
    if (e.oresKyriakis < 0) throw new ErrorEntrada("Οι ώρες δεν μπορεί να είναι αρνητικές.", "oresKyriakis");
    const prosafxisiNychtas = redondear(e.oresNychtas * porcentaje(e.oromisthio, v["gr.prosafxisi-nychtas"]));
    const prosafxisiKyriakis = redondear(e.oresKyriakis * porcentaje(e.oromisthio, v["gr.prosafxisi-kyriakis"]));
    return {
      prosafxiseis: redondear(prosafxisiNychtas + prosafxisiKyriakis),
      prosafxisiNychtas,
      prosafxisiKyriakis,
      amoiviNychtas: redondear(e.oresNychtas * e.oromisthio + prosafxisiNychtas),
      amoiviKyriakis: redondear(e.oresKyriakis * e.oromisthio + prosafxisiKyriakis),
    };
  },
  resultado: [
    { clave: "prosafxiseis", etiqueta: "Σύνολο προσαυξήσεων", formato: "moneda", destacada: true },
    { clave: "prosafxisiNychtas", etiqueta: "Προσαύξηση νυχτερινής εργασίας", formato: "moneda" },
    { clave: "prosafxisiKyriakis", etiqueta: "Προσαύξηση Κυριακής ή αργίας", formato: "moneda" },
    { clave: "amoiviNychtas", etiqueta: "Αμοιβή για τις νυχτερινές ώρες (με την προσαύξηση)", formato: "moneda" },
    { clave: "amoiviKyriakis", etiqueta: "Αμοιβή για τις ώρες Κυριακής (με την προσαύξηση)", formato: "moneda" },
  ],
});
