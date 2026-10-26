import { definirCalculadora, enMapa } from "@/motor/calculo";
import { elegxosPaidion, misthodosia, misthoiEtous, OPCIONES_ILIKIAS, REQUIERE_KLIMAKA, REQUIERE_MEIOSI, REQUIERE_PAGES } from "../lib/foros";

export default definirCalculadora({
  id: "gr.katotatos-misthos",
  mercado: "gr",
  concepto: "salario-minimo",
  slug: "katotatos-misthos",
  estado: "publicado",
  requiere: {
    ...REQUIERE_KLIMAKA,
    ...REQUIERE_MEIOSI,
    ...REQUIERE_PAGES,
    "gr.katotatos-misthos": "numero",
    "gr.katotato-imeromisthio": "numero",
    "gr.eisfores-ergazomenou": "mapa",
    "gr.anotato-orio-asfalisis": "numero",
  },
  campos: [
    { id: "paidia", tipo: "entero", etiqueta: "Εξαρτώμενα παιδιά", min: 0, max: 15, porDefecto: 0 },
    { id: "ilikia", tipo: "opcion", etiqueta: "Ηλικία", opciones: OPCIONES_ILIKIAS, porDefecto: "31" },
  ],
  calcular(e, v, { redondear }) {
    elegxosPaidion(e.paidia);
    const misthoi = misthoiEtous(v);
    const miktos = v["gr.katotatos-misthos"];
    const m = misthodosia(
      miktos,
      { syntelestisEisforon: enMapa(v["gr.eisfores-ergazomenou"], "101"), orio: v["gr.anotato-orio-asfalisis"], misthoi },
      v,
      e.paidia,
      e.ilikia,
      redondear,
    );
    return {
      miktos,
      katharaMina: m.katharaMina,
      imeromisthio: v["gr.katotato-imeromisthio"],
      eisforesMina: m.eisforesMina,
      forosMina: m.forosMina,
      miktaEtous: m.miktaEtous,
      katharaEtous: m.katharaEtous,
    };
  },
  resultado: [
    { clave: "miktos", etiqueta: "Κατώτατος μηνιαίος μισθός (μικτός)", formato: "moneda", destacada: true },
    { clave: "katharaMina", etiqueta: "Καθαρός μηνιαίος κατώτατος", formato: "moneda" },
    { clave: "imeromisthio", etiqueta: "Κατώτατο ημερομίσθιο (μικτό)", formato: "moneda" },
    { clave: "eisforesMina", etiqueta: "Ασφαλιστικές εισφορές τον μήνα (ΚΠΚ 101)", formato: "moneda" },
    { clave: "forosMina", etiqueta: "Φόρος τον μήνα", formato: "moneda" },
    { clave: "miktaEtous", etiqueta: "Μικτά του έτους (με δώρα και επίδομα αδείας)", formato: "moneda" },
    { clave: "katharaEtous", etiqueta: "Καθαρά του έτους", formato: "moneda" },
  ],
});
