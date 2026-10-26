import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { elegxosPaidion, forosKlimakas, OPCIONES_ILIKIAS, parametroi, REQUIERE_KLIMAKA } from "../lib/foros";

export default definirCalculadora({
  id: "gr.foros-eleftheron-epangelmation",
  mercado: "gr",
  concepto: "propio",
  slug: "foros-eleftheron-epangelmation",
  estado: "publicado",
  requiere: {
    ...REQUIERE_KLIMAKA,
    "gr.eisfores-eleftheron": "mapa",
    "gr.eisfora-anergias-eleftheron": "numero",
  },
  campos: [
    { id: "esoda", tipo: "moneda", etiqueta: "Ετήσια έσοδα (χωρίς ΦΠΑ)", min: 0, porDefecto: 30000 },
    { id: "exoda", tipo: "moneda", etiqueta: "Ετήσια επαγγελματικά έξοδα (χωρίς τις εισφορές ΕΦΚΑ)", min: 0, porDefecto: 5000 },
    { id: "kategoria", tipo: "opcion-dato", dato: "gr.eisfores-eleftheron", etiqueta: "Ασφαλιστική κατηγορία ΕΦΚΑ", porDefecto: "1" },
    { id: "anergia", tipo: "si-no", etiqueta: "Πληρώνετε και την εισφορά ανεργίας", porDefecto: true },
    { id: "paidia", tipo: "entero", etiqueta: "Εξαρτώμενα παιδιά", min: 0, max: 15, porDefecto: 0 },
    { id: "ilikia", tipo: "opcion", etiqueta: "Ηλικία", opciones: OPCIONES_ILIKIAS, porDefecto: "31" },
  ],
  calcular(e, v, { redondear }) {
    if (e.esoda <= 0) throw new ErrorEntrada("Εισάγετε έσοδα μεγαλύτερα από το μηδέν.", "esoda");
    if (e.exoda < 0) throw new ErrorEntrada("Τα έξοδα δεν μπορεί να είναι αρνητικά.", "exoda");
    elegxosPaidion(e.paidia);
    const eisforesMina = enMapa(v["gr.eisfores-eleftheron"], e.kategoria) + (e.anergia ? v["gr.eisfora-anergias-eleftheron"] : 0);
    const eisfores = redondear(eisforesMina * 12);
    const kerdos = redondear(Math.max(0, e.esoda - e.exoda - eisfores));
    const foros = redondear(forosKlimakas(parametroi(v), kerdos, e.paidia, e.ilikia));
    const kathara = redondear(e.esoda - e.exoda - eisfores - foros);
    const observaciones: string[] = [];
    if (e.esoda - e.exoda - eisfores < 0) observaciones.push("Τα έξοδα και οι εισφορές ξεπερνούν τα έσοδα: δεν προκύπτει φόρος.");
    observaciones.push("Ο υπολογισμός δεν εφαρμόζει το ελάχιστο τεκμαρτό εισόδημα των ελεύθερων επαγγελματιών. Αν το κέρδος σας είναι χαμηλότερο, ο φόρος μπορεί να βγει μεγαλύτερος.");
    return {
      foros,
      kerdos,
      eisfores,
      kathara,
      katharaMina: redondear(kathara / 12),
      mesos: kerdos > 0 ? (foros / kerdos) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "foros", etiqueta: "Φόρος εισοδήματος του έτους", formato: "moneda", destacada: true },
    { clave: "kerdos", etiqueta: "Καθαρό κέρδος (φορολογητέο)", formato: "moneda" },
    { clave: "eisfores", etiqueta: "Εισφορές ΕΦΚΑ του έτους", formato: "moneda" },
    { clave: "kathara", etiqueta: "Καθαρά μετά από έξοδα, εισφορές και φόρο", formato: "moneda" },
    { clave: "katharaMina", etiqueta: "Καθαρά ανά μήνα", formato: "moneda" },
    { clave: "mesos", etiqueta: "Μέσος συντελεστής φόρου", formato: "porcentaje", decimales: 2 },
  ],
});
