import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gr.foros-metavivasis-akinitou",
  mercado: "gr",
  concepto: "propio",
  slug: "foros-metavivasis-akinitou",
  estado: "publicado",
  requiere: { "gr.foros-metavivasis": "numero", "gr.foros-metavivasis-dimoi": "numero" },
  campos: [
    { id: "timima", tipo: "moneda", etiqueta: "Τίμημα του συμβολαίου", min: 0, porDefecto: 150000 },
    { id: "antikeimeniki", tipo: "moneda", etiqueta: "Αντικειμενική (φορολογητέα) αξία του ακινήτου", min: 0, porDefecto: 120000 },
    { id: "meridio", tipo: "porcentaje", etiqueta: "Ποσοστό του ακινήτου που μεταβιβάζεται", min: 0, max: 100, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.timima <= 0 && e.antikeimeniki <= 0) throw new ErrorEntrada("Εισάγετε το τίμημα ή την αντικειμενική αξία.", "timima");
    if (e.meridio <= 0 || e.meridio > 100) throw new ErrorEntrada("Το ποσοστό είναι από 0 έως 100.", "meridio");
    const axia = redondear(porcentaje(Math.max(e.timima, e.antikeimeniki), e.meridio));
    const foros = redondear(porcentaje(axia, v["gr.foros-metavivasis"]));
    const dimoi = redondear(porcentaje(foros, v["gr.foros-metavivasis-dimoi"]));
    return {
      synolo: redondear(foros + dimoi),
      axia,
      vasi: e.timima >= e.antikeimeniki ? "Τίμημα του συμβολαίου" : "Αντικειμενική αξία",
      foros,
      dimoi,
      syntelestis: axia > 0 ? ((foros + dimoi) / axia) * 100 : 0,
    };
  },
  resultado: [
    { clave: "synolo", etiqueta: "Φόρος μεταβίβασης που πληρώνετε", formato: "moneda", destacada: true },
    { clave: "axia", etiqueta: "Αξία πάνω στην οποία υπολογίζεται", formato: "moneda" },
    { clave: "vasi", etiqueta: "Ποια αξία χρησιμοποιήθηκε", formato: "texto" },
    { clave: "foros", etiqueta: "Φόρος μεταβίβασης", formato: "moneda" },
    { clave: "dimoi", etiqueta: "Πρόσθετος φόρος υπέρ των δήμων", formato: "moneda" },
    { clave: "syntelestis", etiqueta: "Συνολικός συντελεστής", formato: "porcentaje", decimales: 2 },
  ],
});
