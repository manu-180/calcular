import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gr.tokoi-katatheseon",
  mercado: "gr",
  concepto: "plazo-fijo",
  slug: "tokoi-katatheseon",
  estado: "publicado",
  requiere: { "gr.foros-tokon": "numero" },
  campos: [
    { id: "kefalaio", tipo: "moneda", etiqueta: "Ποσό κατάθεσης", min: 0, porDefecto: 10000 },
    { id: "epitokio", tipo: "porcentaje", etiqueta: "Ετήσιο επιτόκιο", min: 0, max: 50, porDefecto: 2 },
    { id: "mines", tipo: "entero", etiqueta: "Διάρκεια σε μήνες", min: 1, max: 120, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.kefalaio <= 0) throw new ErrorEntrada("Εισάγετε ποσό κατάθεσης μεγαλύτερο από το μηδέν.", "kefalaio");
    if (!Number.isInteger(e.mines) || e.mines < 1) throw new ErrorEntrada("Η διάρκεια είναι τουλάχιστον ένας μήνας.", "mines");
    const miktoi = redondear((porcentaje(e.kefalaio, e.epitokio) * e.mines) / 12);
    const foros = redondear(porcentaje(miktoi, v["gr.foros-tokon"]));
    const katharoi = redondear(miktoi - foros);
    return { katharoi, miktoi, foros, synolo: redondear(e.kefalaio + katharoi), katharoEpitokio: e.epitokio * (1 - v["gr.foros-tokon"] / 100) };
  },
  resultado: [
    { clave: "katharoi", etiqueta: "Καθαροί τόκοι", formato: "moneda", destacada: true },
    { clave: "miktoi", etiqueta: "Μικτοί τόκοι", formato: "moneda" },
    { clave: "foros", etiqueta: "Φόρος τόκων", formato: "moneda" },
    { clave: "synolo", etiqueta: "Ποσό στη λήξη", formato: "moneda" },
    { clave: "katharoEpitokio", etiqueta: "Καθαρό ετήσιο επιτόκιο μετά τον φόρο", formato: "porcentaje", decimales: 2 },
  ],
});
