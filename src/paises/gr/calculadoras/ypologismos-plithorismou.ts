import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { metavoliTimon, minasEtos } from "../lib/plithorismos";
import series from "../series.json";

const DTK = (series.series.find((s) => s.id === "gr.dtk")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "gr.ypologismos-plithorismou",
  mercado: "gr",
  concepto: "inflacion",
  slug: "ypologismos-plithorismou",
  estado: "publicado",
  requiere: { "gr.dtk": "serie" },
  campos: [
    { id: "poso", tipo: "moneda", etiqueta: "Ποσό", min: 0, porDefecto: 1000 },
    { id: "apo", tipo: "fecha", etiqueta: "Μήνας από τον οποίο είναι το ποσό", min: "2002-01-01", porDefecto: "2020-01-01", ayuda: "Μετράει ο δείκτης του μήνα, η ημέρα δεν έχει σημασία." },
    { id: "eos", tipo: "fecha", etiqueta: "Μήνας στον οποίο θέλετε να το μεταφέρετε", min: "2002-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.poso <= 0) throw new ErrorEntrada("Εισάγετε ποσό μεγαλύτερο από το μηδέν.", "poso");
    const m = metavoliTimon(DTK, v["gr.dtk"], e.apo, e.eos);
    return {
      simera: redondear(e.poso * m.syntelestis),
      diafora: redondear(e.poso * m.syntelestis - e.poso),
      axia: redondear(e.poso / m.syntelestis),
      synoliki: m.synoliki,
      minasApo: minasEtos(m.apo),
      minasEos: minasEtos(m.eos),
      observaciones: m.paratiriseis,
    };
  },
  resultado: [
    { clave: "simera", etiqueta: "Ποσό με την ίδια αγοραστική δύναμη", formato: "moneda", destacada: true },
    { clave: "diafora", etiqueta: "Αύξηση λόγω πληθωρισμού", formato: "moneda" },
    { clave: "axia", etiqueta: "Πόσο αξίζει το ποσό σε τιμές του αρχικού μήνα", formato: "moneda" },
    { clave: "synoliki", etiqueta: "Πληθωρισμός σε όλο το διάστημα", formato: "porcentaje", decimales: 1 },
    { clave: "minasApo", etiqueta: "Από", formato: "texto" },
    { clave: "minasEos", etiqueta: "Έως", formato: "texto" },
  ],
});
