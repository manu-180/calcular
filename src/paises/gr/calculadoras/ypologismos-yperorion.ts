import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

const ORES = ["yperergasia", "nomimi", "meAdeia", "paranomi"] as const;

export default definirCalculadora({
  id: "gr.ypologismos-yperorion",
  mercado: "gr",
  concepto: "horas-extra",
  slug: "ypologismos-yperorion",
  estado: "publicado",
  requiere: { "gr.prosafxiseis-yperorias": "mapa", "gr.orio-yperorion": "mapa" },
  campos: [
    { id: "oromisthio", tipo: "moneda", etiqueta: "Ωρομίσθιο (μικτό)", ayuda: "Το καταβαλλόμενο ωρομίσθιο, όπως το βλέπετε στη σύμβαση ή στη μισθοδοσία.", min: 0, porDefecto: 8 },
    { id: "yperergasia", tipo: "numero", etiqueta: "Ώρες υπερεργασίας", ayuda: "Πενθήμερο: από την 41η έως την 45η ώρα της εβδομάδας.", min: 0, porDefecto: 5 },
    { id: "nomimi", tipo: "numero", etiqueta: "Ώρες νόμιμης υπερωρίας", min: 0, porDefecto: 0 },
    { id: "meAdeia", tipo: "numero", etiqueta: "Ώρες υπερωρίας πέρα από το ετήσιο όριο, με άδεια του Υπουργείου", min: 0, porDefecto: 0 },
    { id: "paranomi", tipo: "numero", etiqueta: "Ώρες μη νόμιμης υπερωρίας", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.oromisthio <= 0) throw new ErrorEntrada("Εισάγετε ωρομίσθιο μεγαλύτερο από το μηδέν.", "oromisthio");
    for (const k of ORES) if (e[k] < 0) throw new ErrorEntrada("Οι ώρες δεν μπορεί να είναι αρνητικές.", k);
    const p = v["gr.prosafxiseis-yperorias"];
    const kleidi = { yperergasia: "yperergasia", nomimi: "nomimi", meAdeia: "me-adeia", paranomi: "paranomi" } as const;
    const amoivi = (k: (typeof ORES)[number]) => redondear(e[k] * (e.oromisthio + porcentaje(e.oromisthio, enMapa(p, kleidi[k]))));
    const r = { yperergasia: amoivi("yperergasia"), nomimi: amoivi("nomimi"), meAdeia: amoivi("meAdeia"), paranomi: amoivi("paranomi") };
    const ores = e.yperergasia + e.nomimi + e.meAdeia + e.paranomi;
    const synolo = redondear(r.yperergasia + r.nomimi + r.meAdeia + r.paranomi);
    const observaciones: string[] = [];
    const orio = enMapa(v["gr.orio-yperorion"], "etos");
    if (e.nomimi > orio) observaciones.push(`Οι νόμιμες υπερωρίες έχουν όριο ${orio} ώρες τον χρόνο. Πέρα από αυτό χρειάζεται άδεια του Υπουργείου Εργασίας.`);
    return {
      synolo,
      ...r,
      prosafxisi: redondear(synolo - ores * e.oromisthio),
      ores,
      observaciones,
    };
  },
  resultado: [
    { clave: "synolo", etiqueta: "Σύνολο αμοιβής για τις επιπλέον ώρες", formato: "moneda", destacada: true },
    { clave: "yperergasia", etiqueta: "Υπερεργασία", formato: "moneda", ocultarSiCero: true },
    { clave: "nomimi", etiqueta: "Νόμιμη υπερωρία", formato: "moneda", ocultarSiCero: true },
    { clave: "meAdeia", etiqueta: "Υπερωρία με άδεια πέρα από το όριο", formato: "moneda", ocultarSiCero: true },
    { clave: "paranomi", etiqueta: "Μη νόμιμη υπερωρία", formato: "moneda", ocultarSiCero: true },
    { clave: "prosafxisi", etiqueta: "Από αυτά: προσαυξήσεις", formato: "moneda" },
    { clave: "ores", etiqueta: "Σύνολο επιπλέον ωρών", formato: "horas" },
  ],
});
