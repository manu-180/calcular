import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { elegxosPaidion, forosMisthotou, klimakaGia, OPCIONES_ILIKIAS, parametroi, REQUIERE_KLIMAKA, REQUIERE_MEIOSI } from "../lib/foros";

export default definirCalculadora({
  id: "gr.ypologismos-forou-eisodimatos",
  mercado: "gr",
  concepto: "impuesto-renta",
  slug: "ypologismos-forou-eisodimatos",
  estado: "publicado",
  requiere: { ...REQUIERE_KLIMAKA, ...REQUIERE_MEIOSI },
  campos: [
    {
      id: "eisodima",
      tipo: "moneda",
      etiqueta: "Ετήσιο φορολογητέο εισόδημα από μισθούς ή συντάξεις",
      ayuda: "Οι μικτές αποδοχές του έτους μείον τις ασφαλιστικές εισφορές.",
      min: 0,
      porDefecto: 20000,
    },
    { id: "paidia", tipo: "entero", etiqueta: "Εξαρτώμενα παιδιά", min: 0, max: 15, porDefecto: 0 },
    { id: "ilikia", tipo: "opcion", etiqueta: "Ηλικία", opciones: OPCIONES_ILIKIAS, porDefecto: "31" },
  ],
  calcular(e, v, { redondear }) {
    if (e.eisodima < 0) throw new ErrorEntrada("Το εισόδημα δεν μπορεί να είναι αρνητικό.", "eisodima");
    elegxosPaidion(e.paidia);
    const f = forosMisthotou(v, e.eisodima, e.paidia, e.ilikia, redondear);
    const klimaka = klimakaGia(parametroi(v), e.paidia, e.ilikia);
    let oriakos = klimaka[0].tasa;
    for (const fila of klimaka) if (e.eisodima > fila.desde) oriakos = fila.tasa;
    return {
      foros: f.foros,
      forosKlimakas: f.forosKlimakas,
      meiosi: f.meiosi,
      mesos: e.eisodima > 0 ? (f.foros / e.eisodima) * 100 : 0,
      oriakos,
      kathara: redondear(e.eisodima - f.foros),
      forosMina: redondear(f.foros / 12),
    };
  },
  resultado: [
    { clave: "foros", etiqueta: "Φόρος εισοδήματος του έτους", formato: "moneda", destacada: true },
    { clave: "forosKlimakas", etiqueta: "Φόρος κλίμακας", formato: "moneda" },
    { clave: "meiosi", etiqueta: "Μείωση φόρου", formato: "moneda" },
    { clave: "mesos", etiqueta: "Μέσος συντελεστής", formato: "porcentaje", decimales: 2 },
    { clave: "oriakos", etiqueta: "Συντελεστής του τελευταίου κλιμακίου", formato: "porcentaje" },
    { clave: "kathara", etiqueta: "Εισόδημα μετά τον φόρο", formato: "moneda" },
    { clave: "forosMina", etiqueta: "Φόρος ανά μήνα (διά 12)", formato: "moneda" },
  ],
});
