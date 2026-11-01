import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { elegxosPaidion, miktosApoKathara, misthodosia, misthoiEtous, OPCIONES_ILIKIAS, REQUIERE_KLIMAKA, REQUIERE_MEIOSI, REQUIERE_PAGES } from "../lib/foros";

export default definirCalculadora({
  id: "gr.ypologismos-miktou-apo-katharo",
  mercado: "gr",
  concepto: "propio",
  slug: "ypologismos-miktou-apo-katharo",
  estado: "publicado",
  requiere: {
    ...REQUIERE_KLIMAKA,
    ...REQUIERE_MEIOSI,
    ...REQUIERE_PAGES,
    "gr.eisfores-ergazomenou": "mapa",
    "gr.anotato-orio-asfalisis": "numero",
  },
  campos: [
    { id: "kathara", tipo: "moneda", etiqueta: "Καθαρός μηνιαίος μισθός που θέλετε", min: 0, porDefecto: 1200 },
    { id: "paidia", tipo: "entero", etiqueta: "Εξαρτώμενα παιδιά", min: 0, max: 15, porDefecto: 0 },
    { id: "ilikia", tipo: "opcion", etiqueta: "Ηλικία", opciones: OPCIONES_ILIKIAS, porDefecto: "31" },
    { id: "kpk", tipo: "opcion-dato", dato: "gr.eisfores-ergazomenou", etiqueta: "Ασφάλιση", porDefecto: "101" },
  ],
  calcular(e, v, { redondear }) {
    if (e.kathara <= 0) throw new ErrorEntrada("Εισάγετε καθαρό μισθό μεγαλύτερο από το μηδέν.", "kathara");
    elegxosPaidion(e.paidia);
    const p = { syntelestisEisforon: enMapa(v["gr.eisfores-ergazomenou"], e.kpk), orio: v["gr.anotato-orio-asfalisis"], misthoi: misthoiEtous(v) };
    const miktos = miktosApoKathara(e.kathara, p, v, e.paidia, e.ilikia, redondear);
    const m = misthodosia(miktos, p, v, e.paidia, e.ilikia, redondear);
    return {
      miktos,
      eisforesMina: m.eisforesMina,
      forosMina: m.forosMina,
      katharaMina: m.katharaMina,
      miktaEtous: m.miktaEtous,
      forosEtous: m.forosEtous,
    };
  },
  resultado: [
    { clave: "miktos", etiqueta: "Μικτός μηνιαίος μισθός", formato: "moneda", destacada: true },
    { clave: "eisforesMina", etiqueta: "Ασφαλιστικές εισφορές τον μήνα", formato: "moneda" },
    { clave: "forosMina", etiqueta: "Φόρος τον μήνα", formato: "moneda" },
    { clave: "katharaMina", etiqueta: "Καθαρός μισθός με αυτό το μικτό", formato: "moneda" },
    { clave: "miktaEtous", etiqueta: "Μικτές αποδοχές του έτους (14 μισθοί)", formato: "moneda" },
    { clave: "forosEtous", etiqueta: "Φόρος εισοδήματος του έτους", formato: "moneda" },
  ],
});
