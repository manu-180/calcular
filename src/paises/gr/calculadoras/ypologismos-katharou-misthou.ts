import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { elegxosPaidion, misthodosia, misthoiEtous, OPCIONES_ILIKIAS, REQUIERE_KLIMAKA, REQUIERE_MEIOSI, REQUIERE_PAGES } from "../lib/foros";

export default definirCalculadora({
  id: "gr.ypologismos-katharou-misthou",
  mercado: "gr",
  concepto: "sueldo-neto",
  slug: "ypologismos-katharou-misthou",
  estado: "publicado",
  requiere: {
    ...REQUIERE_KLIMAKA,
    ...REQUIERE_MEIOSI,
    ...REQUIERE_PAGES,
    "gr.eisfores-ergazomenou": "mapa",
    "gr.anotato-orio-asfalisis": "numero",
  },
  campos: [
    { id: "miktos", tipo: "moneda", etiqueta: "Μικτός μηνιαίος μισθός", min: 0, porDefecto: 1500 },
    { id: "paidia", tipo: "entero", etiqueta: "Εξαρτώμενα παιδιά", min: 0, max: 15, porDefecto: 0 },
    { id: "ilikia", tipo: "opcion", etiqueta: "Ηλικία", opciones: OPCIONES_ILIKIAS, porDefecto: "31" },
    { id: "kpk", tipo: "opcion-dato", dato: "gr.eisfores-ergazomenou", etiqueta: "Ασφάλιση", porDefecto: "101" },
  ],
  calcular(e, v, { redondear }) {
    if (e.miktos <= 0) throw new ErrorEntrada("Εισάγετε μικτό μισθό μεγαλύτερο από το μηδέν.", "miktos");
    elegxosPaidion(e.paidia);
    const misthoi = misthoiEtous(v);
    const m = misthodosia(
      e.miktos,
      { syntelestisEisforon: enMapa(v["gr.eisfores-ergazomenou"], e.kpk), orio: v["gr.anotato-orio-asfalisis"], misthoi },
      v,
      e.paidia,
      e.ilikia,
      redondear,
    );
    const observaciones: string[] = [];
    if (m.plafon) observaciones.push("Ο μισθός ξεπερνά το ανώτατο όριο ασφαλιστέων αποδοχών. Οι εισφορές υπολογίζονται μόνο μέχρι το όριο.");
    if (m.meiosi === 0 && m.forosKlimakas > 0) observaciones.push("Με αυτό το εισόδημα η μείωση φόρου έχει μηδενιστεί.");
    return {
      katharaMina: m.katharaMina,
      eisforesMina: m.eisforesMina,
      forosMina: m.forosMina,
      misthoi,
      miktaEtous: m.miktaEtous,
      eisforesEtous: m.eisforesEtous,
      forologiteo: m.forologiteo,
      forosKlimakas: m.forosKlimakas,
      meiosi: m.meiosi,
      forosEtous: m.forosEtous,
      katharaEtous: m.katharaEtous,
      observaciones,
    };
  },
  resultado: [
    { clave: "katharaMina", etiqueta: "Καθαρός μηνιαίος μισθός", formato: "moneda", destacada: true },
    { clave: "eisforesMina", etiqueta: "Ασφαλιστικές εισφορές τον μήνα", formato: "moneda" },
    { clave: "forosMina", etiqueta: "Φόρος τον μήνα", formato: "moneda" },
    { clave: "misthoi", etiqueta: "Μισθοί τον χρόνο (με δώρα και επίδομα αδείας)", formato: "numero" },
    { clave: "miktaEtous", etiqueta: "Μικτές αποδοχές του έτους", formato: "moneda" },
    { clave: "eisforesEtous", etiqueta: "Εισφορές του έτους", formato: "moneda" },
    { clave: "forologiteo", etiqueta: "Φορολογητέο εισόδημα", formato: "moneda" },
    { clave: "forosKlimakas", etiqueta: "Φόρος κλίμακας", formato: "moneda" },
    { clave: "meiosi", etiqueta: "Μείωση φόρου", formato: "moneda" },
    { clave: "forosEtous", etiqueta: "Φόρος εισοδήματος του έτους", formato: "moneda" },
    { clave: "katharaEtous", etiqueta: "Καθαρές αποδοχές του έτους", formato: "moneda" },
  ],
  mundo: { bruto: "miktos", periodoBruto: "mes", neto: "katharaMina", periodoNeto: "mes", pagasAnuales: 14, entrada: { paidia: 0, ilikia: "31", kpk: "101" } },
});
